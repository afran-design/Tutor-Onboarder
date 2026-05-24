import { Check, AlertTriangle, FileText, Download, ZoomIn, ChevronRight, Info, Shield, ArrowRight, Eye, ClipboardCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RefereeCards } from "./referee-cards";
import { ApplicantAssessment } from "./applicant-assessment";

type Field = {
  label: string;
  submitted: string;
  extracted: string;
  match: "match" | "mismatch" | "partial";
};

const FIELDS: Field[] = [
  { label: "Full Name", submitted: "Aarav Sharma", extracted: "Aarav Sharma", match: "match" },
  { label: "Date of Birth", submitted: "14 March 1991", extracted: "14 March 1990", match: "mismatch" },
  { label: "Document Number", submitted: "P 8273 4920", extracted: "P 8273 4920", match: "match" },
  { label: "Nationality", submitted: "British Citizen", extracted: "British Citizen", match: "match" },
  { label: "Issue Date", submitted: "02 Jun 2019", extracted: "02 Jun 2019", match: "match" },
  { label: "Expiry Date", submitted: "01 Jun 2029", extracted: "01 Jun 2029", match: "match" },
];

function MatchPill({ match }: { match: Field["match"] }) {
  if (match === "match")
    return (
      <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-700 bg-emerald-50 ring-1 ring-emerald-100 rounded-full px-1.5 py-0.5">
        <Check className="size-2.5" strokeWidth={3} /> Match
      </span>
    );
  if (match === "mismatch")
    return (
      <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-amber-700 bg-amber-50 ring-1 ring-amber-100 rounded-full px-1.5 py-0.5">
        <AlertTriangle className="size-2.5" strokeWidth={2.5} /> Mismatch
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-neutral-600 bg-neutral-100 rounded-full px-1.5 py-0.5">
      Partial
    </span>
  );
}

export function ReviewPanel({ activeId }: { activeId: string }) {
  const isAssessment = activeId === "assess";

  return (
    <div className="flex-1 min-w-0 flex flex-col bg-white relative">
      <div className="px-8 pt-7 pb-5">
        
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[20px] tracking-tight text-neutral-900 font-semibold leading-tight">
                {isAssessment ? "Applicant Assessment" : "Reference & Employment"}
              </h2>
              <span className={`inline-flex items-center gap-1 h-5 px-2 rounded-full text-[10.5px] font-medium ${
                isAssessment 
                  ? "bg-blue-50 ring-1 ring-blue-100 text-blue-700" 
                  : "bg-amber-50 ring-1 ring-amber-100 text-amber-700"
              }`}>
                {isAssessment ? "Final Review" : "Requires Approval"}
              </span>
              
            </div>
            <p className="text-[13px] text-neutral-500 mt-1.5">
              {isAssessment 
                ? "Finalize the verification process by providing a comprehensive assessment of the candidate's performance and suitability."
                : "Review references submitted by the candidate's referees, including employment history and suitability to work with children."}
            </p>
          </div>

        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="flex-1 overflow-y-auto px-8 pb-32 scrollbar-thin"
        >
          {isAssessment ? (
            <ApplicantAssessment />
          ) : activeId === "refs" ? (
            <RefereeCards />
          ) : (
            <div className="hidden grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-6">
              {/* Document preview */}
              <div className="rounded-xl bg-white ring-1 ring-neutral-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200/70">
                  <div className="flex items-center gap-2">
                    <div className="size-7 rounded-md bg-neutral-100 flex items-center justify-center">
                      <FileText className="size-3.5 text-neutral-500" strokeWidth={1.8} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12.5px] text-neutral-900 font-medium">passport_uk.pdf</div>
                      <div className="text-[10.5px] text-neutral-400">2 pages · 1.4 MB · Uploaded 14 May</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <button className="size-7 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors">
                      <ZoomIn className="size-3.5" strokeWidth={1.8} />
                    </button>
                    <button className="size-7 rounded-md hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors">
                      <Download className="size-3.5" strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
                <div className="p-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.04)_1px,transparent_0)] [background-size:14px_14px]">
                  <div className="aspect-[3/4] w-full rounded-lg bg-gradient-to-br from-[#f7f5ef] to-[#ecdfc9] ring-1 ring-amber-900/10 shadow-[0_8px_24px_-12px_rgba(120,53,15,0.25)] p-5 relative overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.18em] text-amber-900/70 font-semibold">United Kingdom</div>
                        <div className="text-[13px] text-amber-950 font-semibold mt-0.5">Passport</div>
                      </div>
                      <div className="text-[8.5px] text-amber-900/60 font-mono">TYPE P · GBR</div>
                    </div>
                    <div className="mt-5 flex gap-4">
                      <div className="size-20 rounded-md bg-amber-900/10 ring-1 ring-amber-900/15 flex items-center justify-center">
                        <div className="size-12 rounded-full bg-amber-900/15" />
                      </div>
                      <div className="flex-1 space-y-2">
                        {[
                          ["Surname", "SHARMA"],
                          ["Given Names", "AARAV"],
                          ["Nationality", "BRITISH CITIZEN"],
                          ["Date of Birth", "14 MAR / MAR 90"],
                        ].map(([k, v]) => (
                          <div key={k}>
                            <div className="text-[8px] uppercase tracking-wider text-amber-900/50">{k}</div>
                            <div className="text-[10.5px] font-mono text-amber-950 font-medium tracking-wide">{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-5 right-5 font-mono text-[8.5px] text-amber-900/70 tracking-[0.06em] border-t border-amber-900/15 pt-2">
                      P&lt;GBRSHARMA&lt;&lt;AARAV&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
                    </div>
                  </div>
                  <button className="mt-3 w-full h-8 rounded-md bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 text-[12px] text-neutral-700 flex items-center justify-center gap-1.5 transition-all">
                    <Eye className="size-3.5" strokeWidth={1.8} /> Open full preview
                  </button>
                </div>
              </div>

              {/* Comparison */}
              <div className="space-y-5">
                <div className="rounded-xl bg-white ring-1 ring-neutral-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-neutral-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] text-neutral-900 font-medium">Field Comparison</span>
                      <span className="text-[10.5px] text-neutral-400">OCR + submitted</span>
                    </div>
                    <span className="text-[10.5px] text-neutral-500">5 of 6 match</span>
                  </div>
                  <div className="px-4 py-2 grid grid-cols-[1fr_1fr_auto] gap-3 text-[10px] uppercase tracking-wider text-neutral-400 border-b border-neutral-100">
                    <span>Submitted</span>
                    <span>Extracted</span>
                    <span />
                  </div>
                  <ul className="divide-y divide-neutral-100">
                    {FIELDS.map((f) => (
                      <li
                        key={f.label}
                        className={`px-4 py-3 transition-colors ${f.match === "mismatch" ? "bg-amber-50/40" : "hover:bg-neutral-50/60"}`}
                      >
                        <div className="text-[10.5px] uppercase tracking-wider text-neutral-400 mb-1.5">{f.label}</div>
                        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-center">
                          <div className="text-[12.5px] text-neutral-800">{f.submitted}</div>
                          <div className={`text-[12.5px] ${f.match === "mismatch" ? "text-amber-800 font-medium" : "text-neutral-800"}`}>
                            {f.extracted}
                          </div>
                          <MatchPill match={f.match} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl bg-white ring-1 ring-neutral-200/70 p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-amber-50 ring-1 ring-amber-100 flex items-center justify-center shrink-0">
                      <Info className="size-4 text-amber-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12.5px] text-neutral-900 font-medium">Resolve before approving</div>
                      <div className="text-[12px] text-neutral-500 mt-0.5 leading-relaxed">
                        The candidate's submitted date of birth differs from the passport by one year. Request a correction or override with a note.
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button className="h-7 px-2.5 rounded-md bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 text-[11.5px] text-neutral-700 transition-all">
                          Request Correction
                        </button>
                        <button className="h-7 px-2.5 rounded-md text-[11.5px] text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 transition-all">
                          Add internal note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl bg-white ring-1 ring-neutral-200/70 p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <div className="text-[12.5px] text-neutral-900 font-medium mb-3">Review checklist</div>
                  <ul className="space-y-2">
                    {[
                      ["Document is clear and unaltered", true],
                      ["Photo matches candidate profile", true],
                      ["Document is currently valid", true],
                      ["All extracted fields verified", false],
                    ].map(([label, done]) => (
                      <li key={label as string} className="flex items-center gap-2.5 text-[12px]">
                        <span
                          className={`size-4 rounded-[5px] flex items-center justify-center ${
                            done ? "bg-[#405985] text-white" : "bg-neutral-100 ring-1 ring-neutral-200"
                          }`}
                        >
                          {done ? <Check className="size-2.5" strokeWidth={3.5} /> : null}
                        </span>
                        <span className={done ? "text-neutral-700" : "text-neutral-500"}>{label as string}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>

      </AnimatePresence>

      {/* Sticky footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-neutral-200/70 bg-white/85 backdrop-blur-xl">
        <div className="px-8 py-3.5 flex items-center justify-end gap-4">

          <div className="flex items-center gap-2">

            <button className="group h-10 px-4 rounded-[10px] text-[12.5px] text-white bg-[#405985] hover:bg-[#34496e] active:scale-[0.98] shadow-[0_1px_2px_rgba(64,89,133,0.3),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all flex items-center gap-1.5">
              Approve and Proceed
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
