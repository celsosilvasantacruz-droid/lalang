import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { languages } from '../data/mockupData';

const DashboardAdmin = () => {
  const currentUser = useStore(state => state.currentUser);
  const users = useStore(state => state.users);
  const createUser = useStore(state => state.createUser);
  const updateUser = useStore(state => state.updateUser);
  const deleteUser = useStore(state => state.deleteUser);
  
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'aluno'
  });
  const [filter, setFilter] = useState('all');

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(u => u.role === filter);

  const handleCreateUser = (e) => {
    e.preventDefault();
    const result = createUser(newUser);
    if (result.success) {
      setNewUser({ name: '', email: '', password: '', role: 'aluno' });
      setShowCreateUser(false);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Tem certeza que deseja eliminar este utilizador?')) {
      deleteUser(userId);
    }
  };

  const handleToggleActive = (userId, currentStatus) => {
    updateUser(userId, { active: !currentStatus });
  };

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    professors: users.filter(u => u.role === 'professor').length,
    gestores: users.filter(u => u.role === 'gestor').length,
    alunos: users.filter(u => u.role === 'aluno').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-800">
            Dashboard do Administrador 🔐
          </h1>
          <p className="text-gray-500 mt-2">Gerencie utilizadores, cursos e configurações da plataforma</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="card bg-gradient-to-br from-gray-700 to-gray-800 text-white">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-gray-300">Total Utilizadores</div>
          </div>
          <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="text-3xl font-bold">{stats.admins}</div>
            <div className="text-red-100">Administradores</div>
          </div>
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-3xl font-bold">{stats.professors}</div>
            <div className="text-blue-100">Professores</div>
          </div>
          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-3xl font-bold">{stats.gestores}</div>
            <div className="text-purple-100">Gestores</div>
          </div>
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-3xl font-bold">{stats.alunos}</div>
            <div className="text-green-100">Alunos</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Users Management */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl font-bold text-gray-800">Gestão de Utilizadores</h2>
                <button
                  onClick={() => setShowCreateUser(true)}
                  className="btn-primary text-sm"
                >
                  + Novo Utilizador
                </button>
              </div>

              {/* Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['all', 'admin', 'professor', 'gestor', 'aluno'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilter(role)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      filter === role
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {role === 'all' ? 'Todos' : 
                     role === 'admin' ? 'Administradores' :
                     role === 'professor' ? 'Professores' :
                     role === 'gestor' ? 'Gestores' : 'Alunos'}
                  </button>
                ))}
              </div>

              {/* Users List */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Utilizador</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-bold mr-2">
                              {user.name?.charAt(0)}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user.role === 'professor' ? 'bg-blue-100 text-blue-700' :
                            user.role === 'gestor' ? 'bg-purple-100 text-purple-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {user.role === 'admin' ? 'Admin' :
                             user.role === 'professor' ? 'Professor' :
                             user.role === 'gestor' ? 'Gestor' : 'Aluno'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.active ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleToggleActive(user.id, user.active)}
                              className={`px-3 py-1 rounded-lg text-xs ${
                                user.active ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {user.active ? 'Desativar' : 'Ativar'}
                            </button>
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200"
                              >
                                Eliminar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Create User Modal */}
            {showCreateUser && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                  <h3 className="font-display text-xl font-bold mb-4">Criar Novo Utilizador</h3>
                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                      <input
                        type="text"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Utilizador</label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        className="input-field"
                      >
                        <option value="aluno">Aluno</option>
                        <option value="professor">Professor</option>
                        <option value="gestor">Gestor</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </div>
                    <div className="flex space-x-4">
                      <button type="submit" className="btn-primary flex-grow">
                        Criar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateUser(false)}
                        className="btn-outline"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Platform Stats */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Estatísticas da Plataforma</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Línguas Disponíveis</span>
                  <span className="font-bold text-primary-600">{languages.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Níveis por Língua</span>
                  <span className="font-bold text-primary-600">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Módulos Ativos</span>
                  <span className="font-bold text-primary-600">180+</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="font-display text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
              <div className="space-y-2">
                <button className="w-full p-3 bg-primary-50 text-primary-700 rounded-xl hover:bg-primary-100 transition-colors text-left">
                  📊 Ver Relatórios
                </button>
                <button className="w-full p-3 bg-secondary-50 text-secondary-700 rounded-xl hover:bg-secondary-100 transition-colors text-left">
                  📚 Gerir Cursos
                </button>
                <button className="w-full p-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors text-left">
                  📜 Certificados
                </button>
                <button className="w-full p-3 bg-yellow-50 text-yellow-700 rounded-xl hover:bg-yellow-100 transition-colors text-left">
                  ⚙️ Configurações
                </button>
              </div>
            </div>

            {/* Admin Info */}
            <div className="card bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
              <h3 className="font-bold mb-2">Administrador Global</h3>
              <p className="text-sm text-white/80 mb-4">{currentUser?.email}</p>
              <div className="text-xs text-white/60">
                Login inicial: admin@lalang.pt<br />
                Password: Admin123!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
