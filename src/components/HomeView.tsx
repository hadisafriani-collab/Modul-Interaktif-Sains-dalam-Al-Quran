import React, { useState } from "react";
import { Sprout, BookOpen, HelpCircle, Award, Compass, ArrowRight, UserCheck, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  onStart: (view: string) => void;
  onOpenManual: () => void;
  onOpenAbout: () => void;
}

export default function HomeView({ onStart, onOpenManual, onOpenAbout }: HomeViewProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-4 overflow-hidden bg-radial from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl border border-emerald-500/30 shadow-2xl">
      
      {/* Dynamic Swirling SVG Leaves Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <style>{`
          @keyframes floatLeaf1 {
            0% { transform: translateY(110vh) translateX(-20px) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-10vh) translateX(50px) rotate(360deg); opacity: 0; }
          }
          @keyframes floatLeaf2 {
            0% { transform: translateY(110vh) translateX(100px) rotate(180deg); opacity: 0; }
            15% { opacity: 0.7; }
            85% { opacity: 0.7; }
            100% { transform: translateY(-10vh) translateX(-80px) rotate(-180deg); opacity: 0; }
          }
          @keyframes floatLeaf3 {
            0% { transform: translateY(110vh) translateX(50vw) rotate(45deg); opacity: 0; }
            20% { opacity: 0.9; }
            80% { opacity: 0.9; }
            100% { transform: translateY(-10vh) translateX(55vw) rotate(400deg); opacity: 0; }
          }
          .leaf-1 { animation: floatLeaf1 18s infinite linear; }
          .leaf-2 { animation: floatLeaf2 25s infinite linear; }
          .leaf-3 { animation: floatLeaf3 21s infinite linear; }
        `}</style>

        {/* Dynamic biological leaves with golden hues */}
        <div className="absolute left-[10%] leaf-1">
          <svg className="w-12 h-12 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9,18C12,20 13.5,15.5 17,12C18,11 20,10 21,8C21,8 21,6 19,6C17,6 17,8 17,8Z"/>
          </svg>
        </div>
        <div className="absolute left-[30%] leaf-2" style={{ animationDelay: "5s" }}>
          <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9,18C12,20 13.5,15.5 17,12C18,11 20,10 21,8C21,8 21,6 19,6C17,6 17,8 17,8Z"/>
          </svg>
        </div>
        <div className="absolute left-[65%] leaf-3">
          <svg className="w-14 h-14 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93h2c0 2.76 2.24 5 5 5s5-2.24 5-5h2c0 4.08-3.05 7.44-7 7.93V19z"/>
          </svg>
        </div>
        <div className="absolute right-[15%] leaf-1" style={{ animationDelay: "9s" }}>
          <svg className="w-12 h-12 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L9,18C12,20 13.5,15.5 17,12C18,11 20,10 21,8C21,8 21,6 19,6C17,6 17,8 17,8Z"/>
          </svg>
        </div>
      </div>

      {/* Modern Islamic Header Badge decoration */}
      <div className="z-10 bg-amber-500/10 border border-amber-400/30 px-6 py-2 rounded-full mb-6 flex items-center space-x-2 backdrop-blur-md">
        <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">Kurikulum Merdeka • Kelas X Fase E</span>
      </div>

      {/* Main Educational Title Header */}
      <div className="z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-sky-300 drop-shadow">
          Modul Interaktif Sains Berbasis Problem Based Learning (PBL)
        </h1>
        <p className="text-md md:text-xl text-emerald-300 mt-3 font-medium tracking-wide">
          Memahami Materi Tumbuhan (Plantae) Berdasarkan Al-Qur'an
        </p>

        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-amber-400 to-transparent my-6"></div>

        {/* Authorship & Supervisor Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center items-stretch w-full max-w-2xl px-4">
          <div className="flex-1 bg-slate-900/50 backdrop-blur border border-emerald-500/20 rounded-2xl px-6 py-4 shadow-inner text-center sm:text-left flex flex-col justify-between">
            <div>
              <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold">Penyusun Utama</p>
              <p className="text-base font-bold text-slate-100 flex items-center justify-center sm:justify-start space-x-2 mt-1.5">
                <UserCheck className="w-4.5 h-4.5 text-amber-400 shrink-0" />
                <span>Hadi Safriani</span>
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2">Mahasiswa Magister Pendidikan IPA Universitas Syiah Kuala</p>
          </div>

          <div className="flex-1 bg-slate-900/50 backdrop-blur border border-emerald-500/20 rounded-2xl px-6 py-4 shadow-inner text-center sm:text-left flex flex-col justify-between">
            <div>
              <p className="text-xs text-sky-400 uppercase tracking-widest font-bold">Dosen Pengampu</p>
              <p className="text-base font-bold text-slate-100 flex items-center justify-center sm:justify-start space-x-2 mt-1.5">
                <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Prof. Dr. Saminan, M.Pd</span>
              </p>
            </div>
            <p className="text-xs text-slate-400 mt-2">Universitas Syiah Kuala, Banda Aceh</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="z-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl px-4">
        <button
          id="btn-mulai-belajar"
          onClick={() => onStart("materi")}
          className="group relative flex items-center justify-center space-x-3 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-lg rounded-2xl shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition cursor-pointer"
        >
          <span className="text-slate-900 font-extrabold">Mulai Belajar</span>
          <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          id="btn-profil-modul"
          onClick={onOpenAbout}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-slate-900/80 border border-emerald-500/30 hover:bg-slate-800 text-emerald-300 hover:text-white rounded-2xl font-semibold transition"
        >
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Profil Modul</span>
        </button>

        <button
          id="btn-petunjuk-penggunaan"
          onClick={onOpenManual}
          className="flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-4 bg-slate-900/80 border border-emerald-500/30 hover:bg-slate-800 text-emerald-300 hover:text-white rounded-2xl font-semibold transition"
        >
          <HelpCircle className="w-5 h-5 text-sky-400" />
          <span>Petunjuk Penggunaan</span>
        </button>
      </div>

      {/* Tiny decorative footer details */}
      <p className="z-10 mt-14 text-emerald-500/60 text-xs font-mono">
        Problem Based Learning • USK Syiah Kuala • © 2026
      </p>
    </div>
  );
}
