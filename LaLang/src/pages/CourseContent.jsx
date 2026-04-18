import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { languages, generateModules } from '../data/mockupData';

const CourseContent = () => {
  const { languageId, level } = useParams();
  const currentUser = useStore(state => state.currentUser);
  const updateProgress = useStore(state => state.updateProgress);
  
  const [activeModule, setActiveModule] = useState('m1');
  const [activeLesson, setActiveLesson] = useState(null);

  const modules = generateModules();
  const language = languages.find(l => l.id === languageId);
  const courseModules = modules[languageId]?.[level] || [];

  const lessonTypes = {
    video: { icon: '🎬', color: 'bg-red-100 text-red-700' },
    text: { icon: '📖', color: 'bg-blue-100 text-blue-700' },
    interactive: { icon: '🎮', color: 'bg-green-100 text-green-700' },
    flashcards: { icon: '🃏', color: 'bg-yellow-100 text-yellow-700' },
    quiz: { icon: '❓', color: 'bg-purple-100 text-purple-700' },
    audio: { icon: '🎧', color: 'bg-pink-100 text-pink-700' },
    exam: { icon: '📝', color: 'bg-orange-100 text-orange-700' }
  };

  const handleLessonComplete = (moduleId, lessonId) => {
    const courseId = `${languageId}-${level}`;
    updateProgress(courseId, moduleId, lessonId, true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard/aluno" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <div className="flex items-center mt-4">
            <span className="text-6xl mr-4">{language?.flag}</span>
            <div>
              <h1 className="font-display text-3xl font-bold text-gray-800">
                {language?.name} - Nível {level}
              </h1>
              <p className="text-gray-500 mt-1">{language?.description}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Modules */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Módulos</h2>
              <div className="space-y-2">
                {courseModules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-3 rounded-xl transition-colors ${
                      activeModule === module.id
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-500'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                        activeModule === module.id ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{module.title}</div>
                        <div className="text-xs text-gray-500">{module.lessons} lições</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-700 mb-2">Progresso do Curso</h3>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full" style={{width: '0%'}}></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">0% concluído</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Module Title */}
            <div className="card mb-6">
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
                {courseModules.find(m => m.id === activeModule)?.title}
              </h2>
              <p className="text-gray-500">
                {courseModules.find(m => m.id === activeModule)?.lessons} lições • 
                {courseModules.find(m => m.id === activeModule)?.duration} de conteúdo
              </p>
            </div>

            {/* Lessons */}
            <div className="space-y-4">
              {courseModules.find(m => m.id === activeModule)?.lessons?.map((lesson, index) => (
                <div key={lesson.id} className={`card ${activeLesson === lesson.id ? 'ring-2 ring-primary-500' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-grow">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4 ${
                        lessonTypes[lesson.type]?.color || 'bg-gray-100'
                      }`}>
                        {lessonTypes[lesson.type]?.icon || '📄'}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-800">Lição {index + 1}: {lesson.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {lesson.duration}
                          </span>
                          <span className="capitalize">{lesson.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setActiveLesson(activeLesson === lesson.id ? null : lesson.id)}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                      >
                        {activeLesson === lesson.id ? 'Fechar' : 'Ver Conteúdo'}
                      </button>
                      <button
                        onClick={() => handleLessonComplete(activeModule, lesson.id)}
                        className="px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                      >
                        ✓ Concluir
                      </button>
                    </div>
                  </div>

                  {/* Lesson Content */}
                  {activeLesson === lesson.id && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">{lesson.content}</h4>
                        
                        {/* Simulated Content based on type */}
                        {lesson.type === 'video' && (
                          <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center">
                            <div className="text-center text-white">
                              <div className="text-6xl mb-4">▶️</div>
                              <p>Vídeo: {lesson.title}</p>
                              <p className="text-sm text-gray-400 mt-2">Duração: {lesson.duration}</p>
                            </div>
                          </div>
                        )}
                        
                        {lesson.type === 'text' && (
                          <div className="prose max-w-none">
                            <p className="text-gray-600 leading-relaxed">
                              Este é o conteúdo de texto da lição sobre "{lesson.title}". 
                              Aqui encontrará explicações detalhadas, exemplos práticos e exercícios 
                              para consolidar o seu aprendizado.
                            </p>
                            <p className="text-gray-600 mt-4">
                              Continue a praticar para melhorar as suas competências linguísticas.
                            </p>
                          </div>
                        )}
                        
                        {lesson.type === 'quiz' && (
                          <div className="space-y-4">
                            <p className="text-gray-600">Teste os seus conhecimentos com este quiz interativo.</p>
                            <div className="bg-white p-4 rounded-lg border">
                              <p className="font-medium">Pergunta 1:</p>
                              <p className="text-gray-600 mb-4">Qual é a tradução correta de "Hello"?</p>
                              <div className="space-y-2">
                                {['Olá', 'Adeus', 'Obrigado', 'Por favor'].map((option, i) => (
                                  <button key={i} className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-primary-50">
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {lesson.type === 'interactive' && (
                          <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎮</div>
                            <p className="text-gray-600">Exercício interativo de {lesson.title}</p>
                            <button className="btn-primary mt-4">Iniciar Exercício</button>
                          </div>
                        )}
                        
                        {lesson.type === 'audio' && (
                          <div className="text-center py-8">
                            <div className="text-6xl mb-4">🎧</div>
                            <p className="text-gray-600 mb-4">Áudio: {lesson.title}</p>
                            <div className="inline-flex items-center space-x-4 bg-white px-6 py-4 rounded-full shadow">
                              <button className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center">
                                ▶️
                              </button>
                              <div className="w-48 h-2 bg-gray-200 rounded-full">
                                <div className="w-1/3 h-full bg-primary-500 rounded-full"></div>
                              </div>
                              <span className="text-gray-500">0:00 / 5:00</span>
                            </div>
                          </div>
                        )}
                        
                        {lesson.type === 'exam' && (
                          <div className="text-center py-8">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-gray-600 mb-4">Avaliação Final do Módulo</p>
                            <p className="text-sm text-gray-500 mb-6">Tempo estimado: {lesson.duration}</p>
                            <button className="btn-primary">Iniciar Avaliação</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button className="btn-outline" disabled>
                ← Módulo Anterior
              </button>
              <button className="btn-primary">
                Próximo Módulo →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
