import React, { useState, useEffect, useRef } from "react"; // Added useEffect & useRef
import { AnimatePresence, motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserdata } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function MenuItem({ onClick, text, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-gray-200 hover:bg-white/10"
      }`}
    >
      {text}
    </button>
  );
}

export default function Navbar() {
  const { userData } = useSelector((state) => state.user);
  const credits = userData?.credits ?? 0;

  const [showCredits, setShowCredits] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const navRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowCredits(false);
        setShowProfile(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
        await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
        dispatch(setUserdata(null));
        navigate("/auth");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-20 mx-6 mt-6"
    >
      <nav className="flex items-center justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-black/80 via-zinc-900/80 to-black/80 backdrop-blur-2xl px-8 py-4 shadow-[0_20px_60px_rgba(0,0,0,.55)]">

        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 rounded-xl"/>
          <span className="hidden md:block text-xl font-bold text-white">
            ExamNotes <span className="text-indigo-400">AI</span>
          </span>
        </div>

        <div className="flex items-center gap-5">

          <div className="relative">

            <motion.div
              onClick={() => {
                setShowCredits(!showCredits);
                setShowProfile(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white"
            >
              <span>💎</span>
              <span>{credits}</span>

              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="ml-1 w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold"
              >
                +
              </motion.div>
            </motion.div>

            <AnimatePresence>
            {showCredits && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-72 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-5 shadow-[0_25px_60px_rgba(0,0,0,.7)]"
              >
                <h3 className="text-white font-semibold text-lg mb-2">Buy Credits</h3>
                <p className="text-gray-300 text-sm mb-5">
                  Use credits to generate AI Notes, Diagrams, Charts and PDFs instantly.
                </p>

                <button
                  onClick={() => setShowCredits(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 text-white font-semibold hover:opacity-90"
                >
                  Buy More Credits
                </button>
              </motion.div>
            )}
            </AnimatePresence>

          </div>

          <div className="relative">

            <motion.div
              onClick={() => {
                setShowProfile(!showProfile);
                setShowCredits(false);
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer w-11 h-11 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
            >
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </motion.div>

            <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 10, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-64 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-3 shadow-[0_25px_60px_rgba(0,0,0,.7)]"
              >
                <div className="px-4 py-3 border-b border-white/10">
                  <h4 className="text-white font-semibold">{userData?.name || "Guest User"}</h4>
                  <p className="text-gray-400 text-sm">{userData?.email || "guest@example.com"}</p>
                </div>

                <div className="mt-2 flex flex-col gap-1">
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