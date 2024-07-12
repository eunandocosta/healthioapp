# Health.io - Gerenciador de Dietas

## Descrição

Health.io é um aplicativo desenvolvido para ajudar os usuários a gerenciarem suas dietas de maneira eficiente. Com ele, é possível criar, visualizar, editar e deletar refeições e alimentos, utilizando Firebase para autenticação e um backend para gerenciar os dados de dieta.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Firebase**: Plataforma para autenticação de usuários.
- **Material UI**: Biblioteca de componentes de interface de usuário para React.
- **Node.js e Express**: Utilizados no backend da aplicação.
- **Axios**: Cliente HTTP para realizar requisições ao backend.

## Funcionalidades

- **Autenticação de Usuário**: Login e registro de usuários utilizando Firebase Authentication.
- **Gerenciamento de Dieta**: Criação, visualização, edição e exclusão de dietas e alimentos.
- **Busca de Alimentos**: Busca por alimentos e adição à dieta do usuário.
- **Interface Responsiva**: Interface construída com Material UI para uma experiência de usuário responsiva.

## Instalação

### Frontend

1. Clone o repositório:

    ```bash
    git clone https://github.com/eunandocosta/healthioapp.git
    ```

2. Configure o Firebase no arquivo `firebaseConfig.js` com suas credenciais do Firebase. O arquivo deve se parecer com o seguinte:

    ```javascript
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_DOMINIO.firebaseapp.com",
      projectId: "SEU_PROJECT_ID",
      storageBucket: "SEU_STORAGE_BUCKET.appspot.com",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID",
      measurementId: "SEU_MEASUREMENT_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    export { app, auth };
    ```
    Observação: Configure as variáveis de ambiente necessárias (por exemplo, conexão com banco de dados, credenciais de API - As credenciais nesse projeto deverão ser modificadas pelo usuário, a menos que você sejaum avaliador da Pós Graduação da Puc Rio. Nesse caso as credenciais atuais permanecerão disponíveis até a nota ser lançada.).

3. Inicie o servidor de desenvolvimento:

    ```bash
    npm start
    ```
