# Desafio Full Cycle — Nginx + Node.js + MySQL

Aplicação que demonstra o uso do Nginx como proxy reverso encaminhando requisições para uma aplicação Node.js com persistência em MySQL, orquestrada via Docker Compose.

## Como executar

```bash
docker compose up --build
```

Acesse em: [http://localhost:8080](http://localhost:8080)

## Comportamento

A cada acesso, a aplicação insere um nome na tabela `people` e exibe a lista completa dos registros cadastrados.

## Estrutura

```plaintext
├── docker-compose.yml
├── node/
│   ├── index.js
│   ├── Dockerfile
│   └── package.json
└── nginx/
    └── nginx.conf
```

## Tecnologias

- Node.js + Express
- MySQL 8
- Nginx (proxy reverso)
- Docker & Docker Compose
