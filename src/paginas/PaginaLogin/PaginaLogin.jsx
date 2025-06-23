// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
// import Principal from '../../comum/componentes/Principal/Principal';
// import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
// import './PaginaLogin.css';

// const instanciaServicoAutenticacao = new ServicoAutenticacao();

// const PaginaLogin = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [senha, setSenha] = useState('');

//   const entrar = async () => {
//     try {
//       if (!email || !senha) {
//         toast.error('Preencha todos os campos.');
//         return;
//       }

//       const usuario = await instanciaServicoAutenticacao.login(email, senha);

//       // ✅ Linha que garante o funcionamento correto da API
//       localStorage.setItem('usuarioId', usuario.id);

//       navigate('/'); 
//     } catch (error) {
//       const mensagemErro = error.response?.data || 'Erro ao fazer login. Verifique suas credenciais.';
//       toast.error(mensagemErro);
//     }
//   };

//   return (
//     <Principal titulo="Faça seu Login!">
//       <div className="campo">
//         <label>Email</label>
//         <input
//           type="email"
//           placeholder="Digite seu email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div className="campo">
//         <label>Senha</label>
//         <input
//           type="password"
//           placeholder="Digite uma senha"
//           value={senha}
//           onChange={(e) => setSenha(e.target.value)}
//         />
//       </div>

//       <BotaoCustomizado cor="secundaria" aoClicar={entrar}>
//         Entrar
//       </BotaoCustomizado>
//       <Link to="/novo-usuario">Não tem conta? Clique aqui!</Link>
//     </Principal>
//   );
// };

// export default PaginaLogin;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
import './PaginaLogin.css';
import { Box, Button, TextField, Typography } from '@mui/material';

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
    <Box display="flex" minHeight="100vh">

      {/* LADO ESQUERDO */}
      <Box flex={1} sx={{ bgcolor: "#4baf4f", color: "#fff", p: 4, display: "flex", alignItems: "center", justifyContent: "center", position: 'relative' }}>
        <Typography variant='h2' >
          Easy Check
        </Typography>

        {/* RODAPÉ */}
        <Box position="absolute" bottom={0} p={2}>
          <Typography variant="caption" color="#fff">
            Copyright ©{new Date().getFullYear()} - Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>
      {/* FIM LADO ESQUERDO */}

      {/* LADO DIREITO */}
      <Box flex={1} sx={{ bgcolor: "#fff", p: 4, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>

        <Typography variant='h4' color='#4baf4f' >
          Login
        </Typography>

        <TextField
          label="E-mail"
          sx={{ minWidth: "20vw"}}
          color='success'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          sx={{ minWidth: "20vw" }}
          color='success'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Button variant="contained" sx={{ bgcolor: "#4baf4f", minWidth: "20vw" }} onClick={entrar}>
          Entrar
        </Button>

        <Link to="/novo-usuario" >
          <Typography component="span">
            Não tem conta?{" "}
            <Typography component="span" sx={{ color: "green", fontWeight: "bold" }}>
              Clique aqui!
            </Typography>
          </Typography>
        </Link>
      </Box>
      {/* FIM LADO DIREITO */}

    </Box>
  );

};

export default PaginaLogin;
