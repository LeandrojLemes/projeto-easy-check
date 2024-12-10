import instanciaApi from './Api';

class ServicoAutenticacao {
  async login(email, senha) {
    const response = await instanciaApi.post('/login', { email, senha });

    // Salva os dados completos do usuário no localStorage
    localStorage.setItem('usuario-logado', JSON.stringify(response.data));

    // Retorna o usuário completo para ser usado onde for necessário
    return response.data;
  }

  buscarUsuarioLogado() {
    const usuarioLogado = localStorage.getItem('usuario-logado');
    if (usuarioLogado) {
      return JSON.parse(usuarioLogado);
    }
    return undefined;
  }

  sair() {
    // Remove as informações do usuário
    localStorage.removeItem('usuario-logado');
    localStorage.removeItem('usuarioId'); // Também remove o ID caso tenha sido salvo separadamente
  }
}

export default ServicoAutenticacao;
