# Papacapim - Rede Social

Este projeto é um aplicativo de rede social inspirado no Twitter, criado como parte da disciplina de Desenvolvimento Mobile. A rede social, chamada **Papacapim**, tem como objetivo proporcionar uma experiência de postagens, busca de usuários, curtidas e interações, utilizando **React Native** para o front-end.

## Funcionalidades

Esse aplicativo atualmente funciona até a parte 2, contudo o projeto do seu desenvolvimento é dividido em três partes, cada uma com funcionalidades específicas:

### Parte 1: Design da Interface
- **Tela de Login**: Interface de entrada no app.
- **Tela de Cadastro**: Permite ao usuário registrar uma nova conta.
- **Tela de Feed**: Exibe postagens de outros usuários.
- **Tela de Perfil de Outro Usuário**: Permite visualização de perfis de outros usuários.
- **Tela de Alteração de Dados do Usuário**: Permite ao usuário alterar seus dados de cadastro.
- **Tela de Postagem**: Interface para criar e publicar postagens.

### Parte 2: Gerenciamento de Contas
- **Registro de Novos Usuários**: Conexão com a API para registrar contas.
- **Login**: Autenticação de usuários usando a API.
- **Alteração de Dados do Usuário**: Modificação de informações de conta.
- **Exclusão de Conta**: Remoção de usuários.
- **Buscar Usuário**: Funcionalidade de busca de perfis.
- **Seguir e Deixar de Seguir**: Implementação de relacionamento entre usuários.


### Parte 3: Gerenciamento de Postagens e Interações
- **Exibição do Feed**: Visualização de postagens de usuários.
- **Efetuar Postagens**: Criação de novas postagens.
- **Responder Postagens**: Responder a postagens de outros usuários.
- **Excluir Postagens**: Remover postagens existentes.
- **Buscar Postagens**: Função de pesquisa de postagens específicas.
- **Curtir e Descurtir**: Interação de curtidas em postagens.


## Tecnologias Utilizadas

- **React Native**: Framework JavaScript para desenvolvimento mobile.
- **Expo**: Ferramenta para desenvolvimento rápido de aplicativos React Native.
- **@react-navigation**: Biblioteca para navegação entre telas.
- **Axios**: Cliente HTTP para comunicação com a API.
- **AsyncStorage**: Armazenamento local para salvar dados como tokens de autenticação.
- **StyleSheet.create**: Estilização utilizando a API nativa do React Native.

## Estrutura do Projeto

## Como Executar

1. **Clone o repositório**:
   ```bash
   git clone (https://github.com/wendel211/Aplicativo-Simulador-de-Twitter.git)
   
**Instale as dependências:**
bash
Copiar código
cd papacapim
npm install

**Inicie o aplicativo:**
bash
Copiar código
expo start

**API**
Este aplicativo consome uma API chamada Papacapim para todas as operações de login, registro, postagens e interações. A API deve estar rodando para que as funcionalidades de gerenciamento de contas e postagens funcionem corretamente.

Contribuição
Pull requests são bem-vindos. Para mudanças maiores, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.
