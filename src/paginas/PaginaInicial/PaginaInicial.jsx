// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Pie, Bar, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
// } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import { Box, Button } from '@mui/material';
// import Principal from '../../comum/componentes/Principal/Principal';
// import { FaQrcode, FaUserCheck, FaUserTimes, FaUsers, FaPercent } from 'react-icons/fa';
// import instanciaApi from '../../comum/servicos/Api';
// import './PaginaInicial.css';

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   ChartDataLabels
// );

// export default function PaginaInicial() {
//   const navigate = useNavigate();
//   const [aptos, setAptos] = useState(0);
//   const [pendentes, setPendentes] = useState(0);
//   const [cpfPesquisa, setCpfPesquisa] = useState('');

//   useEffect(() => {
//     async function carregar() {
//       try {
//         const { data: clientes } = await instanciaApi.get('/clientes', {
//           headers: {
//             'x-usuario-id': localStorage.getItem('usuarioId'),
//             'Content-Type': 'application/json',
//           },
//         });
//         let a = 0, p = 0;
//         clientes.forEach(c => {
//           const vals = [
//             c.nome, c.email, c.celular, c.cpf, c.cargo,
//             c.pis, c.cep, c.rua, c.numero, c.bairro, c.cidade
//           ];
//           vals.every(v => v != null && v.toString().trim() !== '')
//             ? a++
//             : p++;
//         });
//         setAptos(a);
//         setPendentes(p);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//     carregar();
//   }, []);

//   const total = aptos + pendentes;
//   const pctAptos = total ? Math.round((aptos / total) * 100) : 0;

//   const dataPie = {
//     labels: ['Aptos', 'Pendentes'],
//     datasets: [{
//       data: [aptos, pendentes],
//       backgroundColor: ['#4caf50', '#d32f2f'],
//       borderColor: '#fff',
//       borderWidth: 2,
//     }],
//   };
//   const optsPie = { responsive: true, plugins: { legend: { position: 'top' } } };

//   const dataBar = (label, value, color) => ({
//     labels: [label],
//     datasets: [{ data: [value], backgroundColor: color }]
//   });
//   const optsBar = { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } };

//   const dataDough = {
//     labels: ['%', ''],
//     datasets: [{
//       data: [pctAptos, 100 - pctAptos],
//       backgroundColor: ['#4caf50', '#f0f0f0'],
//       cutout: '80%',
//       borderWidth: 0,
//     }],
//   };
//   const optsDough = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       datalabels: {
//         color: '#4caf50',
//         font: { weight: 'bold', size: 20 },
//         formatter: () => `${pctAptos}%`,
//         anchor: 'center',
//         align: 'center'
//       }
//     }
//   };

//   return (
//     <Principal>
//       <header className="pi-header">
    

//         <Box display="flex" justifyContent="center" alignItems="center" gap={2} mt={2} flexWrap="wrap">
//           <input
//             type="text"
//             placeholder="Digite o CPF do colaborador"
//             value={cpfPesquisa}
//             onChange={(e) => setCpfPesquisa(e.target.value)}
//             style={{
//               padding: '15px',
//               borderRadius: '8px',
//               border: '1px solid #ccc',
//               width: '350px',
//             }}
//           />

//           <Button
//             variant="contained"
//             onClick={() => {
//               if (cpfPesquisa.trim()) {
//                 navigate(`/editar-cliente/${cpfPesquisa}`);
//               }
//             }}
//             sx={{
//               backgroundColor: '#2fa130',
//               '&:hover': { backgroundColor: '#1e7e24' },
//               borderRadius: 2,
//               py: 1.5,
//               px: 3,
//               fontWeight: 'bold',
//               boxShadow: 1,
//             }}
//           >
//             Buscar CPF
//           </Button>

//           <Button
//             variant="contained"
//             onClick={() => navigate('/lista-clientes')}
//             sx={{
//               backgroundColor: '#607d8b',
//               '&:hover': { backgroundColor: '#2fa130' },
//               borderRadius: 2,
//               py: 1.5,
//               px: 3,
//               fontWeight: 'bold',
//               boxShadow: 1,
//             }}
//           >
//             Meus Colaboradores
//           </Button>
//           <Button
//             variant="contained"
//             onClick={() => navigate('/cadastro-cliente')}
//             sx={{
//               backgroundColor: '#607d8b',
//               '&:hover': { backgroundColor: '#2fa130' },
//               borderRadius: 2,
//               py: 1.5,
//               px: 3,
//               fontWeight: 'bold',
//               boxShadow: 1,
//             }}
//           >
//             + Novo
//           </Button>
//         </Box>
//       </header>

//       <section className="stats-grid">
//         <div
//           className="stat-card verde"
//           onClick={() => navigate('/lista-clientes?status=apto')}
//           style={{ cursor: 'pointer' }}
//         >
//           <FaUserCheck className="icon" />
//           <div>
//             <span className="stat-label">Aptos</span>
//             <span className="stat-value">{aptos}</span>
//           </div>
//         </div>

//         <div
//           className="stat-card vermelho"
//           onClick={() => navigate('/lista-clientes?status=pendente')}
//           style={{ cursor: 'pointer' }}
//         >
//           <FaUserTimes className="icon" />
//           <div>
//             <span className="stat-label">Pendentes</span>
//             <span className="stat-value">{pendentes}</span>
//           </div>
//         </div>

//         <div
//           className="stat-card azul"
//           onClick={() => navigate('/lista-clientes')}
//           style={{ cursor: 'pointer' }}
//         >
//           <FaUsers className="icon" />
//           <div>
//             <span className="stat-label">Total</span>
//             <span className="stat-value">{total}</span>
//           </div>
//         </div>

//         <div className="stat-card laranja">
//           <FaPercent className="icon" />
//           <div>
//             <span className="stat-label">% Aptos</span>
//             <span className="stat-value">{pctAptos}%</span>
//           </div>
//         </div>
//       </section>

//       <section className="charts-grid">
//         <div className="chart-card">
//           <h3>Proporção</h3>
//           <Pie data={dataPie} options={optsPie} />
//         </div>
//         <div className="chart-card">
//           <h3>Aptos</h3>
//           <Bar data={dataBar('Aptos', aptos, '#2fa130')} options={optsBar} />
//         </div>
//         <div className="chart-card">
//           <h3>Pendentes</h3>
//           <Bar data={dataBar('Pendentes', pendentes, '#d32f2f')} options={optsBar} />
//         </div>
//         <div className="chart-card">
//           <h3>% Aptos</h3>
//           <Doughnut data={dataDough} options={optsDough} />
//         </div>
//       </section>
//     </Principal>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box, Button } from '@mui/material';
import Principal from '../../comum/componentes/Principal/Principal';
import { FaUserCheck, FaUserTimes, FaUsers, FaPercent } from 'react-icons/fa';
import instanciaApi from '../../comum/servicos/Api';
import './PaginaInicial.css';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function PaginaInicial() {
  const navigate = useNavigate();
  const [aptos, setAptos] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [cpfPesquisa, setCpfPesquisa] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const { data: clientes } = await instanciaApi.get('/clientes', {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
          },
        });

        let a = 0, p = 0;
        clientes.forEach(c => {
          const campos = [
            c.nome, c.email, c.celular, c.cpf, c.cargo,
            c.pis, c.cep, c.rua, c.numero, c.bairro, c.cidade
          ];
          campos.every(v => v != null && v.toString().trim() !== '') ? a++ : p++;
        });

        setAptos(a);
        setPendentes(p);
      } catch (e) {
        console.error(e);
      }
    }

    carregar();
  }, []);

  const total = aptos + pendentes;
  const pctAptos = total ? Math.round((aptos / total) * 100) : 0;

  const buscarClientePorCpf = async () => {
    if (!cpfPesquisa.trim()) {
      alert('Digite um CPF válido');
      return;
    }

    try {
      const response = await instanciaApi.get(`/clientes/cpf/${cpfPesquisa}`, {
        headers: {
          'x-usuario-id': localStorage.getItem('usuarioId'),
        },
      });

      const cliente = response.data;
      const idCliente = cliente.id || cliente.id_cliente;

      if (idCliente) {
        navigate(`/cadastro-cliente/${idCliente}`);
      } else {
        alert('Cliente não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente por CPF:', error);
      alert('Erro ao buscar cliente. Verifique o CPF digitado.');
    }
  };

  const dataPie = {
    labels: ['Aptos', 'Pendentes'],
    datasets: [{
      data: [aptos, pendentes],
      backgroundColor: ['#4caf50', '#d32f2f'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const optsPie = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
  };

  const dataBar = (label, value, color) => ({
    labels: [label],
    datasets: [{ data: [value], backgroundColor: color }],
  });

  const optsBar = {
    indexAxis: 'y',
    responsive: true,
    plugins: { legend: { display: false } },
  };

  const dataDough = {
    labels: ['%', ''],
    datasets: [{
      data: [pctAptos, 100 - pctAptos],
      backgroundColor: ['#4caf50', '#f0f0f0'],
      cutout: '80%',
      borderWidth: 0,
    }],
  };

  const optsDough = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#4caf50',
        font: { weight: 'bold', size: 20 },
        formatter: () => `${pctAptos}%`,
        anchor: 'center',
        align: 'center',
      },
    },
  };

  return (
    <Principal>
      <header className="pi-header">
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} flexWrap="wrap" width="100%">

          <Box sx={{ display: "flex", width: "40%", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Digite o CPF do colaborador"
              value={cpfPesquisa}
              onChange={(e) => setCpfPesquisa(e.target.value)}
              style={{
                padding: '18px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                width: '400px'
              }}
            />

            <Button
              variant="contained"
              onClick={buscarClientePorCpf}
              sx={{
                backgroundColor: '#2fa130',
                '&:hover': { backgroundColor: '#1e7e24' },
                borderRadius: 2,
                py: 1.5,
                px: 3,
                fontWeight: 'bold',
                boxShadow: 1,
              }}
            >
              Buscar CPF
            </Button>

          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "60%", gap: "1rem" }}>

            <Button
              variant="contained"
              onClick={() => navigate('/lista-clientes')}
              sx={{
                backgroundColor: '#607d8b',
                '&:hover': { backgroundColor: '#2fa130' },
                borderRadius: 2,
                py: 1.5,
                px: 3,
                fontWeight: 'bold',
                boxShadow: 1,
              }}
            >
              Meus Colaboradores
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate('/cadastro-cliente')}
              sx={{
                backgroundColor: '#607d8b',
                '&:hover': { backgroundColor: '#2fa130' },
                borderRadius: 2,
                py: 1.5,
                px: 3,
                fontWeight: 'bold',
                boxShadow: 1,
              }}
            >
              + Novo
            </Button>
          </Box>

        </Box>
      </header>

      <section className="stats-grid">
        <div className="stat-card verde" onClick={() => navigate('/lista-clientes?status=apto')} style={{ cursor: 'pointer' }}>
          <FaUserCheck className="icon" />
          <div>
            <span className="stat-label">Aptos</span>
            <span className="stat-value">{aptos}</span>
          </div>
        </div>

        <div className="stat-card vermelho" onClick={() => navigate('/lista-clientes?status=pendente')} style={{ cursor: 'pointer' }}>
          <FaUserTimes className="icon" />
          <div>
            <span className="stat-label">Pendentes</span>
            <span className="stat-value">{pendentes}</span>
          </div>
        </div>

        <div className="stat-card azul" onClick={() => navigate('/lista-clientes')} style={{ cursor: 'pointer' }}>
          <FaUsers className="icon" />
          <div>
            <span className="stat-label">Total</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>

        <div className="stat-card laranja">
          <FaPercent className="icon" />
          <div>
            <span className="stat-label">% Aptos</span>
            <span className="stat-value">{pctAptos}%</span>
          </div>
        </div>
      </section>

      <section className="charts-grid">
        <div className="chart-card">
          <h3>Proporção</h3>
          <Pie data={dataPie} options={optsPie} />
        </div>
        <div className="chart-card">
          <h3>Aptos</h3>
          <Bar data={dataBar('Aptos', aptos, '#2fa130')} options={optsBar} />
        </div>
        <div className="chart-card">
          <h3>Pendentes</h3>
          <Bar data={dataBar('Pendentes', pendentes, '#d32f2f')} options={optsBar} />
        </div>
        <div className="chart-card">
          <h3>% Aptos</h3>
          <Doughnut data={dataDough} options={optsDough} />
        </div>
      </section>
    </Principal>
  );
}
