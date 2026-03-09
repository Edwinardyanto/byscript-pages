import { useState, useMemo } from "react";
import courseData from "./data/courseData";
import { useProgress } from "./hooks/useProgress";
import { Sidebar } from "./components/Sidebar";
import { AITutorButton, AITutorModal } from "./components/AITutor";
import { Dashboard } from "./pages/Dashboard";
import { ModulePage } from "./pages/ModulePage";
import { LessonPage } from "./pages/LessonPage";
import { Menu, X } from "lucide-react";

export default function App() {
  const [view, setView] = useState("dashboard"); // dashboard | module | lesson
  const [activeId, setActiveId] = useState(null); // moduleId or lessonId
  const [aiOpen, setAiOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    markComplete, markIncomplete, isComplete,
    overallPercent, completedCount, totalLessons,
    moduleStats, nextLesson,
  } = useProgress(courseData);

  const allLessons = useMemo(
    () => courseData.modules.flatMap((m) => m.lessons),
    []
  );

  const activeLesson = useMemo(
    () => allLessons.find((l) => l.id === activeId) || null,
    [allLessons, activeId]
  );

  const activeModule = useMemo(
    () => courseData.modules.find((m) => m.id === activeId) || null,
    [activeId]
  );

  const activeModuleForLesson = useMemo(() => {
    if (!activeLesson) return null;
    return courseData.modules.find((m) => m.id === activeLesson.module_id) || null;
  }, [activeLesson]);

  const activeModuleStats = useMemo(() => {
    if (!activeModule) return null;
    const idx = courseData.modules.findIndex((m) => m.id === activeId);
    return moduleStats[idx] || null;
  }, [activeModule, activeId, moduleStats]);

  const navigate = (targetView, id = null) => {
    setView(targetView);
    setActiveId(id);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moduleClickHandler = (moduleId) => {
    navigate("module", moduleId);
  };

  const currentLessonIdForSidebar =
    view === "lesson" ? activeId : view === "module" ? activeId : null;

  return (
    <>
      <style>{CSS}</style>
      <div className="app-layout">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <div className={`sidebar-wrapper ${sidebarOpen ? "sidebar-wrapper--open" : ""}`}>
          <Sidebar
            courseData={courseData}
            currentLessonId={currentLessonIdForSidebar}
            progress={{}}
            isComplete={isComplete}
            onNavigate={navigate}
            onModuleClick={moduleClickHandler}
            currentView={view}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Main content */}
        <div className="main-wrapper">
          {/* Mobile header */}
          <header className="mobile-header">
            <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="mobile-brand">byScript <span>Academy</span></div>
          </header>

          {/* Page content */}
          <div className="page-content">
            {view === "dashboard" && (
              <Dashboard
                courseData={courseData}
                overallPercent={overallPercent}
                completedCount={completedCount}
                totalLessons={totalLessons}
                moduleStats={moduleStats}
                nextLesson={nextLesson}
                onNavigate={navigate}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}
            {view === "module" && activeModule && (
              <ModulePage
                module={activeModule}
                moduleStats={activeModuleStats}
                isComplete={isComplete}
                onNavigate={navigate}
              />
            )}
            {view === "lesson" && activeLesson && (
              <LessonPage
                lesson={activeLesson}
                module={activeModuleForLesson}
                allLessons={allLessons}
                isComplete={isComplete}
                markComplete={markComplete}
                markIncomplete={markIncomplete}
                onNavigate={navigate}
              />
            )}
          </div>
        </div>

        {/* AI Tutor FAB */}
        <AITutorButton onClick={() => setAiOpen(true)} />

        {/* AI Tutor Modal */}
        {aiOpen && <AITutorModal onClose={() => setAiOpen(false)} />}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// DESIGN SYSTEM & CSS
// Dark premium fintech/edtech aesthetic
// Font: Syne (display) + DM Sans (body)
// Accent: #22c55e (green) — byScript brand
// ─────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0c0f;
  --bg-1: #0f1215;
  --bg-2: #141820;
  --bg-3: #1a1f28;
  --bg-4: #202633;
  --border: rgba(255,255,255,0.06);
  --border-2: rgba(255,255,255,0.10);
  --text-1: #f0f2f5;
  --text-2: #8b95a8;
  --text-3: #556070;
  --accent: #22c55e;
  --accent-dim: rgba(34,197,94,0.12);
  --accent-border: rgba(34,197,94,0.25);
  --accent-glow: rgba(34,197,94,0.08);
  --red: #ef4444;
  --sidebar-w: 280px;
  --radius: 10px;
  --radius-lg: 14px;
  font-family: 'DM Sans', sans-serif;
}

html { font-size: 15px; scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text-1);
  min-height: 100vh;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button { cursor: pointer; border: none; background: none; font-family: inherit; color: inherit; }
input { font-family: inherit; }

/* ── LAYOUT ─────────────────────────────── */
.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.sidebar-wrapper {
  width: var(--sidebar-w);
  min-height: 100vh;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.main-wrapper {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 0;
}

/* ── SIDEBAR ─────────────────────────────── */
.sidebar {
  width: var(--sidebar-w);
  height: 100vh;
  background: var(--bg-1);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 18px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.brand-icon {
  width: 36px; height: 36px;
  background: var(--accent);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 11px;
  color: #000;
  flex-shrink: 0;
}

.brand-name {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15px;
  color: var(--text-1);
  line-height: 1.2;
}

.brand-sub {
  font-size: 11px;
  color: var(--text-3);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.sidebar-search {
  margin: 12px 12px 8px;
  position: relative;
  flex-shrink: 0;
}

.search-icon {
  position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
  color: var(--text-3); pointer-events: none;
}

.search-input {
  width: 100%;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 7px;
  padding: 8px 32px 8px 32px;
  font-size: 12.5px;
  color: var(--text-1);
  outline: none;
  transition: border-color 0.2s;
}

.search-input::placeholder { color: var(--text-3); }
.search-input:focus { border-color: var(--accent-border); }

.search-clear {
  position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
  color: var(--text-3); display: flex;
  transition: color 0.2s;
}
.search-clear:hover { color: var(--text-1); }

.sidebar-section-label {
  padding: 8px 18px 6px;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  flex-shrink: 0;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 4px 8px 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--bg-4) transparent;
}

.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-thumb { background: var(--bg-4); border-radius: 2px; }

.module-group { margin-bottom: 2px; }

.module-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 10px;
  border-radius: 7px;
  text-align: left;
  transition: background 0.15s;
  gap: 8px;
}

.module-header:hover { background: var(--bg-3); }
.active-module { background: var(--accent-dim); }

.module-header-left {
  display: flex; align-items: flex-start; gap: 6px; flex: 1; min-width: 0;
}

.chevron { color: var(--text-3); flex-shrink: 0; margin-top: 3px; }

.module-label {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  line-height: 1.2;
}

.module-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-2);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
}

.module-progress-pill {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-3);
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 1px 7px;
  flex-shrink: 0;
}

.coming-soon-badge {
  font-size: 9.5px;
  color: var(--text-3);
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 1px 7px;
  flex-shrink: 0;
}

.lessons-list {
  padding: 2px 0 4px 18px;
  display: flex; flex-direction: column; gap: 1px;
}

.lesson-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 7px 8px;
  border-radius: 6px;
  text-align: left;
  transition: background 0.15s;
  border: 1px solid transparent;
}

.lesson-item:hover { background: var(--bg-3); }

.lesson-item--active {
  background: var(--accent-dim) !important;
  border-color: var(--accent-border);
}

.lesson-item-check { flex-shrink: 0; padding-top: 2px; }
.check-done { color: var(--accent); }
.check-empty { color: var(--text-3); }

.lesson-item-content { flex: 1; min-width: 0; }

.lesson-item-id {
  font-size: 9.5px;
  font-weight: 600;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.2;
}

.lesson-item-title {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-2);
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.lesson-item--active .lesson-item-title { color: var(--text-1); }
.lesson-item--done .lesson-item-title { color: var(--text-3); }

.lesson-item-duration {
  font-size: 10.5px;
  color: var(--text-3);
  margin-top: 2px;
}

.sidebar-footer {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 18px;
  border-top: 1px solid var(--border);
  font-size: 11.5px;
  color: var(--text-3);
  flex-shrink: 0;
}

/* ── MOBILE ─────────────────────────────── */
.mobile-header {
  display: none;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--bg-1);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.mobile-menu-btn {
  color: var(--text-2);
  display: flex;
  padding: 4px;
  transition: color 0.2s;
}
.mobile-menu-btn:hover { color: var(--text-1); }

.mobile-brand {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--text-1);
}
.mobile-brand span { color: var(--text-3); }

.sidebar-overlay {
  display: none;
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 90;
}

@media (max-width: 768px) {
  .sidebar-wrapper {
    position: fixed;
    left: -100%;
    top: 0;
    z-index: 100;
    width: var(--sidebar-w);
    transition: left 0.3s ease;
  }
  .sidebar-wrapper--open { left: 0; }
  .sidebar-overlay { display: block; }
  .mobile-header { display: flex; }
  .main-wrapper { width: 100%; }
}

/* ── DASHBOARD ─────────────────────────── */
.dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 32px 80px;
}

.dashboard-hero {
  margin-bottom: 32px;
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.eyebrow-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  padding: 3px 10px;
}

.eyebrow-level {
  font-size: 12px;
  color: var(--text-3);
}

.hero-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 800;
  color: var(--text-1);
  line-height: 1.15;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.hero-desc {
  font-size: 15px;
  color: var(--text-2);
  max-width: 580px;
  line-height: 1.65;
  margin-bottom: 24px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #000;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}

.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

.btn-completed {
  background: var(--bg-3);
  color: var(--accent);
  border: 1px solid var(--accent-border);
}

.hero-resume-label {
  font-size: 13px;
  color: var(--text-3);
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Stats bar */
.stats-bar {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon { color: var(--accent); }

.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-3);
  margin-top: 2px;
}

.stat-divider {
  width: 1px; height: 36px;
  background: var(--border);
}

.stats-progress {
  flex: 1;
  min-width: 120px;
}

.stats-progress-bar {
  height: 6px;
  background: var(--bg-4);
  border-radius: 100px;
  overflow: hidden;
}

.stats-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 100px;
  transition: width 0.5s ease;
}

/* Dashboard search */
.dashboard-search-section { margin-bottom: 32px; }

.dashboard-search-wrap {
  position: relative;
  max-width: 520px;
}

.dsearch-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--text-3); pointer-events: none;
}

.dsearch-input {
  width: 100%;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 40px 12px 42px;
  font-size: 14px;
  color: var(--text-1);
  outline: none;
  transition: border-color 0.2s;
}

.dsearch-input::placeholder { color: var(--text-3); }
.dsearch-input:focus { border-color: var(--accent-border); }

.dsearch-clear {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-3);
  transition: color 0.15s;
}
.dsearch-clear:hover { color: var(--text-1); }

/* Section headers */
.section-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 20px;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  letter-spacing: -0.01em;
}

.section-sub {
  font-size: 12px;
  color: var(--text-3);
}

.results-count {
  font-size: 14px;
  color: var(--text-3);
  font-weight: 400;
}

/* Search results */
.search-results-section { margin-bottom: 40px; }

.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 16px;
  text-align: left;
  transition: border-color 0.15s, background 0.15s;
  width: 100%;
}

.search-result-item:hover {
  border-color: var(--border-2);
  background: var(--bg-3);
}

.sresult-id {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-dim);
  border-radius: 4px;
  padding: 2px 7px;
  flex-shrink: 0;
  letter-spacing: 0.05em;
}

.sresult-content { flex: 1; min-width: 0; }

.sresult-title {
  font-weight: 500;
  font-size: 14px;
  color: var(--text-1);
}

.sresult-meta {
  font-size: 12px;
  color: var(--text-3);
  margin-top: 2px;
}

.sresult-arrow { color: var(--text-3); }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px;
  color: var(--text-3);
  font-size: 14px;
}

.empty-icon { color: var(--text-3); opacity: 0.5; }

/* Module cards grid */
.modules-section { margin-bottom: 40px; }

.module-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 14px;
}

.module-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: border-color 0.2s, transform 0.15s, background 0.2s;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-card:hover:not(.module-card--locked) {
  border-color: var(--border-2);
  background: var(--bg-3);
  transform: translateY(-2px);
}

.module-card--locked {
  cursor: default;
  opacity: 0.6;
}

.mc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mc-id-badge {
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 5px;
  padding: 2px 8px;
  letter-spacing: 0.06em;
}

.mc-coming-soon {
  font-size: 10.5px;
  color: var(--text-3);
  background: var(--bg-3);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 2px 8px;
}

.mc-complete-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  color: var(--accent);
  background: var(--accent-dim);
  border-radius: 100px;
  padding: 2px 8px;
}

.mc-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-1);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.mc-overview {
  font-size: 12.5px;
  color: var(--text-3);
  line-height: 1.55;
}

.mc-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.mc-stat {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: var(--text-3);
}

.mc-progress-bar {
  height: 4px;
  background: var(--bg-4);
  border-radius: 100px;
  overflow: hidden;
}

.mc-progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 100px;
  transition: width 0.5s;
}

.mc-progress-label {
  font-size: 11px;
  color: var(--text-3);
}

.mc-cta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--accent);
  margin-top: 2px;
}

/* Outcomes section */
.outcomes-section { margin-bottom: 40px; }

.outcomes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.outcome-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 12px 14px;
  font-size: 13px;
  color: var(--text-2);
  line-height: 1.5;
}

.outcome-check {
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
  font-size: 13px;
}

/* ── MODULE PAGE ─────────────────────────── */
.module-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 36px 32px 80px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.breadcrumb-link {
  font-size: 12.5px;
  color: var(--text-3);
  transition: color 0.15s;
}

.breadcrumb-link:hover { color: var(--text-2); }

.bc-sep { color: var(--text-3); flex-shrink: 0; }

.breadcrumb-current {
  font-size: 12.5px;
  color: var(--text-2);
  font-weight: 500;
}

.module-hero { margin-bottom: 32px; }

.module-id-pill {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 5px;
  padding: 3px 10px;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

.module-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(22px, 3.5vw, 30px);
  font-weight: 800;
  color: var(--text-1);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.module-overview {
  font-size: 14.5px;
  color: var(--text-2);
  line-height: 1.65;
  max-width: 640px;
  margin-bottom: 18px;
}

.module-meta-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.mod-meta-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-3);
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 10px;
}

.module-progress-section { max-width: 480px; }

.mp-bar-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mp-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-4);
  border-radius: 100px;
  overflow: hidden;
}

.mp-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 100px;
  transition: width 0.5s;
}

.mp-percent {
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
  min-width: 36px;
  text-align: right;
}

/* Outcomes */
.module-outcomes {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  margin-bottom: 28px;
}

.outcomes-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.outcomes-icon { color: var(--accent); }

.outcomes-header h2 {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-1);
}

.outcomes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.outcome-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.outcome-number {
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  min-width: 24px;
  margin-top: 1px;
}

.outcome-row p {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.55;
}

/* Module lessons list */
.module-lessons-section { }

.lessons-section-title {
  font-family: 'Syne', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 16px;
}

.module-lessons-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.module-lesson-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, transform 0.15s;
  width: 100%;
}

.module-lesson-card:hover {
  border-color: var(--border-2);
  background: var(--bg-3);
  transform: translateY(-1px);
}

.mlc--done { opacity: 0.7; }

.mlc-number {
  font-family: 'Syne', sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: var(--bg-4);
  min-width: 36px;
  flex-shrink: 0;
}

.mlc-icon { flex-shrink: 0; }

.mlc-done-icon { color: var(--accent); }

.mlc-play-btn {
  width: 36px; height: 36px;
  background: var(--accent);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #000;
  transition: transform 0.15s;
}

.module-lesson-card:hover .mlc-play-btn { transform: scale(1.1); }

.mlc-content { flex: 1; min-width: 0; }

.mlc-id {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 3px;
}

.mlc-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 4px;
  line-height: 1.3;
}

.mlc-summary {
  font-size: 12.5px;
  color: var(--text-3);
  line-height: 1.5;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.mlc-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.mlc-duration {
  font-size: 12px;
  color: var(--text-3);
  white-space: nowrap;
}

.mlc-arrow { color: var(--text-3); }

/* ── LESSON PAGE ─────────────────────────── */
.lesson-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 36px 32px 80px;
}

.lesson-header { margin-bottom: 20px; }

.lesson-id-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.lesson-module-badge, .lesson-video-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  border-radius: 5px;
  padding: 3px 8px;
}

.lesson-module-badge {
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
}

.lesson-video-badge {
  color: var(--text-3);
  background: var(--bg-3);
  border: 1px solid var(--border);
}

.lesson-done-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 100px;
  padding: 3px 9px;
}

.lesson-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 800;
  color: var(--text-1);
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 12px;
}

.lesson-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}

.lmeta-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-3);
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 5px 10px;
}

.lmeta-link {
  transition: color 0.15s, border-color 0.15s;
}
.lmeta-link:hover { color: var(--text-2); border-color: var(--border-2); }

/* Video */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  background: var(--bg-2);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
  margin-bottom: 16px;
}

.video-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* Mark complete */
.lesson-complete-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.mark-complete-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  padding: 9px 16px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  color: var(--text-2);
  transition: all 0.2s;
}

.mark-complete-btn:hover {
  border-color: var(--accent-border);
  color: var(--accent);
  background: var(--accent-dim);
}

.mark-complete-btn--done {
  background: var(--accent-dim);
  border-color: var(--accent-border);
  color: var(--accent);
}

.mark-complete-btn--done:hover {
  background: var(--bg-2);
  border-color: var(--border);
  color: var(--text-2);
}

.lesson-nav-inline {
  display: flex;
  gap: 8px;
}

.nav-inline-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-3);
  padding: 8px 12px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--bg-2);
  transition: all 0.15s;
}

.nav-inline-btn:hover { color: var(--text-1); border-color: var(--border-2); }
.nav-inline-btn--next { color: var(--accent); border-color: var(--accent-border); background: var(--accent-dim); }
.nav-inline-btn--next:hover { opacity: 0.8; }

/* Content tabs */
.content-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.content-tabs::-webkit-scrollbar { display: none; }

.content-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-3);
  padding: 10px 14px;
  border-radius: 8px 8px 0 0;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
  white-space: nowrap;
}

.content-tab:hover { color: var(--text-2); }

.content-tab--active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

/* Tab panels */
.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-block {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px 22px;
}

.content-block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-1);
  margin-bottom: 14px;
  color: var(--accent);
}

.lesson-summary {
  font-size: 14.5px;
  color: var(--text-2);
  line-height: 1.7;
  font-style: italic;
}

.lesson-description {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.7;
}

/* Takeaways */
.takeaways-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.takeaway-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.6;
}

.takeaway-num {
  font-family: 'Syne', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  flex-shrink: 0;
  min-width: 22px;
  margin-top: 1px;
}

/* Explanation */
.explanation-text { display: flex; flex-direction: column; gap: 14px; }

.explanation-para {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.75;
}

/* Timestamps */
.timestamps-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timestamp-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border-radius: 7px;
  border: 1px solid transparent;
  transition: background 0.15s, border-color 0.15s;
  cursor: pointer;
}

.timestamp-item:hover {
  background: var(--bg-3);
  border-color: var(--border);
}

.ts-time {
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  min-width: 40px;
  flex-shrink: 0;
}

.ts-label {
  font-size: 13.5px;
  color: var(--text-2);
  flex: 1;
}

.ts-icon { color: var(--text-3); }

/* Transcript */
.transcript-text { display: flex; flex-direction: column; gap: 12px; }

.transcript-para {
  font-size: 14px;
  color: var(--text-2);
  line-height: 1.8;
}

.transcript-fade {
  margin-top: 8px;
  padding: 12px;
  background: linear-gradient(to bottom, transparent, var(--bg-2));
  border-radius: 6px;
  text-align: center;
}

.transcript-truncated {
  font-size: 12.5px;
  color: var(--text-3);
  font-style: italic;
}

/* Bottom nav */
.lesson-nav-bottom {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.nav-bottom-prev, .nav-bottom-next { flex: 1; }
.nav-bottom-next { display: flex; justify-content: flex-end; }

.nav-bottom-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 14px 18px;
  cursor: pointer;
  transition: all 0.2s;
  max-width: 280px;
  text-align: left;
}

.nav-bottom-btn:hover {
  border-color: var(--border-2);
  background: var(--bg-3);
}

.nav-bottom-btn--next {
  text-align: right;
  flex-direction: row-reverse;
}

.nav-bottom-btn--complete {
  border-color: var(--accent-border);
  background: var(--accent-dim);
}

.nav-btn-label {
  font-size: 11px;
  color: var(--text-3);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
  margin-bottom: 2px;
}

.nav-btn-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-2);
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* ── AI TUTOR ─────────────────────────────── */
.ai-tutor-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: #000;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 13.5px;
  padding: 12px 18px;
  border-radius: 100px;
  box-shadow: 0 4px 24px rgba(34,197,94,0.3);
  z-index: 80;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border: none;
}

.ai-tutor-fab:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 32px rgba(34,197,94,0.45);
}

.ai-fab-label { line-height: 1; }

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 80px 24px 24px;
}

.ai-modal {
  width: 100%;
  max-width: 380px;
  background: var(--bg-2);
  border: 1px solid var(--border-2);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.6);
  animation: modalSlideUp 0.25s ease;
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.ai-modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
}

.ai-modal-icon {
  width: 40px; height: 40px;
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.ai-modal-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-1);
}

.ai-modal-subtitle {
  font-size: 11px;
  color: var(--text-3);
  margin-top: 1px;
}

.ai-modal-close {
  margin-left: auto;
  color: var(--text-3);
  display: flex;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
}

.ai-modal-close:hover { color: var(--text-1); background: var(--bg-3); }

.ai-modal-body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ai-modal-description {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.ai-desc-icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }

.ai-modal-description p {
  font-size: 13.5px;
  color: var(--text-2);
  line-height: 1.65;
}

.ai-modal-features {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ai-feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--text-3);
}

.ai-feature-dot {
  width: 5px; height: 5px;
  background: var(--accent);
  border-radius: 50%;
  flex-shrink: 0;
}

.ai-modal-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--accent);
  color: #000;
  font-weight: 700;
  font-size: 14px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}

.ai-modal-cta:hover { opacity: 0.88; transform: translateY(-1px); }

.ai-modal-note {
  font-size: 11.5px;
  color: var(--text-3);
  text-align: center;
  line-height: 1.6;
}

/* ── RESPONSIVE ─────────────────────────── */
@media (max-width: 768px) {
  .dashboard, .module-page, .lesson-page {
    padding: 20px 16px 100px;
  }

  .module-cards-grid {
    grid-template-columns: 1fr;
  }

  .outcomes-grid {
    grid-template-columns: 1fr;
  }

  .stats-bar {
    gap: 12px;
  }

  .stat-divider { display: none; }

  .lesson-nav-bottom {
    flex-direction: column;
  }

  .nav-bottom-btn {
    max-width: 100%;
  }

  .nav-bottom-next { justify-content: stretch; }
  .nav-bottom-next .nav-bottom-btn { max-width: 100%; }

  .lesson-complete-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .content-tabs { gap: 2px; }
  .content-tab { padding: 8px 10px; font-size: 12px; }

  .modal-backdrop { padding: 0; align-items: flex-end; }
  .ai-modal { max-width: 100%; border-radius: 18px 18px 0 0; }

  .ai-tutor-fab { bottom: 16px; right: 16px; padding: 10px 14px; }
  .ai-fab-label { display: none; }

  .module-lesson-card { flex-wrap: wrap; }
  .mlc-number { display: none; }

  .hero-resume-label { display: none; }
}
`;
