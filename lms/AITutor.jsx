// AITutorModal — floating button + modal linking to external Custom GPT

import { X, Sparkles, ExternalLink, Bot, MessageSquare } from "lucide-react";

const CUSTOM_GPT_URL = "https://chatgpt.com/g/your-custom-gpt-url"; // Replace with real URL

export function AITutorButton({ onClick }) {
  return (
    <button className="ai-tutor-fab" onClick={onClick} aria-label="Open AI Tutor">
      <Sparkles size={20} />
      <span className="ai-fab-label">AI Tutor</span>
    </button>
  );
}

export function AITutorModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-modal-icon">
            <Bot size={22} />
          </div>
          <div>
            <div className="ai-modal-title">byScript AI Tutor</div>
            <div className="ai-modal-subtitle">Powered by Custom GPT</div>
          </div>
          <button className="ai-modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="ai-modal-body">
          <div className="ai-modal-description">
            <MessageSquare size={16} className="ai-desc-icon" />
            <p>
              Ask questions about the full course content. The AI Tutor can help you find the relevant module, video, and timestamp — and explain concepts in depth.
            </p>
          </div>

          <div className="ai-modal-features">
            {[
              "Covers all modules and lesson content",
              "Points you to the exact video and timestamp",
              "Explains Pine Script, backtesting, and strategy concepts",
              "Available 24/7 — study at your own pace",
            ].map((f, i) => (
              <div key={i} className="ai-feature-item">
                <div className="ai-feature-dot" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={CUSTOM_GPT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ai-modal-cta"
          >
            <Sparkles size={16} />
            Open AI Tutor
            <ExternalLink size={14} />
          </a>

          <p className="ai-modal-note">
            The AI Tutor is separate from the lesson page and can answer questions across the full course content.
          </p>
        </div>
      </div>
    </div>
  );
}
