import { useEffect, useState } from 'react';

const API_URL = "http://localhost:8080";

function App() {
  const [carros, setCarros] = useState([]);
  const [modelos, setModelos] = useState([]); // ESTADO para guardar a lista de modelos
  const [form, setForm] = useState({ modelo_id: '', ano: '', combustivel: '', num_portas: '', cor: '' });

  // FUNÇÃO para buscar os modelos do backend
  const fetchModelos = async () => {
    try {
      const response = await fetch(`${API_URL}/modelos`);
      const data = await response.json();
      setModelos(data); // Guarda a lista de modelos no nosso estado
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
    fetchModelos(); // <<-- CHAMADA DA  FUNÇÃO
  }, []);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.modelo_id) { // Validação para garantir que um modelo foi selecionado
      alert("Por favor, selecione um modelo.");
      return;
    }

    try {
      const payload = {
          ...form,
          // O backend espera um objeto 'modelo' com a propriedade 'id'
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">🚗 Controle de Veículos - WS Work</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">➕ Cadastrar Novo Carro</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <select 
                name="modelo_id" 
                value={form.modelo_id} 
                onChange={handleChange} 
                required 
                className="w-full border p-2 rounded bg-white"
              >
                <option value="" disabled>Selecione um Modelo</option>
                {/* Aqui nós mapeamos a lista de modelos para criar as opções do dropdown */}
                {modelos.map(modelo => (
                  <option key={modelo.id} value={modelo.id}>
                    {modelo.nome} ({modelo.marca.nome_marca})
                  </option>
                ))}
              </select>

              <input name="ano" value={form.ano} placeholder="Ano" type="number" onChange={handleChange} required className="w-full border p-2 rounded"/>
              <input name="combustivel" value={form.combustivel} placeholder="Combustível" onChange={handleChange} required className="w-full border p-2 rounded"/>
              <input name="num_portas" value={form.num_portas} placeholder="Nº de Portas" type="number" onChange={handleChange} required className="w-full border p-2 rounded"/>
              <input name="cor" value={form.cor} placeholder="Cor" onChange={handleChange} required className="w-full border p-2 rounded"/>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">Cadastrar</button>
            </form>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">📋 Lista de Carros Cadastrados</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-3">Modelo</th>
                    <th className="p-3">Ano</th>
                    <th className="p-3">Cor</th>
                    <th className="p-3">Valor (FIPE)</th>
                  </tr>
                </thead>
                <tbody>
                  {carros.length > 0 ? carros.map(carro => (
                    <tr key={carro.id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{carro.nome_modelo}</td>
                      <td className="p-3">{carro.ano}</td>
                      <td className="p-3">{carro.cor}</td>
                      <td className="p-3 text-green-600 font-semibold">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.valor)}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4">Nenhum carro cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;