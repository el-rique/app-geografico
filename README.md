# Áreas Ambientais Protegidas - Recife

Aplicativo em React Native com Expo para visualizar áreas ambientais protegidas no Recife. Os dados geográficos são provenientes do portal de dados da Prefeitura do Recife.

## Estrutura

```text
api/
  index.js
  package.json
mobile/
  App.js
  package.json
  src/
    navigation/
    features/
      auth/
      map/
    shared/
      services/
```

As telas, componentes, dados e utilitários ficam junto à funcionalidade correspondente em `features`. A navegação fica em `src/navigation`, e serviços compartilhados ficam em `src/shared`.

## Requisitos

- Node.js e npm
- Expo Go ou ambiente de desenvolvimento Expo configurado

## Instalação e execução

### API (terminal 1)

A API fornece apenas um endpoint demonstrativo de login. Na raiz do projeto:

```bash
cd api
npm install
npm start
```

### Aplicativo (terminal 2)

Em outro terminal:

```bash
cd mobile
npm ci
npx expo start
```

Cada app tem seu próprio `package.json`, lockfile e `node_modules`; execute os comandos dentro da pasta correspondente. Não instale as dependências na raiz do repositório.

O endereço da API pode ser configurado com `EXPO_PUBLIC_API_URL`. Sem essa variável, o aplicativo usa `http://localhost:3000`. Para executar em um dispositivo físico, configure a variável com o endereço IP da máquina que está rodando a API, por exemplo, `EXPO_PUBLIC_API_URL=http://192.168.0.10:3000`.

## Observação

O cadastro ainda não está implementado na API. O login de demonstração aceita `aluno@email.com` e senha `admin`.
