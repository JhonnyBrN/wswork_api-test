import { useEffect, useState } from 'react';

// URL da API
const API_URL = "http://wswork-api-env.eba-dazphmah.us-east-2.elasticbeanstalk.com";

// Função para formatar o timestamp Unix para uma data legível
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '-';
  // O timestamp do exemplo é muito longo, então vamos tratá-lo como milissegundos
  const date = new Date(timestamp);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

function App() {
  const [carros, setCarros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect busca tanto carros quanto modelos para cruzar as informações
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Faz as duas requisições em paralelo para mais eficiência
        const [carrosResponse, modelosResponse] = await Promise.all([
          fetch(`${API_URL}/carros/json`),
          fetch(`${API_URL}/modelos`) // Endpoint que retorna a lista de modelos com suas marcas
        ]);

        if (!carrosResponse.ok) {
          throw new Error(`Erro ao buscar carros: ${carrosResponse.status}`);
        }
        if (!modelosResponse.ok) {
          throw new Error(`Erro ao buscar modelos: ${modelosResponse.status}`);
        }

        const carrosData = await carrosResponse.json();
        const modelosData = await modelosResponse.json();
        
        const rawCarros = carrosData.cars || [];

        // 2. Cria um "dicionário" (Map) para traduzir modelo_id para nome_marca
        const modeloMap = new Map();
        modelosData.forEach(modelo => {
          // A API de modelos deve retornar o objeto da marca aninhado
          if (modelo.marca && modelo.marca.nome_marca) {
            modeloMap.set(modelo.id, modelo.marca.nome_marca);
          }
        });

        // 3. Enriquece os dados dos carros com o nome da marca encontrado
        const carrosEnriquecidos = rawCarros.map(carro => ({
          ...carro,
          nome_marca: modeloMap.get(carro.modelo_id) || 'N/A' // Usa o mapa para encontrar a marca
        }));

        setCarros(carrosEnriquecidos);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError("Não foi possível carregar os dados dos veículos. Verifique se a API está no ar.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Cabeçalho */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-blue-600">
            🚗 Catálogo de Veículos WS Work
          </h1>
          <p className="text-slate-500 mt-2">Visualização dos dados consumidos da API Spring Boot.</p>
        </header>

        {/* Container principal focado na lista */}
        <main className="bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">📋 Veículos Cadastrados</h2>
          </div>
          
          {loading && (
            <p className="text-center p-8 text-slate-500">Carregando veículos...</p>
          )}

          {error && (
            <p className="text-center p-8 text-red-500 font-medium">{error}</p>
          )}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Modelo</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Marca</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Ano</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Portas</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Cor</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Combustível</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider">Cadastro</th>
                    <th className="px-6 py-3 font-semibold text-sm text-slate-600 uppercase tracking-wider text-right">Valor (FIPE)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {carros.length > 0 ? carros.map(carro => (
                    <tr key={carro.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{carro.nome_modelo}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{carro.nome_marca || 'N/A'}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{carro.ano}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{carro.num_portas}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{carro.cor}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{carro.combustivel}</td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">{formatTimestamp(carro.timestamp_cadastro)}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold text-right whitespace-nowrap">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.valor || 0)}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="text-center p-8 text-slate-500">
                        Nenhum carro encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default App;

