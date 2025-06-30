// import { useEffect, useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import Principal from '../../comum/componentes/Principal/Principal';
// import instanciaApi from '../../comum/servicos/Api';
// import './PaginaListaClientes.css';

// const PaginaListaClientes = () => {
//   const navigate = useNavigate();
//   const [listaClientes, setListaClientes] = useState([]);
//   const [carregando, setCarregando] = useState(false);

  
//   useEffect(() => {
//     const buscarClientes = async () => {
//       setCarregando(true);
//       try {
//         const response = await instanciaApi.get('/clientes', {
//           headers: {
//             'x-usuario-id': localStorage.getItem('usuarioId'),
//             'Content-Type': 'application/json',
//           },
//         });
//         setListaClientes(response.data);
//       } catch (error) {
//         toast.error('Erro ao buscar colaborador.');
//         console.error('Erro ao buscar colaborador :', error.response?.data || error.message);
//       } finally {
//         setCarregando(false);
//       }
//     };

//     buscarClientes();
//   }, []);

//   const verificarAptidao = (cliente) => {
//     const {
//       nome,
//       email,
//       celular,
//       cpf,
//       cargo,
//       pis,
//       cep,
//       rua,
//       numero,
//       bairro,
//       cidade,
//     } = cliente;

//     const camposObrigatorios = [
//       nome,
//       email,
//       celular,
//       cpf,
//       cargo,
//       pis,
//       cep,
//       rua,
//       numero,
//       bairro,
//       cidade,
//     ];

//     return camposObrigatorios.every(
//       (campo) => campo !== null && campo !== undefined && campo.toString().trim() !== ''
//     );
//   };

  
//   const navegarParaEdicao = (idCliente) => {
//     if (idCliente) {
//       navigate(`/cadastro-cliente/${idCliente}`);
//     } else {
//       toast.error('ID do colaborador não encontrado.');
//     }
//   };

  
//   const excluir = async (idCliente) => {
//     if (!idCliente) {
//       toast.error('ID do colaborador não fornecido para exclusão.');
//       return;
//     }

//     if (window.confirm('Deseja excluir esse Colaborador?')) {
//       try {
//         await instanciaApi.delete(`/clientes/${idCliente}`, {
//           headers: {
//             'x-usuario-id': localStorage.getItem('usuarioId'),
//             'Content-Type': 'application/json',
//           },
//         });

//         setListaClientes((clientes) =>
//           clientes.filter((cliente) => cliente.id !== idCliente && cliente.id_cliente !== idCliente)
//         );
//         toast.success('Colaborador excluído com sucesso!');
//       } catch (error) {
//         toast.error('Erro ao excluir Colaborador.');
//       }
//     }
//   };

//   return (
//     <Principal titulo="Meus Colaboradores" voltarPara="/">
//       <Link to="/cadastro-cliente" className="pagina-lista-clientes__novo">
//         + Novo Colaborador
//       </Link>

//       {carregando ? (
//         <p>Carregando...</p>
//       ) : listaClientes.length === 0 ? (
//         <p>Nenhum Colaborador cadastrado.</p>
//       ) : (
//         listaClientes.map((cliente) => {
//           const apto = verificarAptidao(cliente);
//           return (
//             <div
//               key={cliente.id || cliente.id_cliente}
//               className={`pagina-lista-clientes__item-cliente ${
//                 apto ? 'apto' : 'nao-apto'
//               }`}
//             >
//               <span>{cliente.nome}</span>
//               <div className="pagina-lista-clientes__item-cliente-acoes">
//                 <FaEdit
//                   size={24}
//                   onClick={() => navegarParaEdicao(cliente.id || cliente.id_cliente)}
//                 />
//                 <FaTrash
//                   size={24}
//                   color="red"
//                   onClick={() => excluir(cliente.id || cliente.id_cliente)}
//                 />
//               </div>
//             </div>
//           );
//         })
//       )}
//     </Principal>
//   );
// };

// export default PaginaListaClientes;

import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Principal from '../../comum/componentes/Principal/Principal';
import instanciaApi from '../../comum/servicos/Api';
import './PaginaListaClientes.css';

const PaginaListaClientes = () => {
  const navigate = useNavigate();
  const [listaClientes, setListaClientes] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const buscarClientes = async () => {
      setCarregando(true);
      try {
        const response = await instanciaApi.get('/clientes', {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
            'Content-Type': 'application/json',
          },
        });
        setListaClientes(response.data);
      } catch (error) {
        toast.error('Erro ao buscar colaborador.');
        console.error('Erro ao buscar colaborador :', error.response?.data || error.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarClientes();
  }, []);

  const verificarAptidao = (cliente) => {
    const idFinal = cliente.id || cliente.id_cliente;
    const estadoEditavel = localStorage.getItem(`editavel-${idFinal}`);

    if (estadoEditavel) {
      const parsed = JSON.parse(estadoEditavel);
      const todasMarcadas = Object.values(parsed).every((v) => v === true);
      return todasMarcadas; // Só retorna true (apto) se TODAS as checkbox estiverem marcadas
    }

    return false; // Sem estado salvo = não apto (vermelho)
  };

  const navegarParaEdicao = (idCliente) => {
    if (idCliente) {
      navigate(`/cadastro-cliente/${idCliente}`);
    } else {
      toast.error('ID do colaborador não encontrado.');
    }
  };

  const excluir = async (idCliente) => {
    if (!idCliente) {
      toast.error('ID do colaborador não fornecido para exclusão.');
      return;
    }

    if (window.confirm('Deseja excluir esse Colaborador?')) {
      try {
        await instanciaApi.delete(`/clientes/${idCliente}`, {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
            'Content-Type': 'application/json',
          },
        });

        setListaClientes((clientes) =>
          clientes.filter((cliente) => cliente.id !== idCliente && cliente.id_cliente !== idCliente)
        );
        toast.success('Colaborador excluído com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir Colaborador.');
      }
    }
  };

  return (
    <Principal titulo="Meus Colaboradores" voltarPara="/">
      <Link to="/cadastro-cliente" className="pagina-lista-clientes__novo">
        + Novo Colaborador
      </Link>

      {carregando ? (
        <p>Carregando...</p>
      ) : listaClientes.length === 0 ? (
        <p>Nenhum Colaborador cadastrado.</p>
      ) : (
        listaClientes.map((cliente) => {
          const apto = verificarAptidao(cliente);
          return (
            <div
              key={cliente.id || cliente.id_cliente}
              className={`pagina-lista-clientes__item-cliente ${
                apto ? 'apto' : 'nao-apto'
              }`}
            >
              <span>{cliente.nome}</span>
              <div className="pagina-lista-clientes__item-cliente-acoes">
                <FaEdit
                  size={24}
                  onClick={() => navegarParaEdicao(cliente.id || cliente.id_cliente)}
                />
                <FaTrash
                  size={24}
                  color="red"
                  onClick={() => excluir(cliente.id || cliente.id_cliente)}
                />
              </div>
            </div>
          );
        })
      )}
    </Principal>
  );
};

export default PaginaListaClientes;