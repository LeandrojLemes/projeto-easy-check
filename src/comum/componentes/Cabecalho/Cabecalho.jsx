import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './Cabecalho.css';
import ServicoAutenticacao from '../../servicos/ServicoAutenticacao';
import { toast } from 'react-toastify';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

function Cabecalho() {
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

  const sair = () => {
    instanciaServicoAutenticacao.sair();
    toast.success('Você saiu com sucesso!');
    window.location.href = '/login'; // Redireciona para a página de login
  };

  return (
    <header className="cabecalho_root">
      <Link to="/">
        <img src="/assets/logo.jpeg" alt="Logo" height={40} />
      </Link>

      {usuarioLogado && (
        <div className="cabecalho_usuario">
          <Link to="/meu-perfil">
            <Avatar nome={usuarioLogado.nome} />
          </Link>
          <button className="cabecalho_sair" onClick={sair}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

export default Cabecalho;
