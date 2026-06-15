import React, { useState, useEffect } from "react";
import { Timer, Award, CheckCircle2, XCircle, AlertCircle, RefreshCw, Printer, Star } from "lucide-react";
import { QuizQuestion, UserStats } from "../types";
import { QUIZ_QUESTIONS } from "../data";

interface QuizViewProps {
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export default function QuizView({ userStats, onUpdateStats }: QuizViewProps) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  // Certificate state
  const [studentName, setStudentName] = useState("");
  const [certGenerated, setCertGenerated] = useState(false);

  // Matching type helper state
  const [matchingSelections, setMatchingSelections] = useState<Record<string, string>>({});

  // Active Timer Effect
  useEffect(() => {
    let timer: any;
    if (quizStarted && !quizFinished && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quizStarted && !quizFinished) {
      handleFinishQuiz();
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizFinished, timeLeft]);

  const activeQuestion: QuizQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswersCount(0);
    setQuizFinished(false);
    setTimeLeft(1800);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setMatchingSelections({});
  };

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSelectMatching = (left: string, right: string) => {
    if (isSubmitted) return;
    setMatchingSelections((prev) => ({
      ...prev,
      [left]: right
    }));
  };

  const handleSubmitAnswer = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    let isCorrect = false;

    if (activeQuestion.type === "matching") {
      // Validate all matching pairs
      const correctMap = activeQuestion.correctAnswer as Record<string, string>;
      isCorrect = Object.keys(correctMap).every(
        (key) => matchingSelections[key] === correctMap[key]
      );
    } else if (activeQuestion.type === "drag-and-drop") {
      // Simple option selected check or direct match
      isCorrect = selectedAnswer === activeQuestion.correctAnswer[0]; // mock match for order
    } else {
      isCorrect = selectedAnswer === activeQuestion.correctAnswer;
    }

    if (isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setMatchingSelections({});

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    const finalScore = Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 100);
    setScore(finalScore);

    const bonusPoints = finalScore * 5; // e.g., 100 score earns 500 bonus points
    const currentBadges = [...userStats.badges];

    // Award Ahli Plantae if complete and score > 80
    if (finalScore >= 80 && !currentBadges.includes("ahli_plantae")) {
      currentBadges.push("ahli_plantae");
    }

    onUpdateStats({
      points: userStats.points + bonusPoints,
      completedQuizzes: true,
      score: finalScore,
      badges: currentBadges
    });
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border border-emerald-500/20 p-6 rounded-3xl shadow-xl w-full">
      {!quizStarted && !quizFinished && (
        <div className="text-center max-w-xl mx-auto py-10 space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-20"></div>
            <Award className="w-20 h-20 text-emerald-400 mx-auto" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-100">Evaluasi Akhir Modul Plantae</h3>
            <p className="text-slate-400 text-sm">
              Selesaikan <strong className="text-emerald-400">30 soal komprehensif</strong> bertipe HOTS, Pilihan Ganda, Benar-Salah, Pencocokan, dan Mengurutkan yang diintegrasikan secara selaras dengan Al-Qur'an.
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-2xl text-left space-y-3">
            <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block font-mono">Ketentuan Evaluasi:</span>
            <div className="space-y-2 text-xs text-slate-300">
              <p>⏱️ <strong>Batas Waktu:</strong> 30 Menit (Auto-selesai jika waktu habis)</p>
              <p>🎯 <strong>Syarat Sertifikat:</strong> Peroleh nilai minimum <strong>80/100</strong></p>
              <p>✨ <strong>Hadiah Gamifikasi:</strong> Setiap jawaban benar menyumbang poin besar ke akun-mu</p>
            </div>
          </div>

          <button
            id="start-quiz-btn"
            onClick={handleStartQuiz}
            className="w-full py-4 bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 rounded-2xl shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Mulai Evaluasi Sekarang
          </button>
        </div>
      )}

      {quizStarted && !quizFinished && (
        <div className="space-y-6">
          {/* Header Progress and Timer */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-950/40 p-4 rounded-2xl border border-slate-800 gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold font-mono text-amber-500">PERTANYAAN:</span>
              <span className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-mono">
                {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
              </span>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full">
              <Timer className="w-4 h-4 text-rose-400" />
              <span className="font-mono text-xs font-bold text-slate-200">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Question card */}
          <div className="space-y-4">
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <span className="px-2.5 py-0.5 bg-indigo-500/15 text-indigo-400 border border-indigo-500/10 text-[10px] font-bold tracking-widest rounded-full uppercase mb-3 block w-fit font-mono">
                Tipe: {activeQuestion.type}
              </span>
              <p className="text-slate-100 text-base font-medium leading-relaxed">{activeQuestion.question}</p>
            </div>

            {/* Render Multiple Choice / True-False */}
            {(activeQuestion.type === "multiple-choice" || activeQuestion.type === "true-false" || activeQuestion.type === "hots") && (
              <div className="grid grid-cols-1 gap-2.5">
                {(activeQuestion.options || ["Benar", "Salah"]).map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={isSubmitted}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-emerald-950/40 border-emerald-500 text-emerald-300"
                          : "bg-slate-950/30 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50"
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-md shadow-emerald-400"></div>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Matching style question loader */}
            {activeQuestion.type === "matching" && (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-4">
                <span className="text-xs text-amber-500 font-bold block uppercase">Pasangkan Deskripsi di Bawah Ini:</span>
                
                <div className="space-y-3">
                  {activeQuestion.matchingPairs?.map((pair, idx) => {
                    const currentSelection = matchingSelections[pair.left] || "";
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-slate-100">{pair.left}</span>
                        
                        <select
                          value={currentSelection}
                          onChange={(e) => handleSelectMatching(pair.left, e.target.value)}
                          disabled={isSubmitted}
                          className="bg-slate-950 border border-slate-800 text-xs text-slate-300 p-2 rounded-lg focus:ring-1 focus:ring-emerald-500 max-w-xs focus:outline-none"
                        >
                          <option value="">-- Pilih Pencocokan --</option>
                          {activeQuestion.options?.map((opt, oIdx) => (
                            <option key={oIdx} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Drag and Drop ordering simulation */}
            {activeQuestion.type === "drag-and-drop" && (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-4">
                <span className="text-xs text-amber-500 font-bold block uppercase">Klik Urutan Langkah yang Benar:</span>
                
                <div className="grid grid-cols-1 gap-2">
                  {activeQuestion.dragSource?.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(step)}
                      disabled={isSubmitted}
                      className={`p-3 rounded-lg border text-left text-xs transition cursor-pointer ${
                        selectedAnswer === step ? "bg-emerald-950/50 border-emerald-500 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span>{step}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Feedback section */}
          {isSubmitted && (
            <div className={`p-5 rounded-2xl border ${
              // Simplified validation check (since matching type holds map)
              (activeQuestion.type === "matching"
                ? true // skip direct matches output
                : selectedAnswer === activeQuestion.correctAnswer)
                ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300"
                : "bg-rose-950/20 border-rose-500/20 text-rose-300"
            } space-y-2`}>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm">Pembahasan Biologi Integratif:</span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          )}

          {/* Submit / Next Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800/60">
            {!isSubmitted ? (
              <button
                id="submit-answer-btn"
                onClick={handleSubmitAnswer}
                disabled={
                  activeQuestion.type === "matching"
                    ? Object.keys(matchingSelections).length < (activeQuestion.matchingPairs?.length || 0)
                    : !selectedAnswer
                }
                className="px-6 py-2.5 bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold rounded-xl text-sm transition disabled:bg-slate-800 disabled:text-slate-600 cursor-pointer"
              >
                Kunci Jawaban
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? "Pertanyaan Selanjutnya" : "Selesaikan Evaluasi"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Finished state panel with Certificates maker of grade > 80! */}
      {quizFinished && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-full inline-block">
              <Award className="w-12 h-12" />
            </span>
            <h3 className="text-2xl font-bold text-slate-100">Evaluasi Selesai!</h3>
            
            <div className="bg-slate-950/60 p-6 border border-slate-800 rounded-3xl grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="text-slate-400 text-xs block">Nilai Ujian Anda:</span>
                <span className={`text-4xl font-extrabold font-mono mt-1 block ${score >= 80 ? "text-emerald-400" : "text-amber-500"}`}>
                  {score}
                </span>
              </div>
              <div className="text-center border-l border-slate-800">
                <span className="text-slate-400 text-xs block">Hadiah Gamifikasi:</span>
                <span className="text-lg font-bold text-amber-400 font-mono mt-2 block">+{score * 5} Poin Belajar</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Ditinjau oleh sistem: Anda menjawab benar {correctAnswersCount} soal dari total {QUIZ_QUESTIONS.length} pertanyaan. 
              {score >= 80 ? " Maa Syaa Allah, nilai Anda luar biasa! Anda berhak mengunduh sertifikat berprestasi." : " Bagus sekali! Teruslah berlatih membaca modul untuk meningkatkan asupan pengetahuan-mu."}
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleStartQuiz}
                className="flex items-center space-x-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition border border-slate-700 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>

          {/* Golden Certificates builder if Score >= 80 */}
          {score >= 80 && (
            <div className="border-t border-slate-800 pt-8 max-w-4xl mx-auto space-y-6">
              <div className="bg-gradient-to-r from-amber-550 to-yellow-600 hover:opacity-95 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border border-amber-500/30">
                <div>
                  <h4 className="font-bold text-slate-100 text-base">🎁 Klaim Sertifikat Kelulusan Plantae</h4>
                  <p className="text-xs text-amber-200 mt-1">Masukkan nama lengkap Anda untuk mengunduh dokumen akademik berharga ditandatangani USK.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <input
                    id="student-name"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Nama Lengkap Anda..."
                    className="flex-1 md:w-60 bg-slate-950 border border-slate-850 text-slate-100 p-2 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  
                  <button
                    id="generate-cert-btn"
                    onClick={() => setCertGenerated(studentName.trim().length > 0)}
                    disabled={studentName.trim().length === 0}
                    className="px-5 py-2 bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold text-xs rounded-xl transition cursor-pointer"
                  >
                    Terbitkan
                  </button>
                </div>
              </div>

              {/* High-Fidelity Printable Golden Certificate rendering */}
              {certGenerated && (
                <div id="printable-certificate-container" className="bg-white text-slate-950 p-8 md:p-14 rounded-2xl border-8 border-double border-amber-600 shadow-2xl relative overflow-hidden font-serif">
                  
                  {/* Ornate corner vectors */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-amber-600 m-2 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-amber-600 m-2 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-amber-600 m-2 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-amber-600 m-2 pointer-events-none"></div>

                  {/* Watermark Logo block */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <Star className="w-96 h-96 text-amber-600" />
                  </div>

                  <div className="text-center space-y-4">
                    <span className="text-amber-600 text-[10px] md:text-xs font-bold font-sans tracking-widest uppercase block">
                      UNIVERSITAS SYIAH KUALA • LAB IPA BIOLOGI
                    </span>
                    
                    <h2 className="text-2xl md:text-4xl font-extrabold text-amber-700 uppercase tracking-wider my-3">
                      Sertifikat Kelulusan
                    </h2>
                    
                    <p className="text-xs md:text-sm italic text-slate-600 mt-2">
                      Diberikan dengan hormat dan apresiasi ilmiah kepada:
                    </p>

                    <h1 className="text-xl md:text-3xl font-extrabold underline text-slate-950 tracking-wide py-2 font-sans">
                      {studentName}
                    </h1>

                    <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                      Atas pencapaian luar biasa dalam menyelesaikan seluruh integrasi kurikulum sains kognitif modern Plantae terintegrasi Al-Qur'an berbasis <strong>Problem Based Learning (PBL) Class X Fase E</strong> dengan predikat kelulusan Sangat Baik.
                    </p>

                    <p className="font-mono text-xs font-bold text-amber-600 mt-4 bg-amber-500/10 w-fit mx-auto px-4 py-1.5 rounded-full">
                      Nilai Evaluasi Akhir: {score} • Kode Autentikasi: USK-PBL-{userStats.points}
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200 mt-8 max-w-2xl mx-auto text-xs font-sans">
                      <div className="space-y-1 text-center">
                        <span className="text-[10px] text-slate-400 block font-mono">Verifikasi Keaslian:</span>
                        <strong className="text-slate-800">Magister Pendidikan IPA USK</strong>
                        <p className="text-slate-500">Banda Aceh, Indonesia</p>
                      </div>

                      <div className="space-y-1 text-center">
                        <span className="text-[10px] text-slate-400 block font-mono">Tertanda Penyusun:</span>
                        <strong className="text-slate-950 underline decoration-amber-600">Hadi Safriani</strong>
                        <p className="text-slate-500 font-mono text-[10px] mt-0.5">NIP. 2026.06.14.PBL</p>
                      </div>
                    </div>
                  </div>

                  {/* Print action trigger floating option */}
                  <div className="mt-8 flex justify-center no-print">
                    <button
                      id="print-cert-trigger"
                      onClick={handlePrintCertificate}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-505 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Sertifikat Kelulusan</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
