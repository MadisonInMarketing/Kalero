import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productBySlug, products } from "@/lib/products";
import { ProductDetail } from "@/components/product/ProductDetail";

const BASE_URL = "https://kalero.com";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  const sizesList = p.sizes.slice(0, 6).join(", ");
  const title = `${p.name}, ${p.merv} Home Air Filter | KALERO`;
  const description = `${p.longDescription} Available in ${sizesList} and more. Free shipping on subscriptions. Skip or cancel anytime.`;
  return {
    title,
    description,
    keywords: [
      `${p.name.toLowerCase()} air filter`,
      `${p.merv.toLowerCase()} air filter`,
      `${p.merv.toLowerCase()} furnace filter`,
      `${p.merv.toLowerCase()} HVAC filter`,
      `${p.category} air filter`,
      "home air filter",
      "premium air filter",
      "air filter delivery",
      "air filter subscription",
      ...p.sizes.map((s) => `${s} air filter`),
      "KALERO",
    ],
    alternates: {
      canonical: `/products/${p.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${BASE_URL}/products/${p.slug}`,
      images: [
        {
          url: `${BASE_URL}${p.image}`,
          alt: `${p.name}, ${p.merv} home air filter`,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    image: `${BASE_URL}${product.image}`,
    sku: product.slug,
    brand: { "@type": "Brand", name: "KALERO" },
    category: "Home & Garden > Household Appliance Accessories > HVAC Filters",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: product.priceFrom,
      offerCount: product.sizes.length,
      availability: "https://schema.org/InStock",
      url: `${BASE_URL}/products/${product.slug}`,
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "MERV Rating",
        value: product.merv,
      },
      {
        "@type": "PropertyValue",
        name: "Replacement Cadence",
        value: product.replacementCadence,
      },
    ],
  };

  return (
    <>
      <ProductDetail product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}
