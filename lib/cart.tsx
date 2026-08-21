"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { TierId } from "./tiers";
import type { PackQty, PurchaseType, SubscribeCadenceDays } from "./variants";
import { variantPrice } from "./variants";
import { sizeBySlug } from "./sizes";

export type LineItem = {
  /** Deterministic id for update/remove ops. */
  id: string;
  sizeSlug: string;
  tierId: TierId;
  packQty: PackQty;
  purchaseType: PurchaseType;
  subscribeCadenceDays?: SubscribeCadenceDays;
  /** How many of this variant configuration were added. */
  quantity: number;
  /** Optional scent-strip attached to this filter line. */
  scentSlug?: string | null;
};

type CartState = {
  items: LineItem[];
  drawerOpen: boolean;
};

type CartActions = {
  add: (item: Omit<LineItem, "id" | "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
};

type CartContextValue = CartState &
  CartActions & {
    itemCount: number;
    /** Sum of confirmed prices only; null if no variants have confirmed pricing yet. */
    subtotal: number | null;
  };

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "kalero.cart.v1";

function makeLineId(
  sizeSlug: string,
  tierId: TierId,
  packQty: PackQty,
  purchaseType: PurchaseType,
  cadence?: SubscribeCadenceDays,
  scentSlug?: string | null,
): string {
  return [
    sizeSlug,
    tierId,
    `p${packQty}`,
    purchaseType,
    cadence ?? "",
    scentSlug ?? "",
  ].join("|");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LineItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as LineItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage may be full or unavailable; fail silently
    }
  }, [items, hydrated]);

  const add = useCallback<CartActions["add"]>((raw) => {
    const id = makeLineId(
      raw.sizeSlug,
      raw.tierId,
      raw.packQty,
      raw.purchaseType,
      raw.subscribeCadenceDays,
      raw.scentSlug,
    );
    const quantity = raw.quantity ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [
        ...prev,
        {
          id,
          sizeSlug: raw.sizeSlug,
          tierId: raw.tierId,
          packQty: raw.packQty,
          purchaseType: raw.purchaseType,
          subscribeCadenceDays: raw.subscribeCadenceDays,
          scentSlug: raw.scentSlug ?? null,
          quantity,
        },
      ];
    });
    setDrawerOpen(true);
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setDrawerOpen((v) => !v), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  );

  const subtotal = useMemo<number | null>(() => {
    let total = 0;
    let anyPriced = false;
    for (const item of items) {
      const size = sizeBySlug(item.sizeSlug);
      if (!size) continue;
      const unit = variantPrice(size, item.tierId, item.packQty);
      if (unit == null) continue;
      anyPriced = true;
      total += unit * item.quantity;
    }
    return anyPriced ? total : null;
  }, [items]);

  const value: CartContextValue = {
    items,
    drawerOpen,
    itemCount,
    subtotal,
    add,
    updateQuantity,
    remove,
    clear,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a <CartProvider>");
  }
  return ctx;
}
