import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const ProfilePage = () => {
  const currentUser = useStore(state => state.currentUser);
  const updateUser = useStore(state => state.updateUser);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    postalCode: currentUser?.postalCode || '',
    country: currentUser?.country || 'Portugal'
  });
  
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(currentUser.id, formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card shadow-xl">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h1 className="font-display text-2xl font-bold text-gray-800">{currentUser?.name}</h1>
              <p className="text-gray-500">{currentUser?.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                currentUser?.role === 'admin' ? 'bg-red-100 text-red-700' :
                currentUser?.role === 'professor' ? 'bg-blue-100 text-blue-700' :
                currentUser?.role === 'gestor' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              }`}>
                {currentUser?.role === 'admin' ? 'Administrador' :
                 currentUser?.role === 'professor' ? 'Professor' :
                 currentUser?.role === 'gestor' ? 'Gestor' : 'Aluno'}
              </span>
            </div>
          </div>

          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              ✓ Perfil atualizado com sucesso!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">O email não pode ser alterado</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+351 912 345 678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Portugal">Portugal</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Espanha">Espanha</option>
                  <option value="França">França</option>
                  <option value="Alemanha">Alemanha</option>
                  <option value="Reino Unido">Reino Unido</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Morada
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Rua Exemplo, nº 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Lisboa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código Postal
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="1000-001"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Guardar Alterações
              </button>
            </div>
          </form>
        </div>

        {/* Estatísticas */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">0</div>
            <div className="text-gray-500 mt-2">Cursos Inscritos</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">0</div>
            <div className="text-gray-500 mt-2">Certificados</div>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold gradient-text">0h</div>
            <div className="text-gray-500 mt-2">Tempo de Aprendizagem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
