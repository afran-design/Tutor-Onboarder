import { Star, Check, AlertCircle, Info, ThumbsUp, ThumbsDown, MessageSquare, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type RatingProps = {
  value: number;
  onChange: (val: number) => void;
  label: string;
};

function RatingScale({ value, onChange, label }: RatingProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-medium text-neutral-900">{label}</label>
        <span className="text-[12px] text-[#405985] font-semibold">{value}/5</span>
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => onChange(num)}
            className={`flex-1 h-10 rounded-lg border transition-all flex items-center justify-center ${
              value === num
                ? "bg-[#405985] border-[#405985] text-white shadow-sm"
                : "bg-white border-neutral-200 text-neutral-400 hover:border-neutral-300 hover:bg-neutral-50"
            }`}
          >
            <Star className={`size-4 ${value >= num && value !== 0 ? "fill-current" : ""}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ApplicantAssessment() {
  const [assessment, setAssessment] = useState("");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [performance, setPerformance] = useState(0);
  const [rehire, setRehire] = useState<boolean | null>(null);

  // New states for added questions
  const [relationship, setRelationship] = useState("");
  const [duration, setDuration] = useState("");
  const [integrity, setIntegrity] = useState(0);
  const [timekeeping, setTimekeeping] = useState(0);
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [safeguarding, setSafeguarding] = useState<boolean | null>(null);

  return (
    <div className="space-y-8 pb-20">
      {/* Introduction Card */}
      <div className="p-5 rounded-[16px] bg-[#405985]/[0.03] ring-1 ring-[#405985]/10 border border-white/50">
        <div className="flex gap-4">
          <div className="size-10 rounded-xl bg-white shadow-sm ring-1 ring-[#405985]/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5 text-[#405985]" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-neutral-900">Final Verification Step</h3>
            <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed">
              Complete the applicant assessment based on the gathered evidence and reference checks for <strong>Matthew Perry</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Relationship & Context Section - Highly Scannable */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[20px] bg-white ring-1 ring-neutral-200 shadow-sm space-y-4">
          <label className="text-[13px] font-medium text-neutral-900 flex items-center gap-2">
            Capacity in which candidate is known
          </label>
          <div className="flex flex-wrap gap-2">
            {["Manager", "Colleague", "Professor", "Client", "Other"].map((role) => (
              <button
                key={role}
                onClick={() => setRelationship(role)}
                className={`px-4 py-2 rounded-full text-[12.5px] transition-all border ${
                  relationship === role
                    ? "bg-[#405985] border-[#405985] text-white"
                    : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-[20px] bg-white ring-1 ring-neutral-200 shadow-sm space-y-4">
          <label className="text-[13px] font-medium text-neutral-900 flex items-center gap-2">
            Duration of relationship
          </label>
          <div className="flex flex-wrap gap-2">
            {["< 1 year", "1-2 years", "2-5 years", "5+ years"].map((time) => (
              <button
                key={time}
                onClick={() => setDuration(time)}
                className={`px-4 py-2 rounded-full text-[12.5px] transition-all border ${
                  duration === time
                    ? "bg-[#405985] border-[#405985] text-white"
                    : "bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column: Subjective Assessment */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <MessageSquare className="size-4 text-neutral-400" />
              <h4 className="text-[14px] font-semibold text-neutral-900">Detailed Evaluation</h4>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-medium text-neutral-900">Reason for leaving previous post</label>
                <input
                  type="text"
                  value={reasonForLeaving}
                  onChange={(e) => setReasonForLeaving(e.target.value)}
                  placeholder="e.g. End of contract, Career progression..."
                  className="w-full h-11 px-4 rounded-[12px] bg-white ring-1 ring-neutral-200 focus:ring-2 focus:ring-[#405985]/20 focus:outline-none text-[13.5px] text-neutral-700 placeholder:text-neutral-400 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-medium text-neutral-900">General Assessment</label>
                <textarea
                  value={assessment}
                  onChange={(e) => setAssessment(e.target.value)}
                  placeholder="Provide a general assessment of the candidate's suitability for the role..."
                  className="w-full min-h-[120px] p-4 rounded-[14px] bg-white ring-1 ring-neutral-200 focus:ring-2 focus:ring-[#405985]/20 focus:outline-none text-[13.5px] text-neutral-700 placeholder:text-neutral-400 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-neutral-900">Strengths</label>
                  <textarea
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                    placeholder="Core strengths..."
                    className="w-full min-h-[80px] p-4 rounded-[14px] bg-white ring-1 ring-neutral-200 focus:ring-2 focus:ring-[#405985]/20 focus:outline-none text-[13.5px] text-neutral-700 placeholder:text-neutral-400 transition-all resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-medium text-neutral-900">Development Areas</label>
                  <textarea
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                    placeholder="Weaknesses..."
                    className="w-full min-h-[80px] p-4 rounded-[14px] bg-white ring-1 ring-neutral-200 focus:ring-2 focus:ring-[#405985]/20 focus:outline-none text-[13.5px] text-neutral-700 placeholder:text-neutral-400 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quantitative Metrics & Safeguarding */}
        <div className="space-y-6">
          <div className="p-6 rounded-[20px] bg-white ring-1 ring-neutral-200 shadow-sm space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <RatingScale 
                label="Integrity & Honesty" 
                value={integrity} 
                onChange={setIntegrity} 
              />
              <RatingScale 
                label="Timekeeping & Attendance" 
                value={timekeeping} 
                onChange={setTimekeeping} 
              />
              <RatingScale 
                label="Overall Performance Rating" 
                value={performance} 
                onChange={setPerformance} 
              />
            </div>

            <div className="h-px bg-neutral-100" />

            <div className="space-y-4">
              <label className="text-[13px] font-medium text-neutral-900">Would you re-hire this candidate?</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setRehire(true)}
                  className={`flex-1 h-11 rounded-[12px] border transition-all flex items-center justify-center gap-2 font-medium text-[13px] ${
                    rehire === true
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500 shadow-sm"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <ThumbsUp className={`size-4 ${rehire === true ? "fill-emerald-100" : ""}`} />
                  Yes
                </button>
                <button
                  onClick={() => setRehire(false)}
                  className={`flex-1 h-11 rounded-[12px] border transition-all flex items-center justify-center gap-2 font-medium text-[13px] ${
                    rehire === false
                      ? "bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500 shadow-sm"
                      : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  <ThumbsDown className={`size-4 ${rehire === false ? "fill-rose-100" : ""}`} />
                  No
                </button>
              </div>
            </div>
          </div>

          {/* Safeguarding Section - Modern Warning Style */}
          <div className="p-6 rounded-[20px] bg-rose-50/30 ring-1 ring-rose-100 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-rose-600" />
              <label className="text-[13px] font-semibold text-rose-900 uppercase tracking-wider">Safeguarding Declaration</label>
            </div>
            <p className="text-[12px] text-rose-800 leading-relaxed">
              Are you aware of any reason why the candidate should not work with children or vulnerable adults?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSafeguarding(false)}
                className={`flex-1 h-10 rounded-[10px] border transition-all flex items-center justify-center gap-2 font-medium text-[12px] ${
                  safeguarding === false
                    ? "bg-white border-emerald-500 text-emerald-700 shadow-sm"
                    : "bg-white/50 border-neutral-200 text-neutral-500 hover:bg-white"
                }`}
              >
                No concerns
              </button>
              <button
                onClick={() => setSafeguarding(true)}
                className={`flex-1 h-10 rounded-[10px] border transition-all flex items-center justify-center gap-2 font-medium text-[12px] ${
                  safeguarding === true
                    ? "bg-rose-600 border-rose-600 text-white shadow-sm"
                    : "bg-white/50 border-neutral-200 text-neutral-500 hover:bg-white"
                }`}
              >
                Yes, concerns exist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

