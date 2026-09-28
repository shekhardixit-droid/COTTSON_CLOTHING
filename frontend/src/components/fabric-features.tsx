import { Feather, Shirt, Sparkles, Wind } from "lucide-react";

const FEATURES = [
  { icon: Sparkles, label: "Super Soft" },
  { icon: Wind, label: "Breathable" },
  { icon: Feather, label: "Featherlight" },
  { icon: Shirt, label: "100% Cotton" },
];

/** Fabric-quality strip: icon + label, each its own card. */
export function FabricFeatures() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4">
      {FEATURES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-muted px-4 py-10 text-center"
        >
          <Icon className="size-11 text-brand" strokeWidth={1.5} />
          <span className="text-base font-semibold text-brand">{label}</span>
        </div>
      ))}
    </div>
  );
}
