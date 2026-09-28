import { Users } from "lucide-react";

/** Placeholder gallery for real team/client photos wearing COTTSON gear — swap each tile's
 * placeholder for an actual <Image> once photos are available (no real photos exist yet). */
export function TeamShowcase() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand sm:text-3xl">Trusted by teams like yours</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
          From office staff to event crews — see how teams wear COTTSON.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted text-muted-foreground"
          >
            <Users className="size-8" strokeWidth={1.5} />
            <span className="text-xs">Team photo</span>
          </div>
        ))}
      </div>
    </div>
  );
}
