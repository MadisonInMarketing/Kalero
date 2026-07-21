import type { Metadata } from "next";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Find the Right Air Filter for Your Home | MERV 8, 11, or 13?",
  description:
    "Not sure which air filter you need? Answer a few questions about pets, allergies, smoke, and household concerns and we'll match you to the right MERV 8, 11, or 13 filter — plus the exact 20x25x1, 16x25x1, or custom size for your HVAC.",
  alternates: { canonical: "/find-your-filter" },
  keywords: [
    "which air filter do i need",
    "air filter finder",
    "MERV rating explained",
    "best air filter for pets",
    "best air filter for allergies",
    "best air filter for smoke",
    "find HVAC filter size",
    "air filter quiz",
  ],
};

export default function FindYourFilter() {
  return <Quiz />;
}
