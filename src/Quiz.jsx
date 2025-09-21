import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import html2canvas from "html2canvas-pro";
import { questions } from "./questions"; 

// --- Components (no need to be a smartass and break this down) ---

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center mb-8 p-4"
  >
    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cspc-purple via-cspc-blue to-cspc-teal bg-clip-text text-transparent">
      CS Specialization Quiz
    </h1>
    <p className="text-zinc-500 mt-2">Find your path in Computer Science!</p>
  </motion.div>
);

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full bg-zinc-200 rounded-full h-2.5 mb-8">
      <motion.div
        className="bg-gradient-to-r from-cspc-blue to-cspc-teal h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

const QuestionCard = ({ question, handleAnswer, questionNumber, totalQuestions }) => (
  <div className="relative p-1 rounded-xl bg-gradient-to-r from-cspc-purple via-cspc-blue to-cspc-teal">
  <motion.div
    key={questionNumber}
    initial={{ opacity: 0.5, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 100 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-8 rounded-xl shadow-lg w-full"
  >
    <h2 className="text-xl font-semibold text-zinc-700 mb-2">
      Question {questionNumber} / {totalQuestions}
    </h2>
    <p className="text-2xl text-zinc-800 mb-6">{question.text}</p>
    <div className="flex flex-col space-y-4">
      {question.options.map((opt, index) => (
        <motion.button
          key={index}
          onClick={() => handleAnswer(opt.value)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full text-left p-4 rounded-lg border-2 border-cspc-blue text-cspc-blue font-semibold transition-colors duration-300 hover:bg-cspc-blue hover:text-white"
        >
          {opt.answer}
        </motion.button>
      ))}
    </div>
  </motion.div>
  </div>
);

const ResultCard = ({ result, description, onRestart, onSave, resultRef }) => (
  <div className="relative p-1 rounded-xl bg-gradient-to-r from-cspc-purple via-cspc-blue to-cspc-teal">
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 rounded-xl shadow-lg text-center w-full"
    ref={resultRef} 
  >
    <h2 className="text-zinc-600 text-xl mb-2">Your Recommended Specialization:</h2>
    <h1 className="text-4xl font-bold text-zinc-950 mb-4">
      {result}
    </h1>
    <p className="text-zinc-700 mb-8">{description}</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <motion.button
        onClick={onSave}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-white border-2 border-cspc-teal text-cspc-teal font-bold rounded-full shadow-sm"
      >
        Save Result
      </motion.button>
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-gradient-to-r from-cspc-blue to-cspc-teal text-white font-bold rounded-full shadow-md"
      >
        Restart Quiz
      </motion.button>
    </div>
  </motion.div>
  </div>
);

// --- Main Quiz Component ---

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ game: 0, ai: 0 });
  const [finished, setFinished] = useState(false);
  const resultCardRef = useRef(null)

  const handleAnswer = (value) => {
    setScore((prev) => ({ ...prev, [value]: prev[value] + 1 }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore({ game: 0, ai: 0 });
    setFinished(false);
  };
  
  const getResult = () => {
    if (score.game > score.ai) return "🎮 Game Development";
    if (score.ai > score.game) return "🤖 Intelligent Systems";
    return "A mix of both!";
  };

  const getDescription = () => {
    if (score.game > score.ai) return "You seem to love creating interactive worlds and immersive experiences. Game Development lets you dive into graphics, physics, and gameplay mechanics using engines like Unity and Unreal.";
    if (score.ai > score.game) return "You are drawn to data, learning systems, and intelligent decision-making. The Intelligent Systems track will let you explore machine learning, NLP, computer vision, and robotics.";
    return "You have a balanced interest in both creative visuals and logical systems! You could thrive in areas where AI and graphics intersect, like procedural generation or smart NPCs in games.";

  }

  const handleSaveResult = () => {
    if (!resultCardRef.current) return;

    html2canvas(resultCardRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'cs-specialization-result.png';
      link.click();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-zinc-100">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div key="quiz" className="w-full">
              <ProgressBar current={currentQuestion} total={questions.length} />
              <QuestionCard
                question={questions[currentQuestion]}
                handleAnswer={handleAnswer}
                questionNumber={currentQuestion + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          ) : (
            <ResultCard
              key="result"
              result={getResult()}
              description={getDescription()}
              onRestart={restartQuiz}              
              onSave={handleSaveResult} 
              resultRef={resultCardRef} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Quiz;