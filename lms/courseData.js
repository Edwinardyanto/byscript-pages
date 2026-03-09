// byScript Academy — Mock Course Data
// Extend this file with additional modules and lessons as content grows

export const courseData = {
  id: "byscript-algo-trading-v1",
  title: "Algorithmic Trading Mastery",
  subtitle: "From zero to systematic trader — build, test, and deploy real strategies.",
  description:
    "A structured, practical course on building algorithmic trading systems from the ground up. Covers mindset, tooling, strategy anatomy, backtesting, automation, and live deployment using Python, TradingView, and AI-assisted workflows.",
  instructor: "byScript Academy",
  totalModules: 4,
  estimatedHours: "12+ hours",
  level: "Beginner to Intermediate",
  modules: [
    {
      id: "M01",
      title: "Foundations of Algorithmic Trading",
      overview:
        "Establish the conceptual and practical groundwork for algorithmic trading. This module covers what algo trading is, the mental frameworks required, the tools you'll use throughout the course, and how a complete trading strategy is structured.",
      learning_outcomes: [
        "Understand what algorithmic trading is and why it outperforms discretionary trading in the long run",
        "Adopt a probabilistic mindset and understand drawdown as a feature, not a bug",
        "Set up your complete trading toolkit: TradingView, AI assistants, and byScript resources",
        "Deconstruct the anatomy of a trading strategy into its core components",
      ],
      total_duration: "45 min",
      lessons: [
        {
          id: "M01-V01",
          module_id: "M01",
          video_number: 1,
          title: "What Is Algo Trading and Why Is It Better?",
          youtube_url: "https://www.youtube.com/watch?v=E-UzH6QvjNg",
          youtube_id: "E-UzH6QvjNg",
          duration: "10:24",
          completed: false,
          summary:
            "Video ini membahas fondasi paling awal tentang algo trading: apa itu algo trading, kenapa pendekatan manual sering gagal, serta apa saja keunggulan utama sistem trading berbasis aturan.",
          description:
            "Video ini memperkenalkan konsep dasar algo trading sebagai cara trading yang menggunakan program atau script untuk membaca kondisi market dan mengeksekusi order berdasarkan aturan yang sudah ditetapkan sebelumnya. Kamu akan memahami mengapa banyak trader manual gagal bukan karena tidak punya strategi, tetapi karena eksekusinya tidak stabil akibat emosi dan inkonsistensi. Di akhir video, kamu juga akan melihat roadmap belajar yang jelas: dari ide strategi, Pine Script, backtest, Monte Carlo, hingga auto-trade.",
          key_takeaways: [
            "Algo trading adalah penggunaan program untuk membaca market dan mengeksekusi order berdasarkan aturan yang sudah ditetapkan sebelumnya",
            "Trader manual sering gagal karena emosi, inkonsistensi, bias, dan kelelahan — bukan karena tidak punya strategi",
            "Keunggulan utama algo trading: konsisten, cepat, dan tanpa emosi",
            "Algo trading bukan jaminan profit — sistem tetap bisa rugi, tetapi prosesnya lebih objektif dan edge-nya dapat diuji",
            "Kamu tidak harus jago coding untuk memulai — AI bisa membantu selama logika tradingnya jelas",
          ],
          comprehensive_explanation:
            "Materi menjelaskan bahwa banyak trader gagal bukan semata karena tidak punya strategi, tetapi karena eksekusinya tidak stabil. Emosi, overthinking, kelelahan, dan pergantian strategi yang terlalu cepat menjadi penyebab utama kegagalan.\n\nAlgo trading didefinisikan sebagai penggunaan program atau script untuk membaca kondisi market dan mengeksekusi order berdasarkan aturan yang sudah ditetapkan sebelumnya. Artinya, trader lebih dulu mendefinisikan logika tradingnya, lalu sistem yang menjalankannya secara disiplin.\n\nTiga keunggulan yang ditekankan adalah konsistensi, kecepatan, dan ketiadaan emosi. Sistem tidak takut saat loss, tidak serakah saat profit, dan bisa mengeksekusi sinyal dengan disiplin selama aturan terpenuhi.\n\nAlgo trading bukan jaminan profit. Sistem tetap bisa rugi, tetapi kelebihannya adalah prosesnya lebih objektif dan edge-nya dapat diuji. Materi juga menegaskan bahwa kamu tidak harus jago coding dari awal — AI bisa membantu menghasilkan kode selama logika tradingnya sudah jelas.\n\nArah belajar yang disarankan adalah: mulai dari ide strategi, ubah menjadi Pine Script, lakukan backtest, validasi dengan Monte Carlo, lalu baru pertimbangkan auto-trade.",
          timestamps: [
            { time: "0:00", label: "Pembukaan: apa itu algo trading dan kenapa lebih unggul dari trading manual" },
            { time: "0:06", label: "Masalah manual trading: emosi, inkonsistensi, bias, dan kelelahan" },
            { time: "1:40", label: "Definisi algo trading: program yang mengeksekusi order berbasis aturan" },
            { time: "2:45", label: "Perbandingan manual trading vs algo trading" },
            { time: "4:49", label: "Mitos vs realita: algo trading bukan jaminan profit" },
            { time: "7:44", label: "Roadmap belajar: ide strategi → Pine Script → backtest → Monte Carlo → auto-trade" },
            { time: "8:43", label: "Recap keseluruhan video" },
          ],
          transcript_clean:
            "Welcome to byScript Academy. In this first lesson, we're going to answer a fundamental question: what is algorithmic trading, and why should you care?\n\nAt its core, algorithmic trading is simple. You write down your trading rules — when to buy, when to sell, how much to risk — and you encode those rules into a system that executes them automatically. That's it.\n\nBut here's the thing most people miss: the power isn't in the automation. The power is in the discipline that automation forces on you. When you have to write down your rules explicitly, you have to think clearly about your edge. You can't just 'feel' your way through a trade anymore...",
        },
        {
          id: "M01-V02",
          module_id: "M01",
          video_number: 2,
          title: "Algo Trader Mindset: Probabilistic Thinking and Drawdown",
          youtube_url: "https://www.youtube.com/watch?v=zjNwzBWXiyc",
          youtube_id: "zjNwzBWXiyc",
          duration: "12:08",
          completed: false,
          summary:
            "Video ini mengubah cara pandang kamu terhadap trading. Fokusnya bukan menebak satu trade akan menang atau kalah, tetapi memahami probabilitas, menerima drawdown sebagai bagian normal, dan fokus pada expectancy — bukan win rate.",
          description:
            "Sebagian besar trader gagal bukan karena strategi mereka buruk, tetapi karena mereka meninggalkannya di tengah periode drawdown yang sebetulnya normal. Video ini membangun fondasi psikologis yang dibutuhkan untuk menjalankan sistem algo dalam jangka panjang. Kita akan membahas berpikir probabilistik, merangkul drawdown, expectancy vs win rate, serta pentingnya journaling dan review.",
          key_takeaways: [
            "Algo trader tidak menilai kualitas strategi dari satu trade — yang dilihat adalah kumpulan trade dalam jumlah besar",
            "Drawdown adalah penurunan equity dari puncak ke titik terendah — ini hal normal, bukan tanda strategi rusak",
            "Expectancy lebih penting dari win rate: strategi dengan win rate rendah tetap bisa profit jika average win-nya besar",
            "Tentukan batas drawdown yang masih nyaman secara personal sebelum mulai trading",
            "Journaling dan review rutin membantu memastikan strategi masih layak dijalankan",
          ],
          comprehensive_explanation:
            "Algo trader tidak menilai kualitas strategi dari satu trade. Yang dilihat adalah kumpulan trade dalam jumlah cukup besar. Karena itu, sample size backtest yang memadai sangat penting untuk menilai strategi secara layak.\n\nDrawdown dijelaskan sebagai penurunan equity dari titik tertinggi ke titik terendah sebelum recovery. Drawdown dianalogikan seperti musim paceklik pada petani: tidak nyaman, tetapi tetap bagian normal dari proses jangka panjang. Trader perlu tahu berapa drawdown yang mungkin dialami, lalu menilai apakah angka itu masih nyaman secara pribadi.\n\nMateri menjelaskan bahwa strategi dengan win rate tinggi belum tentu menguntungkan jika kerugian rata-ratanya terlalu besar. Sebaliknya, strategi dengan win rate rendah tetap bisa profit jika expectancy-nya positif. Rumus expectancy: (Win Rate × Average Win) – (Loss Rate × Average Loss).\n\nSeorang algo trader tidak berhenti setelah strategi dijalankan. Hasil live, perubahan market condition, perubahan parameter, dan kondisi psikologis tetap perlu dicatat dan dievaluasi secara berkala.\n\nTidak semua trading plan cocok untuk semua orang. Batas drawdown yang nyaman bagi satu orang bisa terasa terlalu berat bagi orang lain. Karena itu, kenyamanan personal harus menjadi salah satu pertimbangan dalam memilih strategi.",
          timestamps: [
            { time: "0:00", label: "Pembukaan: mindset algo trader berfokus pada probabilistik dan drawdown" },
            { time: "0:09", label: "Mindset pertama: berpikir probabilistik, bukan memprediksi hasil satu trade" },
            { time: "1:38", label: "Mindset kedua: merangkul drawdown sebagai bagian normal dari trading" },
            { time: "2:20", label: "Cara menentukan batas drawdown yang nyaman secara personal" },
            { time: "4:06", label: "Mindset ketiga: fokus pada expectancy, bukan win rate" },
            { time: "5:42", label: "Mindset keempat: journaling dan review rutin" },
            { time: "6:41", label: "Recap keseluruhan video" },
          ],
          transcript_clean:
            "Let's talk about the hardest part of algorithmic trading. It's not the code. It's not the math. It's you.\n\nEvery trader who has ever blown up an account did so not because their strategy was fundamentally broken. They did it because they couldn't handle a normal losing period and started making discretionary decisions on top of their system — or abandoned it entirely.\n\nI want to give you the mental framework that prevents that from happening...",
        },
        {
          id: "M01-V03",
          module_id: "M01",
          video_number: 3,
          title: "Setting Up the Tools: TradingView, AI, and byScript",
          youtube_url: "https://www.youtube.com/watch?v=1xEYWW1Pvr8",
          youtube_id: "1xEYWW1Pvr8",
          duration: "11:37",
          completed: false,
          summary:
            "Video ini memperkenalkan tool stack utama yang dipakai dalam alur belajar algo trading byScript: TradingView untuk charting dan backtesting, AI sebagai partner coding, serta Monte Carlo dan byScript untuk validasi dan eksekusi otomatis.",
          description:
            "Sebelum menulis satu baris Pine Script pun, kamu perlu mengenal tool yang akan dipakai sepanjang kursus ini. Video ini memandu kamu dari pengenalan antarmuka TradingView, penggunaan AI untuk generate kode, hingga cara Monte Carlo byScript dipakai untuk memvalidasi strategi secara statistik sebelum masuk ke tahap auto-trade.",
          key_takeaways: [
            "TradingView adalah platform utama — menyediakan chart, data, Pine Script Editor, dan Strategy Tester di satu tempat",
            "AI dipakai sebagai partner coding: membantu membuat script dari deskripsi strategi dan menjelaskan kode yang membingungkan",
            "Indikator belum cukup — logika harus dibawa ke level strategi agar bisa dievaluasi dan dibacktest",
            "Monte Carlo dipakai untuk menguji ketahanan hasil backtest secara statistik, bukan hanya melihat profit",
            "Jika strategi lolos validasi, logic dan alert bisa disalurkan ke byScript untuk eksekusi otomatis",
          ],
          comprehensive_explanation:
            "TradingView diposisikan sebagai pusat kerja utama karena menyediakan chart, data, Pine Script Editor, dan Strategy Tester di satu tempat. Ini membuat alur kerja dari ide ke eksekusi menjadi lebih efisien tanpa harus berpindah platform.\n\nAI dipakai sebagai partner coding, terutama untuk membantu membuat script dari deskripsi strategi, menjelaskan bagian kode yang membingungkan, dan membantu debugging. Dengan AI, kamu tidak perlu hafal syntax Pine Script dari awal.\n\nMateri menekankan bahwa indikator belum tentu siap dipakai untuk trading plan. Agar bisa dievaluasi, logika tersebut harus dibawa sampai level strategi yang mencakup entry, filter, risk management, dan exit — bukan sekadar sinyal beli/jual.\n\nSetelah backtest terlihat menarik, langkah berikutnya adalah menguji ketahanan hasil tersebut dengan Monte Carlo. Tujuannya bukan hanya melihat profit, tetapi memastikan hasil tersebut robust secara statistik dan tidak hanya kebetulan.\n\nJika strategi sudah lolos tahap validasi, maka logic dan alert dapat disalurkan ke byScript untuk eksekusi otomatis. Dengan demikian, alur belajarnya menjadi lengkap: dari ide, ke kode, ke validasi, ke eksekusi nyata.",
          timestamps: [
            { time: "0:00", label: "Pembukaan: setup semua tools — TradingView, AI, dan byScript" },
            { time: "0:10", label: "TradingView: membuat akun, mengenal chart, Pine Editor, dan Strategy Tester" },
            { time: "1:09", label: "AI sebagai tools kedua untuk membantu generate dan debug kode" },
            { time: "1:22", label: "Demo TradingView: dari antarmuka hingga Pine Editor" },
            { time: "1:45", label: "AI digunakan untuk generate contoh kode indikator RSI di Pine Script v5" },
            { time: "3:00", label: "Perbedaan indikator vs strategi — pentingnya membawa logika ke level strategi" },
            { time: "4:56", label: "Monte Carlo byScript diperkenalkan untuk validasi statistik" },
            { time: "5:59", label: "Strategi yang lulus validasi dilanjutkan ke tahap auto-trade di byScript" },
            { time: "6:43", label: "Recap: TradingView untuk charting dan backtest, AI untuk coding, byScript untuk validasi dan eksekusi" },
          ],
          transcript_clean:
            "Before we write any code, we need to make sure your environment is set up correctly. A bad setup creates friction, and friction kills momentum. So let's get everything configured properly from the start.\n\nYou'll need three things: a TradingView account, access to an AI assistant like ChatGPT or Claude, and the byScript resource folder linked in the course materials below...",
        },
        {
          id: "M01-V04",
          module_id: "M01",
          video_number: 4,
          title: "Anatomy of a Trading Strategy",
          youtube_url: "https://www.youtube.com/watch?v=EnLYMFetWL4",
          youtube_id: "EnLYMFetWL4",
          duration: "13:52",
          completed: false,
          summary:
            "Video ini merangkum komponen inti yang membentuk sebuah trading strategy yang utuh — bukan hanya entry dan exit, tetapi juga filter, risk management, dan timeframe. Setelah memahami anatomi ini, kamu bisa menganalisis dan membangun strategi apa pun secara sistematis.",
          description:
            "Setiap trading strategy yang profitable — dari MA crossover sederhana hingga model multi-faktor yang kompleks — memiliki struktur yang sama. Video ini mengajarkan cara melihat strategi dalam komponen-komponen intinya: entry signal, filter, risk management, exit, dan pertimbangan timeframe. Dengan framework ini, kamu bisa mengevaluasi dan membangun strategi secara lebih terstruktur.",
          key_takeaways: [
            "Struktur minimal strategi terdiri dari tiga komponen: entry, filter, dan exit",
            "Filter berfungsi mengurangi false signal — di sinilah sebagian besar peningkatan performa terjadi",
            "Risk management bukan aksesori, melainkan bagian utama strategi: besaran risiko per trade dan jenis stop loss harus ditentukan sejak awal",
            "Stop loss berbasis ATR lebih adaptif karena menyesuaikan dengan volatilitas market yang berubah-ubah",
            "Timeframe 1 jam hingga 4 jam cenderung lebih seimbang antara jumlah trade dan kualitas sinyal",
          ],
          comprehensive_explanation:
            "Materi menegaskan bahwa strategi tidak cukup hanya punya entry. Struktur minimalnya adalah entry, filter, dan exit. Filter berfungsi mengurangi false signal — misalnya, hanya ambil sinyal beli saat volume di atas rata-rata, atau hanya trading saat ADX di atas 20 yang menunjukkan market sedang trending.\n\nUrutan yang benar adalah: sinyal muncul → cek filter → jika lolos maka entry → monitor posisi → keluar saat kondisi exit terpenuhi. Flow ini penting agar sistem tidak terlalu banyak mengeksekusi trade yang kurang berkualitas.\n\nRisk management bukan aksesori, tetapi bagian utama strategi. Besarnya risiko per trade, ukuran posisi, dan jenis stop loss harus ditentukan sejak awal — bukan setelah posisi terbuka. Rekomendasi awal adalah tidak merisikokan lebih dari 1–2 persen modal per trade.\n\nMateri menyinggung beberapa pendekatan stop loss, termasuk fixed stop dan ATR-based stop. Stop loss berbasis ATR lebih adaptif karena menyesuaikan diri dengan volatilitas market yang berubah-ubah. Saat ATR besar, stop loss diberi ruang lebih lebar; saat ATR kecil, stop loss menjadi lebih ketat.\n\nTimeframe kecil cenderung menghasilkan lebih banyak trade sekaligus lebih banyak noise dan beban fee. Timeframe 1 jam hingga 4 jam disebut lebih seimbang, sedangkan daily dan weekly memberi trade lebih sedikit tetapi sinyal lebih bersih.",
          timestamps: [
            { time: "0:00", label: "Pembukaan: anatomi sebuah trading strategy" },
            { time: "0:04", label: "Komponen utama strategi: entry, exit, dan filter" },
            { time: "0:28", label: "Contoh entry signal: MA crossover, RSI oversold, breakout" },
            { time: "0:36", label: "Filter: cara melewatkan trade yang kurang berkualitas" },
            { time: "1:01", label: "Contoh filter: volume di bawah rata-rata, ADX di bawah 20" },
            { time: "1:33", label: "Risk management: tidak lebih dari 1–2 persen modal per trade" },
            { time: "1:58", label: "Stop loss: fixed distance vs ATR-based stop loss" },
            { time: "2:29", label: "Pertimbangan timeframe: kecil vs besar, trade count vs kualitas sinyal" },
            { time: "3:47", label: "Contoh strategi lengkap: BTCUSDT 4H dengan EMA crossover dan filter volume" },
            { time: "4:18", label: "Recap seluruh Module 01" },
          ],
          transcript_clean:
            "Here's something I want you to internalize before we go any further: every trading strategy that has ever existed can be described using the same five components. Doesn't matter if it's a simple moving average crossover from 1985 or a machine learning model running on tick data. Same anatomy.\n\nOnce you can see that, you can analyze any strategy you come across. You can reverse-engineer what the original developer was thinking. And most importantly, you can build your own with a clear, structured process...",
        },
      ],
    },
    {
      id: "M02",
      title: "Pine Script Fundamentals",
      overview:
        "Learn TradingView's Pine Script language from the ground up. By the end of this module, you'll be able to write, debug, and backtest complete trading strategies.",
      learning_outcomes: [
        "Understand Pine Script syntax, structure, and execution model",
        "Write indicators and strategy scripts from scratch",
        "Use built-in functions for price data, indicators, and orders",
        "Debug common Pine Script errors efficiently",
      ],
      total_duration: "58 min",
      lessons: [],
    },
    {
      id: "M03",
      title: "Strategy Building and Backtesting",
      overview:
        "Apply the strategy anatomy framework to build, backtest, and iterate on real trading strategies. Learn how to read backtest results, avoid curve-fitting, and validate genuine edge.",
      learning_outcomes: [
        "Build complete strategies using the five-component framework",
        "Run and interpret TradingView backtests correctly",
        "Identify and avoid the most common backtesting mistakes",
        "Use walk-forward testing to validate out-of-sample performance",
      ],
      total_duration: "72 min",
      lessons: [],
    },
    {
      id: "M04",
      title: "Automation and Live Deployment",
      overview:
        "Take your validated strategy from TradingView to live execution. Connect alerts to brokers via webhooks, set up monitoring, and manage live strategy operations.",
      learning_outcomes: [
        "Set up TradingView alert webhooks for automated execution",
        "Connect to broker APIs for live order placement",
        "Build a monitoring dashboard for live strategy performance",
        "Implement circuit breakers and emergency stop procedures",
      ],
      total_duration: "65 min",
      lessons: [],
    },
  ],
};

export default courseData;
