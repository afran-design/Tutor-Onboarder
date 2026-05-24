import { useState } from "react";
import { SidebarNav } from "./components/sidebar-nav";
import { CandidateHeader } from "./components/candidate-header";
import { VerificationNav } from "./components/verification-nav";
import { ReviewPanel } from "./components/review-panel";
import { VerificationProgress } from "./components/verification-progress";

export default function App() {
  const [activeCheck, setActiveCheck] = useState("refs");

  return (
    <div className="w-full max-w-[1440px] h-full min-h-screen flex bg-white text-neutral-900 antialiased [font-feature-settings:'cv11','ss01'] mx-auto">
      <SidebarNav />

      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <CandidateHeader />

        <div className="flex-1 min-h-0 bg-[#F7F6F2] p-5 pt-4 flex flex-col gap-4 overflow-hidden">
          <VerificationProgress />

          <div className="flex-1 min-h-0 rounded-[16px] bg-white ring-1 ring-neutral-900/[0.03] shadow-[0_8px_24px_-12px_rgba(16,40,30,0.12),0_2px_6px_-2px_rgba(16,40,30,0.06)] overflow-hidden flex">
            <VerificationNav activeId={activeCheck} onSelect={setActiveCheck} />
            <ReviewPanel activeId={activeCheck} />
          </div>
        </div>
      </div>
    </div>
  );
}
