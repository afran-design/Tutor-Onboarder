import { Mail, Phone, Briefcase, Check, Clock, Bell, ArrowRight, Pencil, Settings, X, Send, Building2, User, HelpCircle, Star, Calendar, FileText, Upload, FormInput, FileUp, AlertCircle, Trash2, MessageCircle, Sparkles, Zap, ShieldCheck, Info, ShieldAlert, ArrowUpRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import * as Dialog from "@radix-ui/react-dialog";

type Status = "submitted" | "pending" | "approved" | "escalated";

type Referee = {
  id: string;
  name: string;
  avatar: string;
  capacity: string;
  jobTitle: string;
  email: string;
  phone: string;
  status: Status;
  statusDetail: string;
  approvedBy?: string;
  approvedAt?: string;
};

const REFEREES: Referee[] = [
  {
    id: "matthew",
    name: "Matthew Perry",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=320&q=80",
    capacity: "Former Head of Department",
    jobTitle: "Head of Mathematics · St Andrew's College",
    email: "m.perry@standrews.ac.uk",
    phone: "+44 20 7946 0214",
    status: "submitted",
    statusDetail: "Reference submitted 2 days ago",
  },
  {
    id: "rachel",
    name: "Rachel Green",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=320&q=80",
    capacity: "Direct Line Manager · 3 years",
    jobTitle: "Principal · Bloomsbury Tutors",
    email: "rachel.green@bloomsbury.co.uk",
    phone: "+44 20 7946 0118",
    status: "pending",
    statusDetail: "Awaiting response · Reminder sent 3d ago",
  },
];

function ComparisonTag({ 
  type, 
  candidateValue 
}: { 
  type: "match" | "partial", 
  candidateValue?: string 
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const config = {
    match: {
      label: "Match",
      icon: <Check className="size-2.5" />,
      className: "text-emerald-600 bg-emerald-50 ring-emerald-100/50",
      accent: "text-emerald-400"
    },
    partial: {
      label: "Partial",
      icon: <Zap className="size-2.5" />,
      className: "text-amber-600 bg-amber-50 ring-amber-100/50",
      accent: "text-amber-400"
    },
    conflict: {
      label: "Conflict",
      icon: <AlertCircle className="size-2.5" />,
      className: "text-rose-600 bg-rose-50 ring-rose-100/50",
      accent: "text-rose-400"
    }
  }[type as "match" | "partial" | "conflict"];

  return (
    <div className="relative inline-flex items-center">
      <div className={`flex items-center gap-1.5 h-5 px-2 rounded-full ring-1 transition-all duration-200 ${config.className}`}>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
          {config.icon}
          {config.label}
        </div>
        
        {candidateValue && (
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pl-1.5 border-l border-current/20 cursor-help transition-opacity hover:opacity-100 opacity-60"
          >
            <Info className="size-2.5" />
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isHovered && candidateValue && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap"
          >
            <div className="bg-neutral-900 text-white text-[11px] px-3.5 py-2.5 rounded-xl shadow-2xl font-medium flex flex-col gap-1 ring-1 ring-white/10 min-w-[140px]">
              <span className={`${config.accent} uppercase text-[9px] tracking-widest font-bold`}>Candidate Stated</span>
              <span className="text-white text-[12px] leading-tight">{candidateValue}</span>
            </div>
            <div className="w-2.5 h-2.5 bg-neutral-900 rotate-45 absolute -bottom-1.25 left-1/2 -translate-x-1/2 ring-r ring-b ring-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPill({ status, detail }: { status: Status; detail: string }) {
  if (status === "escalated") {
    return (
      <div className="inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2.5 rounded-full bg-indigo-50 ring-1 ring-indigo-100">
        <span className="size-3.5 rounded-full bg-indigo-500 flex items-center justify-center">
          <ShieldAlert className="size-2 text-white" strokeWidth={3.5} />
        </span>
        <span className="text-[11px] font-medium text-indigo-700">Referral pending review</span>
      </div>
    );
  }
  if (status === "approved") {
    return (
      <div className="inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2.5 rounded-full bg-[#F1F5F9] ring-1 ring-[#E2E8F0]">
        <span className="size-3.5 rounded-full bg-[#405985] flex items-center justify-center">
          <Check className="size-2 text-white" strokeWidth={4} />
        </span>
        <span className="text-[11px] font-medium text-[#405985]">Reference approved</span>
      </div>
    );
  }
  if (status === "submitted") {
    return (
      <div className="inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2.5 rounded-full bg-emerald-50 ring-1 ring-emerald-100">
        <span className="size-3.5 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="size-2 text-white" strokeWidth={4} />
        </span>
        <span className="text-[11px] font-medium text-emerald-700">{detail}</span>
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2.5 rounded-full bg-amber-50 ring-1 ring-amber-100">
      <span className="size-3.5 rounded-full bg-amber-500 flex items-center justify-center">
        <Clock className="size-2 text-white" strokeWidth={3.5} />
      </span>
      <span className="text-[11px] font-medium text-amber-700">{detail}</span>
    </div>
  );
}

function AutomatedRemindersPopup({ isOpen, onClose, refereeName }: { isOpen: boolean; onClose: () => void; refereeName: string }) {
  const [autoRemindersEnabled, setAutoRemindersEnabled] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-neutral-900/15 backdrop-blur-[2px] z-50"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-white rounded-2xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] ring-1 ring-neutral-200/80 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 pb-2">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] text-neutral-900 font-semibold">Reminder settings</h3>
                <button
                  onClick={onClose}
                  className="size-8 -mr-2 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <X className="size-4" strokeWidth={2} />
                </button>
              </div>
              <p className="text-[13px] text-neutral-500 -mt-0.5">Manage follow-ups for {refereeName}</p>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 mt-4 space-y-6">
              {/* Automated reminders setting */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[14px] text-neutral-900 font-medium">Automated follow-ups</div>
                  <div className="text-[13px] text-neutral-500 mt-0.5 leading-relaxed pr-4">
                    Send emails every 3 days until the reference is submitted.
                  </div>
                  <AnimatePresence>
                    {autoRemindersEnabled && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] bg-blue-50/80 text-blue-800 text-[12px] font-medium ring-1 ring-blue-100/50">
                          <Clock className="size-3.5" />
                          Next: 26 May at 9:00 AM
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Switch.Root
                  checked={autoRemindersEnabled}
                  onCheckedChange={setAutoRemindersEnabled}
                  className="w-11 h-6 shrink-0 flex items-center bg-neutral-200 rounded-full data-[state=checked]:bg-[#405985] outline-none cursor-pointer transition-colors px-0.5 shadow-inner mt-0.5"
                >
                  <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-200 will-change-transform data-[state=checked]:translate-x-[20px] shadow-[0_1px_2px_rgba(0,0,0,0.15)]" />
                </Switch.Root>
              </div>

              {/* Manual Reminder Button */}
              <div className="pt-2">
                <button className="w-full group relative h-11 px-4 rounded-[10px] text-[13.5px] font-medium text-neutral-700 bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 hover:bg-neutral-50 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between overflow-hidden">
                  <span className="flex items-center gap-2.5">
                    <Send className="size-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" strokeWidth={2} />
                    Send immediate reminder
                  </span>
                  <ArrowRight className="size-4 text-neutral-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-neutral-50/60 border-t border-neutral-100/80">
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-[10px] text-[13px] font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onClose}
                className="h-9 px-4 rounded-[10px] text-[13px] font-medium text-white bg-[#405985] hover:bg-[#34496e] shadow-[0_1px_2px_rgba(64,89,133,0.3)] transition-all"
              >
                Save
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function RefereeReviewDialog({
  isOpen,
  onClose,
  referee,
  onApprove,
}: {
  isOpen: boolean;
  onClose: () => void;
  referee: Referee;
  onApprove: () => void;
}) {
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = () => {
    setIsApproving(true);
    // Simulate a brief delay for a "premium" feel
    setTimeout(() => {
      onApprove();
      setIsApproving(false);
      onClose();
    }, 800);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-[4px] z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] max-h-[85vh] bg-white rounded-[20px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-neutral-200/80 z-50 overflow-hidden flex flex-col focus:outline-none"
              >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-100 px-8 py-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-[#405985]/5 flex items-center justify-center text-[#405985]">
                      <FileText className="size-5" />
                    </div>
                    <div>
                      <Dialog.Title className="text-[17px] font-semibold text-neutral-900">
                        Review Reference
                      </Dialog.Title>
                      <Dialog.Description className="text-[13px] text-neutral-500">
                        Submitted by {referee.name}
                      </Dialog.Description>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      className="h-9 px-3 rounded-[10px] bg-white text-[#405985] ring-1 ring-neutral-200 hover:ring-[#405985]/30 hover:bg-neutral-50 flex items-center justify-center gap-2 transition-all shadow-sm group"
                      title="Edit reference information"
                    >
                      <Pencil className="size-3.5 group-hover:scale-110 transition-transform" strokeWidth={2} />
                      <span className="text-[13px] font-medium">Edit</span>
                    </button>
                    <div className="w-px h-4 bg-neutral-200" />
                    <Dialog.Close asChild>
                      <button className="size-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                        <X className="size-4" />
                      </button>
                    </Dialog.Close>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin">
                  {/* Verification Assistance Banner */}
                  <div className="px-8 pt-6">
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-[10px] bg-indigo-50/50 ring-1 ring-indigo-100/50">
                      <div className="flex items-center gap-2.5">
                        <div className="size-5 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Sparkles className="size-3 text-indigo-600" />
                        </div>
                        <span className="text-[12.5px] font-medium text-indigo-900 whitespace-nowrap">Verification Summary:</span>
                        <span className="text-[12.5px] text-indigo-700/80 whitespace-nowrap">3 data points match candidate submission, 1 conflict detected.</span>
                      </div>

                    </div>
                  </div>

                  {/* Referee Personal Details */}
                  <section className="px-8 py-7">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-6 rounded-md bg-neutral-100 flex items-center justify-center">
                        <User className="size-3.5 text-neutral-500" />
                      </div>
                      <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                        Referee Information
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Full Name</div>
                        <div className="text-[14.5px] text-neutral-900 mt-1 font-medium">{referee.name}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Job Title</div>
                        <div className="text-[14.5px] text-neutral-900 mt-1 font-medium">{referee.jobTitle.split(' · ')[0]}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium flex items-center gap-1.5">
                          Organization
                          <ComparisonTag type="match" candidateValue="St Andrew's College" />
                        </div>
                        <div className="text-[14.5px] text-neutral-900 mt-1 font-medium">{referee.jobTitle.split(' · ')[1] || "St Andrew's College"}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Email Address</div>
                        <div className="text-[14.5px] text-neutral-900 mt-1 font-medium">{referee.email}</div>
                      </div>
                      <div>
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Phone Number</div>
                        <div className="text-[14.5px] text-neutral-900 mt-1 font-medium">{referee.phone}</div>
                      </div>
                    </div>
                  </section>

                  {/* Faded Divider */}
                  <div className="px-8">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                  </div>

                  {/* Relationship & Capacity */}
                  <section className="px-8 py-7">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-6 rounded-md bg-neutral-100 flex items-center justify-center">
                        <Settings className="size-3.5 text-neutral-500" />
                      </div>
                      <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                        Relationship Details
                      </h4>
                    </div>
                    <div className="rounded-[10px] bg-neutral-50/50 p-5 ring-1 ring-neutral-200/50 space-y-6">
                      <div className="grid grid-cols-2 gap-10">
                        <div>
                          <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium flex items-center gap-1.5 mb-1.5">
                            In what capacity?
                            <ComparisonTag type="match" candidateValue="Former Head of Department" />
                          </div>
                          <div className="text-[14px] text-neutral-800 font-semibold">{referee.capacity}</div>
                        </div>
                        
                        <div>
                          <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium flex items-center gap-1.5 mb-1.5">
                            Duration known
                            <ComparisonTag type="conflict" candidateValue="6 years" />
                          </div>
                          <div className="text-[14px] text-neutral-800 font-semibold">4 years, 2 months</div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-neutral-100/80">
                        <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium flex items-center gap-1.5 mb-1.5">
                          Still working together?
                          <ComparisonTag type="match" candidateValue="Left in July 2024" />
                        </div>
                        <div className="text-[14px] text-neutral-800 font-semibold">No, ended in July 2024</div>
                      </div>
                    </div>
                  </section>

                  {/* Faded Divider */}
                  <div className="px-8">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
                  </div>

                  {/* Assessment Questions */}
                  <section className="px-8 py-7">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="size-6 rounded-md bg-neutral-100 flex items-center justify-center">
                        <HelpCircle className="size-3.5 text-neutral-500" />
                      </div>
                      <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-neutral-400">
                        Applicant Details
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          q: "Would you recommend this applicant for a tutoring role?",
                          a: "Yes, without any reservations.",
                          icon: <Check className="size-3.5 text-emerald-500" />,
                          bg: "bg-emerald-50/50",
                        },
                        {
                          q: "Integrity and Honesty",
                          a: "Highly trustworthy and professional.",
                          rating: 5,
                        },
                        {
                          q: "Timekeeping and Attendance",
                          a: "Exceptional. Always prepared and on time.",
                          rating: 5,
                        },
                        {
                          q: "Any reason why they should not work with children?",
                          a: "No concerns. Fully suited for this environment.",
                          icon: <Check className="size-3.5 text-blue-500" />,
                          bg: "bg-blue-50/50",
                        },
                        {
                          q: "Any history of disciplinary proceedings?",
                          a: "None whatsoever.",
                          icon: <AlertCircle className="size-3.5 text-neutral-400" />,
                        },
                        {
                          q: "Would you be happy to re-employ the applicant?",
                          a: "Yes, we would welcome him back immediately.",
                          icon: <Check className="size-3.5 text-[#405985]" />,
                          match: "match",
                          candidateValue: "Eligible for re-hire"
                        },
                        {
                          q: "Further comments regarding their suitability?",
                          a: "Matthew is an outstanding educator with a unique ability to engage students. One of our most reliable tutors.",
                        },
                      ].map((item, i) => (
                        <div key={i} className="p-4 rounded-[10px] ring-1 bg-white ring-neutral-100 transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-[12px] text-neutral-400 font-medium uppercase tracking-wide">{item.q}</div>
                            {item.match && (
                              <ComparisonTag 
                                type={item.match as "match" | "partial"} 
                                candidateValue={item.candidateValue} 
                              />
                            )}
                          </div>
                          <div className="flex items-start gap-3">
                            {item.icon && <div className="mt-0.5 shrink-0">{item.icon}</div>}
                            <div className="flex-1 min-w-0">
                              <div className="text-[14.5px] text-neutral-900 font-semibold leading-relaxed">{item.a}</div>
                              {item.rating && (
                                <div className="flex items-center gap-1 mt-2.5">
                                  {[...Array(5)].map((_, j) => (
                                    <Star
                                      key={j}
                                      className={`size-3 ${j < item.rating ? "text-amber-400 fill-amber-400" : "text-neutral-200"}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-neutral-50/80 backdrop-blur-md border-t border-neutral-100 px-8 py-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4 text-[12px] text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      Received May 21
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="h-10 px-4 rounded-[10px] text-[13px] font-medium text-neutral-700 bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 hover:bg-neutral-50 transition-all shadow-sm">
                      Request Correction
                    </button>
                    
                    <button
                      onClick={handleApprove}
                      disabled={isApproving}
                      className="h-10 px-6 rounded-[10px] text-[13px] font-medium text-white bg-[#405985] hover:bg-[#34496e] shadow-[0_4px_12px_-4px_rgba(64,89,133,0.4)] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isApproving ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="size-3.5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Approving...
                        </>
                      ) : (
                        <>
                          Approve Reference
                          <ArrowRight className="size-4" strokeWidth={2} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function PendingApproveDialog({
  isOpen,
  onClose,
  referee,
  onApprove,
}: {
  isOpen: boolean;
  onClose: () => void;
  referee: Referee;
  onApprove: () => void;
}) {
  const [step, setStep] = useState<"options" | "upload">("options");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setFile({ name: "reference_email_screenshot.png", size: "1.2 MB" });
    }, 1200);
  };

  const handleFinalApprove = () => {
    onApprove();
    onClose();
  };

  const resetAndClose = () => {
    setStep("options");
    setFile(null);
    setSelectedSource(null);
    onClose();
  };

  const SOURCES = [
    { id: 'email', label: 'Direct Email', icon: Mail, description: 'Screenshot or forwarded email' },
    { id: 'pdf', label: 'PDF Document', icon: FileText, description: 'Formal reference letter' },
    { id: 'phone', label: 'Phone Call', icon: Phone, description: 'Verbal confirmation log' },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, description: 'Chat export or screenshot' },
  ];

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-neutral-900/40 backdrop-blur-[4px] z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] bg-white rounded-[20px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] ring-1 ring-neutral-200/80 z-50 overflow-hidden focus:outline-none"
              >
                {/* Header */}
                <div className="px-8 py-6 border-b border-neutral-100 flex items-center justify-between">
                  <div>
                    <Dialog.Title className="text-[17px] font-semibold text-neutral-900">
                      Approve Reference
                    </Dialog.Title>
                    <Dialog.Description className="text-[13px] text-neutral-500">
                      Choose how you'd like to verify {referee.name}'s reference
                    </Dialog.Description>
                  </div>
                  <Dialog.Close asChild>
                    <button className="size-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-600 transition-colors">
                      <X className="size-4" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {step === "options" ? (
                      <motion.div
                        key="options"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-4"
                      >
                        <button
                          onClick={() => setStep("upload")}
                          className="w-full group p-5 rounded-[16px] bg-white ring-1 ring-neutral-200 hover:ring-[#405985] hover:bg-[#405985]/[0.02] transition-all text-left flex items-start gap-4"
                        >
                          <div className="size-11 rounded-xl bg-blue-50 flex items-center justify-center text-[#405985] shrink-0 group-hover:scale-105 transition-transform">
                            <FileUp className="size-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] font-semibold text-neutral-900">Upload evidence</div>
                            <div className="text-[13px] text-neutral-500 mt-0.5 leading-relaxed">
                              Attach an email screenshot or PDF provided by the referee to approve immediately.
                            </div>
                          </div>
                          <ArrowRight className="size-4 text-neutral-300 group-hover:text-[#405985] group-hover:translate-x-1 transition-all mt-1" />
                        </button>

                        <button className="w-full group p-5 rounded-[16px] bg-white ring-1 ring-neutral-200 hover:ring-[#405985] hover:bg-[#405985]/[0.02] transition-all text-left flex items-start gap-4">
                          <div className="size-11 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-105 transition-transform">
                            <FormInput className="size-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] font-semibold text-neutral-900">Fill manually</div>
                            <div className="text-[13px] text-neutral-500 mt-0.5 leading-relaxed">
                              Manually input the reference details on behalf of the referee.
                            </div>
                          </div>
                          <ArrowRight className="size-4 text-neutral-300 group-hover:text-[#405985] group-hover:translate-x-1 transition-all mt-1" />
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        <button
                          onClick={() => setStep("options")}
                          className="flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-neutral-900 transition-colors mb-2"
                        >
                          <ArrowRight className="size-3 rotate-180" />
                          Back to options
                        </button>

                        {!file ? (
                          <div
                            onClick={handleUpload}
                            className="relative group border-2 border-dashed border-neutral-200 rounded-[16px] p-10 flex flex-col items-center justify-center bg-neutral-50/50 hover:bg-white hover:border-[#405985]/30 cursor-pointer transition-all"
                          >
                            <div className="size-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              {isUploading ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                  className="size-5 border-2 border-[#405985]/20 border-t-[#405985] rounded-full"
                                />
                              ) : (
                                <Upload className="size-5 text-[#405985]" />
                              )}
                            </div>
                            <div className="text-center">
                              <div className="text-[14px] font-medium text-neutral-900">
                                {isUploading ? "Uploading..." : "Click to upload evidence"}
                              </div>
                              <p className="text-[12px] text-neutral-500 mt-1">
                                Supports PNG, JPG, or PDF (max 10MB)
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-5">
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="p-4 rounded-[12px] bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-white flex items-center justify-center text-emerald-600 shadow-sm">
                                  <FileText className="size-5" />
                                </div>
                                <div>
                                  <div className="text-[13.5px] font-medium text-emerald-900">{file.name}</div>
                                  <div className="text-[11px] text-emerald-600/70">{file.size} • Uploaded just now</div>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setFile(null);
                                  setSelectedSource(null);
                                }}
                                className="size-8 rounded-full hover:bg-emerald-100 flex items-center justify-center text-emerald-600 transition-colors"
                              >
                                <X className="size-4" />
                              </button>
                            </motion.div>

                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-3"
                            >
                              <div className="text-[13px] font-semibold text-neutral-900 px-1">Evidence Source</div>
                              <div className="grid grid-cols-2 gap-2.5">
                                {SOURCES.map((source) => {
                                  const Icon = source.icon;
                                  const isSelected = selectedSource === source.id;
                                  return (
                                    <button
                                      key={source.id}
                                      onClick={() => setSelectedSource(source.id)}
                                      className={`p-3 rounded-[12px] text-left transition-all border flex items-center gap-3 ${
                                        isSelected 
                                          ? "bg-[#405985]/[0.03] border-[#405985] ring-1 ring-[#405985]" 
                                          : "bg-white border-neutral-200 hover:border-neutral-300"
                                      }`}
                                    >
                                      <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                        isSelected ? "bg-[#405985] text-white" : "bg-neutral-100 text-neutral-500"
                                      }`}>
                                        <Icon className="size-4" />
                                      </div>
                                      <div className="min-w-0">
                                        <div className={`text-[13px] font-medium truncate ${isSelected ? "text-[#405985]" : "text-neutral-900"}`}>
                                          {source.label}
                                        </div>
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          </div>
                        )}

                        <div className="flex items-start gap-3 p-3.5 rounded-[12px] bg-amber-50/50 ring-1 ring-amber-100/50">
                          <AlertCircle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                          <p className="text-[12px] text-amber-800 leading-relaxed">
                            I confirm that the referee has provided consent and the evidence accurately matches the candidate's profile.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between">
                  <button
                    onClick={resetAndClose}
                    className="h-10 px-4 rounded-[10px] text-[13px] font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleFinalApprove}
                      disabled={!file || !selectedSource}
                      className="h-10 px-6 rounded-[10px] text-[13px] font-medium text-white bg-[#405985] hover:bg-[#34496e] shadow-[0_4px_12px_-4px_rgba(64,89,133,0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Complete Approval
                      <Check className="size-4" strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function RefereeCard({
  referee,
  index,
  onApprove,
  onRevoke,
}: {
  referee: Referee;
  index: number;
  onApprove: (id: string) => void;
  onRevoke: (id: string) => void;
}) {
  const isSubmitted = referee.status === "submitted";
  const isApproved = referee.status === "approved";
  const accent = isApproved
    ? "from-[#405985]/10"
    : isSubmitted
    ? "from-emerald-200/60"
    : "from-amber-200/60";
  const [showRemindersPopup, setShowRemindersPopup] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showPendingDialog, setShowPendingDialog] = useState(false);
  const [showEscalateTooltip, setShowEscalateTooltip] = useState(false);
  const [showDeleteTooltip, setShowDeleteTooltip] = useState(false);
  const [showRemindersTooltip, setShowRemindersTooltip] = useState(false);

  const handleApprove = () => {
    onApprove(referee.id);
  };

  return (
    <>
      <AutomatedRemindersPopup
        isOpen={showRemindersPopup}
        onClose={() => setShowRemindersPopup(false)}
        refereeName={referee.name}
      />

      <RefereeReviewDialog
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        referee={referee}
        onApprove={handleApprove}
      />

      <PendingApproveDialog
        isOpen={showPendingDialog}
        onClose={() => setShowPendingDialog(false)}
        referee={referee}
        onApprove={handleApprove}
      />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, delay: index * 0.05, ease: [0.32, 0.72, 0, 1] }}
        className="group relative rounded-[10px] bg-white ring-1 ring-neutral-200/70 shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_8px_24px_-12px_rgba(16,24,40,0.12)] hover:ring-neutral-300/70 transition-all overflow-hidden"
      >
        {/* Accent gradient strip */}
        <div
          className={`absolute inset-x-0 top-0 h-[88px] bg-gradient-to-b ${accent} to-transparent pointer-events-none transition-colors duration-500`}
        />

        <div className="relative p-5">
          {/* Header: avatar + name + status */}
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <div className="size-14 rounded-full bg-white p-0.5 ring-1 ring-neutral-200/80 shadow-[0_2px_6px_rgba(16,24,40,0.08)]">
                <ImageWithFallback
                  src={referee.avatar}
                  alt={referee.name}
                  className="size-full rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 pt-0.5">
              <div className="min-w-0">
                <div className="text-[14.5px] text-neutral-900 font-semibold leading-tight truncate">
                  {referee.name}
                </div>
                <div className="text-[11.5px] text-neutral-500 mt-0.5 truncate">{referee.capacity}</div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4 flex flex-col gap-2">
            <StatusPill status={referee.status} detail={referee.statusDetail} />
            {isApproved && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 px-1"
              >
                <div className="size-1 rounded-full bg-neutral-300" />
                <div className="text-[11px] text-neutral-500 leading-none">
                  Approved by <span className="font-semibold text-neutral-800">{referee.approvedBy || "Alex Rivers"}</span> on {referee.approvedAt || "23 May 2026 at 10:45"}
                </div>
              </motion.div>
            )}
          </div>

          {/* Meta details */}
          <div className="mt-4 rounded-[10px] bg-neutral-50/70 ring-1 ring-neutral-100 divide-y divide-neutral-100/80">
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <Briefcase className="size-3.5 text-neutral-400 shrink-0" strokeWidth={1.8} />
              <span className="text-[12px] text-neutral-700 truncate">{referee.jobTitle}</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <Mail className="size-3.5 text-neutral-400 shrink-0" strokeWidth={1.8} />
              <span className="text-[12px] text-neutral-700 truncate">{referee.email}</span>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5">
              <Phone className="size-3.5 text-neutral-400 shrink-0" strokeWidth={1.8} />
              <span className="text-[12px] text-neutral-700 truncate">{referee.phone}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-end gap-2">
            <div className="relative">
              <button
                onMouseEnter={() => setShowDeleteTooltip(true)}
                onMouseLeave={() => setShowDeleteTooltip(false)}
                className="size-9 rounded-[10px] text-neutral-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all group/delete"
              >
                <Trash2 className="size-3.5" strokeWidth={1.8} />
              </button>

              <AnimatePresence>
                {showDeleteTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap pointer-events-none"
                  >
                    <div className="bg-neutral-900 text-white text-[11px] px-3 py-2 rounded-lg shadow-2xl font-medium ring-1 ring-white/10">
                      Delete referee
                    </div>
                    <div className="w-2 h-2 bg-neutral-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {!isApproved && referee.id !== "rachel" && (
              <div className="relative">
                <button
                  onMouseEnter={() => setShowEscalateTooltip(true)}
                  onMouseLeave={() => setShowEscalateTooltip(false)}
                  className="size-9 rounded-[10px] text-neutral-400 hover:text-[#405985] hover:bg-[#405985]/[0.08] flex items-center justify-center transition-all group/escalate"
                >
                  <ArrowUpRight className="size-4 group-hover/escalate:-translate-y-0.5 group-hover/escalate:translate-x-0.5 transition-transform" strokeWidth={1.8} />
                </button>

                <AnimatePresence>
                  {showEscalateTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap pointer-events-none"
                    >
                      <div className="bg-neutral-900 text-white text-[11px] px-3 py-2 rounded-lg shadow-2xl font-medium ring-1 ring-white/10">
                        Escalate for senior review
                      </div>
                      <div className="w-2 h-2 bg-neutral-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            {isApproved ? (
              <div className="flex items-center gap-2">
                <div className="h-9 px-2.5 flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 bg-emerald-50 rounded-[10px] ring-1 ring-emerald-200/50">
                  <Check className="size-3.5" strokeWidth={2.5} />
                  <span>Approved</span>
                </div>
                <button
                  onClick={() => onRevoke(referee.id)}
                  className="h-9 px-3 rounded-[10px] text-[12px] font-semibold text-neutral-500 hover:text-red-600 hover:bg-red-50 hover:ring-red-200 border border-neutral-200 hover:border-red-200 transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Revoke</span>
                </button>
              </div>
            ) : isSubmitted ? (
              <button
                onClick={() => setShowReviewDialog(true)}
                className="group/btn h-9 px-3 rounded-[10px] text-[12.5px] font-medium text-[#405985] bg-[#405985]/[0.12] hover:bg-[#405985]/[0.18] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
              >
                Review & approve
                <ArrowRight
                  className="size-3.5 transition-transform group-hover/btn:translate-x-0.5"
                  strokeWidth={2.2}
                />
              </button>
            ) : (
              <>
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowRemindersTooltip(true)}
                    onMouseLeave={() => setShowRemindersTooltip(false)}
                    onClick={() => setShowRemindersPopup(true)}
                    className="size-9 rounded-[10px] bg-white ring-1 ring-neutral-200 hover:ring-neutral-300 hover:bg-neutral-50 text-neutral-600 hover:text-[#405985] flex items-center justify-center transition-all"
                  >
                    <Bell className="size-3.5" strokeWidth={1.8} />
                  </button>

                  <AnimatePresence>
                    {showRemindersTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap pointer-events-none"
                      >
                        <div className="bg-neutral-900 text-white text-[11px] px-3 py-2 rounded-lg shadow-2xl font-medium ring-1 ring-white/10">
                          Manage reminders
                        </div>
                        <div className="w-2 h-2 bg-neutral-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={() => setShowPendingDialog(true)}
                  className="group/btn h-9 w-[145px] px-3 rounded-[10px] text-[12.5px] font-medium text-[#405985] bg-[#405985]/[0.12] hover:bg-[#405985]/[0.18] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  Approve
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover/btn:translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function RefereeCards() {
  const [referees, setReferees] = useState(REFEREES);

  const handleApprove = (id: string) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setReferees((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "approved" as Status,
              approvedBy: "Alex Rivers",
              approvedAt: `${formattedDate} at ${formattedTime}`,
            }
          : r
      )
    );
  };

  const handleRevoke = (id: string) => {
    const initial = REFEREES.find((item) => item.id === id);
    if (!initial) return;

    setReferees((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: initial.status,
              statusDetail: initial.statusDetail,
              approvedBy: undefined,
              approvedAt: undefined,
            }
          : r
      )
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-2">
          <h3 className="text-[13.5px] text-neutral-900 font-semibold">Referees</h3>
          <span className="text-[11.5px] text-neutral-400">
            {referees.filter(r => r.status === "submitted").length} submitted by candidate
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {referees.map((r, i) => (
          <RefereeCard
            key={r.id}
            referee={r}
            index={i}
            onApprove={handleApprove}
            onRevoke={handleRevoke}
          />
        ))}
      </div>
    </div>
  );
}
