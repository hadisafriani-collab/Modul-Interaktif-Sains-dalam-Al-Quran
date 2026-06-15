import React, { useState } from "react";
import { ClipboardList, AlertTriangle, Users, BookOpen, PenTool, Layout, Layers, Plus, Trash2, CheckCircle2, FileUp, Sliders, Video, Flame, TreeDeciduous, RefreshCw, Eye, Globe, Droplets, Play, Pause } from "lucide-react";
import { UserStats } from "../types";

interface LkpdViewProps {
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function LkpdView({ userStats, onUpdateStats }: LkpdViewProps) {
  const [activeStage, setActiveStage] = useState<number>(1);

  // Stage 1: Orientasi Masalah State
  const [q1, setQ1] = useState(userStats.lkpdAnswers.tahap1.q1 || "");
  const [q2, setQ2] = useState(userStats.lkpdAnswers.tahap1.q2 || "");
  const [q3, setQ3] = useState(userStats.lkpdAnswers.tahap1.q3 || "");

  // Forest simulator variables
  const [deforestation, setDeforestation] = useState<number>(35); // 0 to 100%
  const [fireSeverity, setFireSeverity] = useState<number>(20); // 0 to 100%
  const [selectedPreset, setSelectedPreset] = useState<string>("custom");

  // Stage 1 dynamic view tab: "simulator" or "video"
  const [stage1View, setStage1View] = useState<"simulator" | "video">("simulator");

  // Stage 2: Group Discussion State
  const [groupName, setGroupName] = useState(userStats.lkpdAnswers.tahap2GroupName || "");
  const [groupMembers, setGroupMembers] = useState(userStats.lkpdAnswers.tahap2GroupMembers || "");
  const [presentationNotes, setPresentationNotes] = useState(userStats.lkpdAnswers.tahap2PresentationNotes || "");
  const [discussionTable, setDiscussionTable] = useState(
    userStats.lkpdAnswers.tahap2Table || [
      { no: 1, ayat: "QS. An Nahl : 11", isiPesan: "", keterkaitan: "" },
      { no: 2, ayat: "QS. Al An'am : 99", isiPesan: "", keterkaitan: "" }
    ]
  );

  // Stage 3: Investigation specimens
  const [tableRows, setTableRows] = useState(userStats.lkpdAnswers.tahap3Table || [
    { id: "1", name: "Kaktus", characteristics: "Daun berbentuk duri, batang sukulen menyimpan cadangan air", quranBenefit: "Bertahan di tanah merana (QS. Al-A'raf: 58)", condition: "Sehat" as const },
    { id: "2", name: "Pohon Tin / Ara", characteristics: "Memiliki getah pekat, akar menjalar dalam menyerap air batuan", quranBenefit: "Manfaat kesehatan pencernaan prima (QS. At-Tin: 1)", condition: "Sehat" as const }
  ]);
  const [newSpecimenName, setNewSpecimenName] = useState("");
  const [newSpecimenChars, setNewSpecimenChars] = useState("");
  const [newSpecimenBenefit, setNewSpecimenBenefit] = useState("");
  const [newSpecimenCondition, setNewSpecimenCondition] = useState<"Sehat" | "Layu" | "Kering" | "Terancam">("Sehat");

  // Stage 4: Mindmap state
  const [mindmapNodes, setMindmapNodes] = useState(userStats.lkpdAnswers.tahap4MindMap.nodes || [
    { id: "1", label: "Dampak Deforestasi bagi Plantae", x: 150, y: 75 },
    { id: "2", label: "Klorosis Daun Massal", x: 50, y: 150 },
    { id: "3", label: "Kepunahan Sumber Obat Alami", x: 250, y: 150 }
  ]);
  const [newNodeLabel, setNewNodeLabel] = useState("");

  // Stage 5: Evaluation essay
  const [evaluationText, setEvaluationText] = useState(userStats.lkpdAnswers.tahap5Refleksi || "");

  const saveStageProgress = (stage: number) => {
    // Collect stats
    const updatedAnswers = {
      ...userStats.lkpdAnswers,
      tahap1: { q1, q2, q3 },
      tahap2GroupName: groupName,
      tahap2GroupMembers: groupMembers,
      tahap2PresentationNotes: presentationNotes,
      tahap2Table: discussionTable,
      tahap3Table: tableRows,
      tahap4MindMap: { nodes: mindmapNodes },
      tahap5Refleksi: evaluationText
    };

    const lkpdStageRewardPoints = 60;
    const currentPoints = userStats.points;
    const currentBadges = [...userStats.badges];

    // Trigger young researcher badge if they reached late stages
    if (stage >= 3 && !currentBadges.includes("peneliti_muda")) {
      currentBadges.push("peneliti_muda");
    }

    // Trigger Eco Guardian badge if Stage 5 completed
    if (stage === 5 && !currentBadges.includes("penjaga_lingkungan")) {
      currentBadges.push("penjaga_lingkungan");
    }

    onUpdateStats({
      points: currentPoints + lkpdStageRewardPoints,
      lkpdAnswers: updatedAnswers,
      badges: currentBadges
    });

    alert(`Progres LKPD Tahap ${stage} berhasil disimpan! Anda mendapatkan tambahan +60 Poin belajar.`);
    if (stage < 5) {
      setActiveStage(stage + 1);
    }
  };

  const updateDiscussionRow = (index: number, field: "isiPesan" | "keterkaitan", value: string) => {
    const updated = [...discussionTable];
    updated[index] = { ...updated[index], [field]: value };
    setDiscussionTable(updated);
  };

  const addSpecimen = () => {
    if (!newSpecimenName.trim()) return;
    setTableRows([
      ...tableRows,
      {
        id: Date.now().toString(),
        name: newSpecimenName,
        characteristics: newSpecimenChars,
        quranBenefit: newSpecimenBenefit,
        condition: newSpecimenCondition
      }
    ]);
    setNewSpecimenName("");
    setNewSpecimenChars("");
    setNewSpecimenBenefit("");
  };

  const removeSpecimen = (id: string) => {
    setTableRows(tableRows.filter((r) => r.id !== id));
  };

  const addMindmapNode = () => {
    if (!newNodeLabel.trim()) return;
    setMindmapNodes([
      ...mindmapNodes,
      {
        id: Date.now().toString(),
        label: newNodeLabel,
        x: Math.floor(Math.random() * 200) + 50,
        y: Math.floor(Math.random() * 100) + 100
      }
    ]);
    setNewNodeLabel("");
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl w-full">
      {/* Stages navigation indicator */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 mb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <ClipboardList className="w-6 h-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-amber-200">
              LKPD Digital Berbasis PBL (Plantae)
            </h2>
            <p className="text-xs text-slate-400">Pecahkan isu kerusakan kelestarian botani secara ilmiah & Al-Qur'an.</p>
          </div>
        </div>

        {/* Dynamic Stage pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
          {[1, 2, 3, 4, 5].map((stg) => (
            <button
              key={stg}
              onClick={() => setActiveStage(stg)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                activeStage === stg ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Tahap {stg}
            </button>
          ))}
        </div>
      </div>

      {/* STAGE 1: Orientasi Masalah */}
      {activeStage === 1 && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 border border-amber-400/20 p-4 rounded-xl flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Masalah Ekologis: Degradasi Hutan (Deforestasi) & Kerusakan Tanah</h4>
              <p className="text-xs text-slate-400 mt-1">
                Allah berfirman: "Telah nampak kerusakan di darat dan di laut disebabkan karena perbuatan tangan manusia..." (QS. Ar-Rum: 41). Hancurnya pepohonan di Kalimantan dan Sumatra menginduksi hilangnya generator oksigen global.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* Visual Damage model simulation with embedded tabs */}
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800 p-5 space-y-4">
              {/* Tab Selector Buttons */}
              <div className="flex border-b border-slate-800 pb-3 justify-between items-center gap-2">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider font-mono">Panel Pembelajaran</span>
                <div className="flex gap-1.5 bg-slate-900 border border-slate-850 p-1 rounded-xl">
                  <button
                    id="btn-stage1-simulator"
                    onClick={() => setStage1View("simulator")}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      stage1View === "simulator"
                        ? "bg-emerald-500 text-slate-950"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Simulasi Interaktif</span>
                  </button>
                  <button
                    id="btn-stage1-video"
                    onClick={() => setStage1View("video")}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      stage1View === "video"
                        ? "bg-amber-500 text-slate-950"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Karhutla</span>
                  </button>
                </div>
              </div>

              {/* Tab 1 Content: Simulator */}
              {stage1View === "simulator" && (
                <div className="space-y-4">
                  <div className="bg-slate-950 border border-slate-800/80 py-4 px-6 rounded-2xl min-h-[190px] flex flex-col items-center justify-center relative overflow-hidden select-none">
                    <span className="text-[10px] text-rose-500 font-bold uppercase tracking-widest font-mono absolute top-2.5">
                      SIMULASI VISUALISASI KERUSAKAN HUTAN
                    </span>

                    {/* Responsive and beautiful SVG representation */}
                    <svg className="w-full max-w-[280px] h-36 mt-4 z-10" viewBox="0 0 200 100">
                      {/* Ground background */}
                      <rect x="0" y="70" width="200" height="30" fill={fireSeverity > 60 ? "#1C0A00" : deforestation > 60 ? "#2D1D16" : "#22120C"} />
                      <line x1="0" y1="70" x2="200" y2="70" stroke={fireSeverity > 40 ? "#C2410C" : "#451A03"} strokeWidth="2.5" />

                      {/* Tree 1: Left */}
                      {deforestation < 20 ? (
                        <g>
                          <rect x="25" y="45" width="6" height="25" fill="#78350F" />
                          <circle cx="28" cy="35" r="16" fill={fireSeverity > 50 ? "#B45309" : "#047857"} opacity={Math.max(0.1, 1 - (fireSeverity / 150))} />
                          {fireSeverity > 20 && <path d="M22,35 Q28,20 30,10 Q34,25 28,35" fill="#EF4444" className="animate-pulse" />}
                        </g>
                      ) : (
                        <g>
                          {/* Stump */}
                          <path d="M24,70 L26,55 L30,55 L32,70" fill="#4B2306" />
                          <circle cx="28" cy="55" r="2" fill="#C2410C" />
                          {fireSeverity > 10 && <path d="M24,55 Q28,45 30,35 Q32,45 28,55" fill="#EA580C" className="animate-pulse" />}
                        </g>
                      )}

                      {/* Tree 2: Center-Left */}
                      {deforestation < 45 ? (
                        <g>
                          <rect x="65" y="40" width="8" height="30" fill="#78350F" />
                          <circle cx="69" cy="28" r="20" fill={fireSeverity > 70 ? "#451A03" : fireSeverity > 30 ? "#D97706" : "#059669"} opacity={Math.max(0.1, 1 - (fireSeverity / 180))} />
                          {fireSeverity > 30 && <path d="M64,30 Q69,15 74,5 Q79,20 74,30" fill="#EF4444" className="animate-pulse" />}
                        </g>
                      ) : (
                        <g>
                          <path d="M64,70 L66,50 L72,50 L74,70" fill="#4B2306" />
                          {fireSeverity > 15 && <path d="M66,50 Q70,40 73,30 Q76,40 72,50" fill="#F59E0B" className="animate-pulse" />}
                        </g>
                      )}

                      {/* Tree 3: Center-Right */}
                      {deforestation < 70 ? (
                        <g>
                          <rect x="115" y="45" width="7" height="25" fill="#78350F" />
                          <circle cx="118" cy="35" r="18" fill={fireSeverity > 40 ? "#A16207" : "#0F766E"} opacity={Math.max(0.1, 1 - (fireSeverity / 140))} />
                          {fireSeverity > 15 && <path d="M112,35 Q118,22 122,12 Q126,25 120,35" fill="#EF4444" className="animate-pulse" />}
                        </g>
                      ) : (
                        <g>
                          <path d="M114,70 L116,55 L121,55 L123,70" fill="#4B2306" />
                          {fireSeverity > 5 && <path d="M115,55 Q119,45 122,35 Q125,45 121,55" fill="#EA580C" className="animate-pulse" />}
                        </g>
                      )}

                      {/* Tree 4: Right */}
                      {deforestation < 90 ? (
                        <g>
                          <rect x="160" y="50" width="5" height="20" fill="#78350F" />
                          <circle cx="162" cy="42" r="14" fill={fireSeverity > 60 ? "#1C0A00" : "#115E59"} opacity={Math.max(0.1, 1 - (fireSeverity / 160))} />
                          {fireSeverity > 40 && <path d="M157,42 Q162,28 165,18 Q169,28 163,42" fill="#F97316" className="animate-pulse" />}
                        </g>
                      ) : (
                        <g>
                          <path d="M159,70 L161,58 L164,58 L166,70" fill="#4B2306" />
                          {fireSeverity > 20 && <path d="M160,58 Q163,48 165,38 Q167,48 163,58" fill="#EF4444" className="animate-pulse" />}
                        </g>
                      )}

                      {/* Global Ash / Smoke effects based on fireSeverity */}
                      {fireSeverity > 10 && (
                        <g opacity={fireSeverity / 100}>
                          <ellipse cx="40" cy="15" rx="15" ry="5" fill="#475569" opacity="0.4" className="animate-pulse" />
                          <ellipse cx="140" cy="20" rx="25" ry="7" fill="#334155" opacity="0.5" className="animate-pulse" />
                        </g>
                      )}
                    </svg>

                    {/* Ambient light overlay */}
                    <div className="absolute inset-0 bg-red-950/5 pointer-events-none"></div>
                    <div className="absolute bottom-2 flex space-x-3 text-[10px] text-slate-400 font-mono">
                      <span>Carbon Sink: {Math.max(0, 100 - deforestation - (fireSeverity * 0.5)).toFixed(0)}%</span>
                      <span>•</span>
                      <span>Suhu Tanah: {28 + Math.round(fireSeverity * 0.7)}°C</span>
                    </div>
                  </div>

                  {/* Range sliders */}
                  <div className="space-y-3 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs mb-1 font-sans">
                        <span className="text-slate-300 flex items-center gap-1">
                          <TreeDeciduous className="w-4 h-4 text-emerald-400" />
                          <strong>Penebangan / Deforestasi:</strong>
                        </span>
                        <span className="font-mono font-bold text-rose-400">{deforestation}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={deforestation}
                        onChange={(e) => {
                          setDeforestation(parseInt(e.target.value));
                          setSelectedPreset("custom");
                        }}
                        className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-sans">
                        <span className="text-slate-300 flex items-center gap-1">
                          <Flame className="w-4 h-4 text-amber-500" />
                          <strong>Tingkat Kebakaran Hutan:</strong>
                        </span>
                        <span className="font-mono font-bold text-red-400">{fireSeverity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={fireSeverity}
                        onChange={(e) => {
                          setFireSeverity(parseInt(e.target.value));
                          setSelectedPreset("custom");
                        }}
                        className="w-full accent-amber-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Quick Presets */}
                    <div className="flex gap-1.5 pt-1 overflow-x-auto">
                      <button
                        onClick={() => {
                          setDeforestation(0);
                          setFireSeverity(0);
                          setSelectedPreset("healthy");
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded border transition cursor-pointer whitespace-nowrap ${
                          selectedPreset === "healthy"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                      >
                        Lestari (0%)
                      </button>
                      <button
                        onClick={() => {
                          setDeforestation(50);
                          setFireSeverity(20);
                          setSelectedPreset("logged");
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded border transition cursor-pointer whitespace-nowrap ${
                          selectedPreset === "logged"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                      >
                        Penebangan Liar (50%)
                      </button>
                      <button
                        onClick={() => {
                          setDeforestation(90);
                          setFireSeverity(95);
                          setSelectedPreset("disaster");
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded border transition cursor-pointer whitespace-nowrap ${
                          selectedPreset === "disaster"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : "bg-slate-950 text-slate-400 border-slate-800"
                        }`}
                      >
                        Malapetaka Karhutla
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2 Content: Video */}
              {stage1View === "video" && (
                <div className="space-y-3 text-slate-350">
                  <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-slate-800 relative shadow-2xl">
                    <iframe
                      src="https://www.youtube.com/embed/APOA1Wd7-18?si=KIBWdQOqQbCR4a48&rel=0&autoplay=0"
                      title="Dokumenter Kebakaran Hutan Indonesia"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800/80 p-3 rounded-xl text-[11px] leading-relaxed">
                    <p className="font-bold text-amber-400 mb-0.5 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 animate-pulse" />
                      Analisis Bio-Ekologi Kebakaran Hutan:
                    </p>
                    <p className="text-slate-400">
                      Suhu ekstrim membakar klorofil & stomata daun, memicu koagulasi koloid sitoplasma di floem. Tanah kehilangan pelindung kelembapan organiknya, sehingga bakteri penambat nitrogen lisis total. Ini memperingatkan manusia betapa rapuhnya rantai hara botani jika dilalap nafsu pembakaran lahan (QS. Ar-Rum: 41).
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Questions to log */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">1. Apa masalah ekologis utama yang terjadi pada ilustrasi hutan tersebut?</label>
                <textarea
                  id="lkpd-q1"
                  rows={2}
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  placeholder="Misalnya pembakaran lahan berakibat..."
                  className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">2. Apa penyebab biologis runtuhnya homeostasis (keseimbangan) hara tanah jika tanaman Plantae hangus?</label>
                <textarea
                  id="lkpd-q2"
                  rows={2}
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  placeholder="Ketiadaan akar pengikat air..."
                  className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">3. Bagaimana dampak bagi pasokan oksigen global berdasarkan dalil QS. Yasin: 80?</label>
                <textarea
                  id="lkpd-q3"
                  rows={2}
                  value={q3}
                  onChange={(e) => setQ3(e.target.value)}
                  placeholder="Ketiadaan klorofil kayu hijau pemproses foton..."
                  className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              id="save-pbl-stage-1"
              onClick={() => saveStageProgress(1)}
              disabled={!q1.trim() || !q2.trim() || !q3.trim()}
              className="px-6 py-2.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-sm transition disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer"
            >
              Simpan & Lanjut ke Tahap 2 (+60 Poin)
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: Mengorganisasi Peserta Didik */}
      {activeStage === 2 && (
        <div className="space-y-6">
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-2xl flex items-start space-x-3 shadow-lg">
            <Users className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-slate-100 text-sm uppercase tracking-wide">Tahap 2: Mengorganisasi Peserta Didik</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Kelompokkan diri Anda dan jalankan koordinasi silaturahmi & musyawarah (QS. Ali 'Imran: 159). Diskusikan pesan ekologi pada ayat suci yang ditugaskan.
              </p>
            </div>
          </div>

          {/* Group Identity Inputs */}
          <div className="bg-slate-950/40 border border-slate-800/85 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="group-name-input" className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Kelompok :
              </label>
              <input
                id="group-name-input"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Masukkan nama kelompok (contoh: Kelompok 1)..."
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="group-members-input" className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Nama Anggota Kelompok :
              </label>
              <textarea
                id="group-members-input"
                value={groupMembers}
                onChange={(e) => setGroupMembers(e.target.value)}
                placeholder="Tuliskan nama lengkap seluruh anggota..."
                rows={1}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition h-[45px] resize-none"
              />
            </div>
          </div>

          {/* Table Result Section */}
          <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-4">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Tuliskan hasil diskusi kelompok kalian pada tabel berikut :
            </div>

            <div className="overflow-x-auto w-full rounded-xl border border-slate-800">
              <table className="w-full border-collapse text-left text-xs text-slate-300">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono border-b border-slate-800">
                    <th className="py-3 px-4 font-bold w-12 text-center">No.</th>
                    <th className="py-3 px-4 font-bold w-48">Ayat Al-Quran</th>
                    <th className="py-3 px-4 font-bold">Isi/Pesan Ayat Al-Quran</th>
                    <th className="py-3 px-4 font-bold">Keterkaitan dengan tumbuhan dan lingkungan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/10">
                  {discussionTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/10 transition">
                      <td className="py-4 px-4 text-center font-mono text-slate-400">{row.no}</td>
                      <td className="py-4 px-4 font-bold text-slate-200">{row.ayat}</td>
                      <td className="py-3 px-3">
                        <textarea
                          rows={4}
                          value={row.isiPesan}
                          onChange={(e) => updateDiscussionRow(idx, "isiPesan", e.target.value)}
                          placeholder={`Tuliskan isi/pesan dari ${row.ayat}...`}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none transition leading-relaxed"
                        />
                      </td>
                      <td className="py-3 px-3">
                        <textarea
                          rows={4}
                          value={row.keterkaitan}
                          onChange={(e) => updateDiscussionRow(idx, "keterkaitan", e.target.value)}
                          placeholder={`Temukan korelasi botani-ekologi materi Plantae dengan ${row.ayat}...`}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-2.5 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none transition leading-relaxed"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Presentation Notes Section */}
          <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-2xl space-y-3">
            <label htmlFor="presentation-notes-input" className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Catatan Hasil Presentasi :
            </label>
            <textarea
              id="presentation-notes-input"
              value={presentationNotes}
              onChange={(e) => setPresentationNotes(e.target.value)}
              placeholder="Tuliskan catatan hasil presentasi atau tanggapan kelompok lain..."
              rows={5}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500 transition leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end pt-4 border-t border-slate-850">
            <button
              id="save-pbl-stage-2"
              onClick={() => saveStageProgress(2)}
              disabled={
                !groupName.trim() ||
                !groupMembers.trim() ||
                discussionTable.some((r) => !r.isiPesan.trim() || !r.keterkaitan.trim())
              }
              className="px-6 py-2.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-sm transition disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer animate-pulse"
            >
              Simpan & Lanjut ke Tahap 3 (+60 Poin)
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: Investigasi */}
      {activeStage === 3 && (
        <div className="space-y-6">
          <div className="bg-sky-950/20 border border-sky-500/20 p-4 rounded-xl flex items-start space-x-3">
            <BookOpen className="w-5 h-5 text-sky-400 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Membimbing Penyelidikan Mandiri: Lembar Investigasi Spesimen</h4>
              <p className="text-xs text-slate-400 mt-1">
                Ambillah/simulasikan upload spesimen botani lokal seputar Plantae Anda. Catat struktur sel morfologis beserta kebesaran faedahnya yang terintegrasi nilai Al-Qur'an pada tabel herba.
              </p>
            </div>
          </div>

          {/* Table specimen logs */}
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800">
                    <th className="p-3 font-semibold text-slate-400">Nama Tumbuhan</th>
                    <th className="p-3 font-semibold text-slate-400">Ciri-Ciri Utama</th>
                    <th className="p-3 font-semibold text-slate-400">Manfaat & Ayat Al-Qur'an</th>
                    <th className="p-3 font-semibold text-slate-400">Kondisi</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {tableRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-950/20">
                      <td className="p-3 font-bold text-slate-100">{row.name}</td>
                      <td className="p-3 text-slate-400 max-w-xs truncate">{row.characteristics}</td>
                      <td className="p-3 text-slate-400">{row.quranBenefit}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.condition === "Sehat"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/10"
                            : row.condition === "Terancam"
                            ? "bg-rose-500/15 text-rose-400 border border-rose-500/10"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/10"
                        }`}>
                          {row.condition}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeSpecimen(row.id)}
                          className="p-1 hover:bg-slate-800 text-rose-400 rounded transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Simulated specimen input block */}
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase block">Unggah & Tambah Data Spesimen Baru</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  id="specimen-name-input"
                  type="text"
                  value={newSpecimenName}
                  onChange={(e) => setNewSpecimenName(e.target.value)}
                  placeholder="Nama Tumbuhan (e.g. Teratai)"
                  className="bg-slate-900 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  id="specimen-chars-input"
                  type="text"
                  value={newSpecimenChars}
                  onChange={(e) => setNewSpecimenChars(e.target.value)}
                  placeholder="Ciri-ciri fungsional..."
                  className="bg-slate-900 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
                <input
                  id="specimen-benefit-input"
                  type="text"
                  value={newSpecimenBenefit}
                  onChange={(e) => setNewSpecimenBenefit(e.target.value)}
                  placeholder="Korelasi Ayat Al-Qur'an / Khasiat..."
                  className="bg-slate-900 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
                
                <select
                  id="specimen-condition-select"
                  value={newSpecimenCondition}
                  onChange={(e) => setNewSpecimenCondition(e.target.value as any)}
                  className="bg-slate-900 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Sehat">Sehat</option>
                  <option value="Layu">Layu</option>
                  <option value="Kering">Kering</option>
                  <option value="Terancam">Terancam</option>
                </select>
              </div>

              {/* Simulated speciman photo uploader tool */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                  <FileUp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>[Suhu Lapangan] Simulasi Upload Foto Herbarium</span>
                </div>

                <button
                  id="add-specimen-btn"
                  onClick={addSpecimen}
                  className="px-5 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-xs transition cursor-pointer shadow-lg"
                >
                  Sematkan Spesimen
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              id="save-pbl-stage-3"
              onClick={() => saveStageProgress(3)}
              className="px-6 py-2.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Simpan & Lanjut ke Tahap 4 (+60 Poin)
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: Penyajian Hasil */}
      {activeStage === 4 && (
        <div className="space-y-6">
          <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-xl flex items-start space-x-3">
            <PenTool className="w-5 h-5 text-purple-400 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Mengembangkan dan Menyajikan Hasil Karya: Mind Map Pemecahan Masalah</h4>
              <p className="text-xs text-slate-400 mt-1">
                Presentasikan alur pemikiran pencegahan kegawatan tanah silsilah Plantae kelompok Anda dalam panel pemetaan kognitif berikut.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mindmap inputs */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-500 font-mono block uppercase">Kelola Node Mind-Map</span>
              
              <div className="flex gap-2">
                <input
                  id="node-input"
                  type="text"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  placeholder="e.g. Kurangi emisi CO2..."
                  className="flex-1 bg-slate-950/60 border border-slate-800 text-slate-100 p-2 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  id="add-node-btn"
                  onClick={addMindmapNode}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-xs transition whitespace-nowrap cursor-pointer"
                >
                  Tambah Bubble
                </button>
              </div>

              <div className="bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <p className="font-semibold text-slate-300">Daftar Istilah Biologi Tersemat:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px]">Stomata CAM</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px]">Sponge Karbon</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px]">Asimilasi Glukosa</span>
                  <span className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[10px]">Xilem Kohesif</span>
                </div>
              </div>
            </div>

            {/* Mindmap Canvas renderer */}
            <div className="md:col-span-2 relative bg-slate-950 border border-slate-800 rounded-2xl h-[250px] overflow-hidden flex items-center justify-center p-4">
              
              {/* Central logic Node Connector lines drawn as SVGs */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full">
                {mindmapNodes.slice(1).map((node, i) => (
                  <line
                    key={i}
                    x1={mindmapNodes[0].x}
                    y1={mindmapNodes[0].y}
                    x2={node.x}
                    y2={node.y}
                    stroke="#10B981"
                    strokeWidth="1.5"
                    strokeDasharray="4"
                  />
                ))}
              </svg>

              {/* Graphical Bubbles Nodes */}
              {mindmapNodes.map((node, i) => (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border shadow-lg transform -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap ${
                    i === 0
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              id="save-pbl-stage-4"
              onClick={() => saveStageProgress(4)}
              className="px-6 py-2.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-sm transition cursor-pointer"
            >
              Simpan & Lanjut ke Tahap 5 (+60 Poin)
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: Analisis dan Evaluasi */}
      {activeStage === 5 && (
        <div className="space-y-6">
          <div className="bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-xl flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-200 text-sm">Menganalisis dan Mengevaluasi Proses Pemecahan Masalah: Catatan Akhir Riset</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tuliskan evaluasi penutup serta kesimpulan hasil musyawarah kelompok Anda seputar jaminan kesuburan Plantae lokal di bumi.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Kesimpulan Fisiologi & Nilai Keagamaan Akhir (Essay Evaluatif):</label>
              <textarea
                id="lkpd-evaluation-textarea"
                rows={6}
                value={evaluationText}
                onChange={(e) => setEvaluationText(e.target.value)}
                placeholder="Tuliskan analisis perbaikan serta refleksi atas dalil ayat suci Al-Qur'an tentang konservasi botani..."
                className="w-full bg-slate-950/60 border border-slate-800 text-slate-100 p-4 rounded-2xl text-xs focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* Self Evaluation Checklist */}
            <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-500 block uppercase font-mono">Checklist Verifikasi Kelulusan PBL LKPD:</span>
              <div className="space-y-1.5 text-xs text-slate-400">
                <li className="list-none flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Mengisi Orientasi Masalah (Tahap 1)</span>
                </li>
                <li className="list-none flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Merangkai Hipotesis Papan Kolaborasi (Tahap 2)</span>
                </li>
                <li className="list-none flex items-center space-x-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>Mewasalkan Investigasi Tabel Tumbuhan (Tahap 3)</span>
                </li>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-800">
            <button
              id="save-pbl-stage-5"
              onClick={() => saveStageProgress(5)}
              disabled={!evaluationText.trim()}
              className="px-6 py-2.5 bg-indigo-600 text-slate-100 hover:bg-indigo-500 font-bold rounded-xl text-sm transition disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer"
            >
              Simpan & Rampungkan LKPD PBL (+60 Poin)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
