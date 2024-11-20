### 🚧 Em construção 

# accounting

Painel para gerenciamento de empresas e contratos. Feito com _Next.js_ e _Nest.js_ para clientes de consultoria de contabilidade.

## 🛠 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Nest.js](https://docs.nestjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

## Funcionalidades

- [x] Autenticação
- [x] Listagem de empresas
- [x] Listagem de contratos
- [x] Listagem de métricas
- [ ] Cadastro de empresa 
- [ ] Cadastro de contrato 
- [ ] Remoção de empresa (e contrato)
- [ ] Upload de arquivos 

## 🚀 Como executar o projeto
### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

<p>
  <a style="text-decoration: none" href="https://git-scm.com" target="_blank">Git</a>,
  <a style="text-decoration: none" href="https://nodejs.org/en/" target="_blank">Node.js</a>,
  <a style="text-decoration: none" href="https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database#setting-up-postgresql-on-windows" target="_blank">PostgreSQL</a>.
</p>

> 🚨 Lembre-se da porta e senha que definir para o banco de dados!

Além disto é bom ter um editor para trabalhar com o código como o <a style="text-decoration: none" href="https://code.visualstudio.com/" target="_blank">VSCode</a>.

### Clone o projeto
```bash
# Clone este repositório
$ git clone https://github.com/rairongf/accounting.git

# Acesse a pasta do projeto no terminal/cmd
$ cd accounting
```

### 🌐 Rodando o Back End (servidor)

Crie o arquivo `.env` no diretório raiz do projeto (`/backend/.env`)
com o conteúdo abaixo (🚨 lembre-se de preencher a porta e senha do banco de dados):

```env
PORT=8082
NODE_ENV=development

DATABASE_HOST=localhost
DATABASE_PORT=<PORTA DEFINIDA NA INSTALAÇÃO (padrão 5432)>
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=<SENHA DEFINIDA NA INSTALAÇÃO>
DATABASE_NAME=data
DATABASE_URL=postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}

JWT_SECRET=secret
```

Depois, siga as instruções abaixo:

```bash
# Acesse o diretório raiz da aplicação
cd backend

# Instale as dependências
npm i

# Execute a migração inicial do banco de dados
npm run prisma:migrate-dev

# Execute a aplicação em modo desenvolvimento
npm run start:dev
```

### 💻 Rodando a aplicação web (Front End)

Crie o arquivo `.env` no diretório raiz do projeto (`/frontend/.env`)
com o conteúdo abaixo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8082
```

Depois, siga as instruções abaixo utilizando um 🚨 terminal diferente:

```bash
# Acesse o diretório raiz da aplicação
# Se estiver no diretório do backend, execute `cd ..` antes
cd frontend

# Instale as dependências
npm i

# Execute a aplicação em modo desenvolvimento
npm run dev
```

### Como testar o projeto

Acesse o endereço `http://localhost:3000` no seu navegador.

### Autor

<a href="https://www.linkedin.com/in/raironferreira/">
 <img
    style="border-radius: 50%;"
    src="https://avatars.githubusercontent.com/u/43035850?v=4"
    width="100px;"
    alt=""/>
 <br />
 <sub><b>Rairon Ferreira</b></sub></a>


Feito com ❤️ por Rairon Ferreira 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Rairon_Ferreira-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/raironferreira/)](https://www.linkedin.com/in/raironferreira/) 
[![Gmail Badge](https://img.shields.io/badge/-rairon.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rairon.dev@gmail.com)](mailto:rairon.dev@gmail.com)