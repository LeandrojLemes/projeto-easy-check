// import { useState } from 'react';
import Principal from '../../comum/componentes/Principal/Principal';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import { toast } from 'react-toastify';
import ServicoUsuarios from '../../comum/servicos/ServicoUsuarios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const instanciaServicoUsuarios = new ServicoUsuarios();

const PaginaNovoUsuario = () => {
  const navigate = useNavigate();

  // NOVOS USESTATES ADICIONADOS 
  const [cnpj, setCnpj] = useState('');
  const [nome_empresa, setNomeEmpresa] = useState('');
  // FIM NOVOS USESTATES ADICIONADOS

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const cadastrar = async () => {
    try {
      if (!cnpj || !nome_empresa || !nome || !email || !senha) {
        toast.error('Preencha todos os campos.');
        return;
      }

      const usuario = {
        
        nome,
        email,
        senha,
        cnpj,
        nome_empresa

      };

      await instanciaServicoUsuarios.cadastrarUsuario(usuario);
      toast.success('Cadastro criado com sucesso.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data);
    }
  };


  return (
    <Box display="flex" minHeight="100vh">
      {/* LADO ESQUERDO */}
      <Box
        flex={1}
        sx={{
          bgcolor: "#4baf4f",
          color: "#fff",
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Typography variant="h2">Easy Check</Typography>

        {/* RODAPÉ */}
        <Box position="absolute" bottom={0} p={2}>
          <Typography variant="caption" color="#fff">
            Copyright ©{new Date().getFullYear()} - Todos os direitos reservados.
          </Typography>
        </Box>
      </Box>


      {/* LADO DIREITO */}
      <Box
        flex={1}
        sx={{
          bgcolor: "#fff",
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" color="#4baf4f">
          Crie sua conta
        </Typography>

        <TextField
          label="CNPJ"
          sx={{ minWidth: "20vw" }}
          color='success'
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />

        <TextField
          label="Nome da Empresa"
          sx={{ minWidth: "20vw" }}
          color='success'
          value={nome_empresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
        />

        <TextField
          label="Nome"
          sx={{ minWidth: "20vw" }}
          color='success'
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <TextField
          label="E-mail"
          type="email"
          sx={{ minWidth: "20vw" }}
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

        <Button
          variant="contained"
          sx={{ bgcolor: "#4baf4f", minWidth: "20vw" }}
          onClick={cadastrar}
        >
          Cadastrar
        </Button>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <Typography component="span">
            Já possui conta?{" "}
            <Typography component="span" sx={{ color: "green", fontWeight: "bold" }}>
              Clique aqui!
            </Typography>
          </Typography>
        </Link>
      </Box>
    </Box>
  );

};

export default PaginaNovoUsuario;
