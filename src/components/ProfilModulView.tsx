import React, { useState } from "react";
import { Book, Award, Target, Sparkles, GraduationCap, X } from "lucide-react";

interface ProfilModulViewProps {
  onClose: () => void;
}

export default function ProfilModulView({ onClose }: ProfilModulViewProps) {
  const [activeTab, setActiveTab] = useState<"identitas" | "cp" | "tp" | "novelty">("identitas");

  const cardDetails = {
    identitas: {
      title: "Identitas Modul",
      icon: <GraduationCap className="w-10 h-10 text-emerald-400" />,
      content: (
        <div className="space-y-4 text-slate-300">
          <div className="bg-slate-950/40 p-4 rounded-xl border border-emerald-500/10">
            <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider">Judul Pengembangan:</span>
            <p className="font-semibold text-slate-100 text-sm mt-1">
              Modul Interaktif Sains Berbasis Problem Based Learning (PBL) dalam Memahami Materi Tumbuhan (Plantae) Berdasarkan Al-Qur'an
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-700/25">
              <span className="text-xs uppercase text-amber-400 font-bold tracking-wider">Penyusun:</span>
              <p className="font-medium text-slate-200 mt-0.5">Hadi Safriani</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-700/25">
              <span className="text-xs uppercase text-teal-400 font-bold tracking-wider">Dosen Pengampu:</span>
              <p className="font-medium text-slate-200 mt-0.5">Prof. Dr. Saminan, M.Pd</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-700/25">
              <span className="text-xs uppercase text-sky-400 font-bold tracking-wider">Sasaran Siswa:</span>
              <p className="font-medium text-slate-200 mt-0.5">SMA/MA Kelas X Fase E</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-700/25">
              <span className="text-xs uppercase text-rose-400 font-bold tracking-wider">Universitas / Program:</span>
              <p className="font-medium text-slate-200 mt-0.5">Mahasiswa Universitas Syiah Kuala, Banda Aceh</p>
            </div>
            <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-700/25 md:col-span-2">
              <span className="text-xs uppercase text-indigo-400 font-bold tracking-wider">Model Pembelajaran:</span>
              <p className="font-medium text-slate-200 mt-0.5">Problem Based Learning (PBL)</p>
            </div>
          </div>
        </div>
      )
    },
    cp: {
      title: "Capaian Pembelajaran (CP)",
      icon: <Award className="w-10 h-10 text-amber-400" />,
      content: (
        <div className="space-y-4 text-slate-300">
          <p className="text-sm italic text-slate-400">"Siswa SMA/MA Kelas X mampu mengindentifikasi, mengklasifikasi, menganalisis struktur fungsional jaringan serta memahami kelangsungan hidup ekosistem tumbuhan (Plantae)..."</p>
          <div className="bg-slate-950/40 p-4 rounded-xl border border-amber-500/10 space-y-2">
            <li className="list-none flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Menilai fenomena keberagamaan botani dari sudut pandang biologis murni dan diintegrasikan dengan pemikiran Teologis.</span>
            </li>
            <li className="list-none flex items-start space-x-2">
              <span className="text-amber-500 mt-1">•</span>
              <span>Mengevaluasi isu perusakan hutan (deforestasi) secara saintifik dan moral berlandaskan kaidah penjagaan bumi.</span>
            </li>
          </div>
        </div>
      )
    },
    tp: {
      title: "Tujuan Pembelajaran (TP)",
      icon: <Target className="w-10 h-10 text-sky-400" />,
      content: (
        <div className="space-y-3 text-slate-300">
          <p className="text-sm font-semibold text-slate-200">Setelah menuntaskan modul interaktif ini, siswa diharapkan dapat:</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-3">
              <span className="px-2 py-0.5 h-6 bg-emerald-500/20 text-emerald-300 rounded text-xs font-bold font-mono">1</span>
              <span>Menguraikan 8 materi esensial Plantae secara saintifik modern dengan akurat.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="px-2 py-0.5 h-6 bg-amber-500/20 text-amber-300 rounded text-xs font-bold font-mono">2</span>
              <span>Menghubungkan biological facts tumbuhan dengan ayat-ayat Al-Qur'an secara kontekstual.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="px-2 py-0.5 h-6 bg-sky-500/20 text-sky-300 rounded text-xs font-bold font-mono">3</span>
              <span>Memecahkan isu-isu kelestarian botani melalui langkah-langkah investigasi PBL terstruktur.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="px-2 py-0.5 h-6 bg-purple-500/20 text-purple-300 rounded text-xs font-bold font-mono">4</span>
              <span>Menumbuhkan keimanan mendalam terhadap kebenaran mutlak Al-Qur'an melalui ciptaan di alam semesta.</span>
            </li>
          </ul>
        </div>
      )
    },
    novelty: {
      title: "Novelty & Keunggulan",
      icon: <Sparkles className="w-10 h-10 text-purple-400" />,
      content: (
        <div className="space-y-4 text-slate-300">
          <p className="text-sm">Inovasi terkini yang ditawarkan modul digital ini meliputi:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-xl">
              <h4 className="font-bold text-emerald-400 text-sm">Integrasi Al-Qur'an-Sains</h4>
              <p className="text-xs text-slate-400 mt-1">Menggabungkan ayat suci relevan dengan detail fungsional biokimiawi sel tanaman secara selaras.</p>
            </div>
            <div className="bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl">
              <h4 className="font-bold text-amber-400 text-sm">Metodologi PBL Digital</h4>
              <p className="text-xs text-slate-400 mt-1">Urutan belajar membimbing siswa secara langsung memecahkan masalah ekologis nyata.</p>
            </div>
            <div className="bg-sky-950/20 border border-sky-500/20 p-3 rounded-xl">
              <h4 className="font-bold text-sky-400 text-sm">Virtual Laboratory</h4>
              <p className="text-xs text-slate-400 mt-1">Eksperimen digital interaktif memanipulasi pelevelan fotosintesis secara visual.</p>
            </div>
            <div className="bg-purple-950/20 border border-purple-500/20 p-3 rounded-xl">
              <h4 className="font-bold text-purple-400 text-sm">AI Tutor terintegrasi</h4>
              <p className="text-xs text-slate-400 mt-1">Tutor cerdas PlantQuran AI membimbing siswa kapan saja saat butuh konseptual.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Book className="w-6 h-6" />
          </span>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-amber-200">
            Profil & Struktur Modul
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tab column */}
        <div className="flex flex-row lg:flex-col lg:space-y-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-2 border-b lg:border-b-0 lg:border-r border-slate-700/50 pr-0 lg:pr-4">
          {(Object.keys(cardDetails) as Array<keyof typeof cardDetails>).map((key) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition cursor-pointer w-full text-left ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-950 to-emerald-900/60 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <span className="text-lg">
                  {key === "identitas" && "📋"}
                  {key === "cp" && "🏆"}
                  {key === "tp" && "🎯"}
                  {key === "novelty" && "✨"}
                </span>
                <span>{cardDetails[key].title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Display column */}
        <div className="lg:col-span-3 min-h-[300px] flex flex-col justify-between bg-slate-950/20 border border-slate-800 p-6 rounded-2xl">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {cardDetails[activeTab].icon}
              <h3 className="text-xl font-bold text-slate-100">{cardDetails[activeTab].title}</h3>
            </div>
            
            <hr className="border-slate-800" />
            
            <div>{cardDetails[activeTab].content}</div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 rounded-xl font-bold text-sm transition cursor-pointer"
            >
              Mulai Eksplorasi Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
