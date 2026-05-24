import { FileText, ClipboardList, Mail, Phone, Calendar, Globe, User2, BookOpen, ChevronDown } from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";

const META: { icon: any; label: string; value: string }[] = [
  { icon: ClipboardList, label: "Application", value: "APP-2026-0481" },
  { icon: Mail, label: "Email", value: "james.thompson@gmail.com" },
  { icon: Phone, label: "Phone", value: "+44 7700 900 184" },
  { icon: Calendar, label: "DOB", value: "14 Mar 1991" },
  { icon: User2, label: "Gender", value: "Male" },
  { icon: Globe, label: "Nationality", value: "British" },
];

const SUBJECTS = [
  { name: "Mathematics", level: "Key Stage 4", rate: 85 },
  { name: "Physics", level: "Key Stage 5", rate: 95 },
  { name: "Further Maths", level: "A-Level", rate: 110 },
];

export function CandidateHeader() {
  return (
    <div className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-neutral-200/70">
      <div className="relative">
        {/* Soft brand gradient band */}
        <div
          className="absolute inset-x-0 top-0 h-20 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, #dbe7f5 0%, #e7ecf7 28%, #f1e8f3 58%, #fdeede 88%, #fef6ec 100%)",
            }}
          />
          {/* Subtle textured blobs */}
          <div
            className="absolute -top-16 -left-10 size-56 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, #b9cee8 0%, transparent 70%)" }}
          />
          <div
            className="absolute -top-12 left-1/3 size-48 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, #e6d2ea 0%, transparent 70%)" }}
          />
          <div
            className="absolute -top-10 right-1/4 size-44 rounded-full opacity-50 blur-3xl"
            style={{ background: "radial-gradient(circle, #fcd9b8 0%, transparent 70%)" }}
          />
          {/* Grain-ish noise via fine dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "6px 6px",
            }}
          />
          {/* Fade to white at bottom for soft blend */}
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-transparent to-white/95" />
          {/* Fade to white on the right side */}
          <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/60 to-transparent" />
        </div>

        <div className="relative px-8 pt-5 pb-4">
          <div className="flex items-start gap-5">
            <div className="relative shrink-0">
              <div className="size-[72px] rounded-full ring-4 ring-white p-0.5 bg-white shadow-[0_8px_24px_-8px_rgba(60,80,120,0.35)] overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwdHV0b3IlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Nzk0NzU4Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="James Thompson"
                  className="size-full rounded-full object-cover"
                />
              </div>
              <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-amber-400 border-2 border-white shadow-sm" />
            </div>

            <div className="flex-1 min-w-0 pt-1.5">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-neutral-900 tracking-tight">
                  James Thompson
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50/80 backdrop-blur-sm text-amber-700 border border-amber-200/60 shadow-sm">
                  <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Awaiting Verification
                </span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="font-semibold text-[13px] text-[#707070]">
                  Senior Mathematics Tutor
                </div>
                <div className="size-1 rounded-full bg-neutral-300" />
                
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#405985] hover:text-[#34496e] transition-colors focus:outline-none group cursor-pointer">
                      <BookOpen className="size-3.5" />
                      <span>3 Expert Subjects</span>
                      <ChevronDown className="size-3 transition-transform group-data-[state=open]:rotate-180" />
                    </button>
                  </Popover.Trigger>
                  
                  <Popover.Portal>
                    <Popover.Content 
                      sideOffset={8} 
                      align="start"
                      className="z-50 outline-none"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-72 overflow-hidden rounded-xl border border-neutral-200/60 bg-white/95 backdrop-blur-md shadow-[0_12px_24px_-8px_rgba(0,0,0,0.12)]"
                      >
                        <div className="p-3 border-b border-neutral-100 bg-neutral-50/50">
                          <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Expertise & Rates</h3>
                        </div>
                        <div className="divide-y divide-neutral-100/60">
                          {SUBJECTS.map((s, i) => (
                            <div key={i} className="p-3 flex items-center justify-between hover:bg-neutral-50/50 transition-colors">
                              <div className="min-w-0">
                                <div className="text-[13px] font-semibold text-neutral-800 truncate">{s.name}</div>
                                <div className="text-[11px] text-neutral-500">{s.level}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-[13px] font-bold text-[#405985]">${s.rate}</div>
                                <div className="text-[10px] text-neutral-400 uppercase tracking-tighter">per hour</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pt-1">
              <button className="h-9 px-4 rounded-[10px] text-[13px] font-semibold text-neutral-700 bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-neutral-300 hover:bg-white flex items-center gap-2 transition-all active:scale-[0.98]">
                <FileText className="size-4 text-neutral-400" strokeWidth={2} /> View CV
              </button>
              <button className="h-9 px-4 rounded-[10px] text-[13px] font-semibold text-neutral-700 bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-neutral-300 hover:bg-white flex items-center gap-2 transition-all active:scale-[0.98]">
                <ClipboardList className="size-4 text-neutral-400" strokeWidth={2} /> Interview Sheet
              </button>
              
            </div>
          </div>

          {/* Meta row, compact and scannable */}
          <div className="mt-2.5 flex items-center flex-wrap gap-x-5 gap-y-2 pl-[92px]">
            {["Email", "Phone", "Application", "DOB", "Gender", "Nationality"].map((label) => {
              const m = META.find((item) => item.label === label);
              if (!m) return null;
              const Icon = m.icon;
              const tooltipLabel = m.label === "Application" ? "Application ID" : m.label === "DOB" ? "Date of Birth" : m.label;
              return (
                <div key={m.label} className="flex items-center gap-2 group relative">
                  <div className="flex items-center justify-center size-6 rounded-lg bg-white/70 backdrop-blur-sm border border-neutral-200/60 group-hover:bg-white transition-colors">
                    <Icon className="size-3 text-neutral-500 group-hover:text-neutral-700" strokeWidth={2} />
                  </div>
                  <span className="text-[12px] text-neutral-600 font-medium">{m.value}</span>
                  <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-neutral-900 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none shadow-lg">
                    {tooltipLabel}
                    <div className="absolute top-full left-3 -mt-1 border-4 border-transparent border-t-neutral-900"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
