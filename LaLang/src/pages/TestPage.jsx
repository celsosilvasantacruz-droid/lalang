import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { tests, languages } from '../data/mockupData';

const TestPage = () => {
  const { testId } = useParams();
  const currentUser = useStore(state => state.currentUser);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const test = tests.find(t => t.id === testId) || tests[0];
  const language = languages.find(l => l.id === test.language);

  // Mock questions
  const mockQuestions = [
    {
      id: 1,
      question: "Como se diz 'Olá' em português?",
      options: ["Olá", "Adeus", "Obrigado", "Por favor"],
      correct: 0
    },
    {
      id: 2,
      question: "Qual é a tradução de 'Good morning'?",
      options: ["Boa tarde", "Boa noite", "Bom dia", "Boa sorte"],
      correct: 2
    },
    {
      id: 3,
      question: "Complete: 'Eu ____ português.'",
      options: ["sou", "estou", "tenho", "vou"],
      correct: 0
    },
    {
      id: 4,
      question: "O que significa 'Obrigado'?",
      options: ["Hello", "Goodbye", "Thank you", "Please"],
      correct: 2
    },
    {
      id: 5,
      question: "Como se pergunta 'Como está?' em português?",
      options: ["Quem é você?", "Como está?", "Onde está?", "Quando é?"],
      correct: 1
    },
    {
      id: 6,
      question: "Qual é o plural de 'casa'?",
      options: ["casas", "casaes", "casões", "casas"],
      correct: 0
    },
    {
      id: 7,
      question: "Complete: 'Ela ____ uma estudante.'",
      options: ["é", "está", "tem", "vai"],
      correct: 0
    },
    {
      id: 8,
      question: "O que significa 'Até logo'?",
      options: ["Hello", "See you later", "Thank you", "Good morning"],
      correct: 1
    },
    {
      id: 9,
      question: "Como se diz 'water' em português?",
      options: ["água", "fogo", "terra", "ar"],
      correct: 0
    },
    {
      id: 10,
      question: "Qual é a forma correta?",
      options: ["Eu gosto de café", "Eu gosto café", "Eu gosto com café", "Eu gosto para café"],
      correct: 0
    }
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / mockQuestions.length) * 100);
  };

  const getLevel = () => {
    const score = getScorePercentage();
    if (score >= 90) return 'C1';
    if (score >= 75) return 'B2';
    if (score >= 60) return 'B1';
    if (score >= 45) return 'A2';
    return 'A1';
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-2xl text-center">
            <div className="text-6xl mb-4">{language?.flag}</div>
            <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">
              {test.title}
            </h1>
            <p className="text-gray-500 mb-8">{test.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{test.questions}</div>
                <div className="text-gray-500 text-sm">Perguntas</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-primary-600">{test.duration}min</div>
                <div className="text-gray-500 text-sm">Duração</div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Instruções</h3>
              <ul className="text-sm text-yellow-700 text-left space-y-1">
                <li>• Leia cada pergunta com atenção</li>
                <li>• Selecione apenas uma resposta</li>
                <li>• Não pode voltar atrás após confirmar</li>
                <li>• O teste é individual</li>
              </ul>
            </div>

            <button
              onClick={() => setTestStarted(true)}
              className="btn-primary text-lg px-12 py-4"
            >
              Iniciar Teste
            </button>
            
            <Link to="/dashboard/aluno" className="block mt-4 text-gray-500 hover:text-gray-700">
              Cancelar e voltar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    const level = getLevel();

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card shadow-2xl text-center">
            <div className="text-6xl mb-4">
              {percentage >= 60 ? '🎉' : '📚'}
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-800 mb-2">
              {percentage >= 60 ? 'Parabéns!' : 'Continue a Praticar!'}
            </h1>
            <p className="text-gray-500 mb-8">Teste concluído</p>
            
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-8 rounded-2xl mb-8">
              <div className="text-6xl font-bold mb-2">{percentage}%</div>
              <div className="text-xl">{score}/{mockQuestions.length} respostas corretas</div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="font-semibold text-gray-800 mb-4">Seu Nível Estimado</h3>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {level}
                </div>
                <div className="ml-4 text-left">
                  <div className="font-semibold text-gray-800">
                    {level === 'C1' && 'Avançado'}
                    {level === 'B2' && 'Intermédio Superior'}
                    {level === 'B1' && 'Intermédio'}
                    {level === 'A2' && 'Elementar'}
                    {level === 'A1' && 'Iniciante'}
                  </div>
                  <div className="text-sm text-gray-500">
                    Nível {language?.nativeName}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link to={`/curso/${language?.id}/${level}`} className="btn-primary w-full block">
                Começar Curso {level}
              </Link>
              <Link to="/dashboard/aluno" className="btn-outline w-full block">
                Voltar ao Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Pergunta {currentQuestion + 1} de {mockQuestions.length}</span>
            <span>{language?.flag} {language?.name}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all duration-300"
              style={{width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%`}}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card shadow-xl">
          <div className="mb-6">
            <span className="text-sm text-gray-500">Pergunta {currentQuestion + 1}</span>
            <h2 className="font-display text-xl font-bold text-gray-800 mt-2">
              {mockQuestions[currentQuestion].question}
            </h2>
          </div>

          <div className="space-y-3">
            {mockQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(mockQuestions[currentQuestion].id, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[mockQuestions[currentQuestion].id] === index
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 font-medium ${
                    answers[mockQuestions[currentQuestion].id] === index
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-xl font-medium ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              ← Anterior
            </button>
            
            <button
              onClick={handleNext}
              disabled={answers[mockQuestions[currentQuestion].id] === undefined}
              className={`px-6 py-3 rounded-xl font-medium ${
                answers[mockQuestions[currentQuestion].id] === undefined
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {currentQuestion === mockQuestions.length - 1 ? 'Ver Resultados' : 'Próxima →'}
            </button>
          </div>
        </div>

        {/* Timer Placeholder */}
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-full px-4 py-2 flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-gray-700">Tempo ilimitado</span>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
