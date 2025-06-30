// import { useNavigate } from 'react-router-dom';
// import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
// import Principal from '../../comum/componentes/Principal/Principal';
// import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
// import Avatar from '../../comum/componentes/Avatar/Avatar';
// import { useState } from 'react';

// const instanciaServicoAutenticacao = new ServicoAutenticacao();

// const PaginaMeuPerfil = () => {
//   const navigate = useNavigate();
//   const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();

//   const [imagemUsuario, setImagemUsuario] = useState('');

//   const sair = () => {
//     instanciaServicoAutenticacao.sair();
//     navigate('/login');
//   };

//   const mudarAvatar = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = function (event) {
//         const base64String = event.target.result;

//         setImagemUsuario(base64String);
//         console.log('##### Usuário:', { ...usuarioLogado, foto: base64String });
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Principal titulo="Meu Perfil" voltarPara="/">
//       <input
//         type="file"
//         accept="image/*"
//         multiple={false}
//         id="fileInput"
//         style={{ display: 'none' }}
//         onChange={mudarAvatar}
//       />
//       <button
//         onClick={() => document.getElementById('fileInput').click()}
//         style={{ backgroundColor: 'transparent', border: 'none', display: 'flex', justifyContent: 'center' }}
//       >
//         <Avatar nome={usuarioLogado.nome} perfil={true} imagem={imagemUsuario} />
//       </button>

//       <div className="campo">
//         <label>Nome</label>
//         <input type="text" value={usuarioLogado.nome} disabled />
//       </div>

//       <div className="campo">
//         <label>Email</label>
//         <input type="text" value={usuarioLogado.email} disabled />
//       </div>

//       <BotaoCustomizado aoClicar={sair} cor="primaria">Sair</BotaoCustomizado>
//     </Principal>
//   );
// };

// export default PaginaMeuPerfil;


import { useNavigate } from 'react-router-dom';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import Principal from '../../comum/componentes/Principal/Principal';
import ServicoAutenticacao from '../../comum/servicos/ServicoAutenticacao';
import Avatar from '../../comum/componentes/Avatar/Avatar';
import { useState } from 'react';
import logoEasyCheck from '../../assets/logoEasyCheck.jpeg';

const instanciaServicoAutenticacao = new ServicoAutenticacao();

const PaginaMeuPerfil = () => {
  const navigate = useNavigate();
  const usuarioLogado = instanciaServicoAutenticacao.buscarUsuarioLogado();
  const [imagemUsuario, setImagemUsuario] = useState('');

  const sair = () => {
    instanciaServicoAutenticacao.sair();
    navigate('/login');
  };

  const mudarAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        setImagemUsuario(base64String);
        console.log('##### Usuário:', { ...usuarioLogado, foto: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Principal titulo="Meu Perfil" voltarPara="/">
      <div style={{
        display: 'flex',
        minHeight: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        
        
        <div style={{
          flex: 1,
          backgroundColor: '#2e7d32',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            Bem-vindo!
          </div>

          <img
            src={logoEasyCheck}
            alt="Logo EasyCheck"
            style={{
              width: '80%',
              maxWidth: '220px',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fdfdfd',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center'
          }}>
            <input
              type="file"
              accept="image/*"
              multiple={false}
              id="fileInput"
              style={{ display: 'none' }}
              onChange={mudarAvatar}
            />

            <button
              onClick={() => document.getElementById('fileInput').click()}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Clique para alterar a imagem"
            >
              <Avatar nome={usuarioLogado.nome} perfil={true} imagem={imagemUsuario} />
            </button>

            <div style={{ width: '100%' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Nome</label>
              <input
                type="text"
                value={usuarioLogado.nome}
                disabled
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f5f5f5',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ width: '100%' }}>
              <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>Email</label>
              <input
                type="text"
                value={usuarioLogado.email}
                disabled
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f5f5f5',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ width: '100%' }}>
              <BotaoCustomizado aoClicar={sair} cor="primaria">
                Sair da Conta
              </BotaoCustomizado>
            </div>
          </div>
        </div>
      </div>
    </Principal>
  );
};

export default PaginaMeuPerfil;
