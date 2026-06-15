export interface QuranVerse {
  surah: string;
  ayat: string;
  arabic: string;
  translation: string;
}

export interface ScienceExplanation {
  title: string;
  description: string;
  points: string[];
  illustration?: string; // Type of custom SVG diagram
}

export interface IntegrativeRelation {
  explanation: string;
  scientificFacts: string[];
}

export interface Reflection {
  prompt: string;
  studentAnswer?: string;
}

export interface Material {
  id: number;
  title: string;
  verse: QuranVerse;
  science: ScienceExplanation;
  relation: IntegrativeRelation;
  reflection: Reflection;
}

export interface QuizQuestion {
  id: number;
  type: "multiple-choice" | "true-false" | "drag-and-drop" | "matching" | "hots";
  question: string;
  options?: string[]; // For multiple choice, hots, matching
  correctAnswer: any; // Direct or mapping object
  explanation: string;
  matchingPairs?: { left: string; right: string }[]; // For matching type
  dragSource?: string[]; // For drag and drop types
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  unlocked: boolean;
  category: "Plantae" | "Research" | "Eco" | "Quran";
}

export interface UserStats {
  points: number;
  level: "Pemula" | "Explorer" | "Scientist" | "Eco Guardian";
  completedMaterials: number[];
  completedQuizzes: boolean;
  score: number;
  badges: string[]; // Badge IDs
  lkpdAnswers: {
    tahap1: { q1: string; q2: string; q3: string };
    tahap2Notes: string[];
    tahap2GroupName?: string;
    tahap2GroupMembers?: string;
    tahap2PresentationNotes?: string;
    tahap2Table?: {
      no: number;
      ayat: string;
      isiPesan: string;
      keterkaitan: string;
    }[];
    tahap3Table: {
      id: string;
      name: string;
      characteristics: string;
      quranBenefit: string;
      condition: "Sehat" | "Layu" | "Kering" | "Terancam";
    }[];
    tahap4MindMap: { nodes: { id: string; label: string; x: number; y: number }[] };
    tahap5Refleksi: string;
  };
  reflectionJournal: {
    knowledge: string;
    q2: string;
    q3: string;
    q4: string;
    attitude: string;
    q6: string;
    action: string;
    q8: string;
    q9: string;
    selfAssessment: {
      p1: boolean | null;
      p2: boolean | null;
      p3: boolean | null;
      p4: boolean | null;
      p5: boolean | null;
    };
    savedAt?: string;
  };
}
