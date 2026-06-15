import React, { useState, useEffect } from "react";
import { Sprout, BookOpen, Compass, Award, Users, Brain, Layout, ClipboardList, HelpCircle, Info, Sparkles, Star, Bot, X, Calendar } from "lucide-react";
import { UserStats } from "./types";
import HomeView from "./components/HomeView";
import ProfilModulView from "./components/ProfilModulView";
import MateriView from "./components/MateriView";
import VirtualLabView from "./components/VirtualLabView";
import LkpdView from "./components/LkpdView";
import QuizView from "./components/QuizView";
import RefleksiDigitalView from "./components/RefleksiDigitalView";
import GuruDashboardView from "./components/GuruDashboardView";
import PlantQuranAiView from "./components/PlantQuranAiView";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("landing"); // landing, materi, lab, lkpd, quiz, journal, guru, profil
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAiTutor, setShowAiTutor] = useState(false);
  const [aiTutorPromptHint, setAiTutorPromptHint] = useState("");

  const [userStats, setUserStats] = useState<UserStats>({
    points: 0,
    level: "Pemula",
    completedMaterials: [],
    completedQuizzes: false,
    score: 0,
    badges: [],
    lkpdAnswers: {
      tahap1: { q1: "", q2: "", q3: "" },
      tahap2Notes: [],
      tahap2GroupName: "",
      tahap2GroupMembers: "",
      tahap2PresentationNotes: "",
      tahap2Table: [
        { no: 1, ayat: "QS. An Nahl : 11", isiPesan: "", keterkaitan: "" },
        { no: 2, ayat: "QS. Al An'am : 99", isiPesan: "", keterkaitan: "" }
      ],
      tahap3Table: [],
      tahap4MindMap: { nodes: [] },
      tahap5Refleksi: ""
    },
    reflectionJournal: {
      knowledge: "",
      q2: "",
      q3: "",
      q4: "",
      attitude: "",
      q6: "",
      action: "",
      q8: "",
      q9: "",
      selfAssessment: {
        p1: null,
        p2: null,
        p3: null,
        p4: null,
        p5: null
      }
    }
  });

  // Level Progression calculator
  useEffect(() => {
    let finalLevel: "Pemula" | "Explorer" | "Scientist" | "Eco Guardian";
    const pts = userStats.points;

    if (pts < 150) {
      finalLevel = "Pemula";
    } else if (pts >= 150 && pts < 350) {
      finalLevel = "Explorer";
    } else if (pts >= 350 && pts < 650) {
      finalLevel = "Scientist";
    } else {
      finalLevel = "Eco Guardian";
    }

    if (userStats.level !== finalLevel) {
      setUserStats((prev) => ({ ...prev, level: finalLevel }));
    }
  }, [userStats.points]);

  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...newStats }));
  };

  const handleAskTutorHintFromMateri = (hintQuestion: string) => {
    setAiTutorPromptHint(hintQuestion);
    setShowAiTutor(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Upper Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-emerald-500/10 px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Brand identity */}
        <button
          onClick={() => {
            setCurrentView("landing");
            setShowAiTutor(false);
          }}
          className="flex items-center space-x-2.5 hover:opacity-85 transition text-left cursor-pointer group"
        >
          <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl group-hover:bg-emerald-500/20 transition">
            <Sprout className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-sm md:text-base font-extrabold text-slate-100 uppercase tracking-tight font-serif">Plantae & Al-Qur'an</h1>
            <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase block">Problem Based Learning • USK</span>
          </div>
        </button>

        {/* Global Gamification Panel display (XP, Levels, Badges) */}
        {currentView !== "landing" && (
          <div className="flex flex-wrap items-center gap-3">
            
            {/* XP Points badges */}
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-mono text-xs font-extrabold text-amber-400">{userStats.points} <span className="text-[9px] text-slate-500">POIN</span></span>
            </div>

            {/* Level Rank badges */}
            <div className="bg-emerald-500/15 border border-emerald-500/20 px-3.5 py-1.5 rounded-xl flex items-center space-x-2">
              <span className="text-[9px] uppercase font-bold text-emerald-500 tracking-wider">Level:</span>
              <span className="text-xs font-extrabold text-emerald-400 font-serif capitalize">{userStats.level}</span>
            </div>

            {/* Classmates Teacher View quick access */}
            <button
              onClick={() => setCurrentView("guru")}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer border ${
                currentView === "guru"
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-slate-950 border-slate-800 text-purple-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              👩‍🏫 Guru
            </button>

            {/* PlantQuran AI instant float activator */}
            <button
              id="activate-ai-tutor-bubble"
              onClick={() => setShowAiTutor(!showAiTutor)}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-xl flex items-center space-x-1 transition cursor-pointer shadow-lg"
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">Tanya AI</span>
            </button>
          </div>
        )}
      </header>

      {/* Main learning workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 flex flex-col items-center">
        
        {/* LANDING View */}
        {currentView === "landing" && (
          <HomeView
            onStart={(v) => {
              setCurrentView(v);
              setUserStats((prev) => ({ ...prev, points: prev.points + 20 })); // trigger registration reward
            }}
            onOpenManual={() => setShowManualModal(true)}
            onOpenAbout={() => setCurrentView("profil")}
          />
        )}

        {/* PROFIL View */}
        {currentView === "profil" && (
          <ProfilModulView onClose={() => setCurrentView("landing")} />
        )}

        {/* MAIN SIDEBAR NAVIGATOR once registered */}
        {currentView !== "landing" && currentView !== "profil" && (
          <div className="w-full space-y-6">
            
            {/* Dashboard category chooser bar */}
            <div className="flex overflow-x-auto pb-1 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-850 gap-2 scrollbar-none items-center justify-start max-w-full">
              
              <button
                onClick={() => setCurrentView("materi")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition cursor-pointer ${
                  currentView === "materi" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Materi Interaktif</span>
              </button>

              <button
                onClick={() => setCurrentView("lab")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition cursor-pointer ${
                  currentView === "lab" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Virtual Lab</span>
              </button>

              <button
                onClick={() => setCurrentView("lkpd")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition cursor-pointer ${
                  currentView === "lkpd" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>LKPD Digital PBL</span>
              </button>

              <button
                onClick={() => setCurrentView("quiz")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition cursor-pointer ${
                  currentView === "quiz" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Kuis Interaktif</span>
              </button>

              <button
                onClick={() => setCurrentView("journal")}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm whitespace-nowrap transition cursor-pointer ${
                  currentView === "journal" ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Refleksi Peserta Didik</span>
              </button>
            </div>

            {/* Dynamic Segment routing rendering */}
            <div className="transition-all duration-300">
              {currentView === "materi" && (
                <MateriView
                  userStats={userStats}
                  onUpdateStats={handleUpdateStats}
                  onAskTutor={handleAskTutorHintFromMateri}
                />
              )}

              {currentView === "lab" && <VirtualLabView />}

              {currentView === "lkpd" && (
                <LkpdView userStats={userStats} onUpdateStats={handleUpdateStats} />
              )}

              {currentView === "quiz" && (
                <QuizView userStats={userStats} onUpdateStats={handleUpdateStats} />
              )}

              {currentView === "journal" && (
                <RefleksiDigitalView userStats={userStats} onUpdateStats={handleUpdateStats} />
              )}

              {currentView === "guru" && (
                <GuruDashboardView userStats={userStats} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Floating PlantQuran AI Side panel drawer */}
      {showAiTutor && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-slate-900 border-l border-emerald-500/20 shadow-2xl flex flex-col no-print">
          <div className="p-3 border-b border-slate-800 flex justify-end">
            <button
              onClick={() => {
                setShowAiTutor(false);
                setAiTutorPromptHint("");
              }}
              className="p-1 px-3 bg-slate-850 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition flex items-center space-x-1 text-xs"
            >
              <X className="w-4 h-4" />
              <span>Tutup Panel AI</span>
            </button>
          </div>
          <div className="flex-1 overflow-hidden p-2">
            <PlantQuranAiView currentContext={currentView} />
          </div>
        </div>
      )}

      {/* Manual Modal Dialog */}
      {showManualModal && (
        <div className="fixed inset-0 z-55 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-3xl max-w-lg w-full relative space-y-4 shadow-2xl">
            <button
              onClick={() => setShowManualModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <span className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg">
                <Info className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-100 text-lg">Petunjuk Penggunaan Aplikasi</h3>
            </div>

            <div className="space-y-3 text-xs md:text-sm text-slate-300">
              <p>Maa Syaa Allah! Ikuti langkah-langkah di bawah ini untuk mengasimilasi materi botani Al-Qur'an secara jaya:</p>
              
              <ul className="space-y-2 font-medium">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Modul Materi:</strong> Jelajahi 8 pokok materi, nikmati bacaan klorofil/akar beserta naskah audio melodi visualnya. Jawab esai Refleksi untuk mengantongi poinXP.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Virtual Lab:</strong> Geser kontrol air, karbon, dan kepekatan cahaya matahari untuk membuktikan rahasia biologis fotosintesis real-time.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>LKPD PBL:</strong> Isi 5 rentetan tugas penyelidikan kelompok pemecah masalah, catat herbar specimen, rakit mind-map dan dapatkan lencana riset.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span><strong>Kuis & Sertifikat:</strong> Buktikan asimilasi kognitif Anda dengan menjawab 30 soal ujian akhir. Jika nilai Anda mencapai &gt;80, terbitkan sertifikat kelulusan emas bertanda tangan USK.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setShowManualModal(false)}
              className="w-full py-3 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-2xl transition cursor-pointer"
            >
              Saya Paham, Mulai Belajar!
            </button>
          </div>
        </div>
      )}

      {/* Footer credits segment */}
      <footer className="bg-slate-950 border-t border-slate-850 py-4 text-center text-[10px] text-slate-600 font-mono no-print">
        Plantae & Al-Qur'an PBL Module Class X • Hadi Safriani USK Syiah Kuala Banda Aceh • Powered by Google Gemini AI
      </footer>
    </div>
  );
}
