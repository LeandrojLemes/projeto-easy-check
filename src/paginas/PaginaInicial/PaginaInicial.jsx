// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
// import Principal from '../../comum/componentes/Principal/Principal';
// import { FaQrcode } from 'react-icons/fa';
// import instanciaApi from '../../comum/servicos/Api';
// import './PaginaInicial.css';

// ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

// const PaginaInicial = () => {
//   const navigate = useNavigate();
//   const [funcionariosAptos, setFuncionariosAptos] = useState(0);
//   const [funcionariosNaoAptos, setFuncionariosNaoAptos] = useState(0);

//   useEffect(() => {
//     const carregarDados = async () => {
//       try {
//         const response = await instanciaApi.get('/clientes', {
//           headers: {
//             'x-usuario-id': localStorage.getItem('usuarioId'),
//             'Content-Type': 'application/json',
//           },
//         });

//         const clientes = response.data;
//         let aptos = 0;
//         let naoAptos = 0;
        

//         clientes.forEach((cliente) => {
         
//           const {
//             nome,
//             email,
//             celular,
//             cpf,
//             cargo,
//             pis,
//             cep,
//             rua,
//             numero,
//             bairro,
//             cidade,
//           } = cliente;

//           const camposObrigatorios = [
//             nome,
//             email,
//             celular,
//             cpf,
//             cargo,
//             pis,
//             cep,
//             rua,
//             numero,
//             bairro,
//             cidade,
//           ];

//           const todosCamposPreenchidos = camposObrigatorios.every((campo) => campo !== null && campo !== undefined && campo.toString().trim() !== '');


//           if (todosCamposPreenchidos) {
//             aptos++;
//           } else {
//             naoAptos++;
//           }
//         });

//         setFuncionariosAptos(aptos);
//         setFuncionariosNaoAptos(naoAptos);
//       } catch (error) {
//         console.error('Erro ao carregar dados dos clientes:', error);
//       }
//     };

//     carregarDados();
//   }, []);

//   const data = {
//     labels: ['Aptos', 'Pendentes'],
//     datasets: [
//       {
//         label: 'Funcionários',
//         data: [funcionariosAptos, funcionariosNaoAptos],
//         backgroundColor: ['#4caf50', '#d32f2f'],
//         hoverBackgroundColor: ['#388e3c', '#b71c1c'],
//         borderColor: '#fff',
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       datalabels: {
//         color: '#fff',
//         font: {
//           weight: 'bold',
//           size: 16,
//         },
//         formatter: (value) => value,
//         anchor: 'center',
//         align: 'center',
//       },
//     },
//   };

//   return (
//     <Principal>
//       <div className="empresa-info">
//         <h1 style={{ display: 'flex', alignItems: 'center' }}>
//           Escanear QrCode
//           <FaQrcode
//             size={24}
//             style={{ marginLeft: '10px', cursor: 'default' }}
//           />
//         </h1>
//       </div>
//       <div className="botoes">
//         <div className="botao-colaborador">
//           <BotaoCustomizado cor="primaria" aoClicar={() => navigate('/lista-clientes')}>
//             Meus Colaboradores
//           </BotaoCustomizado>
//         </div>
//         <div className="botao-novo">  
//           <BotaoCustomizado cor="secundaria" aoClicar={() => navigate('/cadastro-cliente')}>
//             + Novo
//           </BotaoCustomizado>
//         </div>
//       </div>

//       <div className="dashboards">
//         <div className="dashboard aptos" onClick={() => navigate('/lista-clientes')}>
//           <h3>Funcionários Aptos</h3>
//           <p>{funcionariosAptos}</p>
//         </div>
//         <div className="dashboard nao-aptos" onClick={() => navigate('/lista-clientes')}>
//           <h3>Funcionários Pendentes</h3>
//           <p>{funcionariosNaoAptos}</p>
//         </div>
//       </div>

//       <div className="grafico">
//         <h3>Proporção de Funcionários</h3>
      
//         <Pie data={data} options={options} />
//       </div>
//     </Principal>
//   );
// };

// export default PaginaInicial;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import './PaginaInicial.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

export default function PaginaInicial() {
  const navigate = useNavigate();
  const [funcAptos, setFuncAptos] = useState(0);
  const [funcNaoAptos, setFuncNaoAptos] = useState(0);
  const [clientesByCity, setClientesByCity] = useState({ labels: [], data: [] });
  const [clientesByMonth, setClientesByMonth] = useState({ labels: [], data: [] });
  const [funcByDept, setFuncByDept] = useState({ labels: [], data: [] });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resFunc = await instanciaApi.get('/funcionarios/status');
        setFuncAptos(resFunc.data.aptos);
        setFuncNaoAptos(resFunc.data.naoAptos);

        const resClientes = await instanciaApi.get('/clientes');
        // Clientes por cidade
        const countsCity = {};
        // Clientes por mês (assume data_nascimento é data de cadastro aqui)
        const countsMonth = {};
        resClientes.data.forEach(c => {
          countsCity[c.cidade] = (countsCity[c.cidade] || 0) + 1;
          const m = new Date(c.data_cadastro).toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
          countsMonth[m] = (countsMonth[m] || 0) + 1;
        });
        setClientesByCity({ labels: Object.keys(countsCity), data: Object.values(countsCity) });
        setClientesByMonth({ labels: Object.keys(countsMonth), data: Object.values(countsMonth) });

        // Funcionários por departamento (exemplo)
        const resDept = await instanciaApi.get('/funcionarios');
        const countsDept = {};
        resDept.data.forEach(f => {
          countsDept[f.departamento] = (countsDept[f.departamento] || 0) + 1;
        });
        setFuncByDept({ labels: Object.keys(countsDept), data: Object.values(countsDept) });
      } catch (err) {
        console.error('Erro ao carregar dados', err);
      }
    };
    carregarDados();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-card">
        <header className="inicial-header">
          <h2>Dashboard</h2>
          <BotaoCustomizado
            onClick={() => navigate('/lista-clientes')}
            extraClass="btn-primary"
          >
            Ver Clientes
          </BotaoCustomizado>
        </header>

        <section className="inicial-content">
          <div className="chart-grid">
            {/* Pizza: Aptos x Não Aptos */}
            <div className="chart-card">
              <h3>Funcionários Aptos x Não Aptos</h3>
              <Pie
                data={{
                  labels: ['Aptos', 'Não Aptos'],
                  datasets: [
                    {
                      data: [funcAptos, funcNaoAptos],
                      backgroundColor: ['var(--primary-green)', 'var(--secondary-green)'],
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { position: 'bottom' } },
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* Barra: Clientes por Cidade */}
            <div className="chart-card">
              <h3>Clientes por Cidade</h3>
              <Bar
                data={{
                  labels: clientesByCity.labels,
                  datasets: [
                    {
                      label: 'Clientes',
                      data: clientesByCity.data,
                      backgroundColor: 'var(--primary-green)',
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* Linha: Cadastros Mensais */}
            <div className="chart-card">
              <h3>Cadastros Mensais</h3>
              <Line
                data={{
                  labels: clientesByMonth.labels,
                  datasets: [
                    {
                      label: 'Novos Clientes',
                      data: clientesByMonth.data,
                      fill: true,
                      tension: 0.3,
                      backgroundColor: 'rgba(46, 204, 113, 0.2)',
                      borderColor: 'var(--primary-green)',
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { position: 'top' } },
                  maintainAspectRatio: false,
                }}
              />
            </div>

            {/* Doughnut: Funcionários por Departamento */}
            <div className="chart-card">
              <h3>Funcionários por Departamento</h3>
              <Doughnut
                data={{
                  labels: funcByDept.labels,
                  datasets: [
                    {
                      data: funcByDept.data,
                      backgroundColor: funcByDept.labels.map((_, i) =>
                        `hsl(${(i * 60) % 360}, 70%, 50%)`
                      ),
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { position: 'right' } },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="info-cards">
            <div className="card-info">
              <h3>Total Aptos</h3>
              <p>{funcAptos}</p>
            </div>
            <div className="card-info">
              <h3>Total Não Aptos</h3>
              <p>{funcNaoAptos}</p>
            </div>
            <div className="card-info">
              <h3>Total Clientes</h3>
              <p>{clientesByCity.data.reduce((a, b) => a + b, 0)}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
