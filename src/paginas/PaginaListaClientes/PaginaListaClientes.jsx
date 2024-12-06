import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Principal from '../../comum/componentes/Principal/Principal';
import axios from 'axios';
import './PaginaListaClientes.css';

const baseURL = 'https://easy-check-api.onrender.com/clientes';

const PaginaListaClientes = () => {
  const navigate = useNavigate();
  const [listaClientes, setListaClientes] = useState([]);

  // Buscar os clientes da API
  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const response = await axios.get(`${baseURL}/clientes`); // Utiliza a baseURL e a rota correta
        setListaClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, []);

  // Navegar para a página de edição do cliente
  const navegarParaEdicao = (idCliente) => {
    navigate(`/cadastro-cliente/${idCliente}`);
  };

  // Excluir o cliente pela API
  const excluir = async (idCliente) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await axios.delete(`${baseURL}/clientes/${idCliente}`); // Utiliza a baseURL e a rota correta
        setListaClientes((clientes) => clientes.filter(cliente => cliente.id !== idCliente)); // Atualiza a lista após a exclusão
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
      }
    }
  };

  return (
    <Principal titulo="Lista de Clientes" voltarPara="/">
      <Link to="/cadastro-cliente">Novo</Link>

      {listaClientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        listaClientes.map((cliente) => (
          <div key={cliente.id} className="pagina-lista-clientes__item-cliente">
            {cliente.nome}

            <div className="pagina-lista-clientes__item-cliente-acoes">
              <FaEdit size={24} onClick={() => navegarParaEdicao(cliente.id)} />

              <FaTrash size={24} color="red" onClick={() => excluir(cliente.id)} />
            </div>
          </div>
        ))
      )}
    </Principal>
  );
};

export default PaginaListaClientes;

