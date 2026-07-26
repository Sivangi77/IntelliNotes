import React, { useState } from "react";
import { motion } from "framer-motion";

// Toggle Component
function Toggle({ label, checked, onChange }) {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none"
      onClick={onChange}
    >
      <motion.div
        animate={{
          backgroundColor: checked
            ? "rgba(59, 130, 246, 0.45)"
            : "rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.25 }}
        className="relative w-12 h-6 rounded-full border border-white/10 backdrop-blur-md"
      >
        <motion.div
          animate={{
            left: checked ? "1.6rem" : "0.25rem",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md"
        />
      </motion.div>

      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          checked ? "text-blue-300" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

// Main Form Component
function TopicForm() {
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [examType, setExamType] = useState("");
  const [revisionMode, setRevisionMode] = useState(false);
  const [includeDiagram, setIncludeDiagram] = useState(false);
  const [includeChart, setIncludeChart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
        await generateNotes();
    } finally {
        setLoading(false);
    }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-[#0B1120]/95 border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8 md:p-10 space-y-8 text-white max-w-3xl mx-auto"
    >
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Generate AI Study Notes
        </h2>

        <p className="mt-2 text-gray-400">
          Create concise, exam-focused notes in seconds.
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <input
          type="text"
          className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
          placeholder="Enter topic (e.g. Next.js App Routing)"
          onChange={(e) => setTopic(e.target.value)}
          value={topic}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
            placeholder="Enter class level (e.g. B.Tech 3rd Year)"
            onChange={(e) => setClassLevel(e.target.value)}
            value={classLevel}
          />

          <input
            type="text"
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 placeholder-gray-500 text-white focus:outline-none focus:border-blue-500 transition-all duration-300"
            placeholder="Enter exam type (e.g. Mid-Sem)"
            onChange={(e) => setExamType(e.target.value)}
            value={examType}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Toggle
            label="Exam Revision Mode"
            checked={revisionMode}
            onChange={() => setRevisionMode(!revisionMode)}
          />

          <Toggle
            label="Include Diagram"
            checked={includeDiagram}
            onChange={() => setIncludeDiagram(!includeDiagram)}
          />

          <Toggle
            label="Include Chart"
            checked={includeChart}
            onChange={() => setIncludeChart(!includeChart)}
          />
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerate}
        disabled={loading}
        whileHover={!loading ? { scale: 1.05, y: -2 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        className={`
        w-full
        py-4
        rounded-2xl
        font-semibold
        flex
        items-center
        justify-center
        gap-3
        transition-all
        duration-300

        ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-[#111827] text-white hover:bg-[#1c2940] hover:border-blue-500/40 border border-white/10"
        }
    `}
      >
        {loading ? (
          <>
            <div className="h-5 w-5 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />
            Generating Notes...
          </>
        ) : (
          "Generate Study Notes"
        )}
      </motion.button>
    </motion.div>
  );
}

export default TopicForm;