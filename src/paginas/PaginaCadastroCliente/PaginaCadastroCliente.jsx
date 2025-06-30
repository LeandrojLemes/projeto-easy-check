// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
// import Principal from '../../comum/componentes/Principal/Principal';
// import ServicoCliente from '../../comum/servicos/ServicoCliente';
// import { formatarComMascara, MASCARA_CELULAR, MASCARA_CEP, MASCARA_CPF } from '../../comum/utils/mascaras';
// import './PaginaCadastroCliente.css';

// const instanciaServicoCliente = new ServicoCliente();

// const PaginaCadastroCliente = () => {
//   const navigate = useNavigate();
//   const params = useParams();

//   const [nome, setNome] = useState('');
//   const [email, setEmail] = useState('');
//   const [celular, setCelular] = useState('');
//   const [cpf, setCpf] = useState('');
//   const [cargo, setCargo] = useState('');
//   const [pis, setPis] = useState('');
//   const [cep, setCep] = useState('');
//   const [rua, setRua] = useState('');
//   const [numero, setNumero] = useState('');
//   const [bairro, setBairro] = useState('');
//   const [cidade, setCidade] = useState('');
//   const [carregando, setCarregando] = useState(false);

//   useEffect(() => {
//     if (params?.id) {
//       const carregarCliente = async () => {
//         try {
//           setCarregando(true);
//           const cliente = await instanciaServicoCliente.buscarPorId(params.id);
//           if (cliente) {
//             setNome(cliente.nome || '');
//             setEmail(cliente.email || '');
//             setCelular(cliente.celular || '');
//             setCpf(cliente.cpf || '');
//             setCargo(cliente.cargo || '');
//             setPis(cliente.pis || '');
//             setCep(cliente.cep || '');
//             setRua(cliente.rua || '');
//             setNumero(cliente.numero || '');
//             setBairro(cliente.bairro || '');
//             setCidade(cliente.cidade || '');
//           }
//         } catch (erro) {
//           toast.error('Erro ao carregar cliente. Verifique os detalhes e tente novamente.');
//         } finally {
//           setCarregando(false);
//         }
//       };
//       carregarCliente();
//     }
//   }, [params?.id]);

//   const salvar = async () => {
//     if (!nome || !email) {
//       toast.error('Preencha todos os campos obrigatórios!');
//       return;
//     }

//     const cliente = {
//       nome,
//       email,
//       celular: celular.replace(/\D/g, ''),
//       cpf: cpf.replace(/\D/g, ''),
//       cep: cep.replace(/\D/g, ''),
//       cargo,
//       pis,
//       rua,
//       numero: parseInt(numero, 10) || null, 
//       bairro,
//       cidade,
//     };

//     try {
//       setCarregando(true);
//       if (params?.id) {
//         await instanciaServicoCliente.editarCliente({ ...cliente, id: params.id });
//         toast.success('Colaborador atualizado!');
//       } else {
//         await instanciaServicoCliente.cadastrarCliente(cliente);
//         toast.success('Colaborador cadastrado !');
//       }
//       navigate('/lista-clientes');
//     } catch (erro) {
//       toast.error(erro.response?.data?.mensagem || 'Erro ao salvar Colaborador !');
//     } finally {
//       setCarregando(false);
//     }
//   };

//   return (
//     <Principal titulo={params?.id ? 'Perfil Colaborador' : 'Novo Colaborador '} voltarPara="/lista-clientes">
//       {carregando ? (
//         <p>Carregando...</p>
//       ) : (
//         <>
//           <div className="campo">
//             <label>Nome</label>
//             <input
//               type="text"
//               placeholder="Digite o nome"
//               value={nome}
//               onChange={(e) => setNome(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Digite o email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>Celular</label>
//             <input
//               type="tel"
//               placeholder="Digite o celular"
//               value={celular}
//               onChange={(e) => setCelular(formatarComMascara(e.target.value, MASCARA_CELULAR))}
//             />
//           </div>
//           <div className="campo">
//             <label>CPF</label>
//             <input
//               type="text"
//               placeholder="Digite o CPF"
//               value={cpf}
//               onChange={(e) => setCpf(formatarComMascara(e.target.value, MASCARA_CPF))}
//             />
//           </div>
//           <div className="campo">
//             <label>Cargo</label>
//             <input
//               type="text"
//               placeholder="Digite o cargo"
//               value={cargo}
//               onChange={(e) => setCargo(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>PIS</label>
//             <input
//               type="text"
//               placeholder="Digite o PIS"
//               value={pis}
//               onChange={(e) => setPis(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>CEP</label>
//             <input
//               type="text"
//               placeholder="Digite o CEP"
//               value={cep}
//               onChange={(e) => setCep(formatarComMascara(e.target.value, MASCARA_CEP))}
//             />
//           </div>
//           <div className="campo">
//             <label>Rua</label>
//             <input
//               type="text"
//               placeholder="Digite a rua"
//               value={rua}
//               onChange={(e) => setRua(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>Bairro</label>
//             <input
//               type="text"
//               placeholder="Digite o bairro"
//               value={bairro}
//               onChange={(e) => setBairro(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>Cidade</label>
//             <input
//               type="text"
//               placeholder="Digite a cidade"
//               value={cidade}
//               onChange={(e) => setCidade(e.target.value)}
//             />
//           </div>
//           <div className="campo">
//             <label>Número</label>
//             <input
//               type="number"
//               placeholder="Digite o número"
//               value={numero}
//               onChange={(e) => setNumero(e.target.value)}
//             />
//           </div>
//           <BotaoCustomizado cor="secundaria" aoClicar={salvar} disabled={carregando}>
//             {carregando ? 'Salvando...' : 'Salvar'}
//           </BotaoCustomizado>
//         </>
//       )}
//     </Principal>
//   );
// };

// export default PaginaCadastroCliente;
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoCliente from '../../comum/servicos/ServicoCliente';
import {
  formatarComMascara,
  MASCARA_CELULAR,
  MASCARA_CEP,
  MASCARA_CPF
} from '../../comum/utils/mascaras';
import './PaginaCadastroCliente.css';

const instanciaServicoCliente = new ServicoCliente();

const PaginaCadastroCliente = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isPerfil = !!params?.id;

  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    celular: '',
    cpf: '',
    cargo: '',
    pis: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: ''
  });

  const campoKeys = Object.keys(campos);

  const [editavel, setEditavel] = useState(() => {
    if (!isPerfil) {
      return Object.fromEntries(campoKeys.map((campo) => [campo, true]));
    }

    const salvo = localStorage.getItem(`editavel-${params.id}`);
    if (salvo) return JSON.parse(salvo);
    return Object.fromEntries(campoKeys.map((campo) => [campo, false]));
  });

  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (isPerfil) {
      const carregarCliente = async () => {
        try {
          setCarregando(true);
          const cliente = await instanciaServicoCliente.buscarPorId(params.id);
          if (cliente) {
            setCampos((prev) => ({
              ...prev,
              ...Object.fromEntries(
                campoKeys.map((k) => [k, cliente[k] || ''])
              )
            }));
          }
        } catch {
          toast.error('Erro ao carregar cliente.');
        } finally {
          setCarregando(false);
        }
      };
      carregarCliente();
    }
  }, [isPerfil, params.id]);

  const buscarEnderecoPorCep = async (cepFormatado) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setCampos((prev) => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || ''
        }));
      } else {
        toast.warn('CEP não encontrado!');
      }
    } catch {
      toast.error('Erro ao buscar endereço pelo CEP');
    }
  };

  const salvar = async () => {
    const { nome, email, cpf, numero, ...resto } = campos;
    const cpfLimpo = cpf.replace(/\D/g, '');

    if (!nome.trim() || !email.trim() || cpfLimpo.length !== 11) {
      toast.error('Preencha corretamente os campos obrigatórios: Nome, Email e CPF.');
      return;
    }

    const cliente = {
      nome,
      email,
      cpf: cpfLimpo,
      numero: parseInt(numero, 10) || null,
      ...Object.fromEntries(
        Object.entries(resto).map(([k, v]) =>
          k === 'cep' || k === 'celular' ? [k, v.replace(/\D/g, '')] : [k, v]
        )
      )
    };

    try {
      setCarregando(true);

      if (isPerfil) {
        await instanciaServicoCliente.editarCliente({ ...cliente, id: params.id });

        localStorage.setItem(`editavel-${params.id}`, JSON.stringify(editavel));

        toast.success('Colaborador atualizado!');
      } else {
        const novoCliente = await instanciaServicoCliente.cadastrarCliente(cliente);

        if (novoCliente?.id) {
          localStorage.setItem(
            `editavel-${novoCliente.id}`,
            JSON.stringify(Object.fromEntries(campoKeys.map((k) => [k, true])))
          );
        }

        toast.success('Colaborador cadastrado!');
      }

      navigate('/lista-clientes');
    } catch (erro) {
      toast.error(erro.response?.data?.mensagem || 'Erro ao salvar Colaborador!');
    } finally {
      setCarregando(false);
    }
  };

  const isCampoObrigatorio = (key) => ['nome', 'email', 'cpf'].includes(key);

  const getClasseValidacao = (valor, key) => {
    if (!isCampoObrigatorio(key)) return '';
    const ativo = !isPerfil || editavel[key];
    if (!ativo) return '';
    return valor.trim() === '' ? 'invalido' : 'valido';
  };

  const aplicarMascara = (key, valor) => {
    switch (key) {
      case 'cpf':
        return formatarComMascara(valor, MASCARA_CPF);
      case 'celular':
        return formatarComMascara(valor, MASCARA_CELULAR);
      case 'cep':
        return formatarComMascara(valor, MASCARA_CEP);
      default:
        return valor;
    }
  };

  const handleChange = (key, valor) => {
    const novoValor = aplicarMascara(key, valor);
    setCampos((prev) => ({ ...prev, [key]: novoValor }));

    if (key === 'cep' && novoValor.length === 9) {
      buscarEnderecoPorCep(novoValor.replace(/\D/g, ''));
    }
  };

  const campoComCheckbox = (label, key, tipo = 'text') => (
    <div className="campo" key={key}>
      <label>{label}</label>
      <div className="input-com-checkbox">
        <input
          type={tipo}
          placeholder={`Digite ${label.toLowerCase()}`}
          value={campos[key]}
          onChange={(e) => handleChange(key, e.target.value)}
          className={getClasseValidacao(campos[key], key)}
          disabled={isPerfil && !editavel[key]}
        />
        {isPerfil && (
          <Checkbox
            checked={editavel[key]}
            onChange={(e) =>
              setEditavel((prev) => ({ ...prev, [key]: e.target.checked }))
            }
            size="small"
            title="Habilitar edição"
          />
        )}
      </div>
    </div>
  );

  return (
    <Principal titulo={isPerfil ? 'Perfil Colaborador' : 'Novo Colaborador'} voltarPara="/lista-clientes">
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="form-container">
            {campoComCheckbox('Nome *', 'nome')}
            {campoComCheckbox('Email *', 'email', 'email')}
            {campoComCheckbox('Celular', 'celular', 'tel')}
            {campoComCheckbox('CPF *', 'cpf')}
            {campoComCheckbox('Cargo', 'cargo')}
            {campoComCheckbox('PIS', 'pis')}
            {campoComCheckbox('CEP', 'cep')}
            {campoComCheckbox('Rua', 'rua')}
            {campoComCheckbox('Bairro', 'bairro')}
            {campoComCheckbox('Cidade', 'cidade')}
            {campoComCheckbox('Número', 'numero', 'number')}
          </div>

          <BotaoCustomizado
            cor="secundaria"
            aoClicar={salvar}
            disabled={carregando}
            style={{ marginTop: '24px', width: '100%' }}
          >
            {carregando ? 'Salvando...' : 'Salvar'}
          </BotaoCustomizado>
        </>
      )}
    </Principal>
  );
};

export default PaginaCadastroCliente;