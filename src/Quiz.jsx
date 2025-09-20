import React, { useState } from "react";

const reload = () => {
    window.location.reload();
};


const questions = [
  {
    text: "Do you enjoy creating interactive visual experiences?",
    options: [
      { answer: "Yes", value: "game" },
      { answer: "No", value: "ai" },
    ],
  },
  {
    text: "Would you rather make an indie game or train a custom AI model for a personal project?",
    options: [
      { answer: "AI algorithms", value: "ai" },
      { answer: "Graphics rendering", value: "game" },
    ],
  },
  {
    text: "Do you prefer solving logic-based puzzles or designing levels?",
    options: [
      { answer: "Logic-based puzzles", value: "ai" },
      { answer: "Designing levels", value: "game" },
    ],
  },
  {
    text: "Which excites you more: Physics in virtual worlds or Smart systems that adapt",
    options: [
      { answer: "Smart Systems that adapt", value: "ai" },
      { answer: "Physics in virtual worlds", value: "game" },
    ],
  },
  {
    text: "Do you enjoy working with physics simulations or data models?",
    options: [
      { answer: "Physics simulations", value: "game" },
      { answer: "Data models", value: "ai" },
    ],
  },
  {
    text: "Would you rather create an NPC behavior system or a recommendation system?",
    options: [
      { answer: "NPC behavior system", value: "game" },
      { answer: "Recommendation system", value: "ai" },
    ],
  },
  {
    text: "Are you fascinated by natural language processing or immersive storytelling?",
    options: [
      { answer: "Natural language processing", value: "ai" },
      { answer: "Immersive storytelling", value: "game" },
    ],
  },
  {
    text: "Would you rather implement reinforcement learning or multiplayer networking?",
    options: [
      { answer: "Reinforcement learning", value: "ai" },
      { answer: "Multiplayer networking", value: "game" },
    ],
  },
  {
    text: "Do you prefer to visualize data or create visual effects?",
    options: [
      { answer: "Visualize data", value: "ai" },
      { answer: "Create visual effects", value: "game" },
    ],
  },
  {
    text: "Which excites you more: building an intelligent assistant  or a 3D adventure world like?",
    options: [
      { answer: "Intelligent assistant", value: "ai" },
      { answer: "3D adventure world", value: "game" },
    ],
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ game: 0, ai: 0 });
  const [finished, setFinished] = useState(false);

  const handleAnswer = (value) => {
    setScore((prev) => ({ ...prev, [value]: prev[value] + 1 }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);
    }
  };

  const getResult = () => {
    if (score.game > score.ai) return "🎮 Game Development";
    if (score.ai > score.game) return "🤖 Intelligent Systems";
    return "A mix of both – you could explore either specialization!";
  };

  const getDescription = () => {
        if (score.game > score.ai) return "Game Development focuses on designing, programming, and optimizing interactive entertainment and simulation software. Students learn graphics programming, physics simulation, 3D modeling, gameplay mechanics, level design, and game engines (Unity, Unreal, Godot). The specialization also covers AI for games, user experience design, multiplayer networking, and performance optimization.";
    if (score.ai > score.game) return "Intelligent Systems focuses on building systems that can learn, adapt, and make decisions. Students study machine learning, artificial intelligence, natural language processing (NLP), computer vision, robotics, data analytics, and reinforcement learning. The specialization emphasizes solving real-world problems through autonomous systems, intelligent agents, and data-driven decision-making.";
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>CS Specialization Quiz</h1>
      {!finished ? (
        <div>
          <h2>Question {currentQuestion + 1} of {questions.length}</h2>
          <p>{questions[currentQuestion].text}</p>
          {questions[currentQuestion].options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(opt.value)}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "10px",
                width: "100%",
                cursor: "pointer"
              }}
            >
              {opt.answer}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Your recommended specialization is:</h2>
          <h1>{getResult()}</h1>
          <p>{getDescription()}</p>
          <button onClick={reload}>
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
