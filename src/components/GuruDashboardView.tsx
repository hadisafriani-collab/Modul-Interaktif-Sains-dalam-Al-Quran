import React, { useState } from "react";
import { Users, FileText, Download, TrendingUp, CheckCircle, BarChart, ShieldCheck } from "lucide-react";
import { UserStats } from "../types";

interface GuruDashboardProps {
  userStats: UserStats;
}

export default function GuruDashboardView({ userStats }: GuruDashboardProps) {
  // Let's create some representative classmates for students stats monitoring
  const classmates = [
    { name: "Ahmad Jalaluddin", progress: 8, points: 680, quizScore: 93, lkpdStatus: "Selesai", level: "Eco Guardian" },
    { name: "Sarah Humaira", progress: 8, points: 640, quizScore: 87, lkpdStatus: "Selesai", level: "Eco Guardian" },
    { name: "Zuhair Al-Hafiz", progress: 6, points: 420, quizScore: 78, lkpdStatus: "Revisi Tahap 4", level: "Scientist" },
    { name: "Najwa Shihabuddin", progress: 5, points: 310, quizScore: 70, lkpdStatus: "Revisi Tahap 3", level: "Explorer" },
    // Inject current user statistics dynamically so the teacher can see the student in real-time
    {
      name: "Siswa Aktif (Saya)",
      progress: userStats.completedMaterials.length,
      points: userStats.points,
      quizScore: userStats.score || 0,
      lkpdStatus: userStats.lkpdAnswers.tahap5Refleksi ? "Selesai" : "Proses Tahap " + (userStats.completedMaterials.length ? Math.min(5, userStats.completedMaterials.length + 1) : 1),
      level: userStats.level
    }
  ];

  const handleExportExcel = () => {
    alert("Daftar rekap nilai siswa biologi kelas X berhasil dipersiapkan. Spreadsheet Excel (.xlsx) diunduh ke folder Downloads Anda.");
  };

  const handleExportPDF = () => {
    alert("Lembar rekapitulasi penilaian kurikulum Merdeka Sains Al-Qur'an siap dicetak. Berkas PDF diunduh dan diarsipkan.");
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl w-full">
      <div className="border-b border-slate-800 pb-4 mb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <Users className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-amber-200">
              Dashboard Rekapitulasi Penilaian Guru
            </h2>
            <p className="text-xs text-slate-400">Monitoring real-time aktivitas belajar siswa, rekap skor kuis, dan analisis portofolio LKPD PBL.</p>
          </div>
        </div>

        {/* Action simulators export tools */}
        <div className="flex gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-705 text-emerald-400 hover:text-white rounded-xl text-xs font-semibold cursor-pointer border border-slate-700/60"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor Excel</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-705 text-amber-400 hover:text-white rounded-xl text-xs font-semibold cursor-pointer border border-slate-700/60"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Ekspor PDF</span>
          </button>
        </div>
      </div>

      {/* Grid of aggregated school stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <span className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <TrendingUp className="w-5 h-5" />
          </span>
          <div>
            <span className="text-slate-400 text-[10px] block font-mono">Ketuntasan Klasikal:</span>
            <strong className="text-slate-100 font-bold block mt-0.5">85% KKM</strong>
          </div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <span className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
            <Users className="w-5 h-5" />
          </span>
          <div>
            <span className="text-slate-400 text-[10px] block font-mono">Siswa Terdaftar:</span>
            <strong className="text-slate-100 font-bold block mt-0.5">5 Siswa (Aktif)</strong>
          </div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <span className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
            <CheckCircle className="w-5 h-5" />
          </span>
          <div>
            <span className="text-slate-400 text-[10px] block font-mono">Penyelesaian LKPD PBL:</span>
            <strong className="text-slate-100 font-bold block mt-0.5">3 dari 5 Siswa</strong>
          </div>
        </div>

        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 flex items-center space-x-3">
          <span className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-slate-400 text-[10px] block font-mono">Rata-rata Kelas Kuis:</span>
            <strong className="text-slate-100 font-bold block mt-0.5">84.5 Poin</strong>
          </div>
        </div>
      </div>

      {/* Interactive roster analysis table */}
      <div className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold font-mono text-slate-400">GURU ROSTER: Kelas X-A (Fase E Biologi Quran)</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded">Tahun Ajaran 2026/2027</span>
        </div>

        <div className="overflow-x-auto text-xs text-slate-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-medium">
                <th className="p-3">Nama Lengkap Siswa</th>
                <th className="p-3 text-center">Materi Terbaca</th>
                <th className="p-3 text-center">Poin Belajar</th>
                <th className="p-3 text-center">Skor Kuis Akhir</th>
                <th className="p-3 text-center">Penilaian LKPD</th>
                <th className="p-3">Rank Tingkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-200">
              {classmates.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-900/15">
                  <td className="p-3 font-bold">{student.name}</td>
                  <td className="p-3 text-center text-emerald-400 font-mono">{student.progress} / 8 Modul</td>
                  <td className="p-3 text-center text-amber-500 font-mono">{student.points} XP</td>
                  <td className="p-3 text-center text-sky-400 font-mono">{student.quizScore}/100</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      student.lkpdStatus === "Selesai"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-amber-500/15 text-amber-400"
                    }`}>
                      {student.lkpdStatus}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400">{student.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
