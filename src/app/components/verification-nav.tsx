import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Clock, AlertTriangle, X, ChevronDown } from "lucide-react";

export type VStatus = "verified" | "pending" | "attention" | "rejected";

export type VItem = {
  id: string;
  label: string;
  status: VStatus;
  meta?: string;
  issueCount?: number;
};

export type VGroup = {
  id: string;
  label: string;
  items: VItem[];
};

export const GROUPS: VGroup[] = [
  {
    id: "personal",
    label: "Personal & Identity",
    items: [
      { id: "address", label: "Address", status: "verified", meta: "Verified 2 days ago" },
      { id: "tutor-details", label: "Tutor Details", status: "verified", meta: "Auto-matched" },
      { id: "identity", label: "Identity", status: "verified", meta: "Verified 1 day ago" },
    ],
  },
  {
    id: "eligibility",
    label: "Eligibility & Compliance",
    items: [
      { id: "rtw", label: "Right to Work", status: "verified", meta: "Share code valid" },
      { id: "dbs", label: "DBS Verification", status: "verified", meta: "Certificate verified" },
      { id: "teach-prohib", label: "Teaching Prohibition", status: "verified", meta: "Checked" },
      { id: "overseas", label: "Overseas Verification", status: "verified", meta: "Completed" },
      { id: "fitness", label: "Fitness to Work", status: "verified", meta: "GP form approved" },
    ],
  },
  {
    id: "quals",
    label: "Qualifications & Employment",
    items: [
      { id: "quals", label: "Qualifications", status: "verified", meta: "3 certificates verified" },
      { id: "refs", label: "Reference & Employment", status: "pending", meta: "2 of 3 received" },
    ],
  },
  {
    id: "final",
    label: "Financial & Final Checks",
    items: [
      { id: "bank", label: "Bank Details", status: "pending" },
      { id: "online", label: "Online Verification", status: "pending" },
      { id: "assess", label: "Applicant Assessment", status: "pending" },
    ],
  },
];

function StatusDot({ status }: { status: VStatus }) {
  const map = {
    verified: { Icon: Check, cls: "bg-emerald-100 text-emerald-600 ring-emerald-200", size: "size-[20px]", iconSize: "size-[11px]", strokeWidth: 3.2 },
    pending: { Icon: Clock, cls: "bg-neutral-100 text-neutral-500 ring-neutral-200/70", size: "size-[18px]", iconSize: "size-[10px]", strokeWidth: 2.8 },
    attention: { Icon: AlertTriangle, cls: "bg-amber-50 text-amber-600 ring-amber-100", size: "size-[18px]", iconSize: "size-[10px]", strokeWidth: 2.8 },
    rejected: { Icon: X, cls: "bg-rose-50 text-rose-600 ring-rose-100", size: "size-[18px]", iconSize: "size-[10px]", strokeWidth: 2.8 },
  }[status];
  const { Icon, cls, size, iconSize, strokeWidth } = map;
  return (
    <span className={`${size} rounded-full ring-1 flex items-center justify-center shrink-0 ${cls}`}>
      <Icon className={iconSize} strokeWidth={strokeWidth} />
    </span>
  );
}

export function VerificationNav({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const allItems = GROUPS.flatMap((g) => g.items);
  const attention = allItems.filter((i) => i.status === "attention");

  return (
    <div className="w-[280px] shrink-0 h-full border-r border-neutral-200/70 flex flex-col">
      <div className="px-4 pt-4 pb-2">
        <div className="text-[10.5px] uppercase tracking-[0.1em] text-neutral-400 font-semibold">Verifications</div>
      </div>
      <div className="flex-1 overflow-y-auto pb-3">
        {attention.length > 0 && (
          <div className="px-3 mb-2">
            <div className="rounded-[10px] border border-amber-200/70 bg-amber-50/40 p-2.5">
              <div className="flex items-center gap-1.5 mb-1.5">
                <AlertTriangle className="size-3.5 text-amber-600" strokeWidth={2.2} />
                <span className="text-[11.5px] font-medium text-amber-900">Attention Required</span>
                <span className="ml-auto text-[10.5px] text-amber-700 tabular-nums">{attention.length}</span>
              </div>
              <div className="space-y-0.5">
                {attention.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => onSelect(i.id)}
                    className="w-full text-left text-[11.5px] text-amber-800 hover:text-amber-950 px-1 py-0.5 rounded hover:bg-amber-100/50 transition-colors flex items-center justify-between"
                  >
                    <span>{i.label}</span>
                    <span className="text-[10px] text-amber-600">{i.meta}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="px-3 space-y-1.5">
          {GROUPS.map((group, idx) => {
            const groupDone = group.items.filter((i) => i.status === "verified").length;
            const groupTotal = group.items.length;
            const isComplete = groupDone === groupTotal;
            const hasAttention = group.items.some((i) => i.status === "attention");
            const groupStatus: VStatus = isComplete ? "verified" : hasAttention ? "attention" : "pending";
            const containsActive = group.items.some((i) => i.id === activeId);
            const isOpen = expandedId ? expandedId === group.id : containsActive;

            return (
              <div
                key={group.id}
                className={`rounded-[10px] border transition-colors ${
                  isOpen ? "border-neutral-200 bg-white" : "border-neutral-200/60 bg-neutral-50/40 hover:bg-neutral-50"
                }`}
              >
                <button
                  onClick={() => setExpandedId(isOpen ? null : group.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left"
                >
                  <StatusDot status={groupStatus} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12.5px] font-medium text-neutral-900 truncate">
                        {group.label}
                      </span>
                      <span className="text-[10.5px] text-neutral-500 tabular-nums shrink-0">
                        {groupDone}/{groupTotal}
                      </span>
                    </div>
                    <div className="mt-1.5 h-[3px] w-full rounded-full bg-neutral-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComplete ? "bg-emerald-500" : hasAttention ? "bg-amber-500" : "bg-[#405985]"
                        }`}
                        style={{ width: `${(groupDone / groupTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 0 : -90 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="shrink-0 text-neutral-400"
                  >
                    <ChevronDown className="size-3.5" strokeWidth={2.2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="px-1.5 pb-1.5">
                        {group.items.map((item) => {
                          const isActive = item.id === activeId;
                          return (
                            <li key={item.id}>
                              <button
                                onClick={() => onSelect(item.id)}
                                className={`group w-full flex items-center gap-2.5 pl-2.5 pr-2 py-2 rounded-md transition-all duration-150 relative ${
                                  isActive ? "bg-[#405985]/[0.1]" : "hover:bg-neutral-50"
                                }`}
                              >
                                {isActive && (
                                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-[#405985]" />
                                )}
                                <StatusDot status={item.status} />
                                <div className="flex-1 min-w-0 text-left">
                                  <div className={`text-[12.5px] truncate ${isActive ? "text-[#405985] font-semibold" : "text-neutral-700"}`}>
                                    {item.label}
                                  </div>
                                </div>
                                {item.issueCount ? (
                                  <span className="text-[10px] h-4 min-w-4 px-1 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-medium tabular-nums">
                                    {item.issueCount}
                                  </span>
                                ) : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
