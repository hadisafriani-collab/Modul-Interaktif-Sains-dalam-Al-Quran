import { Material, QuizQuestion, Badge } from "./types";

export const MATERIALS: Material[] = [
  {
    id: 1,
    title: "Kebesaran Allah pada Tumbuh-Tumbuhan (Plantae)",
    verse: {
      surah: "Al-An'am",
      ayat: "99",
      arabic: "وَهُوَ الَّذِي أَنْزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ فَأَخْرَجْنَا مِنْهُ خَضِرًا نُخْرِجُ مِنْهُ حَبًّا مُتَرَاكِبًا",
      translation: "Dan Dialah yang menurunkan air dari langit, lalu Kami tumbuhkan dengan air itu segala macam tumbuh-tumbuhan, maka Kami keluarkan dari tumbuh-tumbuhan itu tanaman yang hijau, Kami keluarkan dari tanaman yang hijau itu butir yang banyak..."
    },
    science: {
      title: "Ciri Umum Kingdom Plantae & Air Bagian Utama Sel",
      description: "Secara ilmiah, Kingdom Plantae dicirikan sebagai organisme eukariotik multiseluler dengan dinding sel selulosa, memiliki klorofil untuk fotosintesis (autotrof), dan mengalami metagenesis. Air yang turun dari langit bertindak sebagai pelarut universal (universal solvent) yang memicu imbibisi biji dorman sehingga metabolisme sel aktif kembali.",
      points: [
        "Eukariotik & Multiseluler: Memiliki inti sel yang terbungkus membran penyusun jaringan.",
        "Dinding Sel Selulosa: Memberikan kekuatan struktural yang kokoh pada tumbuhan.",
        "Klorofil a & b: Pigmen utama penangkap foton cahaya untuk fotosintesis.",
        "Imbibisi Air: Air mengaktifkan hormon giberelin untuk sintesis enzim hidrolitik saat perkecambahan."
      ]
    },
    relation: {
      explanation: "Ayat ini menggambarkan urutan ekofisiologis transisi air hujan menjadi zat hijau (klorofil) serta struktur butir yang tersusun padat (mutaraakiban) seperti tongkol jagung atau bulir gandum. Kata 'Khadhiran' (khadir) merujuk kepada zat hijau daun atau kloroplas, pabrik pemanen energi matahari pertama di bumi.",
      scientificFacts: [
        "Air hujan berperan sebagai elektron donor (fotolisis) dalam Fotosistem II.",
        "Kata 'Tanaman yang hijau' (khadhiran) mengekspresikan zat klorofil yang mendasari kelangsungan seluruh rantai makanan di biosfer.",
        "Formasi 'butir banyak bersusun' menggambarkan pola matematika filotaksis daun dan letak biji (deret Fibonacci) demi efisiensi penyerapan ruang."
      ]
    },
    reflection: {
      prompt: "Bagaimana proses sains yang terkandung dalam kalimat 'Kami tumbuhkan dengan air itu segala macam tumbuh-tumbuhan' apabila dihubungkan dengan pengaktifan embrio biji yang semula mati (dorman)?"
    }
  },
  {
    id: 2,
    title: "Organ Akar pada Tumbuhan",
    verse: {
      surah: "Ibrahim",
      ayat: "24",
      arabic: "أَلَمْ تَرَ كَيْفَ ضَرَبَ اللَّهُ مَثَلًا كَلِمَةً طَيِّبَةً كَشَجَرَةٍ طَيِّبَةٍ أَصْلُهَا ثَابِتٌ وَفَرْعُهَا فِي السَّمَاءِ",
      translation: "Tidakkah kamu memperhatikan bagaimana Allah telah membuat perumpamaan kalimat yang baik seperti pohon yang baik, akarnya teguh (kokoh) dan cabangnya (menjulang) ke langit."
    },
    science: {
      title: "Anatomi Akar, Absorpsi, dan Jangkar Struktural",
      description: "Akar tumbuhan bertindak sebagai sistem jangkar (anchor) mekanik sekaligus organ absorpsi air & unsur hara hulu tanah. Berdasarkan sistemnya, terdapat akar tunggang (dicot) dan akar serabut (monocot) yang dilindungi oleh kaliptra (tudung akar).",
      points: [
        "Sistem Absorpsi Osmosis: Rambut akar memperluas area permukaan serap sel epidermis.",
        "Pita Kaspari: Struktur kedap air di endodermis yang menyeleksi mineral masuk ke silinder pusat.",
        "Gaya Kohesi & Adhesi: Menjamin molekul air merambat naik melawan gravitasi menuju trakeid pembuluh xilem.",
        "Adhesi Mekanis: Jaringan sklerenkim pada akar memberikan kekuatan tegangan tinggi agar pohon tidak tumbang."
      ]
    },
    relation: {
      explanation: "Perumpamaan iman kokoh seperti 'asluhaa tsaabitun' (akarnya teguh kokoh) menunjukkan fungsi vital akar. Tanpa akar yang menghunjam kuat menembus lapisan tanah serta menahan erosi, struktur tajuk atas (tajuk cabang dan daun) tidak akan mampu menjangkau langit secara kokoh.",
      scientificFacts: [
        "Akar tunggang berkayu dapat menembus tanah hingga kedalaman puluhan meter demi mencari sumber air bawah tanah (akuifer).",
        "Mikoriza (simbiosis jamur-akar) meningkatkan daya absorbsi fosfor hingga 10 kali lipat, melambangkan sinergi sosial mahluk.",
        "Eksudat akar mengeluarkan asam organik untuk melarutkan mineral batuan keras, mirip keteguhan menembus rintangan kehidupan."
      ]
    },
    reflection: {
      prompt: "Deskripsikan analogi biologis antara kekuatan akar penopang pohon raksasa beringin/jati dengan struktur penyerapan nutrisi (pita kaspari) dalam menjaga kelangsungan hidup tajuk pohon di atas tanah!"
    }
  },
  {
    id: 3,
    title: "Fotosintesis dan Respirasi",
    verse: {
      surah: "Yasin",
      ayat: "80",
      arabic: "الَّذِي جَعَلَ لَكُمْ مِنَ الشَّجَرِ الْأَخْضَرِ نَارًا فَإِذَا أَنْتُمْ مِنْهُ تُوقِدُونَ",
      translation: "Yaitu (Allah) yang menjadikan untukmu api dari kayu yang hijau, maka seketika itu kamu nyalakan (api) dari kayu itu."
    },
    science: {
      title: "Konversi Energi Matahari Menjadi Energi Kimiawi",
      description: "Fotosintesis mengubah energi radiasi elektromagnetik (foton) matahari menjadi ikatan energi kimiawi berbentuk glukosa via reaksi terang thilakoid dan siklus Calvin stroma. Sebaliknya, respirasi mengoksidasi senyawa organik untuk melepaskan ATP (energi sel) dan panas.",
      points: [
        "Reaksi Terang (Thilakoid): Klorofil menyerap foton, memicu fotolisis air menjadi elektron, hidrogen, dan oksigen.",
        "Reaksi Gelap (Stroma): Rubisco memfiksasi CO2 menjadi PGA, mengonsumsi ATP dan NADPH membentuk glukosa.",
        "Selulosa & Lignin: Penyusun kayu keras yang terbentuk dari polimerisasi karbohidrat hasil fotosintesis.",
        "Respirasi Aerob: Proses pembongkaran energi kimiawi di mitokondria yang melepaskan CO2 dan H2O kembali ke udara."
      ]
    },
    relation: {
      explanation: "Kalimat 'api dari kayu yang hijau' adalah keajaiban integrasi biologi-fisika. Kayu kering yang mudah terbakar berasal dari 'pohon hijau' yang telah mengunci energi foton matahari selama bertahun-tahun dalam bentuk selulosa dan lignin. Saat kayu dibakar, ikatan kimia tersebut putus, melepaskan kembali energi matahari yang tersimpan dalam wujud energi termal (api).",
      scientificFacts: [
        "Energi fosil (batu bara, minyak bumi) adalah tumpukan fosil 'pohon hijau' purba yang menyimpan energi matahari jutaan tahun lalu.",
        "Kayu kering mengandung kadar selulosa hingga 50%, yang tersusun atas monomer-monomer glukosa murni buatan daun hijau.",
        "Pembakaran kayu mengoksidasi karbon padat menjadi gas CO2, membebaskan energi kinetik foton purba yang terserap kloroplas."
      ]
    },
    reflection: {
      prompt: "Bagaimana korelasi ilmiah antara fotosintesis di daun hijau dengan energi panas (api) yang dilepaskan ketika kayu kering dibakar? Hubungkan dengan hukum kekekalan energi!"
    }
  },
  {
    id: 4,
    title: "Adaptasi Tumbuhan",
    verse: {
      surah: "Al-A'raf",
      ayat: "58",
      arabic: "وَالْبَلَدُ الطَّيِّبُ يَخْرُجُ نَبَاتُهُ بِإِذْنِ رَبِّهِ ۖ وَالَّذِي خَبُثَ لَا يَخْرُجُ إِلَّا نَكِدًا",
      translation: "Dan tanah yang baik, tanaman-tanamannya tumbuh subur dengan izin Tuhan; dan tanah yang buruk, tanaman-tanamannya yang tumbuh merana (kerdil) saja..."
    },
    science: {
      title: "Klasifikasi Ekologis: Xerofit, Hidrofit, dan Halofit",
      description: "Tumbuhan beradaptasi secara morfologis, anatomis, dan fisiologis sesuai ketersediaan air, salinitas, dan nutrien tanah tempat hidupnya. Jika lingkungan ekstrim, tumbuhan mengekspresikan gen khusus agar tetap survive.",
      points: [
        "Xerofit (Gurun): Stomata terbenam (sunken stomata), kutikula tebal, batang sukulen menyimpan air, daun mereduksi.",
        "Hidrofit (Air): Memiliki aerenkim (jaringan udara), kutikula tipis, stomata melimpah di permukaan daun atas.",
        "Halofit (Asin/Salin): Memiliki kelenjar garam ekskretor dan akumulator osmotik sel akar tinggi.",
        "Tanah Marginal (Buruk): Defisiensi Nitrogen merangsang evolusi tumbuhan karnivor (Nepenthes/kantong semar) menangkap serangga."
      ]
    },
    relation: {
      explanation: "Ayat ini menekankan peran vital substrat (tanah) sekaligus adaptasi ekosistem. Tanah subur ('baladut thayyib') menyediakan Kation Tukar tanah melimpah. Sementara pada tanah tandus ('khabutsa'), tumbuhan harus bertarung keras melakukan adaptasi ekstrim sehingga tubuhnya terkesan merana/kerdil ('nakidaan') seperti kaktus atau bonsai gurun alami.",
      scientificFacts: [
        "Tumbuhan xerofit berupaya menekan transpirasi seefisien mungkin guna bertahan pada tanah bercurah hujan minim.",
        "Kadar liat, pH tanah, dan biodiversitas mikroba tanah menentukan kesuburan mineral hara makro (N, P, K).",
        "Penyesuaian morfologi akar yang melebar dekat permukaan tanah gurun adalah reaksi tanggap darurat terhadap intensitas hujan sporadis."
      ]
    },
    reflection: {
      prompt: "Jika Anda memindahkan tumbuhan kaktus xerofit ke rawa hidrofit yang tergenang air terus menerus, hambatan fisiologis apa yang terjadi pada sistem perakaran tumbuhan tersebut?"
    }
  },
  {
    id: 5,
    title: "Klorofil: Mahakarya Pigmen Hijau Daun",
    verse: {
      surah: "Al-Hajj",
      ayat: "63",
      arabic: "أَلَمْ تَرَ أَنَّ اللَّهَ أَنْزَلَ مِنَ السَّمَاءِ مَاءً فَتُصْبِحُ الْأَرْضُ مُخْضَرَّةً ۗ إِنَّ اللَّهَ لَطِيفٌ خَبِيرٌ",
      translation: "Apakah kamu tidak melihat bahwasanya Allah menurunkan air dari langit, lalu jadilah bumi itu (hijau) segar dengan tumbuh-tumbuhan? Sesungguhnya Allah Maha Halus lagi Maha Mengetahui."
    },
    science: {
      title: "Kloroplas, Spektrum Cahaya, dan Magnesium Komposisi",
      description: "Zat hijau daun (klorofil) berlokasi di membran tilakoid kloroplas. Molekul klorofil secara kimiawi berupa cincin porfirin yang mengikat satu atom inti Magnesium (Mg) di pusatnya, mirip zat besi (Fe) pada hemoglobin darah manusia.",
      points: [
        "Magnesium (Mg): Unsur hara esensial pembentuk cincin klorofil. Tanpa Mg, tumbuhan mengalami klorosis (menguning).",
        "Spektrum Serap: Menyerap maksimal spektrum merah (640-680 nm) dan biru (430-460 nm), memantulkan spektrum hijau.",
        "Sintesis Klorofil: Diinduksi oleh ketersediaan air yang melarutkan ion Fe dan Mg ke daun via sirkulasi transpirasi.",
        "Karotenoid & Antosianin: Pigmen pendamping (asesoris) pelindung klorofil dari fotooksidasi akibat radiasi UV berlebih."
      ]
    },
    relation: {
      explanation: "Ungkapan 'fatusbihul ardhu mukhdharrah' (bumi menjadi hijau) menunjukkan hubungan mutlak antara hidrasi air dengan mengembangnya klorofil aktif. Istilah 'Lathiif' (Maha Halus) merepresentasikan detail presisi nan halus dari struktur mikroskopis tilakoid dan kawat transpor elektron klorofil yang tak kasat mata.",
      scientificFacts: [
        "Hujan melarutkan unsur Mg di tanah agar diserap xilem daun untuk merakit komponen klorofil baru pasca musim kering.",
        "Kemampuan klorofil menangkap foton cahaya dan menyalurkan elektron mencerminkan mesin bioelektrik tercanggih di semesta.",
        "Hanya selisih satu atom pusat (Mg vs Fe) yang membedakan molekul fungsional darah kehidupan hewan (merah) dan klorofil tumbuhan (hijau)."
      ]
    },
    reflection: {
      prompt: "Mengapa defisiensi (kekurangan) unsur Magnesium (Mg) pada tanaman dapat menurunkan laju produksi karbohidrat gandum atau padi secara dramatis? Jelaskan secara fisiologis!"
    }
  },
  {
    id: 6,
    title: "Keanekaragaman Tumbuhan (Plantae)",
    verse: {
      surah: "Al-An'am",
      ayat: "141",
      arabic: "وَهُوَ الَّذِي أَنْشَأَ جَنَّاتٍ مَعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ وَالزَّيْتُونَ وَالرُّمَّانَ مُتَشَابِهًا وَغَيْرَ مُتَشَابِه",
      translation: "Dan Dialah yang menjadikan kebun-kebun yang menjalar (memakai para-para) dan yang tidak menjalar, pohon kurma, tanaman-tanaman yang bermacam-macam buahnya, zaitun dan delima yang serupa dan tidak serupa (rasanya)..."
    },
    science: {
      title: "Sistematika Plantae: Bryophyta, Pteridophyta, Spermatophyta",
      description: "Dunia tumbuhan diklasifikasikan berdasarkan keberadaan berkas pengangkut (Tracheophyta dan Non-tracheophyta) serta cara perkembangbiakannya. Keberagaman morfologi menyusun relung ekologi yang saling melengkapi.",
      points: [
        "Bryophyta (Lumut): Non-vaskuler, menyerap air lewat sel-sel rizoid secara difusi, siklus hidup gametofit dominan.",
        "Pteridophyta (Paku): Vaskuler (memiliki xilem & floem), berkembang biak dengan spora, siklus sporofit dominan.",
        "Gymnospermae: Tumbuhan berbiji terbuka dengan alat reproduksi berupa strobilus (conifer).",
        "Angiospermae: Tumbuhan berbiji tertutup dengan bunga sejati, dipisahkan menjadi Monokotil dan Dikotil."
      ]
    },
    relation: {
      explanation: "Istilah 'ma'rusyaatin' (menjalar, merambat) dan 'ghaira ma'rusyaatin' (tegak mandiri, tidak merambat) adalah pengelompokan habitus tanaman yang sangat maju dalam Al-Qur'an. Ini merujuk pada keanekaragaman bentuk hidup (life forms) liana vs arborescent serta diversitas genetik antar kultivar tanaman ('mutasyaabihan wa ghaira mutasyaabih').",
      scientificFacts: [
        "Sifat memanjat (Liana/menjalar) adalah strategi ekofisiologis tanaman herba menjangkau penetrasi cahaya di Hutan Hujan.",
        "Pohon Kurma merupakan contoh monokotil arborescent raksasa yang kebal terhadap cekaman salinitas tinggi gurun pasir.",
        "Meskipun tumbuh di atas petak tanah yang homogen dan menyerap molekul air tanah yang sama, variasi ekspresi sekresi buah melahirkan rasa, aroma, dan bioaktif nutrisi yang berbeda-beda."
      ]
    },
    reflection: {
      prompt: "Bagaimana korelasi antara taksonomi herba memanjat (liana) dengan hukum persaingan (kompetisi) antar spesies tumbuhan dalam menangkap intensitas radiasi matahari di kanopi hutan?"
    }
  },
  {
    id: 7,
    title: "Reproduksi dan Pasangan Tumbuhan",
    verse: {
      surah: "Taha",
      ayat: "53",
      arabic: "وَأَنزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ أَزْوَاجًا مِّن نَّبَاتٍ شَتَّىٰ",
      translation: "Dan yang menurunkan air dari langit; maka Kami tumbuhkan dengan air itu berpasang-pasangan dari berbagai jenis tumbuh-tumbuhan."
    },
    science: {
      title: "Biologi Reproduksi, Penyerbukan, serta Metagenesis",
      description: "Tumbuhan melakukan perkembangbiakan seksual (generatif) dan aseksual (vegetatif). Seksual melibatkan fusi sel gamet jantan (polen) dengan gamet betina (sel telur) di ovulum, menggambarkan konsep berpasang-pasangan yang bersifat universal.",
      points: [
        "Penyerbukan (Polinasi): Proses melekatnya serbuk sari (stamen) ke kepala putik (pistilum).",
        "Polinasi Eksternal: Dibantu angin (Anemofili), air (Hidrofili), serangga (Entomofili), atau manusia (Antropofili).",
        "Metagenesis: Pergiliran keturunan antara fase gametofit haploid (n) penghasil gamet dan fase sporofit diploid (2n) penghasil spora.",
        "Fertilisasi Ganda: Khas pada Angiospermae, menghasilkan zigot (bakal tumbuhan) dan endosperma (cadangan makanan biji)."
      ]
    },
    relation: {
      explanation: "Kata bahasa Arab 'Azwaajan' secara harfiah berarti 'pasangan'. Berabad-abad sebelum ilmuwan modern memahami organ reproduksi tumbuhan (benang sari dan putik), Al-Qur'an telah menegaskan prinsip kelamin genetik (pasangan jantan-betina) pada flora yang memicu diversitas hayati tak terhingga ('syattaaa').",
      scientificFacts: [
        "Sebagian besar tanaman memiliki bunga hermafrodit (sempurna), namun penyerbukan silang merangsang rekombinasi genetik.",
        "Angin bertindak sebagai vektor peniup polen penyubur tanaman (QS. Al-Hijr: 22), meningkatkan kemakmuran keanekaragaman gen.",
        "Isolasi reproduksi menjamin integritas kromosom genetik tetap terjaga di antara kebun-kebun herba yang bercampur."
      ]
    },
    reflection: {
      prompt: "Hubungkan konsep 'Azwaajan' (berpasangan) dalam biologi reproduksi dengan kompleksitas penyerbukan silang (cross-pollination) dalam menjaga variabilitas genetik suatu populasi spesies tumbuhan!"
    }
  },
  {
    id: 8,
    title: "Manfaat Tumbuhan bagi Ekosistem",
    verse: {
      surah: "Abasa",
      ayat: "27-32",
      arabic: "فَأَنْبَتْنَا فِيهَا حَبًّا۔ وَعِنَبًا وَقَضْبًا۔ وَزَيْتُونًا وَنَخْلًا۔ وَحَدَائِقَ غُلْبًا۔ وَفَاكِهَةً وَأَبًّا۔ مَتَاعًا لَكُمْ وَلِأَنْعَامِكُمْ",
      translation: "Lalu Kami tumbuhkan biji-bijian di bumi itu, anggur dan sayur-sayuran, zaitun dan pohon kurma, kebun-kebun yang lebat (rindang), buah-buahan serta rumput-rumputan, untuk kesenanganmu dan untuk hewan ternakmu."
    },
    science: {
      title: "Layanan Ekosistem, Jaringan Nutrisi, dan Siklus Karbon",
      description: "Tumbuhan menempati posisi puncak sebagai Produsen Primer dalam piramida energi biosfer. Selain pangan, tumbuhan menyuplai komponen sekunder, mereduksi emisi karbon global, mencegah abrasi, dan mempertahankan debit air tanah.",
      points: [
        "Produsen Primer: Mengubah molekul inorganik menjadi molekul organik padat kalori (rantai makanan).",
        "Siklus Oksigen & Karbon (Spons Karbon): Penyerap gas polutan CO2 dan menukarnya dengan O2 bersih.",
        "Komponen Metabolit Sekunder: Sintesis fitokimia bernilai medis tinggi (antioksidan, flavonoid, alkaloid).",
        "Evapotranspirasi Tajuk: Pembentuk iklim mikro udara lembab penyejuk suhu wilayah tropis."
      ]
    },
    relation: {
      explanation: "Ayat ini mengurai klasifikasi pangan bergizi tinggi yang melimpah karbohidrat ('habban'), serat pelarut & vitamin (''inaban', 'qadhban'), lemak tak jenuh ('zaituunan'), mineral besi protein ('nakhlan'), serta pakan serat ternak ('abban') sebagai sumber jaminan pangan manusia ('mataa'an lakum wa li'an'aamikum'). Ekosistem hijau yang rimbun ('hadaa-iqa ghulbaa') adalah paru-paru bumi terindah.",
      scientificFacts: [
        "Kurma kaya akan potasium, zat besi rona, dan glukosa alami yang cepat meregenerasi energi darah manusia.",
        "Zaitun mengandung asam oleat tak jenuh rantai tunggal tinggi yang melindungi pembuluh darah manusia dari plak kolesterol jahat.",
        "Pola interaksi trofik menunjukkan bahwa kehidupan hewan pemakan rumput ('abban') adalah rantai penghubung protein bermutu tinggi bagi kehidupan manusia secara holistik."
      ]
    },
    reflection: {
      prompt: "Analisis dampak hancurnya kebun rimbun (deforestasi) terhadap gangguan keseimbangan kadar sirkulasi O2 dan CO2 di lapisan troposfer bumi kita!"
    }
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: "multiple-choice",
    question: "Manakah di bawah ini yang merupakan ciri utama dari Kingdom Plantae?",
    options: [
      "A. Prokariotik, uniseluler, heterotrof",
      "B. Eukariotik, multiseluler, autotrof dengan klorofil",
      "C. Eukariotik, uniseluler, memiliki flagela aktif",
      "D. Multiseluler, heterotrof sejati, dinding sel kitin"
    ],
    correctAnswer: "B. Eukariotik, multiseluler, autotrof dengan klorofil",
    explanation: "Kingdom Plantae bercirikan eukariotik (memiliki membran inti), multiseluler (sel banyak), memiliki klorofil untuk menyusun makanan sendiri (autotrof), dan memiliki dinding sel berbahan selulosa."
  },
  {
    id: 2,
    type: "true-false",
    question: "Imbibisi air merupakan proses penyerapan kloroplas secara aktif demi menghambat pertumbuhan embrio dalam biji kering.",
    correctAnswer: "Salah",
    explanation: "Imbibisi adalah masuknya air ke dalam biji kering (dorman) secara fisik/osmosis, yang justru mengaktifkan metabolisme embrio (melalui hormon giberelin) untuk memulai perkecambahannya, bukan menghambat."
  },
  {
    id: 3,
    type: "hots",
    question: "Dalam QS. Yasin: 80 disebutkan tentang 'api dari kayu yang hijau'. Berdasarkan prinsip kekekalan energi dan proses fisio-kimia tumbuhan, pernyataan paling rasional yang menghubungkan sains dan ayat ini adalah...",
    options: [
      "A. Air dalam kayu hijau meledak menghasilkan percikan api panas.",
      "B. Energi matahari kuno diikat klorofil daun menjadi energi kimia selulosa, yang saat kering dibakar berubah kembali menjadi energi termal (api).",
      "C. Kayu basah memiliki kandungan oksigen cair murni sehingga menginduksi reaksi ledakan panas spontan.",
      "D. Klorofil secara acak terbakar spontan di dalam jaringan pembuluh floem pohon yang masih aktif hidup."
    ],
    correctAnswer: "B. Energi matahari kuno diikat klorofil daun menjadi energi kimia selulosa, yang saat kering dibakar berubah kembali menjadi energi termal (api).",
    explanation: "Fotosintesis di daun hijau mengonversi energi foton cahaya mentah menjadi molekul polimer selulosa penyusun kayu keras. Pembakaran kayu kering pada hakikatnya membebaskan ikatan kimia hasil fiksasi energi foton matahari purba tersebut."
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "Struktur anatomi akar yang kedap air dan berfungsi menyeleksi jalannya mineral masuk ke pembuluh xilem disebut...",
    options: [
      "A. Epidermis bawah",
      "B. Pita Kaspari di Endodermis",
      "C. Kaliptra pelindung ujung",
      "D. Jaringan empulur xilem"
    ],
    correctAnswer: "B. Pita Kaspari di Endodermis",
    explanation: "Pita kaspari merupakan penebalan zat suberin/lignin pada dinding sel endodermis akar yang memblokir jalur apoplas, memaksa larutan mengalir secara selektif via jalur simplas untuk masuk ke silinder pusat."
  },
  {
    id: 5,
    type: "true-false",
    question: "Molekul klorofil memiliki kemiripan struktur dengan zat hemoglobin darah, di mana klorofil mengikat ion Magnesium (Mg) sebagai atom pusatnya.",
    correctAnswer: "Benar",
    explanation: "Benar sekali! Cincin porfirin klorofil mengikat ion Magnesium (Mg) di pusatnya, sementara hemoglobin mengikat Besi (Fe)."
  },
  {
    id: 6,
    type: "multiple-choice",
    question: "Tumbuhan gurun (xerofit) memodifikasi stomatanya menjadi terbenam di dalam permukaan daun. Strategi adaptif ini bertujuan untuk...",
    options: [
      "A. Meningkatkan laju transpirasi air secara instan",
      "B. Melindungi kloroplas dari fiksasi gas nitrogen terlarut",
      "C. Menekan hilangnya uap air akibat hembusan angin kering dan suhu panas",
      "D. Mempercepat penguapan air agar akar menyerap mineral lebih deras"
    ],
    correctAnswer: "C. Menekan hilangnya uap air akibat hembusan angin kering dan suhu panas",
    explanation: "Stomata terbenam (sunken stomata) menciptakan kantong udara mikro yang lembab di sekitar lubang stomata, sehingga menurunkan laju penguapan (transpirasi) di ekosistem xerofit."
  },
  {
    id: 7,
    type: "true-false",
    question: "Tumbuhan lumut (Bryophyta) diklasifikasikan sebagai tumbuhan vaskuler karena memiliki saluran pipa xilem dan floem yang nyata.",
    correctAnswer: "Salah",
    explanation: "Bryophyta adalah tumbuhan non-vaskuler (tidak berpembuluh). Penyaluran air dan nutrisi berlangsung secara lambat melalui kapilaritas sel demi sel (difusi)."
  },
  {
    id: 8,
    type: "matching",
    question: "Cocokkan kelompok tumbuhan dengan ciri khas perkembangbiakannya yang tepat!",
    matchingPairs: [
      { left: "Bryophyta (Lumut)", right: "Metagenesis dengan fase Gametofit dominan" },
      { left: "Pteridophyta (Paku)", right: "Metagenesis dengan fase Sporofit dominan" },
      { left: "Angiospermae", right: "Mengalami pembuahan ganda menghasilkan endosperma" },
      { left: "Gymnospermae", right: "Menggunakan strobilus karena biji terbuka" }
    ],
    correctAnswer: {
      "Bryophyta (Lumut)": "Metagenesis dengan fase Gametofit dominan",
      "Pteridophyta (Paku)": "Metagenesis dengan fase Sporofit dominan",
      "Angiospermae": "Mengalami pembuahan ganda menghasilkan endosperma",
      "Gymnospermae": "Menggunakan strobilus karena biji terbuka"
    },
    options: [
      "Metagenesis dengan fase Gametofit dominan",
      "Metagenesis dengan fase Sporofit dominan",
      "Mengalami pembuahan ganda menghasilkan endosperma",
      "Menggunakan strobilus karena biji terbuka"
    ],
    explanation: "Lumut didominasi gametofit (hijau, berumur panjang). Paku didominasi sporofit (tumbuhan paku dewasa). Angiospermae memiliki pembuahan keping ganda. Gymnospermae mengandalkan runjung/strobilus."
  },
  {
    id: 9,
    type: "drag-and-drop",
    question: "Urutkan proses fotosintesis Reaksi Terang berikut dari awal penerimaan cahaya matahari hingga pembentukan energi!",
    dragSource: [
      "1. Foton cahaya mengeksitasi elektron klorofil di Fotosistem II",
      "2. Fotolisis air menghasilkan gas oksigen dan ion H+",
      "3. Perpindahan elektron melalui rantai sitokrom",
      "4. Terbentuknya NADPH dan ATP oleh ATP Sintase"
    ],
    correctAnswer: [
      "1. Foton cahaya mengeksitasi elektron klorofil di Fotosistem II",
      "2. Fotolisis air menghasilkan gas oksigen dan ion H+",
      "3. Perpindahan elektron melalui rantai sitokrom",
      "4. Terbentuknya NADPH dan ATP oleh ATP Sintase"
    ],
    explanation: "Reaksi terang diawali penangkapan foton, lalu fotolisis air menyumbang elektron ke ksub-sitokrom, melintasi akseptor rantai transport elektrokimiawi, dan diakhiri dengan aktivasi ATP Sintase memproduksi molekul kaya energi."
  },
  {
    id: 10,
    type: "hots",
    question: "QS. Taha: 53 berbunyi 'Kami tumbuhkan dengannya berpasang-pasangan (Azwaajan)...' Manakah di bawah ini pembuahan dalam Angiospermae yang secara sempurna mencerminkan proses berpasangan ganda?",
    options: [
      "A. Sperma I membuahi sinergid, Sperma II menguap bebas",
      "B. Pelekatan pollen pada stigma bunga sejenis saja",
      "C. Inti sperma I membuahi sel telur (membentuk zigot), sedangkan inti sperma II membuahi inti kandung lembaga sekunder (membentuk endosperma)",
      "D. Penyatuan benang sari luar dengan putik luar menghasilkan spora sporangium baru"
    ],
    correctAnswer: "C. Inti sperma I membuahi sel telur (membentuk zigot), sedangkan inti sperma II membuahi inti kandung lembaga sekunder (membentuk endosperma)",
    explanation: "Pembuahan ganda Angiospermae melibatkan dua pasangan fusi sekaligus: satu menghasilkan generasi embrio baru (zigot diploid) dan satu penyedia bekal energi instan (endosperma triploid)."
  },
  {
    id: 11,
    type: "multiple-choice",
    question: "Kekurangan unsur hara Nitrogen (N) menyebabkan daun klorosis. Bagaimanakah fungsi utama Nitrogen bagi klorofil?",
    options: [
      "A. Nitrogen menyusun dinding sel primer selulosa",
      "B. Nitrogen merupakan atom penyusun cincin pirrol fotoreseptor molekul klorofil",
      "C. Nitrogen mencegah penguapan air di batang berkayu",
      "D. Nitrogen adalah gas pelindung tilakoid dari bahaya kekeringan"
    ],
    correctAnswer: "B. Nitrogen merupakan atom penyusun cincin pirrol fotoreseptor molekul klorofil",
    explanation: "Klorofil tersusun atas atom karbon, hidrogen, oksigen, nitrogen (N), dan atom pusat magnesium (Mg). Kekurangan N merusak struktur cincin fotoreseptor klorofil."
  },
  {
    id: 12,
    type: "true-false",
    question: "Tumbuhan Gymnospermae membungkus bijinya di dalam daun buah (ovarium).",
    correctAnswer: "Salah",
    explanation: "Gymno artinya telanjang/terbuka. Biji Gymnospermae tidak terlindung di dalam daging buah (ovarium) melainkan melekat langsung di permukaan sisik konus strobilus."
  },
  {
    id: 13,
    type: "multiple-choice",
    question: "QS. Al-A'raf: 58 menggambarkan tanah subur yang mengeluarkan tanaman subur, dan tanah buruk yang mengeluarkan tanaman kerdil (merana). Dalam sains tanah, kesuburan tanah dipengaruhi oleh keberadaan biofisika berikut ini, KECUALI...",
    options: [
      "A. Ketersediaan mikrobia pelarut fosfat dan penambat nitrogen",
      "B. Porositas tanah untuk aerasi akar bernapas",
      "C. Ketiadaan ion Mg dan Ca secara total dalam koloid tanah",
      "D. Struktur humus pengikat air tanah"
    ],
    correctAnswer: "C. Ketiadaan ion Mg dan Ca secara total dalam koloid tanah",
    explanation: "Ketiadaan total Mg dan Ca (kation penting) justru akan membunuh tanaman atau membuatnya merana ekstrim (tidak mendasari kesuburan tanah)."
  },
  {
    id: 14,
    type: "true-false",
    question: "Hormon Giberelin diproduksi biji setelah mendeteksi aliran imbibisi air masuk untuk mengaktifkan enzim amilase pelumat cadangan makanan.",
    correctAnswer: "Benar",
    explanation: "Benar! Imbibisi air memicu pelepasan asam giberelat (GA) dari embrio yang berdiferensiasi ke lapisan aleuron untuk merangsang sintesis enzim amilase."
  },
  {
    id: 15,
    type: "hots",
    question: "Analisis ekosistem: Apabila seluruh vegetasi tumbuhan hijau di bumi mengalami kematian mendadak, manakah dampak berantai yang paling pertama meruntuhkan tatanan kehidupan biosfer?",
    options: [
      "A. Punahnya bakteri pengurai tanah",
      "B. Terputusnya siklus energi karena tidak ada produsen primer yang mengubah energi cahaya menjadi energi metabolik hewani",
      "C. Suhu troposfer turun seketika menjadi membeku",
      "D. Logam mulia menghilang dari bebatuan kerak bumi"
    ],
    correctAnswer: "B. Terputusnya siklus energi karena tidak ada produsen primer yang mengubah energi cahaya menjadi energi metabolik hewani",
    explanation: "Tumbuhan ditempatkan pada trofik dasar produsen karbon primer. Kematian tumbuhan menghentikan arus asupan kalori/energi matahari bagi seluruh herbivor, karnivor, hingga omnivor."
  },
  {
    id: 16,
    type: "multiple-choice",
    question: "Fungsi utama stomata bagi fisiologi respirasi dan fotosintesis adalah...",
    options: [
      "A. Menyerap zat organik humus langsung dari udara",
      "B. Tempat lalu lintas pertukaran gas molekuler CO2, O2, dan uap air",
      "C. Jalur masuk zat patogen jamur tanah",
      "D. Memompa air cair keluar secara gutasi aktif"
    ],
    correctAnswer: "B. Tempat lalu lintas pertukaran gas molekuler CO2, O2, dan uap air",
    explanation: "Stomata adalah celah mikroskopis di epidermis daun yang meregulasi difusi CO2 ke dalam sel mesofil serta pengeluaran O2 hasil fotosintesis dan evaporasi air."
  },
  {
    id: 17,
    type: "true-false",
    question: "Fase gametofit pada tumbuhan paku (prosedur metagenesis) diwakili oleh tumbuhan paku rindang dewasa berkelompok.",
    correctAnswer: "Salah",
    explanation: "Tumbuhan paku dewasa rindang bernilai diploid (2n) dan menghasilkan spora, sehingga mewakili fase Sporofit. Fase gametofit paku berupa talus kecil berbentuk hati bebas bernama protalium."
  },
  {
    id: 18,
    type: "multiple-choice",
    question: "Pembuktian bahwa air ditarik ke atas daun lewat gaya tarik transpirasi, adhesi, dan kohesi secara berkesinambungan dikenal dalam teori...",
    options: [
      "A. Teori Hukum Newton Gravitasi",
      "B. Teori Kohesi-Tegangan Dixon-Joly",
      "C. Teori Guttasi Tekanan Osmotik",
      "D. Teori Karbohidrat Sederhana"
    ],
    correctAnswer: "B. Teori Kohesi-Tegangan Dixon-Joly",
    explanation: "Mata rantai tarikan air dari akar ke daun merupakan kombinasi gaya kohesi (antar molekul air) dan tarikan mekanis transpirasi akibat penguapan di mesofil."
  },
  {
    id: 19,
    type: "true-false",
    question: "Pohon kurma (Phoenix dactylifera) merupakan jenis monokotil yang tangguh bertahan terhadap kadar garam salinitas gawat.",
    correctAnswer: "Benar",
    explanation: "Meskipun monokotil, pohon kurma memiliki metabolisme handal mengatur transportasi air kotor dan mengandalkan vakuola anti-osmotik kencang."
  },
  {
    id: 20,
    type: "hots",
    question: "Sekelompok siswa mengamati fotosintesis hidrofit Hydrilla verticillata. Mereka meletakkan corong kaca terbalik di bawah pancaran matahari terik dan mengamati tumpukan gelembung cepat naik. Gelembung apakah itu?",
    options: [
      "A. Gas CO2 sisa pembakaran",
      "B. Gas Oksigen (O2) hasil fotolisis molekul air",
      "C. Gas Nitrogen cair atmosfer",
      "D. Karbohidrat menguap akibat panas mendidih"
    ],
    correctAnswer: "B. Gas Oksigen (O2) hasil fotolisis molekul air",
    explanation: "Reaksi terang thilakoid memecah molekul H2O (fotolisis) di dekat Fotosistem II melepaskan gas Oksigen (O2) yang mengapung ke permukaan air sebagai busa/gelembung."
  },
  {
    id: 21,
    type: "multiple-choice",
    question: "Kelompok Angiospermae Monokotil memiliki ciri anatomis batang berupa...",
    options: [
      "A. Berkas pengangkut tersebar acak tanpa kambium",
      "B. Berkas pengangkut mengumpul melingkar di luar kolateral terbuka",
      "C. Adanya empulur kayu jati tebal berkambium",
      "D. Pembuluh tapis xilem melebar membentuk lingkaran silinder lingkaran tahunanulae"
    ],
    correctAnswer: "A. Berkas pengangkut tersebar acak tanpa kambium",
    explanation: "Monokotil berkas pengangkutnya (xilem dan floem) tersebar (kolateral tertutup) di jaringan dasar batang tanpa dipisahkan oleh jaringan meristem kambium sekunder."
  },
  {
    id: 22,
    type: "true-false",
    question: "Angin bertali-tali bertindak meremajakan tanaman dengan mengantarkan debu-debu spora kawin (polen) ke putik bunga seberang.",
    correctAnswer: "Benar",
    explanation: "Hal ini sesuai dengan biological fact dan QS. Al-Hijr: 22 bahwa angin bertindak sebagai pembawa polen perkawinan silang alami penjamin diversitas hayati."
  },
  {
    id: 23,
    type: "multiple-choice",
    question: "Tumbuhan karnivor seperti kantong semar (Nepenthes) memakan serangga kecil. Hal ini membuktikan adaptasi ekologis terhadap habitat yang mengalami defisiensi...",
    options: [
      "A. Unsur Oksigen bebas hara",
      "B. Unsur Nitrogen tanah yang langka",
      "C. Kadar besi karat batuan kapur",
      "D. Suplai air murni pegunungan"
    ],
    correctAnswer: "B. Unsur Nitrogen tanah yang langka",
    explanation: "Kantong semar hidup di habitat bersalinitas asam marginal yang miskin unsur Nitrogen bebas. Mereka memakan serangga guna memperoleh asam amino kaya Nitrogen alami terlarut tubuh mangsa."
  },
  {
    id: 24,
    type: "true-false",
    question: "Tumbuhan paku kawat (Lycopodium) berkembang biak secara seksual eksklusif menggunakan strobilus layaknya pohon pinus.",
    correctAnswer: "Salah",
    explanation: "Golongan paku tidak memiliki strobilus sperma sejati layaknya Gymnospermae melainkan berkembang biak dengan spora di sporangium."
  },
  {
    id: 25,
    type: "hots",
    question: "Bagaimanakah keterkaitan Al-Qur'an surah Al-An'am ayat 141 yang menjelaskan tanaman 'serupa tetapi tidak serupa' dengan genetika molekuler Plantae modern?",
    options: [
      "A. Menunjukkan variasi fenotip dan genotip meskipun dalam satu taksonomi jenis akibat perbedaan struktur basa DNA dan komposisi ekologis nutrisi luar yang diaktifkan",
      "B. Membuktikan tumbuhan dapat menukar inti kromosom secara instan lewat udara kosong",
      "C. Menyatakan tumbuhan tidak memiliki spesies rasional yang mantap struktur biokimianya",
      "D. Memastikan tidak ada silsilah evolusi genetika lurus yang diakui sains modern"
    ],
    correctAnswer: "A. Menunjukkan variasi fenotip dan genotip meskipun dalam satu taksonomi jenis akibat perbedaan struktur basa DNA dan komposisi ekologis nutrisi luar yang diaktifkan",
    explanation: "Konsep 'mutasyaabihan wa ghaira mutasyaabih' (serupa tapi tak sama) melambangkan variabilitas hayati (keanekaragaman gen dan jenis). Tumbuhan mungkin serupa tampilannya (satu genus/spesies), namun memiliki variasi rasa, khasiat metabolit sekunder, atau pola ketahanan hama berbeda."
  },
  {
    id: 26,
    type: "multiple-choice",
    question: "Kandungan metabolit sekunder zaitun berupa asam lemak tak jenuh rantai tunggal sangat menyehatkan pembuluh darah koroner karena memiliki khasiat...",
    options: [
      "A. Mempercepat pembekuan kalsium di ginjal",
      "B. Mengoksidasi radikal bebas dan menurunkan kolesterol jahat (LDL)",
      "C. Menghentikan aliran darah kapiler otak",
      "D. Mengikat karbon hidroksil agar empedu berbusa"
    ],
    correctAnswer: "B. Mengoksidasi radikal bebas dan menurunkan kolesterol jahat (LDL)",
    explanation: "Metabolit sekunder zaitun (oleuropein, hidroksitirosol, asam oleat) merupakan zat antiinflamasi alamiah yang ampuh merawat kolesterol elastis pembuluh vena dan arteri manusia."
  },
  {
    id: 27,
    type: "true-false",
    question: "Semua Angiospermae dikotil memiliki urat daun sejajar memanjang dari pangkal hingga tepi ujung daun.",
    correctAnswer: "Salah",
    explanation: "Pertulangan daun sejajar/melengkung meruapakan ciri khas tanaman kelas Monokotil. Tumbuhan kelas Dikotil memiliki pertulangan daun menjari atau menyirip."
  },
  {
    id: 28,
    type: "multiple-choice",
    question: "Manfaat ekologis dari tajuk pohon rimbun yang menghalangi air hujan menimpa tanah secara sporadis langsung (intersepsi hujan) adalah...",
    options: [
      "A. Mempertinggi laju longsor dan banjir tebing sungai",
      "B. Menghambat jalannya penyerapan mineral akar lumut bawah",
      "C. Mencegah erosi permukaan butiran tanah subur akibat hantaman energi kinetik air hujan",
      "D. Menurunkan suhu inti daun hingga membeku kering"
    ],
    correctAnswer: "C. Mencegah erosi permukaan butiran tanah subur akibat hantaman energi kinetik air hujan",
    explanation: "Kanopi hutan lebat meredam kecepatan jatuh air hujan (intersepsi canopy). Air kemudian menetes perlahan (throughfall) ke permukaan tanah, meminimalkan erosi mekanis tanah subur."
  },
  {
    id: 29,
    type: "true-false",
    question: "Kutikula daun terbuat dari lapisan lilin non-polar tebal hidrofobik yang bertindak sebagai tanggul pelindung dehidrasi transpirasi berlebih.",
    correctAnswer: "Benar",
    explanation: "Kutikula berlapis lilin (kutin dan lilin) bersifat hidrofobik, mencegah molekul air lolos ke atmosfer bebas secara langsung lewat membran epidermis."
  },
  {
    id: 30,
    type: "hots",
    question: "Dalam problem lingkungan PBL: Jika kadar gas CO2 meningkat subur merusak suhu troposfer (efek rumah kaca), kontribusi biologi plantaen apakah yang paling mendesak difokuskan untuk memitigasi bencana tersebut?",
    options: [
      "A. Membakar tumpukan jerami padi secara masif serempak",
      "B. Reboisasi vegetasi berkayu berkapasitas fotosintesis daun besar guna bertindak sebagai wastafel penyedot karbon (carbon sink) global",
      "C. Menebas pohon-pohon rindang agar tanah kering merefleksikan cahaya matahari kembali ke awan",
      "D. Membuat kolam-kolam garam kimiawi buatan menggantikan habitat lumut"
    ],
    correctAnswer: "B. Reboisasi vegetasi berkayu berkapasitas fotosintesis daun besar guna bertindak sebagai wastafel penyedot karbon (carbon sink) global",
    explanation: "Tumbuhan berkayu bertindak sebagai carbon sink yang sangat masif. Karbon dioksida dari udara dibersihkan secara alami melalui asimilasi siklus Calvin, mengubah gas beracun tersebut menjadi zat padat organik berkayu penyimpan karbon lestari."
  }
];

export const BADGES: Badge[] = [
  {
    id: "ahli_plantae",
    name: "Ahli Plantae",
    description: "Memahami 8 modul sains Plantae & Al-Qur'an secara penuh.",
    icon: "Sprout",
    unlocked: false,
    category: "Plantae"
  },
  {
    id: "peneliti_muda",
    name: "Peneliti Muda",
    description: "Menyelesaikan seluruh tahapan observasi LKPD PBL.",
    icon: "Compass",
    unlocked: false,
    category: "Research"
  },
  {
    id: "penjaga_lingkungan",
    name: "Penjaga Lingkungan",
    description: "Menganalisis skenario kerusakan alam di virtual lab & LKPD.",
    icon: "ShieldAlert",
    unlocked: false,
    category: "Eco"
  },
  {
    id: "pecinta_quran",
    name: "Pecinta Al-Qur'an",
    description: "Mengintegrasikan ayat suci Al-Qur'an serta mendengarkan murottal.",
    icon: "BookOpen",
    unlocked: false,
    category: "Quran"
  }
];
