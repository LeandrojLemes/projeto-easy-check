import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
import './PaginaLogin.css';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

const PaginaLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const entrar = async () => {
    try {
      if (!email || !senha) {
        toast.error('Preencha todos os campos.');
        return;
      }

      const usuario = await instanciaServicoAutenticacao.login(email, senha);

      // ✅ Linha que garante o funcionamento correto da API
      localStorage.setItem('usuarioId', usuario.id);

      navigate('/'); 
    } catch (error) {
      const mensagemErro = error.response?.data || 'Erro ao fazer login. Verifique suas credenciais.';
      toast.error(mensagemErro);
    }
  };

  return (
    <Principal titulo="Faça seu Login!">
      <div className="campo">
        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
      </div>

      <BotaoCustomizado cor="secundaria" aoClicar={entrar}>
        Entrar
      </BotaoCustomizado>
      <Link to="/novo-usuario">Não tem conta? Clique aqui!</Link>
    </Principal>
  );
};

export default PaginaLogin;
