// Premium Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserdata } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function MenuItem({ onClick, text, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl px-4 py-3 text-left transition ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-300 hover:bg-white/[0.05]"
      }`}
    >
      {text}
    </button>
  );
}

export default function Navbar() {
  const { userData } = useSelector((s) => s.user);
  const credits = userData?.credits ?? 0;

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handle = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowCredits(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserdata(null));
      navigate("/auth");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative z-50 mx-6 mt-6"
    >
      <nav className="relative flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 backdrop-blur-3xl shadow-[0_15px_50px_rgba(0,0,0,.45)]">
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/5 via-transparent to-violet-500/5" />

        <div className="relative flex items-center gap-3">
          <img src={logo} alt="logo" className="h-11 w-11 rounded-xl" />
          <h1 className="hidden md:block text-xl font-semibold tracking-tight text-white">
            ExamNotes<span className="text-blue-400">AI</span>
          </h1>
        </div>

        <div className="relative flex items-center gap-4">
          <div className="relative">
            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: .96 }}
              onClick={() => {
                setShowCredits(!showCredits);
                setShowProfile(false);
              }}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-2.5 text-white"
            >
              <span className="text-blue-400">✦</span>
              <span>{credits}</span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white font-bold text-black">
                +
              </div>
            </motion.button>

            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: .96 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: .96 }}
                  className="absolute right-0 mt-4 w-72 rounded-3xl border border-white/10 bg-[#0b0b0b]/90 p-5 backdrop-blur-3xl shadow-2xl"
                >
                  <h3 className="mb-2 text-lg font-semibold text-white">Buy Credits</h3>
                  <p className="mb-5 text-sm text-gray-400">
                    Purchase credits to generate AI notes, PDFs and diagrams.
                  </p>
                  <button className="w-full rounded-2xl bg-white py-3 font-semibold text-black hover:bg-gray-200">
                    Buy More Credits
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: .96 }}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowCredits(false);
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-base font-semibold text-black"
            >
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </motion.button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: .96 }}
                  animate={{ opacity: 1, y: 10, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: .96 }}
                  className="absolute right-0 mt-4 w-64 rounded-3xl border border-white/10 bg-[#0b0b0b]/90 p-3 backdrop-blur-3xl shadow-2xl"
                >
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
                    <h4 className="font-semibold text-white">{userData?.name || "Guest User"}</h4>
                    <p className="text-sm text-gray-400">{userData?.email || "guest@example.com"}</p>
                  </div>

                  <div className="mt-3 flex flex-col gap-1">
                    <MenuItem text="👤 My Profile" onClick={() => {}} />
                    <MenuItem text="⚙ Settings" onClick={() => {}} />
                    <MenuItem text="📜 Purchase History" onClick={() => {}} />
                    <MenuItem text="🚪 Logout" danger onClick={handleSignOut} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
