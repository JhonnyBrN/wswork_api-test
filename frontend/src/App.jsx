import { useEffect, useState } from 'react';

const API_URL = "http://wswork-api-env.eba-dazphmah.us-east-2.elasticbeanstalk.com";

function App() {
  const [carros, setCarros] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [form, setForm] = useState({ modelo_id: '', ano: '', combustivel: '', num_portas: '', cor: '' });

  const fetchModelos = async () => {
    try {
      const response = await fetch(`${API_URL}/modelos`);
      const data = await response.json();
      setModelos(data);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  };

  const fetchCarros = async () => {
    try {
      const response = await fetch(`${API_URL}/carros/json`);
      const data = await response.json();
      setCarros(data.cars);
    } catch (error) {
      console.error("Erro ao buscar carros:", error);
    }
  };

  useEffect(() => {
    fetchCarros();
    fetchModelos();
  }, []);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.modelo_id) {
      alert("Por favor, selecione um modelo.");
      return;
    }

    try {
      const payload = {
          ...form,
          modelo: { id: parseInt(form.modelo_id) } 
      };
      delete payload.modelo_id; 

      await fetch(`${API_URL}/carros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      alert('Carro cadastrado com sucesso!');
      setForm({ modelo_id: '', ano: '', combustivel: '', num_portas: '', cor: '' });
      fetchCarros();
    } catch (error) {
      console.error("Erro ao cadastrar carro:", error);
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  }

  return (
    // Container principal que centraliza tudo
    <div className="bg-gray-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      
      {/* Título da Aplicação */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">
        🚗 Controle de Veículos
      </h1>

      {/* Container que agrupa os dois blocos principais */}
      <div className="w-full max-w-6xl grid grid-cols-2">
        
        {/* Bloco da Esquerda: Lista de Carros */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mx-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">📋 Lista de Carros Cadastrados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 font-semibold text-sm text-gray-600 uppercase">Modelo</th>
                  <th className="p-4 font-semibold text-sm text-gray-600 uppercase">Ano</th>
                  <th className="p-4 font-semibold text-sm text-gray-600 uppercase text-right">Valor (FIPE)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {carros.length > 0 ? carros.map(carro => (
                  <tr key={carro.id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">{carro.nome_modelo}</td>
                    <td className="p-4 text-gray-500">{carro.ano}</td>
                    <td className="p-4 text-green-600 font-semibold text-right">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.valor)}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="3" className="text-center p-8 text-gray-500">
                      Nenhum carro cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bloco da Direita: Formulário de Cadastro */}
        <div className="bg-white p-6 rounded-xl shadow-lg mx-6">
          <h2 className="text-xl font-semibold mb-5 text-gray-800">➕ Adicionar Novo Veículo</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="modelo_id" className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
              <select 
                id="modelo_id"
                name="modelo_id" 
                value={form.modelo_id} 
                onChange={handleChange} 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Selecione um Modelo...</option>
                {modelos.map(modelo => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.nome} ({modelo.marca.nome_marca})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <input id="ano" name="ano" value={form.ano} placeholder="Ex: 2023" type="number" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label htmlFor="num_portas" className="block text-sm font-medium text-gray-700 mb-1">Portas</label>
                <input id="num_portas" name="num_portas" value={form.num_portas} placeholder="Ex: 4" type="number" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="combustivel" className="block text-sm font-medium text-gray-700 mb-1">Combustível</label>
                <input id="combustivel" name="combustivel" value={form.combustivel} placeholder="Ex: Flex" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
              <div>
                <label htmlFor="cor" className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
                <input id="cor" name="cor" value={form.cor} placeholder="Ex: Prata" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Cadastrar
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default App;