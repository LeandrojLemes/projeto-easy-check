import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoCliente from '../../comum/servicos/ServicoCliente';
import { formatarComMascara, MASCARA_CELULAR, MASCARA_CEP, MASCARA_CPF } from '../../comum/utils/mascaras';
import './PaginaCadastroCliente.css';

const instanciaServicoCliente = new ServicoCliente();

const PaginaCadastroCliente = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [pis, setPis] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (params?.id) {
      const carregarCliente = async () => {
        try {
          setCarregando(true);
          const cliente = await instanciaServicoCliente.buscarPorId(params.id);
          if (cliente) {
            setNome(cliente.nome || '');
            setEmail(cliente.email || '');
            setCelular(cliente.celular || '');
            setCpf(cliente.cpf || '');
            setCargo(cliente.cargo || '');
            setPis(cliente.pis || '');
            setCep(cliente.cep || '');
            setRua(cliente.rua || '');
            setNumero(cliente.numero || '');
            setBairro(cliente.bairro || '');
            setCidade(cliente.cidade || '');
          }
        } catch (erro) {
          toast.error('Erro ao carregar cliente. Verifique os detalhes e tente novamente.');
        } finally {
          setCarregando(false);
        }
      };
      carregarCliente();
    }
  }, [params?.id]);

  const salvar = async () => {
    if (!nome || !email) {
      toast.error('Preencha todos os campos obrigatórios!');
      return;
    }

    const cliente = {
      nome,
      email,
      celular: celular.replace(/\D/g, ''),
      cpf: cpf.replace(/\D/g, ''),
      cep: cep.replace(/\D/g, ''),
      cargo,
      pis,
      rua,
      numero: parseInt(numero, 10) || null, 
      bairro,
      cidade,
    };

    try {
      setCarregando(true);
      if (params?.id) {
        await instanciaServicoCliente.editarCliente({ ...cliente, id: params.id });
        toast.success('Colaborador atualizado!');
      } else {
        await instanciaServicoCliente.cadastrarCliente(cliente);
        toast.success('Colaborador cadastrado !');
      }
      navigate('/lista-clientes');
    } catch (erro) {
      toast.error(erro.response?.data?.mensagem || 'Erro ao salvar Colaborador !');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Principal titulo={params?.id ? 'Editar Colaborador' : 'Novo Colaborador '} voltarPara="/lista-clientes">
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="campo">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Email</label>
            <input
              type="email"
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Celular</label>
            <input
              type="tel"
              placeholder="Digite o celular"
              value={celular}
              onChange={(e) => setCelular(formatarComMascara(e.target.value, MASCARA_CELULAR))}
            />
          </div>
          <div className="campo">
            <label>CPF</label>
            <input
              type="text"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(formatarComMascara(e.target.value, MASCARA_CPF))}
            />
          </div>
          <div className="campo">
            <label>Cargo</label>
            <input
              type="text"
              placeholder="Digite o cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>PIS</label>
            <input
              type="text"
              placeholder="Digite o PIS"
              value={pis}
              onChange={(e) => setPis(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>CEP</label>
            <input
              type="text"
              placeholder="Digite o CEP"
              value={cep}
              onChange={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))}
            />
          </div>
          <div className="campo">
            <label>Rua</label>
            <input
              type="text"
              placeholder="Digite a rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Bairro</label>
            <input
              type="text"
              placeholder="Digite o bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Cidade</label>
            <input
              type="text"
              placeholder="Digite a cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
          <div className="campo">
            <label>Número</label>
            <input
              type="number"
              placeholder="Digite o número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <BotaoCustomizado cor="secundaria" aoClicar={salvar} disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar'}
          </BotaoCustomizado>
        </>
      )}
    </Principal>
  );
};

export default PaginaCadastroCliente;
