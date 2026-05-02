import React, { useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence,
} from 'motion/react';
import { 
  Sparkles, 
  Gamepad2, 
  LayoutDashboard, 
  Quote, 
  ArrowRight, 
  MousePointer2, 
  Zap,
  Globe,
  Star,
  CheckCircle2,
  Instagram,
  Twitter,
  Facebook,
  Menu,
  X,
  Play,
  Search
} from 'lucide-react';

// --- Constants & Types ---

const CHARACTERS = [
  { id: 'bot', name: 'Bot', emoji: '🤖', color: 'bg-slate-200' },
  { id: 'sparky', name: 'Sparky', emoji: '🐊', color: 'bg-emerald-200 text-3xl' },
  { id: 'luna', name: 'Luna', emoji: '🐱', color: 'bg-yellow-200' },
  { id: 'rocky', name: 'Rocky', emoji: '🐒', color: 'bg-orange-200' },
  { id: 'donny', name: 'Donny', emoji: '🦉', color: 'bg-indigo-200' },
];

// --- Components ---

const LessonPage = ({ character, topic, onBack }: { character: any, topic: string, onBack: () => void }) => {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Teaching content generator
  useEffect(() => {
    const generateSlides = () => {
      setIsLoading(true);
      const normalizedTopic = topic.toLowerCase();
      
      let teachingSlides: string[] = [];

      if (normalizedTopic.includes('add') || normalizedTopic.includes('+')) {
        teachingSlides = [
          `Hi! I'm ${character.name}!\n\nToday we learn about\nADDITION!\n\nAddition is like\nbringing friends together!`,
          `Look at this!\n\n1 apple 🍎\n+ 1 more apple 🍎\ngives us 2 apples 🍎🍎!\n\nWe use the '+' sign!`,
          `Let's try a BIG one!\n\n2 stars ⭐⭐\nplus 2 more ⭐⭐\nis equal to 4 ⭐⭐⭐⭐!\n\nYou're a math wizard!`
        ];
      } else if (normalizedTopic.includes('sub') || normalizedTopic.includes('-')) {
        teachingSlides = [
          `Hello! ${character.name} here!\n\nLet's learn about\nSUBTRACTION!\n\nIt's like sharing or\ntaking things away.`,
          `Imagine you have\n5 yummy cookies 🍪🍪🍪🍪🍪\n\nYou eat 2 cookies 😋\n\nNow you have 3 left!\n5 - 2 = 3`,
          `Subtraction uses\nthe '-' sign.\n\nIt's super useful for\nsharing your toys!`
        ];
      } else if (normalizedTopic.includes('star')) {
        teachingSlides = [
          `Twinkle twinkle!\n\nStars are giant balls\nof hot gas very, very\nfar away in space!`,
          `Why do they twinkle?\n\nBecause the air around\nEarth moves and makes\nthe light wiggle!\n\nIt's like a space dance!`,
          `Our Sun is actually\na star too! It just\nlooks big because it's\nthe closest one to us!`
        ];
      } else {
        teachingSlides = [
          `Hello explorer!\nI'm ${character.name}!\n\nYou want to learn about\n${topic}?\n\nThat sounds AWESOME!`,
          `Did you know that\n${topic} is one of\nthe most interesting\nthings in the world?`,
          `I'll keep looking for\nmore secrets about\n${topic} for you!\n\nKeep being curious!`
        ];
      }

      setTimeout(() => {
        setSlides(teachingSlides);
        setIsLoading(false);
      }, 1500);
    };

    generateSlides();
  }, [topic, character.name]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-slate-900 flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden"
    >
      {/* Blackboard Container */}
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-[#1a3a32] border-[20px] border-amber-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col pt-10 px-10 md:pt-20 md:px-20">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/chalkboard.png')]"></div>
        
        {/* Chalk Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-10"
              >
                <div className="w-24 h-24 border-8 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-white text-4xl font-black tracking-widest uppercase">Preparing Chalk...</p>
              </motion.div>
            ) : (
              <motion.div 
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full h-full flex flex-col items-center justify-center"
              >
                <div className="text-white text-4xl md:text-6xl font-black whitespace-pre-wrap leading-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)] font-mono">
                  {slides[currentSlide]}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slide Indicator */}
        {!isLoading && (
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-20">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-4 h-4 rounded-full transition-all ${idx === currentSlide ? 'bg-amber-400 scale-125' : 'bg-white/30'}`}
              />
            ))}
          </div>
        )}

        {/* Chalk Shelf */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-6 bg-amber-950 rounded-t-lg flex gap-4 px-10 items-end pb-1">
          <div className="w-12 h-3 bg-white rounded-sm rotate-2 translate-y-1"></div>
          <div className="w-10 h-3 bg-blue-200 rounded-sm -rotate-3 translate-y-1"></div>
          <div className="w-14 h-3 bg-pink-200 rounded-sm rotate-1 translate-y-1"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      {!isLoading && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full max-w-[90rem] flex justify-between px-10 pointer-events-none">
          <button 
            disabled={currentSlide === 0}
            onClick={handlePrev}
            className={`pointer-events-auto chunky-button-secondary w-24 h-24 rounded-full flex items-center justify-center transition-all ${currentSlide === 0 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          >
            <ArrowRight className="rotate-180" size={48} />
          </button>
          <button 
            disabled={currentSlide === slides.length - 1}
            onClick={handleNext}
            className={`pointer-events-auto chunky-button-primary w-24 h-24 rounded-full flex items-center justify-center transition-all ${currentSlide === slides.length - 1 ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
          >
            <ArrowRight size={48} />
          </button>
        </div>
      )}

      {/* Character Teacher */}
      <motion.div 
        animate={{ 
          x: [-20, 20, -20],
          y: [0, -10, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-50px] right-20 md:right-40 z-[160] flex flex-col items-center"
      >
        <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full ${character.color} border-[15px] border-white shadow-2xl flex items-center justify-center text-7xl md:text-9xl`}>
          {character.emoji}
        </div>
        <div className="mt-4 bg-white px-8 py-3 rounded-2xl shadow-xl border-4 border-slate-100 flex items-center gap-3">
          <Play className="fill-emerald-500 text-emerald-500" size={24} />
          <span className="text-3xl font-black text-slate-800">{character.name}'s Class!</span>
        </div>
      </motion.div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 chunky-button-pink px-12 py-6 rounded-[2.5rem] text-3xl flex items-center gap-4 z-[170]"
      >
        <ArrowRight className="rotate-180" size={32} />
        BYE BYE!
      </button>

      {/* Background Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-slate-900">
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              y: [0, -1000],
              x: Math.sin(i) * 100,
              scale: [1, 1.5, 0.5]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute bottom-[-100px] w-4 h-4 bg-white/10 rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const CharacterSelector = ({ onBack, onCreate }: { onBack: () => void, onCreate: (topic: string, char: any) => void }) => {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[1]); // Default to Sparky
  const [searchText, setSearchText] = useState('');

  const handleCreate = () => {
    if (searchText.trim()) {
      onCreate(searchText, selectedChar);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed inset-0 z-[100] bg-[#FFF9F0] overflow-y-auto pt-32 px-6 pb-20"
    >
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 chunky-button-secondary px-8 py-4 rounded-3xl font-black text-2xl flex items-center gap-3 z-[110]"
      >
        <ArrowRight className="rotate-180" size={24} />
        GO BACK
      </button>

      <div className="max-w-6xl mx-auto text-center">
        <motion.h2 
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl md:text-8xl font-black text-slate-900 mb-16 drop-shadow-md"
        >
          PICK YOUR <span className="text-emerald-500">FRIEND!</span>
        </motion.h2>

        {/* Character Line */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 mb-24">
          {CHARACTERS.map((char) => (
            <motion.div 
              key={char.id}
              whileHover={{ scale: 1.15, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedChar(char)}
              className="cursor-pointer group flex flex-col items-center"
            >
              <div className={`
                w-28 h-28 md:w-40 md:h-40 rounded-full flex items-center justify-center text-6xl md:text-7xl
                ${char.color} border-[10px] transition-all duration-300 shadow-2xl
                ${selectedChar.id === char.id ? 'border-amber-400 scale-110' : 'border-white group-hover:border-slate-100'}
              `}>
                {char.emoji}
              </div>
              <span className={`
                mt-6 text-3xl md:text-4xl font-black transition-colors
                ${selectedChar.id === char.id ? 'text-amber-500' : 'text-slate-500'}
              `}>
                {char.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Search Bar Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={40} />
            </div>
            
            <input 
              type="text" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              placeholder={`Teach me about ....... (with ${selectedChar.name.toLowerCase()})`}
              className="w-full bg-white border-[12px] border-slate-100 rounded-[4rem] py-10 pl-24 pr-60 text-3xl md:text-4xl font-black text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-amber-400 transition-all shadow-2xl"
            />

            <div className="absolute inset-y-4 right-4">
              <motion.button 
                onClick={handleCreate}
                disabled={!searchText.trim()}
                className={`
                  h-full px-12 rounded-[3.5rem] font-black text-3xl flex items-center gap-4 transition-all
                  ${searchText.trim() 
                    ? 'chunky-button-primary border-emerald-500 bg-emerald-400 text-white' 
                    : 'bg-white text-slate-200 border-4 border-slate-100 cursor-not-allowed'}
                `}
              >
                <div className="relative">
                  {/* Glowing Star Effect */}
                  {searchText.trim() && (
                    <motion.div 
                      animate={{ scale: [1, 1.8, 1], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute inset-0 bg-amber-300 rounded-full blur-xl"
                    />
                  )}
                  <motion.div
                    animate={searchText.trim() ? { 
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className={searchText.trim() ? 'text-amber-300 drop-shadow-[0_0_10px_rgba(251,191,36,1)]' : 'text-slate-200'}
                  >
                    <Star fill="currentColor" size={40} />
                  </motion.div>
                </div>
                CREATE
              </motion.button>
            </div>
          </div>
          
          <motion.div 
            animate={{ 
              opacity: searchText.trim() ? 1 : 0,
              y: searchText.trim() ? 0 : 20
            }}
            className="mt-10 flex items-center justify-center gap-3 text-3xl font-black text-emerald-500"
          >
            <Sparkles size={32} />
            READY TO GROW A MAGIC STORY!
            <Sparkles size={32} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FUN_FACTS = [
  "A group of flamingos is called a 'flamboyance'!",
  "Octopuses have three hearts and blue blood!",
  "Honey never spoils. Archaeologists found edible honey in ancient Egyptian tombs!",
  "The world's oldest living tree is over 4,800 years old!",
  "Cows have 'best friends' and get stressed when separated!",
  "A snail can sleep for three years!",
  "Bananas are berries, but strawberries aren't!",
  "Wombat poop is cube-shaped so it doesn't roll away!",
  "Rabbits and parrots can see behind them without turning their heads!",
  "The tongue of a blue whale is as heavy as an entire elephant!"
];

const FunStatsPage = ({ onBack }: { onBack: () => void }) => {
  const [fact, setFact] = useState('');

  const getRandomFact = () => {
    let newFact;
    do {
      newFact = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
    } while (newFact === fact);
    setFact(newFact);
  };

  useEffect(() => {
    getRandomFact();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="fixed inset-0 z-[200] bg-sky-400 flex flex-col items-center justify-center p-10 text-white overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [Math.random() * 1000, -100],
              rotate: [0, 360]
            }}
            transition={{ duration: 15, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute text-6xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {['⭐', '🌈', '🍦', '🎈', '🎨'][i % 5]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block bg-white text-sky-400 px-10 py-5 rounded-full text-4xl font-black mb-12 shadow-2xl border-6 border-sky-300"
        >
          DID YOU KNOW? 🤔
        </motion.div>

        <div className="bg-white/10 backdrop-blur-xl p-16 rounded-[5rem] border-8 border-white/30 shadow-[0_30px_0_0_rgba(0,0,0,0.1)] mb-20">
          <AnimatePresence mode="wait">
            <motion.p
              key={fact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-5xl md:text-7xl font-black leading-tight drop-shadow-lg"
            >
              {fact}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <button 
            onClick={getRandomFact}
            className="chunky-button-secondary px-16 py-8 rounded-[3rem] text-4xl flex items-center gap-4 active:scale-95"
          >
            <Sparkles size={40} />
            ONE MORE!
          </button>
          
          <button 
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-6 border-white/50 px-16 py-8 rounded-[3rem] text-4xl font-black transition-all"
          >
            BYE BYE!
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StarGame = ({ onBack }: { onBack: () => void }) => {
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState<{ id: number, x: number, y: number, char: string, speed: number }[]>([]);
  const [sparkyPos, setSparkyPos] = useState(50); // percentage x
  const [catching, setCatching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pressedKey = e.key.toUpperCase();
      setStars(prevStars => {
        const matchingStarIndex = prevStars.findIndex(s => s.char === pressedKey);
        if (matchingStarIndex !== -1) {
          const matchingStar = prevStars[matchingStarIndex];
          setSparkyPos(matchingStar.x);
          setCatching(true);
          setScore(s => s + 10);
          setTimeout(() => setCatching(false), 300);
          return prevStars.filter((_, i) => i !== matchingStarIndex);
        }
        return prevStars;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStars(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: -10,
          char: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
          speed: 1 + Math.random() * 2
        }
      ]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setStars(prev => {
        return prev
          .map(s => ({ ...s, y: s.y + s.speed }))
          .filter(s => s.y < 100);
      });
    }, 50);
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[250] bg-slate-900 pointer-events-auto overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"
    >
      {/* Game UI */}
      <div className="absolute top-10 right-10 z-[260]">
        <div className="chunky-button-primary px-12 py-6 rounded-[2.5rem] bg-amber-400 text-white border-amber-500 shadow-[0_10px_0_0_#d97706]">
          <span className="text-5xl font-black">SCORE: {score}</span>
        </div>
      </div>

      <button
        onClick={onBack}
        className="absolute top-10 left-10 chunky-button-pink px-12 py-6 rounded-[2.5rem] text-3xl flex items-center gap-4 z-[260]"
      >
        <ArrowRight className="rotate-180" size={32} />
        STOP GAME
      </button>

      {/* Game Content Area */}
      <div className="absolute inset-0 pt-32 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-black text-white/10 uppercase tracking-tighter select-none pointer-events-none">
          Catch the shooting star
        </h1>
        <p className="text-white/20 text-3xl font-black mt-4 select-none pointer-events-none">PRESS THE LETTER ON YOUR KEYBOARD!</p>
      </div>

      {/* Stars */}
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute text-5xl font-black text-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]"
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          >
            <div className="flex flex-col items-center relative">
              <Star fill="currentColor" size={80} />
              <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white text-4xl font-black text-center">{star.char}</span>
              {/* Trail */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-1 h-32 bg-gradient-to-t from-amber-300/40 to-transparent"></div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sparky (Crocodile) */}
      <motion.div
        animate={{ x: `${sparkyPos}%` }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="absolute bottom-10 left-0 w-48 h-48 flex flex-col items-center translate-x-[-50%]"
      >
        <div className="relative">
          <motion.div
            animate={catching ? { 
              scale: [1, 1.6, 1], 
              y: [0, -80, 0],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.3 }}
            className="text-[10rem] md:text-[12rem] cursor-default select-none"
          >
            {catching ? '🐊' : '🐊'}
          </motion.div>
          {catching && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="absolute top-0 right-0 text-6xl"
            >
              😋
            </motion.div>
          )}
        </div>
        <div className="mt-8 bg-emerald-500 px-8 py-3 rounded-2xl text-white font-black text-3xl border-6 border-emerald-600 shadow-2xl">
          SPARKY!
        </div>
      </motion.div>

      {/* Moving Background Stars */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const InfoPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="fixed inset-0 z-[300] bg-white overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto px-6 py-32">
        <button 
          onClick={onBack}
          className="mb-20 chunky-button-secondary px-12 py-6 rounded-[2.5rem] text-3xl flex items-center gap-4"
        >
          <ArrowRight className="rotate-180" size={32} />
          GO BACK HOME
        </button>

        {/* Section 1: About Developer */}
        <div className="mb-32">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block px-10 py-4 mb-10 text-3xl font-black uppercase text-white bg-sky-400 rounded-full shadow-[0_8px_0_0_#0ea5e9] border-4 border-sky-300 transform -rotate-2"
          >
            THE CREATORS
          </motion.div>
          <h2 className="text-7xl md:text-8xl font-black text-slate-900 mb-16 leading-tight">About the Developer and Product</h2>
          <div className="grid gap-12">
            {[
              "Wonderyard is a creative initiative by Sohan Industries, built to make learning playful and magical for kids everywhere.",
              "This project is developed by Sohan Goswami as part of Sohan Industries, with a mission to turn curiosity into fun stories and games.",
              "Made with care by Sohan Industries, Wonderyard focuses on helping children learn through joy, imagination, and interactive play.",
              "Wonderyard is a Sohan Industries creation, designed to bring smiles and spark curiosity in every child’s learning journey."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-12 rounded-[3.5rem] border-4 border-slate-100 flex items-start gap-8"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg text-emerald-500">
                  <Star fill="currentColor" size={32} />
                </div>
                <p className="text-3xl md:text-4xl font-black text-slate-700 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Terms and Conditions */}
        <div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-block px-10 py-4 mb-10 text-3xl font-black uppercase text-white bg-pink-400 rounded-full shadow-[0_8px_0_0_#e11d48] border-4 border-pink-300 transform rotate-2"
          >
            THE RULES
          </motion.div>
          <h2 className="text-7xl md:text-8xl font-black text-slate-900 mb-16 leading-tight">Terms and Conditions</h2>
          <div className="grid gap-8">
            {[
              { title: "Purpose of Wonderyard", content: "Wonderyard is designed to make learning fun and interactive for children. It turns questions into playful stories, but it is not a replacement for school or formal education." },
              { title: "Safe Use", content: "Children should use Wonderyard under the guidance of parents or teachers. The app avoids harmful or unsafe content, but adults should supervise playtime." },
              { title: "Content Ownership", content: "All stories, games, and visuals inside Wonderyard are created for learning and fun. They cannot be copied or sold without permission." },
              { title: "Privacy", content: "Wonderyard does not collect personal details from children. Any feedback or usage data is only used to improve the app experience." },
              { title: "Fair Play", content: "Games and activities are meant for enjoyment. Scores and badges are for fun and do not measure real school performance." },
              { title: "Updates & Changes", content: "Wonderyard may add new stories, features, or rules over time. By using the app, you agree to enjoy these updates as part of the magical journey." },
              { title: "Limitations", content: "Wonderyard explains things in simple, playful ways. Some answers may be simplified for children and not fully scientific." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-12 rounded-[4rem] border-[10px] border-slate-50 shadow-xl"
              >
                <h3 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                  <span className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-2xl">{i + 1}</span>
                  {item.title}
                </h3>
                <p className="text-2xl md:text-3xl font-black text-slate-600 leading-relaxed italic">"{item.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center">
           <button 
            onClick={onBack}
            className="chunky-button-primary px-24 py-12 rounded-[4rem] text-5xl"
          >
            LET'S GO BACK & PLAY!
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const MagicOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[400] pointer-events-none"
    >
      {/* Intense Background Color Shift */}
      <motion.div 
        animate={{ 
          backgroundColor: [
            "rgba(251, 113, 133, 0.4)", // Rose
            "rgba(251, 191, 36, 0.4)",  // Amber
            "rgba(52, 211, 153, 0.4)",  // Emerald
            "rgba(96, 165, 250, 0.4)",  // Blue
            "rgba(192, 132, 252, 0.4)"  // Purple
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Rainbow Arcs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: '-150%', y: '100%', rotate: -20, opacity: 0 }}
          animate={{ 
            x: '150%', 
            y: '-50%', 
            rotate: 20,
            opacity: [0, 1, 1, 0]
          }}
          transition={{ 
            duration: 4, 
            delay: i * 0.8,
            ease: "easeInOut",
            repeat: i === 0 ? 1 : 0
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[200vw] h-[100vh] border-[120px] border-b-0 rounded-t-full border-t-red-400 relative opacity-60">
            <div className="absolute inset-[-100px] border-[100px] border-b-0 rounded-t-full border-t-orange-400"></div>
            <div className="absolute inset-[-80px] border-[80px] border-b-0 rounded-t-full border-t-yellow-400"></div>
            <div className="absolute inset-[-60px] border-[60px] border-b-0 rounded-t-full border-t-green-400"></div>
            <div className="absolute inset-[-40px] border-[40px] border-b-0 rounded-t-full border-t-blue-400"></div>
            <div className="absolute inset-[-20px] border-[20px] border-b-0 rounded-t-full border-t-purple-400"></div>
          </div>
        </motion.div>
      ))}

      {/* Sparkle Burst */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: '50vw', y: '50vh' }}
            animate={{ 
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: [0, 2, 0],
              rotate: [0, 360]
            }}
            transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
            className="absolute text-5xl"
          >
            {['✨', '🌟', '💫', '💖', '🍀'][i % 5]}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const SohanLogo = ({ size = 56, bgClassName = "" }: { size?: number, bgClassName?: string }) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-300 via-slate-100 to-slate-400 border-4 border-slate-500/30 shadow-inner group ${bgClassName}`}
      style={{ width: size, height: size }}
    >
      {/* Background radial shine */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)] animate-pulse" />
      
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full p-1 relative z-10 drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Navy Blue stylized 'S' - Modern curved path */}
        <path 
          d="M75 35C75 20 60 15 50 15C35 15 25 25 25 40C25 60 50 55 50 70C50 80 40 85 25 85" 
          stroke="#0F172A" 
          strokeWidth="14" 
          strokeLinecap="round" 
        />
        <path 
          d="M75 15C85 15 90 25 90 40C90 60 75 75 50 75C35 75 25 70 25 70" 
          stroke="#0F172A" 
          strokeWidth="14" 
          strokeLinecap="round" 
          opacity="0.3"
        />

        {/* Copper Metallic Arrow - Dynamic upward motion */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          d="M30 80L75 25" 
          stroke="#92400E" 
          strokeWidth="12" 
          strokeLinecap="round" 
        />
        <motion.path 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          d="M75 25H55M75 25V45" 
          stroke="#92400E" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
      </svg>

      {/* Gloss overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 pointer-events-none" />
    </motion.div>
  );
};

const DeveloperPopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-[4rem] p-12 max-w-2xl w-full text-center shadow-2xl border-[12px] border-emerald-400 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
        >
          <X size={32} />
        </button>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 leading-tight">
          THIS PRODUCT IS MADE BY <br/>
          <span className="text-emerald-500">SOHAN INDUSTRIES INITIATIVE</span>
        </h2>
        <div className="rounded-[2.5rem] overflow-hidden border-8 border-slate-100 shadow-lg aspect-[1.8/1] bg-gradient-to-br from-slate-100 via-white to-slate-200 flex flex-col items-center justify-center relative p-12">
           <SohanLogo size={160} bgClassName="rounded-[3rem] shadow-2xl mb-8" />
           <div className="flex flex-col items-center">
              <div className="text-slate-900 font-black text-4xl tracking-tighter uppercase">Sohan Industries</div>
              <div className="text-slate-600 font-black text-3xl tracking-[0.2em] uppercase">Initiative</div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ onJourneyClick, onStatsClick, onMagicClick, onPlayClick, onTitleClick }: { onJourneyClick: () => void, onStatsClick: () => void, onMagicClick: () => void, onPlayClick: () => void, onTitleClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
          onClick={onTitleClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <SohanLogo size={64} bgClassName="rounded-2xl border-4 border-emerald-500" />
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-none">WONDER YARD</span>
            <span className="text-sm md:text-base font-black text-emerald-600 tracking-[0.2em] uppercase mt-1">by SOHAN INDUSTRIES</span>
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 font-black text-2xl text-slate-700">
          <button 
            onClick={onStatsClick}
            className="hover:text-emerald-500 hover:scale-110 transition-all inline-block"
          >
            Fun Stats
          </button>
          <button 
            onClick={onJourneyClick}
            className="hover:text-amber-500 hover:scale-110 transition-all inline-block"
          >
            The Journey
          </button>
          <button 
            onClick={onMagicClick}
            className="hover:text-pink-500 hover:scale-110 transition-all inline-block"
          >
            Magic
          </button>
          <button 
            onClick={onPlayClick}
            className="chunky-button-primary px-12 py-4 rounded-[2.5rem] font-black text-white"
          >
            PLAY!
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 border-4 border-slate-200" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={36} /> : <Menu size={36} />}
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 250]);

  return (
    <section className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden bg-[#FFF9F0]">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=2000&auto=format&fit=crop" 
          alt="Magical Cartoon Yard"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFF9F0]/20 to-[#FFF9F0]"></div>
      </motion.div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, bounce: 0.5, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-12 py-5 mb-12 text-4xl font-black text-pink-500 bg-white rounded-[4rem] border-[10px] border-pink-100 shadow-2xl transform -rotate-2"
          >
            LET'S LEARN FUN! 🎉
          </motion.div>
          
          <h1 className="text-8xl md:text-[10rem] font-black mb-14 leading-[0.9] text-slate-900 drop-shadow-[0_12px_0_rgba(0,0,0,0.1)]">
            FUNNY <br/>
            <span className="text-emerald-500 inline-block hover:rotate-2 transition-transform cursor-pointer">LEARNING</span> <br/>
            EVERYDAY!
          </h1>

          <p className="text-4xl md:text-5xl text-slate-700 font-black mb-20 max-w-4xl mx-auto leading-relaxed px-10 py-12 bg-white/40 backdrop-blur-md rounded-[5rem] border-8 border-dashed border-slate-300">
            Turn your "Huh?" into "WOW!" with the most cartoonish AI friend ever! 🌈
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <button className="chunky-button-primary px-20 py-10 rounded-[4rem] text-5xl font-black flex items-center gap-6 group">
              GO! GO!
              <ArrowRight size={56} className="group-hover:translate-x-4 transition-transform" />
            </button>
            <button className="chunky-button-secondary px-20 py-10 rounded-[4rem] text-5xl font-black flex items-center gap-6">
              <Play className="fill-slate-900" size={56} />
              WATCH!
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#FFF9F0]" style={{ clipPath: 'path("M0,100 C150,150 250,50 400,100 C550,150 650,50 800,100 C950,150 1050,50 1200,100 C1350,150 1450,50 1600,100 L1600,200 L0,200 Z")' }}></div>
    </section>
  );
};

const SectionHeader = ({ subtitle, title, description, light = false }: { subtitle: string, title: string, description?: string, light?: boolean }) => (
  <div className="text-center mb-32 px-6">
    <motion.div 
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      className="inline-block px-10 py-4 mb-10 text-3xl font-black uppercase text-white bg-emerald-400 rounded-full shadow-[0_8px_0_0_#059669] border-4 border-emerald-300 transform -rotate-3"
    >
      {subtitle}
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className={`text-6xl md:text-8xl font-black mb-10 ${light ? 'text-white' : 'text-slate-900'} drop-shadow-md`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`max-w-4xl mx-auto text-3xl md:text-4xl font-black ${light ? 'text-white/80' : 'text-slate-700'}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

const AboutStep = ({ icon: Icon, title, description, color, shadowColor }: { icon: any, title: string, description: string, color: string, shadowColor: string }) => (
  <motion.div 
    whileHover={{ y: -25, rotate: [0, -3, 3, 0] }}
    className={`bubble-card p-16 text-center border-b-[24px] ${shadowColor}`}
  >
    <div className={`w-32 h-32 mb-12 mx-auto rounded-[2.5rem] ${color} flex items-center justify-center text-white shadow-2xl border-6 border-white/30 transform -rotate-6`}>
      <Icon size={64} />
    </div>
    <h3 className="text-4xl font-black mb-8 text-slate-900">{title}</h3>
    <p className="text-2xl font-black text-slate-600 leading-relaxed">{description}</p>
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -20, scale: 1.05 }}
    className="bubble-card p-14 group relative overflow-hidden"
  >
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-100 rounded-full group-hover:scale-150 transition-transform duration-500 -z-0"></div>
    <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-10 transform group-hover:rotate-12 transition-transform relative z-10 border-6 border-white shadow-xl">
      <Icon size={48} />
    </div>
    <h3 className="text-4xl font-black mb-6 text-slate-900 relative z-10">{title}</h3>
    <p className="text-2xl font-black text-slate-600 leading-relaxed relative z-10">{description}</p>
  </motion.div>
);

const Testimonial = ({ author, role, quote, avatarSeed, color }: { author: string, role: string, quote: string, avatarSeed: string, color: string }) => (
  <div className={`p-16 rounded-[5rem] ${color} relative flex flex-col border-[12px] border-white shadow-2xl`}>
    <Quote className="absolute top-8 right-12 text-black/5" size={100} fill="currentColor" />
    <p className="text-3xl font-black italic text-slate-800 mb-12 leading-relaxed relative z-10">
      "{quote}"
    </p>
    <div className="flex items-center gap-8 mt-auto">
      <img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${avatarSeed}`} alt={author} className="w-24 h-24 rounded-full border-6 border-white shadow-2xl" referrerPolicy="no-referrer" />
      <div>
        <h4 className="text-3xl font-black text-slate-900">{author}</h4>
        <p className="text-xl font-black text-slate-700">{role}</p>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'selector' | 'lesson' | 'stats' | 'game' | 'info'>('landing');
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[1]);
  const [lessonTopic, setLessonTopic] = useState('');
  const [isMagicActive, setIsMagicActive] = useState(false);
  const [isDevPopupOpen, setIsDevPopupOpen] = useState(false);

  const triggerMagic = () => {
    setIsMagicActive(true);
    setTimeout(() => {
      setIsMagicActive(false);
    }, 6000); // 6 seconds of magic
  };

  const handleStartLesson = (topic: string, char: any) => {
    setLessonTopic(topic);
    setSelectedCharacter(char);
    setCurrentView('lesson');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <AnimatePresence mode="wait">
        {isMagicActive && <MagicOverlay key="magic" />}
        {isDevPopupOpen && <DeveloperPopup onClose={() => setIsDevPopupOpen(false)} />}
        {currentView === 'selector' && (
          <CharacterSelector 
            onBack={() => setCurrentView('landing')} 
            onCreate={(topic, char) => handleStartLesson(topic, char)}
          />
        )}
        {currentView === 'lesson' && (
          <LessonPage 
            character={selectedCharacter} 
            topic={lessonTopic} 
            onBack={() => setCurrentView('selector')} 
          />
        )}
        {currentView === 'stats' && (
          <FunStatsPage 
            onBack={() => setCurrentView('landing')} 
          />
        )}
        {currentView === 'game' && (
          <StarGame 
            onBack={() => setCurrentView('landing')} 
          />
        )}
        {currentView === 'info' && (
          <InfoPage 
            onBack={() => setCurrentView('landing')} 
          />
        )}
      </AnimatePresence>

      <Navbar 
        onJourneyClick={() => setCurrentView('selector')} 
        onStatsClick={() => setCurrentView('stats')}
        onMagicClick={triggerMagic}
        onPlayClick={() => setCurrentView('game')}
        onTitleClick={() => setIsDevPopupOpen(true)}
      />
      
      <main className={`
        ${currentView !== 'landing' ? 'blur-md pointer-events-none scale-95' : ''} 
        ${isMagicActive ? 'hue-rotate-90 saturate-200' : ''}
        transition-all duration-700
      `}>
        <Hero />
        <section id="about" className="py-40 relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader subtitle="The Wonder Yard" title="Where fun never stops!" description="WONDER YARD is a super-bubbly place where AI turns learning into the best game ever played." />
            <div className="grid md:grid-cols-3 gap-16">
              <AboutStep icon={Globe} title="Super Worlds!" description="Explore oceans of juice and galaxies made of candy!" color="bg-sky-400" shadowColor="border-sky-500/20" />
              <AboutStep icon={Zap} title="Talk with AI!" description="Our AI friend hears you and talks like your favorite hero!" color="bg-amber-400" shadowColor="border-amber-500/20" />
              <AboutStep icon={Gamepad2} title="Play & Win!" description="Earn huge funny badges and unlock secret story levels!" color="bg-pink-400" shadowColor="border-pink-500/20" />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-40 bg-emerald-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader subtitle="The Journey" title="3 Simple Steps!" description="It's so easy a dinosaur could do it (they do!)" />
            <div className="grid lg:grid-cols-3 gap-20">
              {[
                { label: "1", icon: MousePointer2, title: "Just Shout Why!", text: "Ask anything! 'Why is the sky blue?' or 'Do aliens like pizza?'" },
                { label: "2", icon: Sparkles, title: "Magic Happens", text: "Our super-brains build a story world just for you!" },
                { label: "3", icon: Play, title: "Level Up!", text: "Play the story, win the game, and become a super-genius!" }
              ].map((step, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2 }} className="bubble-card p-16 flex flex-col items-center text-center relative border-b-[24px] border-emerald-500/10">
                  <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center font-black text-5xl shadow-2xl border-[10px] border-white mb-10">{step.label}</div>
                  <h3 className="text-5xl font-black mb-8 text-slate-800">{step.title}</h3>
                  <p className="text-3xl font-black text-slate-600 leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-32 text-center">
              <button onClick={() => setCurrentView('selector')} className="chunky-button-secondary px-24 py-10 rounded-[4rem] text-5xl">START THE JOURNEY!</button>
            </div>
          </div>
        </section>

        <section id="features" className="py-40">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader subtitle="Superpowers" title="Cool Stuff Inside!" description="Check out all the gadgets we built for your big brain!" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
              <FeatureCard icon={Sparkles} title="Cartoon Art" description="Everything looks like it came from your favorite TV show!" />
              <FeatureCard icon={Zap} title="Your Pace" description="We wait for you! No hurry, just pure fun and learning." />
              <FeatureCard icon={Gamepad2} title="Badges!" description="Collect 100+ funny badges. Can you get them all?" />
              <FeatureCard icon={LayoutDashboard} title="Mom & Dad" description="They get a special dashboard to see how awesome you are!" />
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-40 bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader light subtitle="YAY! WE LOVE IT!" title="What families say" description="Even grown-ups think we're really, really cool." />
            <div className="grid md:grid-cols-3 gap-16">
              <Testimonial author="Sarah J." role="Mom of Cool Kids" quote="The bedtime stories are better than movies! We explore space every night before bed!" avatarSeed="sarah" color="bg-sky-400" />
              <Testimonial author="Mr. David" role="Super Teacher" quote="I use this in class and my students actually cheer when it's science time!" avatarSeed="david" color="bg-amber-400" />
              <Testimonial author="Linda C." role="Best Parent Ever" quote="My daughter learned about black holes using gummy bears. Genius!" avatarSeed="linda" color="bg-pink-400" />
            </div>
          </div>
        </section>

        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto bg-emerald-400 rounded-[7rem] p-24 md:p-40 text-center text-white shadow-[0_40px_0_0_#059669] relative overflow-hidden border-[12px] border-white">
            <h2 className="text-7xl md:text-9xl font-black mb-12 leading-tight">Wanna play in the yard?</h2>
            <p className="text-4xl font-black text-white/90 mb-20 max-w-4xl mx-auto">Join our club of 50,000 tiny explorers today!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <button 
                onClick={() => setCurrentView('game')}
                className="chunky-button-secondary px-24 py-10 rounded-[4rem] text-5xl"
              >
                YES! LET'S GO!
              </button>
              <button 
                onClick={() => setCurrentView('info')}
                className="bg-white/20 backdrop-blur-md text-white border-[10px] border-white/30 px-20 py-10 rounded-[4rem] text-5xl font-black hover:bg-white/30 transition-all"
              >
                TELL ME MORE
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-100 pt-40 pb-20 border-t-[16px] border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2">
              <div 
                className="flex items-center gap-5 mb-12 cursor-pointer group hover:scale-105 transition-transform origin-left"
                onClick={() => setIsDevPopupOpen(true)}
              >
                <SohanLogo size={72} bgClassName="rounded-2xl border-4 border-emerald-500 shadow-xl" />
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-slate-900 leading-none">WONDER YARD</span>
                  <span className="text-lg font-black text-emerald-600 tracking-[0.2em] uppercase mt-1">by SOHAN INDUSTRIES</span>
                </div>
              </div>
              <p className="text-3xl font-black text-slate-600 max-w-sm mb-12">Where every "Why?" turns into a "Wheee!". The safest place for curious brains to grow.</p>
              <div className="flex items-center gap-8">
                {[Twitter, Instagram, Facebook].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-20 h-20 rounded-[2rem] bg-white border-6 border-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-400 hover:text-white hover:border-emerald-500 transition-all shadow-xl active:translate-y-2"><Icon size={40} /></a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 mb-10">Fun Stuff</h4>
              <ul className="space-y-8 text-2xl font-black text-slate-500">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Our Magic</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Badges</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Games</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 mb-10">Grown-ups</h4>
              <ul className="space-y-8 text-2xl font-black text-slate-500">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Parent Portal</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t-8 border-slate-200 flex flex-col md:flex-row justify-between items-center gap-10 text-slate-400 text-2xl font-black">
            <p>© 2026 WONDER YARD. Best site ever!</p>
            <div className="flex items-center gap-12">
              <span className="flex items-center gap-3"><CheckCircle2 size={32} className="text-emerald-500" />100% Safe</span>
              <span className="flex items-center gap-3"><CheckCircle2 size={32} className="text-emerald-500" />No Scary Ads</span>
            </div>
          </div>
          <div className="mt-16 pt-10 border-t-4 border-slate-200/50 text-center">
            <p className="text-xl font-black text-slate-400 uppercase tracking-widest mb-2">developed and maintained by SOHAN INDUSTRIES INITIATIVE</p>
            <p className="text-lg font-bold text-slate-400/60 uppercase">SOHAN INDUSTRIES INITIATIVE all rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
