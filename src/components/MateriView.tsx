import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Sparkles, AlertCircle, ArrowLeft, Play, Pause, RefreshCw, Send, Check, Volume2, VolumeX, Download, Loader2 } from "lucide-react";
import { Material, UserStats } from "../types";
import { MATERIALS } from "../data";

interface MateriViewProps {
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  onAskTutor: (question: string) => void;
}

export default function MateriView({ userStats, onUpdateStats, onAskTutor }: MateriViewProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [activeTab, setActiveTab] = useState<"quran" | "science" | "relation" | "reflection">("quran");
  const [isPlayingMurottal, setIsPlayingMurottal] = useState(false);
  const [reflectionInput, setReflectionInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Murottal Player states
  const [selectedReciter, setSelectedReciter] = useState("Alafasy_128kbps");
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioPlaybackSpeed, setAudioPlaybackSpeed] = useState(1.0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio wave effect items
  const [waveHeights, setWaveHeights] = useState<number[]>(Array.from({ length: 16 }, () => 8));

  useEffect(() => {
    let interval: any;
    if (isPlayingMurottal) {
      interval = setInterval(() => {
        setWaveHeights(Array.from({ length: 16 }, () => Math.floor(Math.random() * 30) + 5));
      }, 150);
    } else {
      setWaveHeights(Array.from({ length: 16 }, () => 8));
    }
    return () => clearInterval(interval);
  }, [isPlayingMurottal]);

  // Format EveryAyah MP3 url based on surah name & ayah text
  const getAudioUrl = (surahName: string, ayahStr: string, reciter: string): string => {
    const surahMap: Record<string, number> = {
      "Al-An'am": 6,
      "Ibrahim": 14,
      "Yasin": 36,
      "Al-A'raf": 7,
      "Al-Hajj": 22,
      "Taha": 20,
      "Abasa": 80
    };

    const surahNum = surahMap[surahName] || 6;
    const firstAyahNum = parseInt(ayahStr.split("-")[0].trim()) || 99;

    const paddedSurah = String(surahNum).padStart(3, "0");
    const paddedAyah = String(firstAyahNum).padStart(3, "0");

    return `https://everyayah.com/data/${reciter}/${paddedSurah}${paddedAyah}.mp3`;
  };

  // Sync state & handle cleanup when selected material or reciter changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlayingMurottal(false);
    setIsAudioLoading(false);
    setAudioCurrentTime(0);
    setAudioDuration(0);
  }, [selectedMaterial, selectedReciter]);

  // Sync volume state with HTML Audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : audioVolume;
    }
  }, [audioVolume, isMuted]);

  // Sync playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = audioPlaybackSpeed;
    }
  }, [audioPlaybackSpeed]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleToggleMurottal = () => {
    if (!selectedMaterial) return;

    if (isPlayingMurottal) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingMurottal(false);
    } else {
      const url = getAudioUrl(selectedMaterial.verse.surah, selectedMaterial.verse.ayat, selectedReciter);
      
      if (!audioRef.current) {
        setIsAudioLoading(true);
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.volume = isMuted ? 0 : audioVolume;
        audio.playbackRate = audioPlaybackSpeed;

        audio.addEventListener("canplaythrough", () => {
          setIsAudioLoading(false);
        });

        audio.addEventListener("play", () => {
          setIsPlayingMurottal(true);
          setIsAudioLoading(false);
        });

        audio.addEventListener("pause", () => {
          setIsPlayingMurottal(false);
        });

        audio.addEventListener("ended", () => {
          setIsPlayingMurottal(false);
          setAudioCurrentTime(0);
        });

        audio.addEventListener("timeupdate", () => {
          setAudioCurrentTime(audio.currentTime);
        });

        audio.addEventListener("durationchange", () => {
          setAudioDuration(audio.duration || 0);
        });

        audio.addEventListener("error", (e) => {
          console.error("Audio failed to load reference:", e);
          setIsAudioLoading(false);
          setIsPlayingMurottal(false);
        });

        // Trigger load explicitly
        audio.load();
      }

      audioRef.current.play()
        .then(() => {
          setIsPlayingMurottal(true);
        })
        .catch((err) => {
          console.error("Audio play error:", err);
          setIsAudioLoading(false);
          setIsPlayingMurottal(false);
        });
    }
  };

  const handleSeek = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setAudioCurrentTime(newTime);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === Infinity) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSelectMaterial = (material: Material) => {
    setSelectedMaterial(material);
    setActiveTab("quran");
    setIsPlayingMurottal(false);
    
    // Load existing reflection response if any
    const existingReflectionsValue = localStorage.getItem(`reflection_${material.id}`) || "";
    setReflectionInput(existingReflectionsValue);
    setIsSaved(existingReflectionsValue.length > 0);
  };

  const handleSaveReflection = () => {
    if (!selectedMaterial) return;
    
    // Save to localStorage immediately
    localStorage.setItem(`reflection_${selectedMaterial.id}`, reflectionInput);
    setIsSaved(true);

    // Reward points for completing reflection
    const reflectionRewardPoints = 50;
    const isFirstTimeReflecting = !userStats.completedMaterials.includes(selectedMaterial.id);
    
    let updatedCompleted = [...userStats.completedMaterials];
    if (isFirstTimeReflecting) {
      updatedCompleted.push(selectedMaterial.id);
    }

    const currentPoints = userStats.points;
    const addedPoints = isFirstTimeReflecting ? reflectionRewardPoints : 0;
    const currentBadges = [...userStats.badges];

    // Check Badge condition (Ahli Plantae unlocked if all 8 materials are completed)
    if (updatedCompleted.length === 8 && !currentBadges.includes("ahli_plantae")) {
      currentBadges.push("ahli_plantae");
    }

    // Check Quran badge (at least 3 Quran reflections completed)
    if (updatedCompleted.length >= 3 && !currentBadges.includes("pecinta_quran")) {
      currentBadges.push("pecinta_quran");
    }

    onUpdateStats({
      points: currentPoints + addedPoints,
      completedMaterials: updatedCompleted,
      badges: currentBadges
    });
  };

  const handleTriggerTutorHint = () => {
    if (!selectedMaterial) return;
    onAskTutor(
      `Halo PlantQuran AI, saya sedang belajar materi "${selectedMaterial.title}". Bisakah berikan petunjuk/clue pemantik singkat atau panduan sains Al-Qur'an untuk pertanyaan berikut ini: "${selectedMaterial.reflection.prompt}"`
    );
  };

  // Unique illustrative SVGs corresponding to materials
  const renderInteractiveDiagram = (id: number) => {
    switch (id) {
      case 1: // Kebesaran Allah (Seed germination)
        return (
          <div className="flex flex-col items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-emerald-400 font-bold mb-2">DIAGRAM INTERAKTIF: Imbibisi & Perkecambahan Biji</span>
            <svg className="w-56 h-40" viewBox="0 0 200 150">
              <ellipse cx="100" cy="110" rx="40" ry="20" fill="#4B3621" />
              <path d="M100,100 C90,80 80,60 85,40" stroke="#10B981" strokeWidth="4" fill="none" className="animate-pulse" />
              <path d="M85,40 C75,30 65,40 60,45" stroke="#10B981" strokeWidth="3" fill="none" />
              <path d="M85,40 C95,30 110,35 115,45" stroke="#10B981" strokeWidth="3" fill="none" />
              <text x="100" y="140" fill="#FBBF24" fontSize="10" textAnchor="middle" className="font-mono">Air (H2O) + Giberelin → Enzim Aktif</text>
            </svg>
          </div>
        );
      case 2: // Organ Akar (Root system)
        return (
          <div className="flex flex-col items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-emerald-400 font-bold mb-2">DIAGRAM INTERAKTIF: Struktur Anatomi Akar Tunggang</span>
            <svg className="w-56 h-40" viewBox="0 0 200 150">
              <line x1="100" y1="10" x2="100" y2="120" stroke="#B45309" strokeWidth="6" />
              <line x1="100" y1="40" x2="60" y2="70" stroke="#D97706" strokeWidth="3" />
              <line x1="100" y1="60" x2="140" y2="90" stroke="#D97706" strokeWidth="3" />
              <line x1="100" y1="80" x2="50" y2="105" stroke="#D97706" strokeWidth="3" />
              <line x1="100" y1="100" x2="130" y2="125" stroke="#D97706" strokeWidth="2" />
              <circle cx="100" cy="120" r="8" fill="#F59E0B" opacity="0.6" />
              <text x="100" y="145" fill="#34D399" fontSize="9" textAnchor="middle" className="font-mono">Kaliptra & Rambut Absorpsi Osmosis</text>
            </svg>
          </div>
        );
      case 3: // Fotosintesis & Respirasi
        return (
          <div className="flex flex-col items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-emerald-400 font-bold mb-2">DIAGRAM INTERAKTIF: Siklus Energi Terang-Gelap</span>
            <svg className="w-56 h-40" viewBox="0 0 200 150">
              <circle cx="60" cy="70" r="28" fill="#10B981" opacity="0.15" />
              <circle cx="140" cy="70" r="28" fill="#FBBF24" opacity="0.15" />
              <path d="M60,42 Q80,20 100,20 Q120,20 140,42" stroke="#FBBF24" strokeWidth="2" fill="none" />
              <path d="M140,98 Q120,120 100,120 Q80,120 60,98" stroke="#10B981" strokeWidth="2" fill="none" />
              <text x="60" y="74" fill="#10B981" fontSize="10" textAnchor="middle" className="font-bold">Tilakoid</text>
              <text x="140" y="74" fill="#FBBF24" fontSize="10" textAnchor="middle" className="font-bold">Siklus Calvin</text>
              <text x="100" y="14" fill="#38BDF8" fontSize="8" textAnchor="middle">Foton & H2O</text>
              <text x="100" y="132" fill="#34D399" fontSize="8" textAnchor="middle">Oksigen & Karbohidrat</text>
            </svg>
          </div>
        );
      default: // Other modules (General leaf structure and photosynthesis)
        return (
          <div className="flex flex-col items-center bg-slate-950/40 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-emerald-400 font-bold mb-2">DIAGRAM INTERAKTIF: Mesofil & Kloroplas Sel</span>
            <svg className="w-56 h-40" viewBox="0 0 200 150">
              <rect x="50" y="30" width="100" height="70" rx="10" fill="#047857" stroke="#10B981" strokeWidth="2" />
              <circle cx="75" cy="50" r="10" fill="#34D399" />
              <circle cx="125" cy="50" r="10" fill="#34D399" />
              <circle cx="100" cy="80" r="12" fill="#FBBF24" opacity="0.8" />
              <text x="100" y="125" fill="#10B981" fontSize="9" textAnchor="middle" className="font-mono">Vakuola Besar & Magnesium Inti</text>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {!selectedMaterial ? (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-amber-200">
              Modul Materi Interaktif Sains & Al-Qur'an
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Pilihlah salah satu dari 8 sub-materi di bawah ini untuk memulai investigasi pemecahan masalah (PBL) berbasis integrasi ayat-ayat suci Al-Qur'an.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MATERIALS.map((material) => {
              const isCompleted = userStats.completedMaterials.includes(material.id);
              return (
                <button
                  key={material.id}
                  onClick={() => handleSelectMaterial(material)}
                  className="group relative flex items-start space-x-4 p-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl text-left transition cursor-pointer transform hover:-translate-y-0.5"
                >
                  <div className={`p-3 rounded-xl ${
                    isCompleted ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-amber-400"
                  } transition`}>
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold text-amber-500 font-mono tracking-widest uppercase mb-1 block">Materi {material.id}</span>
                    <h3 className="font-bold text-slate-200 text-base leading-snug group-hover:text-emerald-300 transition-colors">
                      {material.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">Surah {material.verse.surah} Ayat {material.verse.ayat}</p>
                    {isCompleted && (
                      <div className="mt-3 flex items-center space-x-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 w-fit px-2.5 py-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5" />
                        <span>Refleksi Selesai (+50 Poin)</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl">
          {/* Header navigation back */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
            <button
              id="back-to-materials-list"
              onClick={() => setSelectedMaterial(null)}
              className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition cursor-pointer bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/30 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Materi</span>
            </button>
            <div className="flex flex-col sm:items-end">
              <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest">Sekarang Belajar</span>
              <h3 className="text-lg font-bold text-slate-100 mt-0.5">{selectedMaterial.title}</h3>
            </div>
          </div>

          {/* Interactive Navigation Tabs for specific Material structure */}
          <div className="flex overflow-x-auto pb-2 mb-6 border-b border-slate-800 gap-2 scrollbar-none">
            <button
              onClick={() => setActiveTab("quran")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer whitespace-nowrap ${
                activeTab === "quran" ? "bg-emerald-500 text-slate-950" : "bg-slate-950/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              📖 Ayat Al-Qur'an
            </button>
            <button
              onClick={() => setActiveTab("science")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer whitespace-nowrap ${
                activeTab === "science" ? "bg-emerald-500 text-slate-950" : "bg-slate-950/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              🔬 Penjelasan Sains
            </button>
            <button
              onClick={() => setActiveTab("relation")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer whitespace-nowrap ${
                activeTab === "relation" ? "bg-emerald-500 text-slate-950" : "bg-slate-950/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              ⚡ Hubungan Integratif
            </button>
            <button
              onClick={() => setActiveTab("reflection")}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer whitespace-nowrap ${
                activeTab === "reflection" ? "bg-emerald-500 text-slate-950" : "bg-slate-950/40 text-slate-400 hover:text-slate-200"
              }`}
            >
              ✍️ Refleksi Siswa
            </button>
          </div>

          {/* Content Views strictly following the user requirements */}
          <div className="min-h-[300px]">
            {activeTab === "quran" && (
              <div className="space-y-6">
                <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-amber-500 font-bold uppercase tracking-widest font-mono mb-4">
                    QS. {selectedMaterial.verse.surah} • Ayat {selectedMaterial.verse.ayat}
                  </span>
                  
                  {/* Caligraphic display text in Arabic */}
                  <p className="text-3xl md:text-4xl font-semibold leading-relaxed text-slate-100 max-w-3xl mb-6 font-serif">
                    {selectedMaterial.verse.arabic}
                  </p>

                  <div className="h-[1px] w-36 bg-slate-800 my-4"></div>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl italic">
                    "Artinya: {selectedMaterial.verse.translation}"
                  </p>
                        {/* Real Audio Murottal Reciter Container */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 p-6 rounded-2xl flex flex-col gap-5 shadow-2xl">
                  {/* Top Bar: Selector and Speed */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="text-xs text-emerald-400 font-bold mb-1 font-mono uppercase tracking-wider">Pilih Qari / Reciter:</label>
                      <select
                        value={selectedReciter}
                        onChange={(e) => setSelectedReciter(e.target.value)}
                        className="bg-slate-900 text-slate-100 text-xs py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 font-sans cursor-pointer focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="Alafasy_128kbps">Syaikh Mishary Rashid Alafasy (128kbps)</option>
                        <option value="Ghamadi_40kbps">Syaikh Saad Al-Ghamdi (40kbps)</option>
                        <option value="Abdullah_Basfar_192kbps">Syaikh Abdullah Basfar (192kbps)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex flex-col">
                        <label className="text-xs text-amber-400 font-bold mb-1 font-mono uppercase tracking-wider">Kecepatan:</label>
                        <select
                          value={audioPlaybackSpeed}
                          onChange={(e) => setAudioPlaybackSpeed(parseFloat(e.target.value))}
                          className="bg-slate-900 text-slate-100 text-xs py-1.5 px-3 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 font-mono cursor-pointer"
                        >
                          <option value="1.0">1.0x (Normal)</option>
                          <option value="1.25">1.25x</option>
                          <option value="1.5">1.5x</option>
                          <option value="1.75 font-mono">1.75x</option>
                          <option value="2.0">2.0x</option>
                        </select>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="text-xs text-slate-500 font-mono">Format Sumber</span>
                        <span className="text-[10px] text-emerald-500 font-bold font-mono">EveryAyah CDN (MP3)</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Player Controls */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                    {/* Left: Button and Status Info */}
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <button
                        id="murottal-control-real"
                        onClick={handleToggleMurottal}
                        disabled={isAudioLoading}
                        className={`p-4 rounded-full transition transform active:scale-95 cursor-pointer shadow-lg flex items-center justify-center ${
                          isPlayingMurottal
                            ? "bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/10"
                            : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/10"
                        }`}
                      >
                        {isAudioLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                        ) : isPlayingMurottal ? (
                          <Pause className="w-5 h-5 fill-slate-950 text-slate-950" />
                        ) : (
                          <Play className="w-5 h-5 fill-slate-950 text-slate-950 ml-0.5" />
                        )}
                      </button>

                      <div className="flex-1">
                        <h4 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                          <span>Simulasi Murottal QS. {selectedMaterial.verse.surah}:{selectedMaterial.verse.ayat}</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5 font-mono">
                          {isAudioLoading
                            ? "Menghubungkan ke server audio..."
                            : isPlayingMurottal
                            ? "Sedang memutar bacaan ayat..."
                            : "Siap diputar • Klik tombol play"}
                        </p>
                      </div>
                    </div>

                    {/* Right: SVG Visualizer */}
                    <div className="flex items-end justify-center space-x-1 px-4 h-12 bg-slate-950/30 p-2 rounded-xl border border-slate-800/40 w-full md:w-auto min-w-[200px]">
                      {waveHeights.map((ht, idx) => (
                        <div
                          key={idx}
                          style={{ height: `${ht}px` }}
                          className={`w-1 rounded-full ${
                            isPlayingMurottal ? "bg-amber-400" : isAudioLoading ? "bg-emerald-500/40 animate-pulse" : "bg-slate-700"
                          } transition-all duration-150`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Seek Bar */}
                  <div className="space-y-1 bg-slate-950/20 p-3 rounded-xl border border-slate-950/40">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-slate-400 font-mono w-10 text-right">{formatTime(audioCurrentTime)}</span>
                      <input
                        type="range"
                        min={0}
                        max={audioDuration || 100}
                        value={audioCurrentTime}
                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                        className="flex-1 accent-emerald-500 h-1 bg-slate-850 rounded-lg appearance-none cursor-pointer focus:outline-none"
                      />
                      <span className="text-xs text-slate-400 font-mono w-10">{formatTime(audioDuration)}</span>
                    </div>
                  </div>

                  {/* Volume Slider and Download */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-1">
                    {/* Volume and Mute Controls */}
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-slate-400 hover:text-emerald-400 transition"
                      >
                        {isMuted || audioVolume === 0 ? (
                          <VolumeX className="w-5 h-5 text-rose-400" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-emerald-400" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : audioVolume}
                        onChange={(e) => {
                          setAudioVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="accent-emerald-500 h-1 w-24 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-500 font-mono">{Math.round((isMuted ? 0 : audioVolume) * 100)}%</span>
                    </div>

                    {/* Download support */}
                    <a
                      href={getAudioUrl(selectedMaterial.verse.surah, selectedMaterial.verse.ayat, selectedReciter)}
                      download={`QS_${selectedMaterial.verse.surah}_${selectedMaterial.verse.ayat}.mp3`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-xl transition w-full sm:w-auto justify-center"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      <span>Download Offline (MP3)</span>
                    </a>
                  </div>
                </div>          </div>
              </div>
            )}

            {activeTab === "science" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h4 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                    <span className="p-1 px-2 h-6 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg font-mono">Sains</span>
                    <span>{selectedMaterial.science.title}</span>
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedMaterial.science.description}</p>
                  
                  <div className="space-y-2 mt-4">
                    {selectedMaterial.science.points.map((pt, idx) => {
                      const [boldText, rest] = pt.split(":");
                      return (
                        <div key={idx} className="flex items-start space-x-2 text-xs md:text-sm text-slate-400 bg-slate-950/30 p-2.5 rounded-xl border border-slate-800/50">
                          <span className="text-emerald-500 font-bold mt-0.5">•</span>
                          <span>
                            <strong className="text-slate-200">{boldText}:</strong> {rest}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center">
                  {renderInteractiveDiagram(selectedMaterial.id)}
                </div>
              </div>
            )}

            {activeTab === "relation" && (
              <div className="space-y-4">
                <div className="bg-emerald-900/10 border border-emerald-500/10 p-5 rounded-2xl">
                  <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-widest block mb-2">Integrasi Sains & Al-Qur'an</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedMaterial.relation.explanation}</p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold font-mono text-sky-400 uppercase tracking-widest block">Fakta Ilmiah Quranik (Quranic Scientific Facts)</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {selectedMaterial.relation.scientificFacts.map((fact, idx) => (
                      <div key={idx} className="bg-slate-950/40 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/20 transition flex flex-col justify-between">
                        <p className="text-xs md:text-sm text-slate-300 leading-snug">{fact}</p>
                        <span className="text-emerald-500 font-mono font-bold text-xs mt-3 flex items-center space-x-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Fakta {idx + 1}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reflection" && (
              <div className="space-y-4">
                <div className="bg-amber-500/10 border border-amber-400/30 p-5 rounded-2xl flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-200 text-sm">Pertanyaan Refleksi Critical Thinking (PBL)</h5>
                    <p className="text-slate-300 text-sm mt-1">{selectedMaterial.reflection.prompt}</p>
                  </div>
                </div>

                {/* Student response input */}
                <div>
                  <textarea
                    id="reflection-textarea"
                    rows={6}
                    value={reflectionInput}
                    onChange={(e) => {
                      setReflectionInput(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="Tuliskan analisis integratif Anda di sini..."
                    className="w-full bg-slate-950/60 text-slate-100 border border-slate-800 focus:border-emerald-500 p-4 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 justify-between">
                    <button
                      id="ask-ai-hint-btn"
                      onClick={handleTriggerTutorHint}
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl text-xs font-semibold hover:text-white transition cursor-pointer border border-slate-700"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                      <span>Minta Petunjuk PlantQuran AI</span>
                    </button>
                    
                    <button
                      id="save-reflection"
                      onClick={handleSaveReflection}
                      disabled={reflectionInput.trim().length === 0}
                      className={`flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-sm transition cursor-pointer ${
                        isSaved
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : reflectionInput.trim().length === 0
                          ? "bg-slate-800 text-slate-600 border border-slate-900 pointer-events-none"
                          : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Analisis Tersimpan</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Simpan & Selesaikan Materi (+50 Poin)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
