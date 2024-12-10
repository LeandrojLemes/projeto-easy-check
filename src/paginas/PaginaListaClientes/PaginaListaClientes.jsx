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

  // Buscar os clientes da API
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
        toast.error('Erro ao buscar clientes.');
        console.error('Erro ao buscar clientes:', error.response?.data || error.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarClientes();
  }, []);

  // Navegar para a página de edição do cliente
  const navegarParaEdicao = (idCliente) => {
    if (idCliente) {
      navigate(`/cadastro-cliente/${idCliente}`);
    } else {
      toast.error('ID do cliente não encontrado.');
    }
  };

  // Excluir cliente da API
  const excluir = async (idCliente) => {
    if (!idCliente) {
      toast.error('ID do cliente não fornecido para exclusão.');
      return;
    }

    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        console.log('Tentando excluir cliente com ID:', idCliente);

        await instanciaApi.delete(`/clientes/${idCliente}`, {
          headers: {
            'x-usuario-id': localStorage.getItem('usuarioId'),
            'Content-Type': 'application/json',
          },
        });

        console.log('Cliente excluído com sucesso.');
        setListaClientes((clientes) =>
          clientes.filter((cliente) => cliente.id !== idCliente && cliente.id_cliente !== idCliente)
        );
        toast.success('Cliente excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir cliente:', error.response?.data || error.message);
        toast.error('Erro ao excluir cliente.');
      }
    }
  };

  return (
    <Principal titulo="Lista de Clientes" voltarPara="/">
      <Link to="/cadastro-cliente" className="pagina-lista-clientes__novo">
        Novo Cliente
      </Link>

      {carregando ? (
        <p>Carregando...</p>
      ) : listaClientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        listaClientes.map((cliente) => (
          <div
            key={cliente.id || cliente.id_cliente}
            className="pagina-lista-clientes__item-cliente"
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
        ))
      )}
    </Principal>
  );
};

export default PaginaListaClientes;
