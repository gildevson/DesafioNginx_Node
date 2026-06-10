# Desafio Full Cycle — Nginx + Node.js + MySQL

Aplicação que demonstra o uso do Nginx como proxy reverso encaminhando requisições para uma aplicação Node.js com persistência em MySQL, orquestrada via Docker Compose.

## Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — inclui o Docker e o Docker Compose
- Git (para clonar o repositório)

Para verificar se estão instalados, abra o terminal e execute:

```bash
docker --version
docker compose version
git --version
```

## Como executar

### 1. Clone o repositório

Abra o terminal (PowerShell, CMD ou Terminal) e execute:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

> Substitua a URL pelo link do seu repositório no GitHub.

### 2. Entre na pasta do projeto

```bash
cd DesafioNginx_Node
```

### 3. Suba os containers

```bash
docker compose up --build
```

Aguarde até aparecer no terminal algo como:

```plaintext
node  | Servidor rodando na porta 3000
```

Isso indica que tudo está pronto.

### 4. Acesse a aplicação

Abra o navegador e acesse:

```plaintext
http://localhost:8080
```

Você verá a página com o título **Full Cycle Rocks!** e a lista de nomes cadastrados.

> A cada vez que você recarregar a página, um novo nome é inserido no banco de dados.

## Como parar a aplicação

No terminal onde os containers estão rodando, pressione `Ctrl + C`.

Para remover os containers completamente:

```bash
docker compose down
```

Para remover também os dados do banco de dados:

```bash
docker compose down -v
```

## Estrutura do projeto

```plaintext
├── docker-compose.yml       # Orquestração dos containers
├── node/
│   ├── index.js             # Aplicação Node.js
│   ├── Dockerfile           # Imagem da aplicação
│   └── package.json         # Dependências
└── nginx/
    └── nginx.conf           # Configuração do Proxy Reverso
```

## Como funciona

```plaintext
Navegador → porta 8080 → Nginx → Node.js (porta 3000) → MySQL
```

1. O usuário acessa `http://localhost:8080`
2. O **Nginx** recebe a requisição e repassa para o **Node.js**
3. O **Node.js** insere um nome na tabela `people` do **MySQL**
4. O Node.js consulta todos os nomes cadastrados e retorna a página HTML

## Tecnologias utilizadas

- **Node.js** + Express — aplicação backend
- **MySQL 8** — banco de dados
- **Nginx** — proxy reverso
- **Docker & Docker Compose** — orquestração dos containers
