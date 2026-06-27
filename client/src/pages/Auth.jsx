import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios"
import { serverUrl } from "../App";

const Auth = () => {

    const handleGoogleAuth= async () => {
        try{
            const response= await signInWithPopup(auth, provider);
            const User= response.user;
            const name= User.displayName;
            const email= User.email;

            const result= await axios.post(serverUrl+ "/api/auth/google", {name, email}, {
                withCredentials: true
            })
            console.log(result.data);

        }catch(error){
            console.error("Error during Google authentication:", error);
        }
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-200">

            {/* Background Blur */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 px-6 lg:px-10 py-8">

                <motion.header
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-7xl mx-auto flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-xl px-8 py-5 shadow-2xl"
                >
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-white">
                            IntelliNotes
                        </h1>
                        <p className="text-sm text-slate-400 mt-1">
                            AI-powered exam-oriented notes and revision
                        </p>
                    </div>

                    <div className="hidden md:block px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium text-sm">
                        AI Study Companion
                    </div>
                </motion.header>

                <main className="max-w-7xl mx-auto mt-14 grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >

                        <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-400">
                            Smarter Learning Starts Here
                        </span>

                        <h1 className="mt-6 text-5xl lg:text-7xl font-black leading-tight text-white">
                            Create Notes
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                in Seconds
                            </span>
                        </h1>

                        <p className="mt-7 text-lg leading-8 text-slate-400 max-w-xl">
                            Generate exam-focused notes, project documentation,
                            AI-generated charts, graphs and downloadable PDFs—
                            everything you need to study smarter and finish faster.
                        </p>

                        <motion.button
                            whileHover={{
                                y: -8,
                                scale: 1.04,
                            }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                                type: "spring",
                                stiffness: 220,
                                damping: 18,
                            }}
                            onClick={handleGoogleAuth}
                            className="mt-10 flex items-center gap-4 rounded-2xl bg-white px-8 py-4 text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:bg-slate-100 transition-colors"
                        >
                            <div className="rounded-full bg-white p-1">
                                <FcGoogle size={24} />
                            </div>

                            <div className="text-left">
                                <p className="font-bold">
                                    Continue with Google
                                </p>
                                <p className="text-xs text-slate-600 font-medium">
                                    Secure one-click sign in
                                </p>
                            </div>
                        </motion.button>

                        <div className="mt-10 flex flex-wrap gap-6">

                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    50
                                </h2>
                                <p className="text-slate-400">
                                    Free Credits
                                </p>
                            </div>

                            <div className="w-px bg-slate-700"></div>

                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    PDF
                                </h2>
                                <p className="text-slate-400">
                                    Instant Download
                                </p>
                            </div>

                            <div className="w-px bg-slate-700"></div>

                            <div>
                                <h2 className="text-3xl font-bold text-white">
                                    AI
                                </h2>
                                <p className="text-slate-400">
                                    Powered Learning
                                </p>
                            </div>

                        </div>

                        <p className="mt-8 text-sm text-slate-500">
                            Start with 50 free credits and upgrade anytime for
                            unlimited AI-powered study assistance.
                        </p>

                    </motion.div>

                    {/* RIGHT CONTENT */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        <Feature
                            icon="🎁"
                            title="50 Free Credits"
                            des="Start generating high-quality notes instantly with complimentary credits."
                        />

                        <Feature
                            icon="📖"
                            title="Exam Notes"
                            des="Generate concise, structured and revision-ready notes in seconds."
                        />

                        <Feature
                            icon="📁"
                            title="Project Notes"
                            des="Organize documentation, reports and assignments with AI assistance."
                        />

                        <Feature
                            icon="📊"
                            title="Charts & Graphs"
                            des="Automatically create visual diagrams that make concepts easier to understand."
                        />

                        <Feature
                            icon="⬇️"
                            title="PDF Export"
                            des="Download beautifully formatted PDFs for offline study anytime."
                        />

                        <motion.div
                            whileHover={{
                                y: -12,
                                scale: 1.03,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 18,
                            }}
                            className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white shadow-lg shadow-blue-900/20"
                        >
                            <h2 className="text-2xl font-bold">
                                Study Faster 🚀
                            </h2>

                            <p className="mt-3 text-indigo-100 leading-7">
                                Save hours by letting AI handle note creation,
                                formatting and visualization while you focus on
                                learning.
                            </p>
                        </motion.div>

                    </div>

                </main>

            </div>

        </div>
    );
};

function Feature({ icon, title, des }) {
    return (
        <motion.div
            whileHover={{
                y: -10,
                scale: 1.04,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 18,
            }}
            className="group rounded-3xl border border-white/5 bg-slate-800/40 backdrop-blur-xl p-6 shadow-xl hover:bg-slate-800/60 transition-colors"
        >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-700/50 border border-white/5 text-4xl shadow-inner">
                {icon}
            </div>

            <h3 className="mt-6 text-xl font-bold text-white">
                {title}
            </h3>

            <p className="mt-3 text-slate-400 leading-7">
                {des}
            </p>
        </motion.div>
    );
}

export default Auth;