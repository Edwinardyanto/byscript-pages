// LessonPage — full lesson view with video, content tabs, and navigation

import { useState } from "react";
import {
  ChevronRight, ChevronLeft, CheckCircle, ExternalLink,
  Clock, Hash, Play, FileText, Lightbulb, BookOpen, AlignLeft, List
} from "lucide-react";


function YouTubeEmbed({ videoId, title }) {
  return (
    <div className="video-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="video-iframe"
      />
    </div>
  );
}

const TABS = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "explanation", label: "Deep Dive", icon: BookOpen },
  { id: "timestamps", label: "Timestamps", icon: Clock },
];

export function LessonPage({ lesson, module, allLessons, isComplete, markComplete, markIncomplete, onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!lesson) return null;

  const lessonIndex = allLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;
  const done = isComplete(lesson.id);

  return (
    <main className="lesson-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <button className="breadcrumb-link" onClick={() => onNavigate("dashboard")}>
          Course Home
        </button>
        <ChevronRight size={14} className="bc-sep" />
        <button className="breadcrumb-link" onClick={() => onNavigate("module", lesson.module_id)}>
          {lesson.module_id}
        </button>
        <ChevronRight size={14} className="bc-sep" />
        <span className="breadcrumb-current">{lesson.id}</span>
      </div>

      {/* Lesson header */}
      <div className="lesson-header">
        <div className="lesson-id-row">
          <span className="lesson-module-badge">{lesson.module_id}</span>
          <span className="lesson-video-badge">Video {lesson.video_number}</span>
          {done && (
            <span className="lesson-done-badge">
              <CheckCircle size={12} /> Completed
            </span>
          )}
        </div>
        <h1 className="lesson-title">{lesson.title}</h1>

        {/* Metadata row */}
        <div className="lesson-meta">
          <span className="lmeta-chip">
            <Clock size={13} /> {lesson.duration}
          </span>
        </div>
      </div>

      {/* Video player */}
      <YouTubeEmbed videoId={lesson.youtube_id} title={lesson.title} />

      {/* Mark complete button */}
      <div className="lesson-complete-row">
        <button
          className={`mark-complete-btn ${done ? "mark-complete-btn--done" : ""}`}
          onClick={() => done ? markIncomplete(lesson.id) : markComplete(lesson.id)}
        >
          <CheckCircle size={16} />
          {done ? "Mark as Incomplete" : "Mark as Complete"}
        </button>

        <div className="lesson-nav-inline">
          {prevLesson && (
            <button className="nav-inline-btn" onClick={() => onNavigate("lesson", prevLesson.id)}>
              <ChevronLeft size={14} /> Previous
            </button>
          )}
          {nextLesson && (
            <button className="nav-inline-btn nav-inline-btn--next" onClick={() => onNavigate("lesson", nextLesson.id)}>
              Next <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Content tabs */}
      <div className="content-tabs">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`content-tab ${activeTab === tab.id ? "content-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="tab-panel">
            {/* Summary */}
            <div className="content-block">
              <h3 className="content-block-title">
                <Lightbulb size={16} /> Lesson Summary
              </h3>
              <p className="lesson-summary">{lesson.summary}</p>
            </div>

            {/* Description */}
            <div className="content-block">
              <h3 className="content-block-title">
                <FileText size={16} /> About This Lesson
              </h3>
              <p className="lesson-description">{lesson.description}</p>
            </div>

            {/* Key takeaways */}
            <div className="content-block">
              <h3 className="content-block-title">
                <List size={16} /> Key Takeaways
              </h3>
              <ul className="takeaways-list">
                {lesson.key_takeaways.map((t, i) => (
                  <li key={i} className="takeaway-item">
                    <span className="takeaway-num">{String(i + 1).padStart(2, "0")}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "explanation" && (
          <div className="tab-panel">
            <div className="content-block">
              <h3 className="content-block-title">
                <BookOpen size={16} /> Comprehensive Explanation
              </h3>
              <div className="explanation-text">
                {lesson.comprehensive_explanation.split("\n\n").map((para, i) => (
                  <p key={i} className="explanation-para">
                    {para.startsWith("**") ? (
                      <span>
                        <strong>{para.match(/\*\*(.*?)\*\*/)?.[1]}</strong>
                        {para.replace(/\*\*(.*?)\*\*/, "")}
                      </span>
                    ) : (
                      para
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "timestamps" && (
          <div className="tab-panel">
            <div className="content-block">
              <h3 className="content-block-title">
                <Clock size={16} /> Video Timestamps
              </h3>
              <div className="timestamps-list">
                {lesson.timestamps.map((ts, i) => (
                  <a
                    key={i}
                    href={`${lesson.youtube_url}&t=${ts.time.replace(":", "m")}s`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="timestamp-item"
                  >
                    <span className="ts-time">{ts.time}</span>
                    <span className="ts-label">{ts.label}</span>
                    <ExternalLink size={12} className="ts-icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Bottom navigation */}
      <div className="lesson-nav-bottom">
        <div className="nav-bottom-prev">
          {prevLesson ? (
            <button className="nav-bottom-btn" onClick={() => onNavigate("lesson", prevLesson.id)}>
              <ChevronLeft size={16} />
              <div>
                <div className="nav-btn-label">Previous Lesson</div>
                <div className="nav-btn-title">{prevLesson.title}</div>
              </div>
            </button>
          ) : <div />}
        </div>
        <div className="nav-bottom-next">
          {nextLesson ? (
            <button className="nav-bottom-btn nav-bottom-btn--next" onClick={() => onNavigate("lesson", nextLesson.id)}>
              <div>
                <div className="nav-btn-label">Next Lesson</div>
                <div className="nav-btn-title">{nextLesson.title}</div>
              </div>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              className="nav-bottom-btn nav-bottom-btn--complete"
              onClick={() => onNavigate("module", lesson.module_id)}
            >
              <div>
                <div className="nav-btn-label">Module Complete</div>
                <div className="nav-btn-title">Back to Module Overview</div>
              </div>
              <CheckCircle size={16} />
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
