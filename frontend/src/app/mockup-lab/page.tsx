import type { Metadata } from "next";
import { MockupLab } from "./mockup-lab";

// Mockup page (linked as "Mockup" in the navbar): pick a product, recolour each part of the
// garment and preview a logo on the ghost-mannequin template.
export const metadata: Metadata = { title: "Mockup", robots: { index: false } };

export default function MockupLabPage() {
  return <MockupLab />;
}
