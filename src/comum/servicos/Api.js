import axios from 'axios';
import ServicoAutenticacao from './ServicoAutenticacao';

const instanciaApi = axios.create({
  baseURL: 'https://easy-check-api.onrender.com',
});

instanciaApi.interceptors.request.use((config) => {
  const _servicoAutenticacao = new ServicoAutenticacao();

  const usuarioLogado = _servicoAutenticacao.buscarUsuarioLogado();
  if (usuarioLogado) {
    config.headers['x-usuario-id'] = usuarioLogado.id; // Atualizado para 'x-usuario-id'
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instanciaApi;
