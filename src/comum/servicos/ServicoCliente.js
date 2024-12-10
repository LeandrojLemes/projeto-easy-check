import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

class ServicoCliente {
  getUsuarioId() {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      throw new Error('Usuário não autenticado. ID não encontrado no localStorage.');
    }
    return usuarioId;
  }

  getHeaders() {
    const usuarioId = this.getUsuarioId();
    return {
      'x-usuario-id': usuarioId,
      'Content-Type': 'application/json',
    };
  }

  async buscarPorId(id) {
    if (!id) {    
      throw new Error('ID do cliente não fornecido.');
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/clientes/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'Erro ao buscar cliente.');
    }
  }

  async cadastrarCliente(cliente) {
    try {
      const response = await axios.post(`${API_BASE_URL}/clientes`, cliente, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'Erro ao cadastrar cliente.');
    }
  }

  async editarCliente(cliente) {
    if (!cliente.id) {
      throw new Error('ID do cliente não fornecido para edição.');
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/clientes/${cliente.id}`, cliente, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'Erro ao editar cliente.');
    }
  }

  async listarClientes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/clientes`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleRequestError(error, 'Erro ao listar clientes.');
    }
  }

  async excluirCliente(clienteId) {
    if (!clienteId) {
      throw new Error('ID do cliente não fornecido para exclusão.');
    }

    console.log('Tentando excluir cliente com ID:', clienteId);
    console.log('Headers enviados:', this.getHeaders());

    try {
      const response = await axios.delete(`${API_BASE_URL}/clientes/${clienteId}`, {
        headers: this.getHeaders(),
      });
      console.log('Resposta do servidor ao excluir cliente:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na exclusão:', error.response?.data || error.message);
      this.handleRequestError(error, 'Erro ao excluir cliente.');
    }
  }

  handleRequestError(error, defaultMessage) {
    const mensagemErro = error.response?.data?.mensagem || defaultMessage;
    console.error(mensagemErro, error.response || error);
    throw new Error(mensagemErro);
  }
}

export default ServicoCliente;
