import type { Metadata } from "next";
import LandingClient from "./landing-client";

export const metadata: Metadata = {
  title: "Landing | Invite Designer",
  description:
    "Marketing landing page with Hindi and English content for website services.",
};

export default function Page() {
  return <LandingClient />;
}
