import React, { useState, useEffect } from "react";
import { BookOpen, MapPin, Heart, Sparkles, Save, Check, CheckCircle2, AlertCircle, HelpCircle, ShieldAlert } from "lucide-react";
import { UserStats } from "../types";

interface RefleksiDigitalProps {
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function RefleksiDigitalView({ userStats, onUpdateStats }: RefleksiDigitalProps) {
  // Section A: Pemahaman
  const [knowledge, setKnowledge] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");

  // Section B: Sikap
  const [attitude, setAttitude] = useState("");
  const [q6, setQ6] = useState("");

  // Section C: Tindakan
  const [action, setAction] = useState("");
  const [q8, setQ8] = useState("");

  // Section D: Kesimpulan
  const [q9, setQ9] = useState("");

  // Section E: Penilaian Diri (true = Ya, false = Tidak, null = unset)
  const [p1, setP1] = useState<boolean | null>(null);
  const [p2, setP2] = useState<boolean | null>(null);
  const [p3, setP3] = useState<boolean | null>(null);
  const [p4, setP4] = useState<boolean | null>(null);
  const [p5, setP5] = useState<boolean | null>(null);

  const [isSaved, setIsSaved] = useState(false);

  // Sync state from userStats if available
  useEffect(() => {
    const journal = userStats.reflectionJournal;
    if (journal) {
      setKnowledge(journal.knowledge || "");
      setQ2(journal.q2 || "");
      setQ3(journal.q3 || "");
      setQ4(journal.q4 || "");
      setAttitude(journal.attitude || "");
      setQ6(journal.q6 || "");
      setAction(journal.action || "");
      setQ8(journal.q8 || "");
      setQ9(journal.q9 || "");
      if (journal.selfAssessment) {
        setP1(journal.selfAssessment.p1);
        setP2(journal.selfAssessment.p2);
        setP3(journal.selfAssessment.p3);
        setP4(journal.selfAssessment.p4);
        setP5(journal.selfAssessment.p5);
      }
    }
  }, [userStats.reflectionJournal]);

  const handleSaveJournal = () => {
    // Generate the updated payload
    const journalPayload = {
      knowledge,
      q2,
      q3,
      q4,
      attitude,
      q6,
      action,
      q8,
      q9,
      selfAssessment: {
        p1,
        p2,
        p3,
        p4,
        p5
      },
      savedAt: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    };

    const journalRewardPoints = 80;
    const isFirstTimeReflecting = !userStats.reflectionJournal.savedAt;

    onUpdateStats({
      points: userStats.points + (isFirstTimeReflecting ? journalRewardPoints : 0),
      reflectionJournal: journalPayload
    });

    setIsSaved(true);
    alert(`Refleksi Peserta Didik berhasil disimpan! Anda mendapatkan ${isFirstTimeReflecting ? "+80" : "0"} XP.`);
  };

  // Check if everything is filled
  const isFormComplete =
    knowledge.trim() !== "" &&
    q2.trim() !== "" &&
    q3.trim() !== "" &&
    q4.trim() !== "" &&
    attitude.trim() !== "" &&
    q6.trim() !== "" &&
    action.trim() !== "" &&
    q8.trim() !== "" &&
    q9.trim() !== "" &&
    p1 !== null &&
    p2 !== null &&
    p3 !== null &&
    p4 !== null &&
    p5 !== null;

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 md:p-8 rounded-3xl shadow-xl w-full max-w-4xl mx-auto space-y-8">
      
      {/* HEADER SECTION */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center space-x-3.5">
          <span className="p-3 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 rounded-2xl shadow-lg border border-emerald-500/10">
            <Heart className="w-7 h-7" />
          </span>
          <div>
            <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 font-serif">
              REFLEKSI PESERTA DIDIK
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Evaluasi pemahaman, sikap spiritual-sosial, rincian aksi, dan penilaian diri.</p>
          </div>
        </div>
      </div>

      {/* BANNER PETUNJUK */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-2xl border border-slate-800 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
          <strong className="text-slate-100 font-bold">Petunjuk: </strong>
          Setelah mengikuti pembelajaran tentang Tumbuhan (Plantae) Berdasarkan Al-Quran , jawablah pertanyaan berikut dengan jujur sesuai pengalaman dan pemahaman kalian.
        </div>
      </div>

      {/* FORM SECTIONS */}
      <div className="space-y-6">
        
        {/* A. REFLEKSI PEMAHAMAN */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono">A. Refleksi Pemahaman</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                1. Pengetahuan baru apa yang saya peroleh setelah mempelajari materi tumbuhan berdasarkan Al-Quran?
              </label>
              <textarea
                value={knowledge}
                onChange={(e) => { setKnowledge(e.target.value); setIsSaved(false); }}
                placeholder="Tuliskan pengetahuan baru yang kamu peroleh..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                2. Mengapa tumbuhan memiliki peran penting dalam menjaga keseimbangan lingkungan?
              </label>
              <textarea
                value={q2}
                onChange={(e) => { setQ2(e.target.value); setIsSaved(false); }}
                placeholder="Tuliskan urgensi ekologis tumbuhan..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                3. Bagian materi yang paling menarik bagi saya adalah ....
              </label>
              <textarea
                value={q3}
                onChange={(e) => { setQ3(e.target.value); setIsSaved(false); }}
                placeholder="Ceritakan bagian materi yang paling berharga bagimu..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                4. Bagian materi yang masih sulit saya pahami adalah ....
              </label>
              <textarea
                value={q4}
                onChange={(e) => { setQ4(e.target.value); setIsSaved(false); }}
                placeholder="Sebutkan hal yang masih membingungkan jika ada..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* B. REFLEKSI SIKAP */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
            <Heart className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono">B. Refleksi Sikap</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                5. Setelah mempelajari materi ini, bagaimana pandangan kamu tentang pentingnya menjaga tumbuhan dan lingkungan?
              </label>
              <textarea
                value={attitude}
                onChange={(e) => { setAttitude(e.target.value); setIsSaved(false); }}
                placeholder="Bagikan perubahan sudut pandang moral/spiritual kamu..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                6. Nilai atau pesan apa yang saya peroleh dari ayat Al-Qur’an yang membahas tumbuhan dan lingkungan?
              </label>
              <textarea
                value={q6}
                onChange={(e) => { setQ6(e.target.value); setIsSaved(false); }}
                placeholder="Pesan ketuhanan dan tanggung jawab di bumi yang diserap..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* C. REFLEKSI TINDAKAN */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
            <MapPin className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono">C. Refleksi Tindakan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                7. Sebutkan satu kebiasaan yang akan saya lakukan untuk menjaga kelestarian tumbuhan di lingkungan sekitar!
              </label>
              <textarea
                value={action}
                onChange={(e) => { setAction(e.target.value); setIsSaved(false); }}
                placeholder="Sebutkan satu aksi positif (misal: menyiram halaman, menanam herba)..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold block">
                8. Sebutkan satu kebiasaan yang akan saya kurangi atau hentikan karena dapat merusak lingkungan!
              </label>
              <textarea
                value={q8}
                onChange={(e) => { setQ8(e.target.value); setIsSaved(false); }}
                placeholder="Kebiasaan buruk yang akan ditinggalkan (misal: boros air, memotong dahan liar)..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* D. KESIMPULAN PRIBADI */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono">D. Kesimpulan Pribadi</h3>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold block">
              9. Tuliskan kesimpulan yang dapat kamu ambil setelah mempelajari materi ini!
            </label>
            <textarea
              value={q9}
              onChange={(e) => { setQ9(e.target.value); setIsSaved(false); }}
              placeholder="Tuliskan intisari rumusan kesimpulan personal Anda..."
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 p-3 rounded-xl text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* E. PENILAIAN DIRI */}
        <div className="bg-slate-950/40 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-900">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider font-mono">E. Penilaian Diri</h3>
          </div>

          <p className="text-xs text-slate-400 italic">Beri tanda (✓) pada kolom yang sesuai di bawah ini:</p>

          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-mono">
                  <th className="py-3 px-4 font-bold">Pernyataan</th>
                  <th className="py-3 px-4 text-center font-bold w-24">Ya</th>
                  <th className="py-3 px-4 text-center font-bold w-24">Tidak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {/* Statement 1 */}
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-3.5 px-4 font-sans text-slate-250 font-medium">1. Saya memahami peran tumbuhan dalam kehidupan dan lingkungan.</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP1(true); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p1 === true
                          ? "bg-emerald-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p1 === true ? "✓ Ya" : "Ya"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP1(false); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p1 === false
                          ? "bg-rose-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p1 === false ? "✓ Tidak" : "Tidak"}
                    </button>
                  </td>
                </tr>

                {/* Statement 2 */}
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-3.5 px-4 font-sans text-slate-250 font-medium">2. Saya dapat menjelaskan dampak kerusakan tumbuhan terhadap lingkungan.</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP2(true); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p2 === true
                          ? "bg-emerald-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p2 === true ? "✓ Ya" : "Ya"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP2(false); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p2 === false
                          ? "bg-rose-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p2 === false ? "✓ Tidak" : "Tidak"}
                    </button>
                  </td>
                </tr>

                {/* Statement 3 */}
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-3.5 px-4 font-sans text-slate-250 font-medium">3. Saya aktif dalam diskusi kelompok selama pembelajaran.</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP3(true); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p3 === true
                          ? "bg-emerald-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p3 === true ? "✓ Ya" : "Ya"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP3(false); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p3 === false
                          ? "bg-rose-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p3 === false ? "✓ Tidak" : "Tidak"}
                    </button>
                  </td>
                </tr>

                {/* Statement 4 */}
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-3.5 px-4 font-sans text-slate-250 font-medium">4. Saya memiliki kepedulian untuk menjaga tumbuhan dan lingkungan.</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP4(true); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p4 === true
                          ? "bg-emerald-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p4 === true ? "✓ Ya" : "Ya"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP4(false); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p4 === false
                          ? "bg-rose-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p4 === false ? "✓ Tidak" : "Tidak"}
                    </button>
                  </td>
                </tr>

                {/* Statement 5 */}
                <tr className="hover:bg-slate-900/20 transition">
                  <td className="py-3.5 px-4 font-sans text-slate-250 font-medium">5. Saya siap menerapkan perilaku ramah lingkungan dalam kehidupan sehari-hari.</td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP5(true); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p5 === true
                          ? "bg-emerald-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p5 === true ? "✓ Ya" : "Ya"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => { setP5(false); setIsSaved(false); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer min-w-[65px] ${
                        p5 === false
                          ? "bg-rose-500 text-slate-950 font-mono"
                          : "bg-slate-900 hover:bg-slate-850 text-slate-550"
                      }`}
                    >
                      {p5 === false ? "✓ Tidak" : "Tidak"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {userStats.reflectionJournal.savedAt && (
        <div className="text-xs text-slate-400 bg-emerald-950/25 px-5 py-3 rounded-2xl border border-emerald-500/10 font-mono">
          ✅ Refleksi Terakhir Diabadikan pada: {userStats.reflectionJournal.savedAt}
        </div>
      )}

      {/* SAVE CONTROLS & SUBMIT STATUS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-800 pt-6">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          {!isFormComplete ? (
            <span className="flex items-center gap-1.5 text-amber-400 font-mono bg-amber-500/5 px-3 py-1.5 rounded-xl border border-amber-500/10">
              <AlertCircle className="w-4 h-4" />
              <span>Harap isi semua jawaban esai & tabel penilaian diri untuk menyimpan.</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono bg-emerald-500/5 px-3 py-1.5 rounded-xl border border-emerald-500/10 animate-bounce">
              <Check className="w-4 h-4" />
              <span>Seluruh kolom telah lengkap! Siap dipublikasikan.</span>
            </span>
          )}
        </div>

        <button
          id="btn-save-journal"
          onClick={handleSaveJournal}
          disabled={!isFormComplete}
          className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-bold text-sm transition cursor-pointer w-full sm:w-auto justify-center ${
            isSaved
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : !isFormComplete
              ? "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-850"
              : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg"
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Refleksi Telah Disimpan</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Simpan & Kirim Refleksi (+80 Poin)</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
