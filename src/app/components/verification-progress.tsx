import { motion } from "motion/react";
import { GROUPS } from "./verification-nav";

export function VerificationProgress() {
  const allItems = GROUPS.flatMap((g) => g.items);
  const completed = allItems.filter((i) => i.status === "verified").length;
  const total = allItems.length;
  const remaining = total - completed;
  const done = remaining === 0;

  return (
    <div className="rounded-[10px] bg-white/60 ring-1 ring-neutral-900/[0.04] px-5 py-4 flex items-center justify-between gap-8">
      <div className="flex items-baseline gap-2.5 min-w-0">
        <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-neutral-500 font-medium">
          <span className="relative flex size-1.5">
            <span className={`absolute inset-0 rounded-full ${done ? "bg-emerald-500" : "bg-[#405985]"} animate-ping opacity-60`} />
            <span className={`relative size-1.5 rounded-full ${done ? "bg-emerald-500" : "bg-[#405985]"}`} />
          </span>
          {done ? "Ready to onboard" : "In progress"}
        </span>
        <h2 className="text-[14px] font-semibold text-neutral-900 tracking-tight truncate">
          {done ? (
            "All verifications complete"
          ) : (
            <>
              <span className="tabular-nums">{remaining}</span>{" "}
              <span className="text-neutral-500 font-normal">
                more {remaining === 1 ? "verification" : "verifications"} to onboard candidate
              </span>
            </>
          )}
        </h2>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-[3px]">
          {allItems.map((item, i) => {
            const isDone = item.status === "verified";
            return (
              <motion.span
                key={item.id}
                initial={{ scaleY: 0.4, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
                className={`block h-3 w-[6px] rounded-[3px] origin-bottom ${
                  isDone ? "bg-emerald-500" : "bg-neutral-200"
                }`}
              />
            );
          })}
        </div>
        <div className="text-[12.5px] text-neutral-600 tabular-nums">
          <span className="font-semibold text-neutral-900">{completed}</span>
          <span className="text-neutral-400">/{total}</span>
        </div>
      </div>
    </div>
  );
}
