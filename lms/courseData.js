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
            "An introduction to algorithmic trading — what it is, how it differs from discretionary trading, and why systematic approaches consistently outperform human intuition over time.",
          description:
            "This lesson sets the stage for the entire course. We define algorithmic trading as the practice of encoding trading rules into a system that can execute trades automatically based on pre-defined logic. You'll understand the key advantages: removing emotional bias, enabling consistent execution, and allowing backtesting against historical data. We also dispel common myths about algo trading being only for hedge funds or requiring a computer science PhD.",
          key_takeaways: [
            "Algorithmic trading is rule-based — every decision is pre-defined, not in-the-moment",
            "Emotion is the #1 enemy of retail traders; algos remove it entirely",
            "Systematic strategies can be backtested, refined, and deployed at scale",
            "You don't need to be a programmer to start — tools like TradingView's Pine Script are beginner-friendly",
            "Edge comes from consistency over thousands of trades, not from a few 'perfect' calls",
          ],
          comprehensive_explanation:
            "Algorithmic trading (also called 'algo trading' or 'automated trading') refers to using computer programs to execute trades based on a defined set of instructions. These instructions — the algorithm — can be based on timing, price movements, technical indicators, volume patterns, or even machine learning signals.\n\nThe core advantage is behavioral: human traders are subject to fear, greed, FOMO, and revenge trading. An algorithm has none of these. It executes the exact same logic on the 1,000th trade as it did on the 1st. This consistency is the foundation of an edge.\n\nAlgo trading also enables something discretionary traders can never truly do: rigorous historical testing. Before risking a single dollar, you can run your strategy against years of historical price data to see how it would have performed — adjusting parameters, filtering conditions, and stress-testing across different market regimes.\n\nFinally, once a strategy is validated, it can run 24/7 without fatigue. In markets like crypto that never close, this is an enormous structural advantage.\n\nbyScript's approach focuses on making this accessible: you don't need a quant background. You need clear thinking, good tools, and the discipline to follow a systematic process.",
          timestamps: [
            { time: "0:00", label: "Introduction and course overview" },
            { time: "1:30", label: "What is algorithmic trading?" },
            { time: "3:45", label: "Discretionary vs. systematic trading" },
            { time: "6:10", label: "Why algos consistently outperform humans" },
            { time: "8:20", label: "Common myths debunked" },
            { time: "9:50", label: "What we'll build in this course" },
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
            "The mental framework every successful algo trader needs. Learn to think in probabilities, accept losing streaks as statistical inevitabilities, and treat drawdown as information — not failure.",
          description:
            "Most traders fail not because their strategy is bad, but because they abandon it during normal drawdown periods. This lesson builds the psychological foundation required to run an algo system long-term. We cover expected value, win rate vs. risk/reward, the math behind losing streaks, and how to evaluate strategy health without panic.",
          key_takeaways: [
            "A 40% win rate strategy can be highly profitable with the right risk/reward ratio",
            "Drawdown is a statistical certainty — every strategy experiences it",
            "Think in expected value (EV), not in individual trade outcomes",
            "Never evaluate a strategy after fewer than 100 trades",
            "The goal is to stay in the game long enough for your edge to play out",
          ],
          comprehensive_explanation:
            "Probabilistic thinking is the single most important mental shift a trader can make. In most areas of life, we judge decisions by their outcomes. In trading, this is a catastrophic error.\n\nA good trade can lose money. A bad trade can make money. What matters is whether you made the right decision given the information available — and whether that decision had positive expected value.\n\nExpected value (EV) = (Win Rate × Average Win) – (Loss Rate × Average Loss)\n\nA strategy with a 40% win rate but a 3:1 reward-to-risk ratio has a positive EV. Over 100 trades, it will be profitable even though it loses more often than it wins. But most traders psychologically can't handle losing 6, 7, or 8 trades in a row — which is statistically normal for such a strategy.\n\nDrawdown is the peak-to-trough decline in your account equity during a losing period. Every strategy has drawdown. The question isn't whether you'll experience drawdown — it's whether your drawdown is within the expected parameters of your strategy's statistical profile.\n\nbyScript teaches you to define maximum acceptable drawdown before you start, and to treat any drawdown within that range as information rather than emergency. This is what separates traders who compound wealth over years from those who blow up every 6 months.",
          timestamps: [
            { time: "0:00", label: "Why mindset matters more than strategy" },
            { time: "2:15", label: "Introduction to probabilistic thinking" },
            { time: "4:30", label: "Expected value explained simply" },
            { time: "6:45", label: "Win rate vs. reward-to-risk ratio" },
            { time: "8:50", label: "Understanding drawdown mathematically" },
            { time: "10:30", label: "How to stay the course during losing streaks" },
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
            "A practical walkthrough of every tool you'll use in this course. Get TradingView configured correctly, learn how AI assistants accelerate strategy development, and understand how byScript's resources fit into your workflow.",
          description:
            "Before you write a single line of Pine Script, your environment needs to be set up correctly. This lesson is a guided setup walkthrough: TradingView account and layout, essential indicators to pre-load, how to use ChatGPT and Claude as Pine Script coding assistants, and how to use byScript's strategy templates and resources as a starting point.",
          key_takeaways: [
            "TradingView is the primary charting and backtesting platform for this course",
            "Pine Script is TradingView's native scripting language — beginner-friendly and powerful",
            "AI coding assistants (ChatGPT, Claude) dramatically accelerate Pine Script development",
            "byScript provides strategy templates that you'll customize — don't start from scratch",
            "A clean, organized chart layout prevents analysis paralysis",
          ],
          comprehensive_explanation:
            "The right tooling setup is a force multiplier. In this course, you'll work with a focused, practical stack:\n\n**TradingView** is your primary platform. It combines professional-grade charting, a built-in scripting language (Pine Script), a backtesting engine, and a paper trading environment — all in one interface. We use the Pro+ plan for this course, though many features are available on free and Essential tiers.\n\n**Pine Script v5** is TradingView's native language. It's purpose-built for writing indicators and strategies, with a gentle learning curve. Critically, you don't need to master programming to be productive — you need to understand the logic, and let AI assist with the syntax.\n\n**AI Coding Assistants**: ChatGPT (GPT-4) and Claude are exceptional Pine Script assistants when prompted correctly. byScript has developed a set of system prompts and prompt templates specifically for strategy development — these are available in the course resources.\n\n**byScript Strategy Templates**: Rather than building from scratch, you'll start with byScript's base strategy templates, which include proper risk management, position sizing, and clean code structure. Your job is to add the entry logic that reflects your edge.\n\nA well-configured environment means less friction between idea and implementation — which means more time testing and refining your strategies.",
          timestamps: [
            { time: "0:00", label: "Course toolkit overview" },
            { time: "1:20", label: "TradingView account setup and plan selection" },
            { time: "3:10", label: "Chart layout and essential indicators" },
            { time: "5:45", label: "Introduction to Pine Script v5" },
            { time: "7:30", label: "Using AI as a Pine Script assistant" },
            { time: "9:15", label: "byScript templates and resources walkthrough" },
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
            "Deconstruct every trading strategy into its five core components. Once you understand the anatomy, you can analyze, critique, and build any strategy systematically.",
          description:
            "Every profitable trading strategy — from a simple moving average crossover to a complex multi-factor model — shares the same fundamental structure. This lesson teaches you to see any strategy in terms of its five components: Universe (what you trade), Signal (when to enter), Filter (conditions that improve signal quality), Risk Management (position sizing and stop logic), and Exit (how and when to close trades).",
          key_takeaways: [
            "Every strategy has 5 components: Universe, Signal, Filter, Risk Management, Exit",
            "The signal is the least important component — risk management is the most important",
            "Filters dramatically improve strategy performance by reducing false signals",
            "Position sizing determines how much of each trade's theoretical edge you capture",
            "Your exit logic often matters more than your entry logic",
          ],
          comprehensive_explanation:
            "Breaking down any trading strategy into its five core components gives you a universal framework for analysis, development, and debugging.\n\n**1. Universe** — What are you trading? Stocks, crypto, forex, futures? Which specific instruments? The universe defines the opportunity set. A strategy that works on large-cap US stocks may not work on micro-cap altcoins.\n\n**2. Signal** — What triggers an entry? This is what most traders obsess over, but it's actually the least important component. A signal might be: RSI crosses below 30 on a daily chart, a moving average crossover, or a breakout above yesterday's high. Signals are abundant — edge is rare.\n\n**3. Filter** — What conditions must be true for the signal to count? Filters are signal quality gates. For example: 'only take long signals when the 200-day MA is trending up' or 'only trade when ATR is above its 20-day average.' Filters are where most of the performance improvement happens.\n\n**4. Risk Management** — How much do you risk per trade? Where is your stop? Position sizing is the mechanism by which your edge compounds into wealth over time. Without proper risk management, even a great signal will eventually ruin you.\n\n**5. Exit** — When and how do you close the trade? Time-based exits, trailing stops, target-based exits, opposite signal exits — each has different characteristics and suits different strategy types.\n\nIn the upcoming modules, we'll build complete strategies using this framework from scratch.",
          timestamps: [
            { time: "0:00", label: "Why every strategy has the same anatomy" },
            { time: "1:45", label: "Component 1: Universe — what you trade" },
            { time: "3:20", label: "Component 2: Signal — what triggers entry" },
            { time: "5:10", label: "Component 3: Filters — improving signal quality" },
            { time: "7:40", label: "Component 4: Risk management and position sizing" },
            { time: "10:15", label: "Component 5: Exit logic and its underrated importance" },
            { time: "12:30", label: "Putting it all together — strategy blueprint" },
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
