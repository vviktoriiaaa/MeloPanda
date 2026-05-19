import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pandaImg from './assets/panda.jpg';

const songs = [
  {
    title: 'Bad Guy',
    artist: 'Billie Eilish',
    difficulty: 'Beginner',
    xp: 120,
    color: 'from-cyan-400 to-blue-500',
    image:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
    url:
      'https://res.cloudinary.com/du7cbfsha/video/upload/v1779119121/billie-eilish-bad-guy_eqvglu.mp3',
    quizzes: [
      {
        type: 'fill',
        questionEN: 'So you are a ___ guy',
        questionUA: 'Ти такий ___ хлопець',
        options: ['cute', 'tough', 'sad', 'tiny'],
        correct: 'tough',
      },
      {
        type: 'meaning',
        questionEN: 'What does “tough” mean?',
        questionUA: 'Що означає “tough”?',
        options: ['Strong', 'Hungry', 'Sleepy', 'Funny'],
        correct: 'Strong',
      },
      {
        type: 'listen',
        questionEN: 'Which word fits after “really” ?',
        questionUA: 'Яке слово після “really” ?',
        options: ['rough', 'easy', 'clean', 'slow'],
        correct: 'rough',
      },
      {
        type: 'translate',
        questionEN: 'Translate “bad guy”',
        questionUA: 'Переклади “bad guy”',
        options: ['Хороший хлопець', 'Поганий хлопець', 'Співак', 'Друг'],
        correct: 'Поганий хлопець',
      },
    ],
  },

  {
    title: 'Flowers',
    artist: 'Miley Cyrus',
    difficulty: 'Easy',
    xp: 140,
    color: 'from-pink-500 to-orange-400',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    url:
      'https://res.cloudinary.com/du7cbfsha/video/upload/v1779119121/miley-cyrus-flowers-_meloua.com_zo720f.mp3',
    quizzes: [
      {
        questionEN: 'I can buy myself ___',
        questionUA: 'Я можу купити собі ___',
        options: ['cars', 'flowers', 'diamonds', 'food'],
        correct: 'flowers',
      },
      {
        questionEN: 'Write my name in the ___',
        questionUA: 'Напиши моє ім’я на ___',
        options: ['snow', 'sand', 'sky', 'phone'],
        correct: 'sand',
      },
      {
        questionEN: 'What is the theme of the song?',
        questionUA: 'Яка тема пісні?',
        options: ['Self love', 'War', 'School', 'Money'],
        correct: 'Self love',
      },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState('loading');
  const [language, setLanguage] = useState('EN');
  const [songIndex, setSongIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [xp, setXp] = useState(1280);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [streak] = useState(14);
  const [result, setResult] = useState('');
  const [showReward, setShowReward] = useState(false);

  const audioRef = useRef(null);

  const currentSong = songs[songIndex];
  const currentQuiz = currentSong.quizzes[quizIndex];

  const t = {
    EN: {
      start: 'Start Learning',
      songs: 'Recommended Songs',
      back: 'Back',
      home: 'Home',
      play: 'Play Lesson',
      complete: 'Lesson Complete 🎉',
      score: 'Score',
      combo: 'Combo',
      streak: 'Day Streak',
      level: 'Level',
      online: 'Online',
      premium: 'Premium Music Learning Platform',
      quiz: 'Music Quiz',
      settings: 'Settings',
    },

    UA: {
      start: 'Почати навчання',
      songs: 'Рекомендовані Пісні',
      back: 'Назад',
      home: 'Головна',
      play: 'Почати урок',
      complete: 'Урок завершено 🎉',
      score: 'Рахунок',
      combo: 'Комбо',
      streak: 'Денна серія',
      level: 'Рівень',
      online: 'Онлайн',
      premium: 'Преміум платформа для вивчення англійської',
      quiz: 'Музичний тест',
      settings: 'Налаштування',
    },
  }[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('home');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const checkAnswer = (option) => {
    if (option === currentQuiz.correct) {
      setResult(language === 'EN' ? 'Correct ✅' : 'Правильно ✅');

      setScore((prev) => prev + 10);
      setXp((prev) => prev + 25);
      setCombo((prev) => prev + 1);

      setShowReward(true);

      setTimeout(() => {
        setShowReward(false);
      }, 1000);
    } else {
      setResult(language === 'EN' ? 'Wrong ❌' : 'Неправильно ❌');
      setCombo(0);
    }

    setTimeout(() => {
      if (quizIndex < currentSong.quizzes.length - 1) {
        setQuizIndex((prev) => prev + 1);
        setResult('');
      } else {
        setResult(t.complete);
      }
    }, 1200);
  };

  if (screen === 'loading') {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center overflow-hidden text-white relative">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <motion.img
          src={pandaImg}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="w-52 relative z-10 drop-shadow-[0_0_40px_rgba(0,255,255,0.6)]"
        />

        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-7xl font-black mt-8 bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
        >
          MeloPanda
        </motion.h1>

        <p className="text-white/60 mt-4 text-xl">
          Learn English Through Music
        </p>

        <div className="w-72 h-3 bg-white/10 rounded-full mt-10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-pink-500"
          />
        </div>
      </div>
    );
  }

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-[#050816] text-white overflow-hidden p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[-150px] left-[-150px] w-[350px] h-[350px] bg-cyan-500/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-[-150px] right-[-150px] w-[350px] h-[350px] bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
            <div className="flex justify-between items-center flex-wrap gap-6">
              <div>
                <p className="text-cyan-400 font-bold mb-2">
                  🎵 MeloPanda
                </p>

                <h1 className="text-6xl font-black leading-none">
                  Welcome Back!
                </h1>

                <p className="text-white/60 mt-4 text-lg max-w-xl">
                  {t.premium}
                </p>
              </div>

              <motion.img
                src={pandaImg}
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-40 drop-shadow-[0_0_40px_rgba(0,255,255,0.5)]"
              />
            </div>

            <div className="grid md:grid-cols-4 gap-5 mt-10">
              <GlassCard title="XP" value={xp} />

              <GlassCard
                title={t.streak}
                value={`${streak} 🔥`}
              />

              <GlassCard title={t.level} value="9" />

              <GlassCard title={t.online} value="18k" />
            </div>

            <div className="mt-10 rounded-[32px] border border-pink-500/20 bg-pink-500/10 p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-pink-300 font-bold">
                    ⚡ DAILY CHALLENGE
                  </p>

                  <h2 className="text-3xl font-black mt-2">
                    Finish 3 song quizzes
                  </h2>
                </div>

                <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black">
                  +250 XP
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => setScreen('songs')}
                className="px-8 py-5 rounded-3xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-xl hover:scale-105 transition"
              >
                {t.start}
              </button>

              <button
                onClick={() =>
                  setLanguage(language === 'EN' ? 'UA' : 'EN')
                }
                className="px-8 py-5 rounded-3xl border border-cyan-400/30 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                {language === 'EN'
                  ? '🇬🇧 English'
                  : '🇺🇦 Українська'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'songs') {
    return (
      <div className="min-h-screen bg-[#050816] text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-5xl font-black">
                {t.songs}
              </h1>

              <p className="text-white/50 mt-3">
                Choose your favorite track
              </p>
            </div>

            <img
              src={pandaImg}
              className="w-28 drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {songs.map((song, index) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={song.title}
                className="rounded-[36px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl"
              >
                <div
                  className="h-56 bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${song.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h2 className="text-4xl font-black">
                        {song.title}
                      </h2>

                      <p className="text-white/60 mt-2 text-lg">
                        {song.artist}
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${song.color} text-black font-black`}
                    >
                      +{song.xp} XP
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSongIndex(index);
                      setQuizIndex(0);
                      setResult('');
                      setScreen('lesson');
                    }}
                    className={`w-full mt-8 py-5 rounded-3xl bg-gradient-to-r ${song.color} text-black font-black text-xl`}
                  >
                    {t.play}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 overflow-hidden relative">
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-cyan-500/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-pink-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <button
              onClick={() => setScreen('songs')}
              className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10"
            >
              ← {t.back}
            </button>

            <img
              src={pandaImg}
              className="w-20"
            />

            <div className="text-right">
              <p className="text-white/50">XP</p>

              <h2 className="text-4xl font-black">{xp}</h2>
            </div>
          </div>

          <div className="mt-10 rounded-[32px] bg-black/30 border border-white/10 p-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-cyan-300 font-bold">
                  🎧 NOW PLAYING
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {currentSong.title}
                </h2>

                <p className="text-white/60 mt-2 text-lg">
                  {currentSong.artist}
                </p>
              </div>

              <div className="flex items-end gap-1 h-12">
                {[20, 35, 25, 40, 18, 32].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [12, h, 18] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      delay: i * 0.1,
                    }}
                    className="w-2 rounded-full bg-gradient-to-t from-cyan-400 to-pink-500"
                  />
                ))}
              </div>
            </div>

            <audio
              ref={audioRef}
              src={currentSong.url}
              controls
              autoPlay
              className="w-full mt-8"
            />
          </div>

          <div className="mt-10 rounded-[36px] border border-white/10 bg-black/30 p-8">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <p className="text-white/50">
                  {t.quiz}
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {language === 'EN'
                    ? currentQuiz.questionEN
                    : currentQuiz.questionUA}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-white/50">
                  {t.combo}
                </p>

                <h3 className="text-4xl font-black">
                  {combo} 🔥
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {currentQuiz.options.map((option) => (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                  key={option}
                  onClick={() => checkAnswer(option)}
                  className="py-6 rounded-3xl bg-white/5 border border-white/10 text-2xl font-bold hover:border-cyan-400/40 hover:bg-cyan-400/10 transition"
                >
                  {option}
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {showReward && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed top-10 right-10 px-6 py-4 rounded-3xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black text-2xl z-50"
                >
                  +25 XP ⭐
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-10 text-center">
              <h3 className="text-4xl font-black">
                {result}
              </h3>

              <div className="flex justify-center gap-10 mt-6 text-xl text-white/60">
                <div>
                  {t.score}: {score}
                </div>

                <div>
                  {t.combo}: {combo}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => setScreen('home')}
              className="px-8 py-5 rounded-3xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-black"
            >
              {t.home}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlassCard({ title, value }) {
  return (
    <div className="rounded-[30px] bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
      <p className="text-white/50 text-lg">{title}</p>

      <h2 className="text-5xl font-black mt-3">
        {value}
      </h2>
    </div>
  );
}