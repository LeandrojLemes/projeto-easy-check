// import { Link } from 'react-router-dom';
// import Avatar from '../Avatar/Avatar';
// import './Cabecalho.css';
// import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
// import { toast } from 'react-toastify';

// const instanciaServicoAutenticacao = new ServicoAutenticacao();

// function Cabecalho() {
//   const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

//   const sair = () => {
//     instanciaServicoAutenticacao.sair();
//     toast.success('Você saiu com sucesso!');
//     window.location.href = '/login'; 
//   };

//   return (
//     <header className="cabecalho_root">
//       <Link to="/">
//         <img src="/src/assets/logo.svg" alt="Logo" height={20} />
//       </Link>

//       {usuarioLogado && (
//         <div className="cabecalho_usuario">
//           <Link to="/meu-perfil">
//             <Avatar nome={usuarioLogado.nome} />
//           </Link>
//           <button className="cabecalho_sair" onClick={sair}>
//             Sair
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Cabecalho;


// import { Link, useNavigate } from 'react-router-dom';
// import Avatar from '../Avatar/Avatar';
// import './Cabecalho.css';
// import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
// import { toast } from 'react-toastify';
// import logo from "../assets/logo.svg";
// import { useState } from 'react';

// const instanciaServicoAutenticacao = new ServicoAutenticacao();

// function Cabecalho() {
//   const navigate = useNavigate();
//   const [carregando, setCarregando] = useState(false);

//   const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

//   const sair = async () => {
//     setCarregando(true);
//     await instanciaServicoAutenticacao.sair();
//     toast.success('Você saiu com sucesso!');
//     setCarregando(false);
//     navigate('/login');
//   };

//   return (
//     <header className="cabecalho_root">
//       <Link to="/">
//         <img src={logo} alt="Logo" height={20} />
//       </Link>

//       {usuarioLogado && (
//         <div className="cabecalho_usuario">
//           <Link to="/meu-perfil">
//             <Avatar nome={usuarioLogado.nome} />
//           </Link>
//           <button className="cabecalho_sair" onClick={sair} disabled={carregando}>
//             {carregando ? 'Saindo...' : 'Sair'}
//           </button>
//         </div>
//       )}
//     </header>
//   );
// }

// export default Cabecalho;

import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Cabecalho.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { color } from 'chart.js/helpers';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

function Cabecalho() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);

  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  const sair = async () => {
    setCarregando(true);
    await instanciaServicoAutenticacao.sair();
    toast.success('Você saiu com sucesso!');
    setCarregando(false);
    navigate('/login');
  };

  return (
    <header className="cabecalho_root">
      <Link to="/"><img height={48} width={48} src="/logoEasyCheck.svg" alt="" /></Link>

      {usuarioLogado && (
        <div className="cabecalho_usuario">
          <Link to="/meu-perfil">
            <Avatar nome={usuarioLogado.nome} />
          </Link>
          <button className="cabecalho_sair" onClick={sair} disabled={carregando}>
            {carregando ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      )}
    </header>
  );
}

export default Cabecalho;



// /* 
// body {
//   font-family: 'Roboto', sans-serif; /* Use a fonte Roboto */
//   line-height: 1.5;
//   color: #333;
//   background-color: #f9f9f9;
//   margin: 0;
//   padding: 0;
// }


// .botoes {
//   display: flex;
//   justify-content: center; /* Centraliza os botões */
//   gap: 1rem;
//   margin-bottom: 2rem;
// }

// .botao-colaborador, .botao-novo {
//   background-color: #4CAF50; /* Verde padrão */
//   color: #fff;
//   border: none;
//   border-radius: 5px;
//   padding: 12px 20px; /* Aumenta o espaçamento interno */
//   font-size: 1rem; /* Tamanho da fonte uniforme */
//   font-weight: bold; /* Texto mais forte */
//   cursor: pointer;
//   transition: all 0.3s ease;
//   text-align: center; /* Centraliza o texto */
// }

// .botao-colaborador:hover, .botao-novo:hover {
//   background-color: #388E3C; /* Verde mais escuro no hover */
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra ao passar o mouse */
// }

// .botao-colaborador, .botao-novo {
//   flex-grow: 1; /* Os botões ocupam a mesma largura */
// }

// /* Dashboards */.dashboards {
//   display: flex;
//   justify-content: center;
//   gap: 1.5rem;
//   flex-wrap: wrap;
//   margin-top: 1rem;
// }

// .dashboard {
//   background-color: var(--cor-fundo-padrao, #f4f9f4);
//   border: 1px solid var(--cor-cinza, #cfd8dc);
//   border-radius: 8px;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   width: 150px;
//   height: 150px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-weight: bold;
//   padding: 15px;
//   cursor: pointer;
//   transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
//   animation: fadeIn 0.5s ease-out;
// }

// .dashboard:hover {
//   transform: scale(1.05);
//   box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
// }

// /* Dashboards Específicos */
// .dashboard.aptos {
//   background-color: rgba(76, 175, 80, 0.2);
//   border: 2px solid #4CAF50;
//   color: #388E3C;
// }

// .dashboard.aptos:hover {
//   background-color: rgba(76, 175, 80, 0.4);
//   color: #ffffff;
// }

// .dashboard.nao-aptos {
//   background-color: rgba(211, 47, 47, 0.2);
//   border: 2px solid #D32F2F;
//   color: #B71C1C;
// }

// .dashboard.nao-aptos:hover {
//   background-color: rgba(211, 47, 47, 0.4);
//   color: #ffffff;
// }

// .dashboard h3 {
//   font-size: 0.9rem;
//   font-weight: 600;
//   margin-bottom: 5px;
//   color: inherit;
// }

// .dashboard p {
//   font-size: 1.8rem;
//   font-weight: bold;
//   margin: 0;
//   color: inherit;
// }

// /* Gráfico */
// .grafico {
//   margin-top: 2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 1rem;
// }

// .grafico h3 {
//   color: var(--cor-primaria, #388E3C);
//   font-size: 1.2rem;
//   font-weight: bold;
//   margin-bottom: 1rem;
// }

// /* Animações */
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// /* Responsividade */
// @media (max-width: 768px) {
//   .dashboard {
//     width: 120px;
//     height: 120px;
//   }
// }

// @media (max-width: 480px) {
//   .dashboard {
//     width: 100px;
//     height: 100px;
//   }

//   .grafico h3 {
//     font-size: 1rem;
//   }

//   .dashboard h3 {
//     font-size: 0.8rem;
//   }

//   .dashboard p {
//     font-size: 1.6rem;
//   }
// }

// @media (max-width: 360px) {
//   .dashboard {
//     width: 80px;
//     height: 80px;
//   }

//   .dashboard h3 {
//     font-size: 0.7rem;
//   }

//   .dashboard p {
//     font-size: 1.4rem;
//   }
// } */