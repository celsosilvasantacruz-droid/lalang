import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { languages } from '../data/mockupData';

const ProgressPage = () => {
  const currentUser = useStore(state => state.currentUser);
  const enrolledCourses = useStore(state => state.enrolledCourses);
  const progress = useStore(state => state.progress);

  const userCourses = enrolledCourses.filter(c => c.userId === currentUser?.id);

  // Mock progress data
  const mockProgress = {
    totalLessons: 48,
    completedLessons: 12,
    totalHours: 24,
    studiedHours: 6,
    streak: 5,
    weeklyGoal: 7,
    weeklyProgress: 4
  };

  const getProgressPercentage = () => {
    if (mockProgress.totalLessons === 0) return 0;
    return Math.round((mockProgress.completedLessons / mockProgress.totalLessons) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard/aluno" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Voltar ao Dashboard
          </Link>
          <h1 className="font-display text-3xl font-bold text-gray-800 mt-4">
            O Meu Progresso 📊
          </h1>
          <p className="text-gray-500 mt-2">Acompanhe o seu desenvolvimento ao longo do tempo</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">{mockProgress.completedLessons}</div>
            <div className="text-gray-500 mt-2">Lições Concluídas</div>
            <div className="text-sm text-gray-400">de {mockProgress.totalLessons} totais</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">{mockProgress.studiedHours}h</div>
            <div className="text-gray-500 mt-2">Tempo de Estudo</div>
            <div className="text-sm text-gray-400">de {mockProgress.totalHours}h disponíveis</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">{mockProgress.streak}🔥</div>
            <div className="text-gray-500 mt-2">Dias Seguidos</div>
            <div className="text-sm text-gray-400">Continue assim!</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">{getProgressPercentage()}%</div>
            <div className="text-gray-500 mt-2">Progresso Geral</div>
            <div className="text-sm text-gray-400">do curso atual</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Progress */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Goal */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Meta Semanal</h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Objetivo: {mockProgress.weeklyGoal} horas</span>
                <span className="font-bold text-primary-600">{mockProgress.weeklyProgress}/{mockProgress.weeklyGoal}h</span>
              </div>
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all duration-500"
                  style={{width: `${(mockProgress.weeklyProgress / mockProgress.weeklyGoal) * 100}%`}}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Faltam {mockProgress.weeklyGoal - mockProgress.weeklyProgress} horas para atingir a meta semanal
              </p>
            </div>

            {/* Course Progress */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Progresso por Curso</h2>
              {userCourses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📚</div>
                  <p className="text-gray-500">Ainda não tem cursos inscritos</p>
                  <Link to="/cursos" className="btn-primary mt-4 inline-block">
                    Explorar Cursos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userCourses.map((course) => {
                    const lang = languages.find(l => l.id === course.languageId);
                    const progressPercent = course.progress || 0;
                    return (
                      <div key={course.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-3xl mr-3">{lang?.flag}</span>
                            <div>
                              <div className="font-semibold">{lang?.name}</div>
                              <div className="text-sm text-gray-500">Nível {course.level}</div>
                            </div>
                          </div>
                          <span className="text-lg font-bold text-primary-600">{progressPercent}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full"
                            style={{width: `${progressPercent}%`}}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Activity Chart */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Atividade Recente</h2>
              <div className="grid grid-cols-7 gap-2">
                {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{day}</div>
                    <div className={`h-20 rounded-lg flex items-end justify-center ${
                      i < 5 ? 'bg-gradient-to-t from-primary-500 to-secondary-500' : 'bg-gray-200'
                    }`}>
                      <span className="text-white text-xs font-bold mb-1">
                        {i < 5 ? Math.floor(Math.random() * 3) + 1 : 0}h
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Competências</h2>
              <div className="space-y-4">
                {[
                  { skill: 'Leitura', progress: 45, color: 'from-blue-500 to-blue-600' },
                  { skill: 'Escrita', progress: 30, color: 'from-green-500 to-green-600' },
                  { skill: 'Escuta', progress: 55, color: 'from-purple-500 to-purple-600' },
                  { skill: 'Fala', progress: 25, color: 'from-yellow-500 to-yellow-600' }
                ].map((item) => (
                  <div key={item.skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.skill}</span>
                      <span className="font-medium">{item.progress}%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className={`bg-gradient-to-r ${item.color} h-full rounded-full`} style={{width: `${item.progress}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Conquistas</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🎯', name: 'Primeiro Passo', unlocked: true },
                  { icon: '📚', name: 'Estudioso', unlocked: true },
                  { icon: '🔥', name: '5 Dias Seguidos', unlocked: true },
                  { icon: '🏆', name: 'Primeiro Certificado', unlocked: false },
                  { icon: '⭐', name: '100% Concluído', unlocked: false },
                  { icon: '🎓', name: 'Mestre', unlocked: false }
                ].map((achievement) => (
                  <div 
                    key={achievement.name}
                    className={`p-3 rounded-xl text-center ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-primary-50 to-secondary-50' 
                        : 'bg-gray-100 opacity-50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs text-gray-600">{achievement.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Próximos Passos</h2>
              <div className="space-y-3">
                <Link to="/teste/placement-pt" className="block p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <div className="font-medium text-blue-700">📝 Fazer teste de nível</div>
                  <div className="text-sm text-blue-600">Descubra o seu nível atual</div>
                </Link>
                <Link to="/certificados" className="block p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <div className="font-medium text-green-700">📜 Ver certificados</div>
                  <div className="text-sm text-green-600">Os seus diplomas</div>
                </Link>
                <Link to="/premium" className="block p-3 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-colors">
                  <div className="font-medium text-yellow-700">⭐ Serviços Premium</div>
                  <div className="text-sm text-yellow-600">Melhore a sua experiência</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
