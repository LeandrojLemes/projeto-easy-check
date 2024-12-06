import axios from 'axios';

const API_URL = 'https://easy-check-api.onrender.com/clientes';

class ServicoCliente {
 
  async buscarPorId(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar cliente por ID:", error);
      throw error;
    }
  }

 
  async cadastrarCliente(cliente) {
    try {
      const response = await axios.post(API_URL, cliente);
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      throw error;
    }
  }

  
  async editarCliente(cliente) {
    try {
      const response = await axios.put(`${API_URL}/${cliente.id}`, cliente);
      return response.data;
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      throw error;
    }
  }

 
  async excluirCliente(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      throw error;
    }
  }

  
  async buscarTodos() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todos os clientes:", error);
      throw error;
    }
  }
}

export default ServicoCliente;
