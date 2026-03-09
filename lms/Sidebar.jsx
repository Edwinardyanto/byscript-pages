// Sidebar — module and lesson navigation

import { ChevronDown, ChevronRight, CheckCircle, Circle, BookOpen, Search, X } from "lucide-react";
import { useState } from "react";

export function Sidebar({ courseData, currentLessonId, progress, isComplete, onNavigate, onModuleClick, currentView, searchQuery, onSearchChange }) {
  const [expandedModules, setExpandedModules] = useState({ M01: true });

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const filteredModules = courseData.modules.map((m) => ({
    ...m,
    lessons: m.lessons.filter((l) =>
      searchQuery
        ? l.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    ),
  }));

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand" onClick={() => onNavigate("dashboard")} style={{ cursor: "pointer" }}>
        <div className="brand-icon">
          <span>{'</>'}</span>
        </div>
        <div>
          <div className="brand-name">byScript</div>
          <div className="brand-sub">Academy</div>
        </div>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <Search size={14} className="search-icon" />
        <input
          type="text"
          placeholder="Search lessons..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button onClick={() => onSearchChange("")} className="search-clear">
            <X size={12} />
          </button>
        )}
      </div>

      {/* Navigation label */}
      <div className="sidebar-section-label">Course Modules</div>

      {/* Module list */}
      <nav className="sidebar-nav">
        {filteredModules.map((module, idx) => {
          const hasLessons = module.lessons.length > 0;
          const isExpanded = expandedModules[module.id];
          const completedInModule = module.lessons.filter((l) => isComplete(l.id)).length;
          const total = courseData.modules[idx].lessons.length;
          const isComingSoon = courseData.modules[idx].lessons.length === 0;

          return (
            <div key={module.id} className="module-group">
              <button
                className={`module-header ${currentView === "module" && currentLessonId === module.id ? "active-module" : ""}`}
                onClick={() => {
                  if (!isComingSoon) {
                    toggleModule(module.id);
                    onModuleClick(module.id);
                  }
                }}
              >
                <div className="module-header-left">
                  {isExpanded && hasLessons ? (
                    <ChevronDown size={14} className="chevron" />
                  ) : (
                    <ChevronRight size={14} className="chevron" />
                  )}
                  <div>
                    <div className="module-label">{module.id}</div>
                    <div className="module-title">{module.title}</div>
                  </div>
                </div>
                {!isComingSoon && (
                  <div className="module-progress-pill">
                    {completedInModule}/{total}
                  </div>
                )}
                {isComingSoon && (
                  <span className="coming-soon-badge">Soon</span>
                )}
              </button>

              {/* Lessons list */}
              {isExpanded && hasLessons && (
                <div className="lessons-list">
                  {module.lessons.map((lesson) => {
                    const done = isComplete(lesson.id);
                    const isCurrent = currentLessonId === lesson.id && currentView === "lesson";
                    return (
                      <button
                        key={lesson.id}
                        className={`lesson-item ${isCurrent ? "lesson-item--active" : ""} ${done ? "lesson-item--done" : ""}`}
                        onClick={() => onNavigate("lesson", lesson.id)}
                      >
                        <div className="lesson-item-check">
                          {done ? (
                            <CheckCircle size={14} className="check-done" />
                          ) : (
                            <Circle size={14} className="check-empty" />
                          )}
                        </div>
                        <div className="lesson-item-content">
                          <div className="lesson-item-id">{lesson.id}</div>
                          <div className="lesson-item-title">{lesson.title}</div>
                          <div className="lesson-item-duration">{lesson.duration}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="sidebar-footer">
        <BookOpen size={13} />
        <span>{courseData.totalModules} modules · {courseData.estimatedHours}</span>
      </div>
    </aside>
  );
}
