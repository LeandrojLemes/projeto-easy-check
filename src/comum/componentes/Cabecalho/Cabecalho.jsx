
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

