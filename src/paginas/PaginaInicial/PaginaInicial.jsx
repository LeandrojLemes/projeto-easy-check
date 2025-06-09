import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import { FaQrcode } from 'react-icons/fa';
import instanciaApi from '../../comum/servicos/Api';
import './PaginaInicial.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const PaginaInicial = () => {
  const navigate = useNavigate();
  const [funcionariosAptos, setFuncionariosAptos] = useState(0);
  const [funcionariosNaoAptos, setFuncionariosNaoAptos] = useState(0);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await instanciaApi.get('/clientes', {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
            'Content-Type': 'application/json',
          },
        });

        const clientes = response.data;
        let aptos = 0;
        let naoAptos = 0;
        

        clientes.forEach((cliente) => {
         
          const {
            nome,
            email,
            celular,
            cpf,
            cargo,
            pis,
            cep,
            rua,
            numero,
            bairro,
            cidade,
          } = cliente;

          const camposObrigatorios = [
            nome,
            email,
            celular,
            cpf,
            cargo,
            pis,
            cep,
            rua,
            numero,
            bairro,
            cidade,
          ];

          const todosCamposPreenchidos = camposObrigatorios.every((campo) => campo !== null && campo !== undefined && campo.toString().trim() !== '');


          if (todosCamposPreenchidos) {
            aptos++;
          } else {
            naoAptos++;
          }
        });

        setFuncionariosAptos(aptos);
        setFuncionariosNaoAptos(naoAptos);
      } catch (error) {
        console.error('Erro ao carregar dados dos clientes:', error);
      }
    };

    carregarDados();
  }, []);

  const data = {
    labels: ['Aptos', 'Pendentes'],
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
          Escanear QrCode
          <FaQrcode
            size={24}
            style={{ marginLeft: '10px', cursor: 'default' }}
          />
        </h1>
      </div>
      <div className="botoes">
        <div className="botao-colaborador">
          <BotaoCustomizado cor="primaria" aoClicar={() => navigate('/lista-clientes')}>
            Meus Colaboradores
          </BotaoCustomizado>
        </div>
        <div className="botao-novo">  
          <BotaoCustomizado cor="secundaria" aoClicar={() => navigate('/cadastro-cliente')}>
            + Novo
          </BotaoCustomizado>
        </div>
      </div>

      <div className="dashboards">
        <div className="dashboard aptos" onClick={() => navigate('/lista-clientes')}>
          <h3>Funcionários Aptos</h3>
          <p>{funcionariosAptos}</p>
        </div>
        <div className="dashboard nao-aptos" onClick={() => navigate('/lista-clientes')}>
          <h3>Funcionários Pendentes</h3>
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
