import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoCliente from '../../comum/servicos/ServicoCliente';
import { formatarComMascara, MASCARA_CELULAR, MASCARA_CEP, MASCARA_CPF } from '../../comum/utils/mascaras';
import './PaginaCadastroCliente.css';
import axios from 'axios';

const instanciaServicoCliente = new ServicoCliente();

const PaginaCadastroCliente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  
  const [cargo, setCargo] = useState(''); 
  const [pis, setPis] = useState(''); 

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');

  // Carregar dados do cliente ao editar
  useEffect(() => {
    if (params.id) {
      const carregarCliente = async () => {
        const cliente = await instanciaServicoCliente.buscarPorId(params.id);
        if (cliente) {
          setNome(cliente.nome);
          setEmail(cliente.email);
          setCelular(cliente.celular);
          setDataNascimento(cliente.dataNascimento);
          setCpf(cliente.cpf);
          setCargo(cliente.cargo); 
          setPis(cliente.pis); 
          setCep(cliente.cep);
          setRua(cliente.rua);
          setNumero(cliente.numero);
          setBairro(cliente.bairro);
          setCidade(cliente.cidade);
        }
      };
      carregarCliente();
    }
  }, [params.id]);

  // Salvar novo cliente ou editar cliente existente
  const salvar = async () => {
    if (!nome || !email) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const cliente = {
      id: params.id ? +params.id : Date.now(),  // Garante que o ID seja gerado corretamente
      nome,
      email,
      celular,
      dataNascimento,
      cpf,
      cargo, 
      pis, 
      cep,
      rua,
      numero,
      bairro,
      cidade
    };

    try {
      if (params.id) {
        await instanciaServicoCliente.editarCliente(cliente); // Atualizar cliente existente
      } else {
        await instanciaServicoCliente.cadastrarCliente(cliente); // Criar novo cliente
      }
      navigate('/lista-clientes');
    } catch (erro) {
      toast.error('Erro ao salvar cliente!');
    }
  };

  const buscarCEP = async (event) => {
    try {
      const resp = await axios.get(`https://brasilapi.com.br/api/cep/v2/${event.target.value}`);
      setRua(resp.data.street || '');
      setBairro(resp.data.neighborhood || '');
      setCidade(resp.data.city || '');
      if (resp.data.street) document.getElementById('campoNumero').focus();
    } catch {
      toast.error('CEP não encontrado.');
    }
  };

  return (
    <Principal titulo={params.id ? 'Editar Colaborador' : 'Novo Colaborador'} voltarPara="/lista-clientes">
      {params.id && (
        <div className="campo">
          <label>Id</label>
          <input type="text" value={params.id} disabled />
        </div>
      )}
      <div className="campo">
        <label>Nome</label>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Email</label>
        <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="campo">
        <label>Celular</label>
        <input
          type="tel"
          placeholder="Digite o número do seu Whatsapp"
          value={celular}
          onChange={(e) => setCelular(formatarComMascara(e.target.value, MASCARA_CELULAR))}
        />
      </div>

      <div className="campo">
        <label>Data Nascimento</label>
        <input
          type="date"
          placeholder="Digite sua data de nascimento"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>CPF</label>
        <input
          type="tel"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(formatarComMascara(e.target.value, MASCARA_CPF))}
        />
      </div>

      <div className="campo">
        <label>Cargo</label>
        <input
          type="text"
          placeholder="Digite seu cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>PIS</label>
        <input
          type="text"
          placeholder="Digite seu PIS"
          value={pis}
          onChange={(e) => setPis(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>CEP</label>
        <input
          type="tel"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))}
          onBlur={buscarCEP}
        />
      </div>

      <div className="campo">
        <label>Rua</label>
        <input
          type="text"
          placeholder="Digite sua rua"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Número</label>
        <input
          id="campoNumero"
          type="text"
          placeholder="Digite o número"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Bairro</label>
        <input
          type="text"
          placeholder="Digite seu Bairro"
          value={bairro}
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>

      <div className="campo">
        <label>Cidade</label>
        <input
          type="text"
          placeholder="Digite sua Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>

      <BotaoCustomizado cor="secundaria" aoClicar={salvar}>
        Salvar
      </BotaoCustomizado>
    </Principal>
  );
};

export default PaginaCadastroCliente;
