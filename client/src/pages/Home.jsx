import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import img1 from "../assets/img1.png";

export default function Home() {
  const features = [
    {
      icon: "📘",
      title: "Exam Notes",
      desc: "Generate concise, AI-powered revision notes in seconds."
    },
    {
      icon: "📁",
      title: "Project Docs",
      desc: "Create structured documentation and reports effortlessly."
    },
    {
      icon: "📊",
      title: "Diagrams",
      desc: "Visualize concepts with clean AI-generated diagrams."
    },
    {
      icon: "⬇️",
      title: "PDF Export",
      desc: "Export beautiful PDFs ready for sharing and printing."
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[900px] w-[900px] rounded-full bg-blue-500/15 blur-[220px]" />
      <div className="absolute bottom-0 right-0 h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-[200px]" />

      <Navbar />

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-24 px-8 pt-28 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-sm text-gray-300">AI Powered Learning</span>
          </div>

          <h1 className="mt-8 text-6xl font-black leading-[0.95] lg:text-8xl">
            Create Smart
            <br/>
            AI Notes
            <br/>
            in Seconds.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-9 text-gray-400">
            Generate exam notes, project documentation, diagrams and beautifully
            formatted PDFs with powerful AI.
          </p>

          <div className="mt-12 flex gap-5">
            <button className="rounded-full bg-white px-8 py-4 font-semibold text-black shadow-xl transition hover:scale-105">
              Get Started
            </button>

            <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold backdrop-blur-xl hover:bg-white/10">
              Learn More
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity:0, x:50 }}
          animate={{ opacity:1, x:0, y:[0,-12,0] }}
          transition={{ duration:.8, y:{repeat:Infinity,duration:4} }}
          className="relative hidden justify-center lg:flex"
        >
          <div className="absolute -inset-10 rounded-full bg-blue-500/20 blur-3xl"/>
          <img
            src={img1}
            alt="AI Notes"
            className="relative w-full max-w-[580px] rounded-[36px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,.7)]"
          />
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-8 py-36">
        <div className="mb-20 text-center">
          <p className="text-sm font-semibold tracking-[0.4em] text-blue-400">
            FEATURES
          </p>

          <h2 className="mt-5 text-5xl font-black text-white">
            Everything you need.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Powerful AI tools designed for students and professionals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f)=>(
            <motion.div
              key={f.title}
              whileHover={{ y:-10, scale:1.03 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl transition-all hover:border-blue-500/40 hover:bg-white/[0.05]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 transition group-hover:opacity-100"/>

              <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl">
                  {f.icon}
                </div>

                <h3 className="mb-3 text-2xl font-bold">{f.title}</h3>

                <p className="leading-7 text-gray-400">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
