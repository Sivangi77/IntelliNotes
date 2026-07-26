import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TopicForm from "../components/TopicForm";

function Notes() {
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user?.userData || {});
  const credits = userData?.credits || 0;

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-10 rounded-3xl bg-black/40 backdrop-blur-xl border border-blue-500/20 px-8 py-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer group"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
            ExamNotes AI
          </h1>

          <p className="text-sm text-blue-200/70 mt-1">
            AI-powered exam-oriented notes & revision
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-900/20 px-4 py-2 text-sm text-white transition hover:bg-blue-800/30">
            <span>💎</span>

            <span className="font-semibold">
              {credits} Credits
            </span>

            <motion.span
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
            >
              +
            </motion.span>
          </button>

          <button
            onClick={() => navigate("/history")}
            className="rounded-full border border-blue-500/30 bg-blue-600/10 px-5 py-2.5 text-sm font-medium text-blue-100 transition hover:bg-blue-500/20"
          >
            📚 Your Notes
          </button>
        </div>
      </motion.header>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-7xl mx-auto"
      >
        <TopicForm
          loading={loading}
          setLoading={setLoading}
          result={result}
          setResult={setResult}
          error={error}
          setError={setError}
        />
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
        >
          {error}
        </motion.div>
      )}

      {/* Placeholder */}
      {!loading && !result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.01 }}
          className="max-w-3xl mx-auto mt-10"
        >
          <div className="h-64 rounded-3xl border border-dashed border-white/10 bg-black/30 backdrop-blur-xl flex flex-col items-center justify-center text-center px-8">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10">
              <span className="text-5xl">📝</span>
            </div>

            <h3 className="text-xl font-semibold text-white">
              Your notes will appear here
            </h3>

            <p className="mt-2 max-w-md text-gray-400">
              Enter a topic above and click{" "}
              <span className="font-medium text-white">
                Generate Study Notes
              </span>
              .
            </p>
          </div>
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl mx-auto mt-10"
        >
          <div className="h-64 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl flex flex-col items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />

            <p className="mt-6 text-lg text-blue-200">
              Generating your notes...
            </p>
          </div>
        </motion.div>
      )}

      {/* Result */}
      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mt-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-xl"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">
            Generated Notes
          </h2>

          <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-200">
            {result}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Notes;