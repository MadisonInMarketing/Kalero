import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Find Your Filter",
  description:
    "Answer a few questions about your pets, allergies, location, and home. We'll match you to the KALERO filter that fits.",
};

export default function FindYourFilter() {
  return <Quiz />;
}
