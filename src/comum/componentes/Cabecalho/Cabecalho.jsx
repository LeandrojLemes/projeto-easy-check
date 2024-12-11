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
      <Link to="/">Início</Link>

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
