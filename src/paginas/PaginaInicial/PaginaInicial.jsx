
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
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import { FaQrcode, FaUserCheck, FaUserTimes, FaUsers, FaPercent } from 'react-icons/fa';
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

  useEffect(() => {
    async function carregar() {
      try {
        const { data: clientes } = await instanciaApi.get('/clientes', {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
            'Content-Type': 'application/json',
          },
        });
        let a = 0, p = 0;
        clientes.forEach(c => {
          const vals = [
            c.nome, c.email, c.celular, c.cpf, c.cargo,
            c.pis, c.cep, c.rua, c.numero, c.bairro, c.cidade
          ];
          vals.every(v => v != null && v.toString().trim() !== '')
            ? a++
            : p++;
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


  const dataPie = {
    labels: ['Aptos', 'Pendentes'],
    datasets: [{
      data: [aptos, pendentes],
      backgroundColor: ['#4caf50', '#d32f2f'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };
  const optsPie = { responsive: true, plugins: { legend: { position: 'top' } } };

  const dataBar = (label, value, color) => ({
    labels: [label],
    datasets: [{ data: [value], backgroundColor: color }]
  });
  const optsBar = { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } } };

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
        align: 'center'
      }
    }
  };

  return (
    <Principal>
      <header className="pi-header">
        <h1>
          <FaQrcode /> Escanear QrCode
        </h1>
        <div className="pi-actions">
          <BotaoCustomizado
            cor="primaria"
            aoClicar={() => navigate('/lista-clientes')}
          >Meus Colaboradores</BotaoCustomizado>
          <BotaoCustomizado
            cor="secundaria"
            aoClicar={() => navigate('/cadastro-cliente')}
          >+ Novo</BotaoCustomizado>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card verde">
          <FaUserCheck className="icon" />
          <div>
            <span className="stat-label">Aptos</span>
            <span className="stat-value">{aptos}</span>
          </div>
        </div>
        <div className="stat-card vermelho">
          <FaUserTimes className="icon" />
          <div>
            <span className="stat-label">Pendentes</span>
            <span className="stat-value">{pendentes}</span>
          </div>
        </div>
        <div className="stat-card azul">
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
          <Bar data={dataBar('Aptos', aptos, '#4caf50')} options={optsBar} />
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
