import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import { FaQrcode } from 'react-icons/fa'; 
import './PaginaInicial.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const PaginaInicial = () => {
  const navigate = useNavigate();

  const funcionariosAptos = 42;
  const funcionariosNaoAptos = 10;

  const data = {
    labels: ['Aptos', 'Não Aptos'],
    datasets: [
      {
        label: 'Funcionários',
        data: [funcionariosAptos, funcionariosNaoAptos],
        backgroundColor: ['#4caf50', '#d32f2f'],
        hoverBackgroundColor: ['#388e3c', '#b71c1c'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16,
        },
        formatter: (value) => value,
        anchor: 'center',
        align: 'center',
      },
    },
  };

  return (
    <Principal>
      <div className="empresa-info">
        <h1 style={{ display: 'flex', alignItems: 'center' }}>
          Nome da empresa
          <FaQrcode
            size={24}
            style={{ marginLeft: '10px', cursor: 'default' }} 
          />
        </h1>
      </div>

      <div className="botoes">
        <BotaoCustomizado cor="secundaria" aoClicar={() => navigate('/lista-tarefas')}>
          Lista de Tarefas
        </BotaoCustomizado>
        <BotaoCustomizado cor="primaria" aoClicar={() => navigate('/lista-clientes')}>
          Meus Colaboradores
        </BotaoCustomizado>
      </div>

      <div className="dashboards">
        <div className="dashboard aptos">
          <h3>Funcionários Aptos</h3>
          <p>{funcionariosAptos}</p>
        </div>
        <div className="dashboard nao-aptos">
          <h3>Funcionários Não Aptos</h3>
          <p>{funcionariosNaoAptos}</p>
        </div>
      </div>

     
      <div className="grafico">
        <h3>Proporção de Funcionários</h3>
        <Pie data={data} options={options} />
      </div>
    </Principal>
  );
};

export default PaginaInicial;
