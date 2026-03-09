// Dashboard — course home page with progress overview and module cards

import { Play, ArrowRight, Clock, BarChart2, Trophy, BookOpen, Search, X } from "lucide-react";

export function Dashboard({ courseData, overallPercent, completedCount, totalLessons, moduleStats, nextLesson, onNavigate, searchQuery, onSearchChange }) {
  const allLessons = courseData.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );

  const filteredLessons = searchQuery
    ? allLessons.filter(
        (l) =>
          l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.summary?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <main className="dashboard">
      {/* Hero */}
      <section className="dashboard-hero">
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">byScript Academy</span>
          <span className="eyebrow-level">{courseData.level}</span>
        </div>
        <h1 className="hero-title">{courseData.title}</h1>
        <p className="hero-desc">{courseData.subtitle}</p>

        <div className="hero-actions">
          {nextLesson ? (
            <button
              className="btn-primary"
              onClick={() => onNavigate("lesson", nextLesson.id)}
            >
              <Play size={16} fill="currentColor" />
              {completedCount === 0 ? "Start Learning" : "Continue Learning"}
            </button>
          ) : (
            <div className="btn-primary btn-completed">
              <Trophy size={16} />
              Course Complete!
            </div>
          )}
          {nextLesson && completedCount > 0 && (
            <span className="hero-resume-label">
              Resume: {nextLesson.title}
            </span>
          )}
        </div>
      </section>

      {/* Stats bar */}
      <section className="stats-bar">
        <div className="stat-item">
          <BarChart2 size={18} className="stat-icon" />
          <div>
            <div className="stat-value">{overallPercent}%</div>
            <div className="stat-label">Complete</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <BookOpen size={18} className="stat-icon" />
          <div>
            <div className="stat-value">{completedCount}/{totalLessons}</div>
            <div className="stat-label">Lessons Done</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <Clock size={18} className="stat-icon" />
          <div>
            <div className="stat-value">{courseData.estimatedHours}</div>
            <div className="stat-label">Total Content</div>
          </div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <Trophy size={18} className="stat-icon" />
          <div>
            <div className="stat-value">{courseData.totalModules}</div>
            <div className="stat-label">Modules</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="stats-progress">
          <div className="stats-progress-bar">
            <div
              className="stats-progress-fill"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      </section>

      {/* Search bar */}
      <section className="dashboard-search-section">
        <div className="dashboard-search-wrap">
          <Search size={16} className="dsearch-icon" />
          <input
            type="text"
            placeholder="Search all lessons by title or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="dsearch-input"
          />
          {searchQuery && (
            <button onClick={() => onSearchChange("")} className="dsearch-clear">
              <X size={14} />
            </button>
          )}
        </div>
      </section>

      {/* Search results */}
      {searchQuery && (
        <section className="search-results-section">
          <div className="section-header">
            <h2 className="section-title">
              Search Results{" "}
              <span className="results-count">({filteredLessons.length})</span>
            </h2>
          </div>
          {filteredLessons.length === 0 ? (
            <div className="empty-state">
              <Search size={32} className="empty-icon" />
              <p>No lessons match "{searchQuery}"</p>
            </div>
          ) : (
            <div className="search-results-list">
              {filteredLessons.map((lesson) => (
                <button
                  key={lesson.id}
                  className="search-result-item"
                  onClick={() => onNavigate("lesson", lesson.id)}
                >
                  <div className="sresult-id">{lesson.id}</div>
                  <div className="sresult-content">
                    <div className="sresult-title">{lesson.title}</div>
                    <div className="sresult-meta">{lesson.moduleTitle} · {lesson.duration}</div>
                  </div>
                  <ArrowRight size={16} className="sresult-arrow" />
                </button>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Module cards */}
      {!searchQuery && (
        <section className="modules-section">
          <div className="section-header">
            <h2 className="section-title">Course Modules</h2>
            <span className="section-sub">{courseData.totalModules} modules</span>
          </div>
          <div className="module-cards-grid">
            {courseData.modules.map((module, idx) => {
              const stats = moduleStats[idx];
              const isLocked = module.lessons.length === 0;
              const firstLesson = module.lessons[0];

              return (
                <div
                  key={module.id}
                  className={`module-card ${isLocked ? "module-card--locked" : ""}`}
                  onClick={() => !isLocked && onNavigate("module", module.id)}
                  role={isLocked ? undefined : "button"}
                  tabIndex={isLocked ? -1 : 0}
                  onKeyDown={(e) => e.key === "Enter" && !isLocked && onNavigate("module", module.id)}
                >
                  {/* Card header */}
                  <div className="mc-header">
                    <div className="mc-id-badge">{module.id}</div>
                    {isLocked && <span className="mc-coming-soon">Coming Soon</span>}
                    {!isLocked && stats.completed === stats.total && stats.total > 0 && (
                      <span className="mc-complete-badge">
                        <Trophy size={12} /> Complete
                      </span>
                    )}
                  </div>

                  <h3 className="mc-title">{module.title}</h3>
                  <p className="mc-overview">{module.overview.slice(0, 120)}...</p>

                  {/* Stats */}
                  <div className="mc-stats">
                    <span className="mc-stat">
                      <Clock size={12} /> {module.total_duration}
                    </span>
                    {!isLocked && (
                      <span className="mc-stat">
                        <BookOpen size={12} /> {module.lessons.length} lessons
                      </span>
                    )}
                  </div>

                  {/* Progress */}
                  {!isLocked && (
                    <>
                      <div className="mc-progress-bar">
                        <div
                          className="mc-progress-fill"
                          style={{ width: `${stats.percent}%` }}
                        />
                      </div>
                      <div className="mc-progress-label">
                        {stats.completed}/{stats.total} lessons · {stats.percent}%
                      </div>
                    </>
                  )}

                  {/* CTA */}
                  {!isLocked && (
                    <div className="mc-cta">
                      <span>{stats.completed === 0 ? "Start Module" : "Continue"}</span>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Learning outcomes preview */}
      {!searchQuery && (
        <section className="outcomes-section">
          <div className="section-header">
            <h2 className="section-title">What You'll Learn</h2>
          </div>
          <div className="outcomes-grid">
            {courseData.modules.flatMap((m) => m.learning_outcomes).slice(0, 8).map((outcome, i) => (
              <div key={i} className="outcome-item">
                <div className="outcome-check">✓</div>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
