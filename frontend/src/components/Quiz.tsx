import React, { useState } from 'react';

interface QuizQuestion {
  _id?: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  type: 'multiple-choice' | 'true-false';
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizProps {
  moduleId: string;
  title: string;
  questions: QuizQuestion[];
  onSubmit: (answers: string[], score: number) => void;
  onCancel: () => void;
}

const Quiz: React.FC<QuizProps> = ({ title, questions, onSubmit, onCancel }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [gradedAnswers, setGradedAnswers] = useState<{ questionId: string; selectedOption: string; isCorrect: boolean; correctAnswer: string }[]>([]);

  const handleAnswerSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score (in a real app, this would be done server-side for security)
    let correctCount = 0;
    const newGradedAnswers = questions.map((question, index) => {
      const userAnswer = answers[index];
      const correctOption = question.options.find(opt => opt.isCorrect);
      const isCorrect = !!(correctOption && correctOption.text === userAnswer);
      
      if (isCorrect) correctCount++;
      
      return {
        questionId: question._id || `q${index}`,
        selectedOption: userAnswer,
        isCorrect,
        correctAnswer: correctOption ? correctOption.text : ''
      };
    });
    
    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    
    setScore(calculatedScore);
    setGradedAnswers(newGradedAnswers);
    setShowResults(true);
    onSubmit(answers, calculatedScore);
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(''));
    setShowResults(false);
    setScore(0);
    setGradedAnswers([]);
  };

  if (showResults) {
    // Calculate stars based on score
    let starsEarned = 0;
    if (score >= 90) starsEarned = 3;
    else if (score >= 70) starsEarned = 2;
    else if (score >= 50) starsEarned = 1;

    return (
      <div className="quiz-results">
        <h2>Resultados do Quiz</h2>
        <h3>{title}</h3>
        
        <div className="score-section">
          <div className="score-display">
            <span className="score-value">{score}%</span>
            <p>Acertos: {gradedAnswers.filter(a => a.isCorrect).length} de {questions.length}</p>
          </div>
          
          <div className="stars-display">
            <p>Estrelas ganhas:</p>
            <div className="stars">
              {'⭐'.repeat(starsEarned)}
              {'☆'.repeat(3 - starsEarned)}
            </div>
          </div>
        </div>
        
        <div className="review-section">
          <h4>Revisão das Respostas:</h4>
          {gradedAnswers.map((gradedAnswer, index) => (
            <div key={index} className={`answer-review ${gradedAnswer.isCorrect ? 'correct' : 'incorrect'}`}>
              <p><strong>Questão {index + 1}:</strong> {questions[index].question}</p>
              <p><strong>Sua resposta:</strong> {gradedAnswer.selectedOption || 'Nenhuma'}</p>
              {!gradedAnswer.isCorrect && (
                <p><strong>Resposta correta:</strong> {gradedAnswer.correctAnswer}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="quiz-actions">
          <button className="retake-btn" onClick={handleRetake}>Refazer Quiz</button>
          <button className="continue-btn" onClick={onCancel}>Continuar</button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <h2>Quiz Interativo</h2>
      <h3>{title}</h3>
      
      <div className="quiz-progress">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <p>Questão {currentQuestion + 1} de {questions.length}</p>
      </div>
      
      <div className="question-container">
        <h4>{currentQ.question}</h4>
        
        <div className="options-container">
          {currentQ.options.map((option, index) => (
            <div 
              key={index}
              className={`option ${answers[currentQuestion] === option.text ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option.text)}
            >
              <span className="option-text">{option.text}</span>
              {answers[currentQuestion] === option.text && <span className="selected-check">✓</span>}
            </div>
          ))}
        </div>
      </div>
      
      <div className="quiz-navigation">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Anterior
        </button>
        
        {currentQuestion < questions.length - 1 ? (
          <button 
            className="nav-btn next-btn" 
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
          >
            Próxima
          </button>
        ) : (
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={!answers[currentQuestion]}
          >
            Enviar Respostas
          </button>
        )}
      </div>
      
      <button className="cancel-btn" onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default Quiz;