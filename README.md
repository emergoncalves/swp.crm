# SWP CRM

Sistema de gerenciamento de relacionamento com clientes (CRM) construído com Laravel 13, Inertia.js, React e Tailwind CSS.

## Funcionalidades

- **Dashboard** - Visão geral de empresas, contatos, negociações e tarefas
- **Empresas** - Gerenciamento completo de empresas (CRUD)
- **Contatos** - Cadastro e gestão de contatos vinculados a empresas
- **Negociações** - Pipeline de vendas com acompanhamento de etapas
- **Tarefas** - Gestão de tarefas com vinculação a negociações
- **Autenticação** - Sistema de login e registro de usuários
- **Perfil** - Gerenciamento de perfil do usuário

## Tecnologias

### Backend
- **PHP 8.3+**
- **Laravel 13.8**
- **Laravel Sanctum** - Autenticação via API tokens
- **SQLite** - Banco de dados (configurável)

### Frontend
- **React 18** - Biblioteca de UI
- **Inertia.js 2** - Conexão Laravel-React
- **Tailwind CSS 3** - Framework CSS
- **Vite 8** - Build tool

### Ferramentas de Desenvolvimento
- **Laravel Breeze** - Scaffold de autenticação
- **Laravel Pint** - Formatação de código PHP
- **Ziggy** - Uso de rotas Laravel no JavaScript
- **PHPUnit 12** - Testes automatizados

## Pré-requisitos

- PHP 8.3 ou superior
- Composer
- Node.js 18+ e npm
- SQLite (ou outro banco de dados suportado pelo Laravel)

## Instalação

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd swp-crm
```

### 2. Configurar ambiente

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Instalar dependências

```bash
composer install
npm install
```

### 4. Configurar banco de dados

```bash
# Criar banco SQLite
touch database/database.sqlite

# Executar migrations
php artisan migrate
```

### 5. Build do frontend

```bash
npm run build
```

## Desenvolvimento

Para iniciar o servidor de desenvolvimento com todas as services necessárias:

```bash
composer dev
```

Isso irá iniciar:
- Servidor Laravel (`php artisan serve`)
- Fila de jobs (`php artisan queue:listen`)
- Logs em tempo real (`php artisan pail`)
- Build do Vite (`npm run dev`)

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `composer dev` | Inicia servidor de desenvolvimento completo |
| `composer test` | Executa testes automatizados |
| `npm run build` | Build de produção do frontend |
| `npm run dev` | Servidor de desenvolvimento do Vite |

## Estrutura do Projeto

```
swp-crm/
├── app/
│   ├── Http/Controllers/    # Controllers da aplicação
│   ├── Models/              # Modelos Eloquent
│   └── Providers/           # Service providers
├── database/
│   ├── factories/           # Factories para testes
│   ├── migrations/          # Migrations do banco
│   └── seeders/             # Seeders de dados
├── docs/                    # Documentação do projeto
├── resources/
│   └── js/                  # Componentes React
├── routes/                  # Definições de rotas
└── tests/                   # Testes automatizados
```

## Rotas Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/dashboard` | Dashboard principal |
| GET/POST | `/companies` | Listar/criar empresas |
| GET/POST | `/contacts` | Listar/criar contatos |
| GET/POST | `/deals` | Listar/criar negociações |
| GET/POST | `/tasks` | Listar/criar tarefas |
| GET/PATCH | `/profile` | Gerenciar perfil |

## Documentação

Consulte a pasta `docs/` para documentação detalhada sobre:
- Controllers e lógica de negócio
- Modelos Eloquent
- Rotas e middleware
- Validação e requests
- Integração Inertia/React
- Migrations
- Autenticação
- CLI do Artisan
- Providers e Services

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
