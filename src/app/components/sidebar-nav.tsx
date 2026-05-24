import { LayoutDashboard, MessageSquare, Bell, Briefcase, Users, Settings, Cog, LogOut, ChevronRight, GraduationCap } from "lucide-react";
import { useState } from "react";

type Item = { id: string; label: string; icon?: any; children?: Item[] };

const NAV: Item[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "recruitment", label: "Recruitment", icon: Briefcase },
  {
    id: "tutors",
    label: "My Tutors",
    icon: Users,
    children: [
      { id: "scr", label: "SCR" },
      { id: "list", label: "List" },
    ],
  },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "system", label: "System", icon: Cog },
];

export function SidebarNav() {
  const [active, setActive] = useState("list");
  const [openGroup, setOpenGroup] = useState<string | null>("tutors");

  return (
    <aside className="w-[244px] shrink-0 h-screen border-r border-neutral-200/70 bg-neutral-50/40 flex flex-col">
      <div className="px-5 pt-6 pb-5 flex items-center gap-2.5">
        <div className="size-8 rounded-lg bg-[#405985] flex items-center justify-center shadow-sm">
          <GraduationCap className="size-[18px] text-white" strokeWidth={2.2} />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[13.5px] font-semibold text-neutral-900 tracking-tight">Tutor Onboarder</span>
          
        </div>
      </div>

      <nav className="px-2.5 flex-1 overflow-y-auto">
        
        <ul className="space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id && !item.children;
            const hasChildren = !!item.children;
            const isGroupOpen = openGroup === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      setOpenGroup(isGroupOpen ? null : item.id);
                    } else {
                      setActive(item.id);
                    }
                  }}
                  className={`group w-full flex items-center gap-2.5 px-3 h-9 rounded-md text-[13px] transition-all duration-150 relative ${
                    isActive
                      ? "bg-white text-neutral-900 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_0_0_1px_rgba(16,24,40,0.05)]"
                      : "text-neutral-600 hover:bg-white/70 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[2.5px] rounded-full bg-[#405985]" />
                  )}
                  {Icon && <Icon className={`size-[16px] ${isActive ? "text-[#405985]" : "text-neutral-500 group-hover:text-neutral-700"}`} strokeWidth={1.8} />}
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasChildren && (
                    <ChevronRight className={`size-3.5 text-neutral-400 transition-transform duration-200 ${isGroupOpen ? "rotate-90" : ""}`} />
                  )}
                </button>
                {hasChildren && isGroupOpen && (
                  <ul className="mt-0.5 ml-[26px] pl-3 border-l border-neutral-200/80 space-y-0.5">
                    {item.children!.map((c) => {
                      const cActive = active === c.id;
                      return (
                        <li key={c.id}>
                          <button
                            onClick={() => setActive(c.id)}
                            className={`w-full flex items-center justify-between px-2.5 h-8 rounded-md text-[12.5px] transition-all duration-150 ${
                              cActive
                                ? "bg-[#405985]/[0.06] text-[#405985] font-medium"
                                : "text-neutral-500 hover:bg-neutral-100/70 hover:text-neutral-800"
                            }`}
                          >
                            <span>{c.label}</span>
                            {c.id === "list" && (
                              <span className={`text-[10.5px] tabular-nums ${cActive ? "text-[#405985]/70" : "text-neutral-400"}`}>248</span>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-2.5 pb-4 pt-2 border-t border-neutral-200/70">
        
        <div className="mt-3 flex items-center gap-2.5 px-2 py-2 rounded-md hover:bg-neutral-100/70 transition-colors cursor-pointer">
          <div className="size-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[11px] font-medium">
            EM
          </div>
          <div className="flex-1 leading-tight min-w-0">
            <div className="text-[12px] text-neutral-800 font-medium truncate">Elena Martinez</div>
            <div className="text-[10.5px] text-neutral-500 truncate">Admin · HR</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
