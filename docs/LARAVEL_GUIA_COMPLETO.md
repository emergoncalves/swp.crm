# Guia Completo do Laravel - Para quem vem de NestJS, Next.js e WordPress

## Índice

1. [Visão Geral: Como o Laravel se Compara](#1-visão-geral)
2. [Arquitetura do Projeto](#2-arquitetura)
3. [Rotas (equivalente a Controllers no NestJS)](#3-rotas)
4. [Controllers](#4-controllers)
5. [Models e Eloquent ORM](#5-models)
6. [Migrations (Versionamento de Banco)](#6-migrations)
7. [Middleware](#7-middleware)
8. [Autenticação](#8-autenticação)
9. [Inertia.js + React (Frontend)](#9-inertia)
10. [Validação de Dados](#10-validação)
11. [Blade Templates](#11-blade)
12. [Configuração e Ambiente](#12-configuração)
13. [Artisan CLI (equivalente a npm scripts)](#13-artisan)
14. [Serviços e Providers](#14-serviços)
15. [Filas e Jobs](#15-filas)
16. [Eventos e Listeners](#16-eventos)
17. [Testes](#17-testes)
18. [Comparação Direta: Laravel vs NestJS](#18-comparação)
19. [Mapa do Projeto CRM Atual](#19-mapa-projeto)

---

## 1. Visão Geral: Como o Laravel se Compara {#1-visão-geral}

### Laravel vs NestJS (Backend)

| Conceito | NestJS | Laravel |
|----------|--------|---------|
| Linguagem | TypeScript | PHP |
| Framework | NestJS | Laravel |
| ORM | TypeORM / Prisma | Eloquent |
| Validação | Pipes / class-validator | Form Requests / `$request->validate()` |
| Injeção de Dependência | Decorators + Container | Service Providers |
| Middleware | Guards + Interceptors | Middleware |
| Configuração | `@nestjs/config` | `config/*.php` + `.env` |
| CLI | `nest generate` | `php artisan make:*` |
| Testes | Jest | PHPUnit |

### Laravel vs Next.js (Frontend)

| Conceito | Next.js | Laravel + React (Inertia) |
|----------|---------|---------------------------|
| Rendering | SSR/SSG/CSR | SSR via Inertia |
| Rotas | Pastas `app/` ou `pages/` | `routes/web.php` |
| State | React state/context | Props do Inertia |
| API Routes | `app/api/` | Controllers PHP |
| Autenticação | NextAuth.js | Laravel Breeze/Sanctum |

### Laravel vs WordPress

| Conceito | WordPress | Laravel |
|----------|-----------|---------|
| PHP | Sim | Sim |
| Banco | MySQL (wp_posts, wp_options) | MySQL/SQLite (migrations) |
| Admin | wp-admin (GUI) | Customizado (código) |
| Templates | PHP templates + hooks | Blade + React |
| Plugins | hooks/filters | Packages Composer |
| Autenticação | wp-login.php | Laravel Breeze |
| Customização | Limitada | Total |

### O que é Laravel exatamente?

Laravel é um **framework PHP para backend**. Pense nele como:
- **NestJS** → mas escrito em PHP ao invés de TypeScript
- **WordPress** → mas você escreve tudo customizado, sem限制ações de GUI
- **Estrutura** → Organiza seu código em pastas com convenções claras

---

## 2. Arquitetura do Projeto {#2-arquitetura}

### Estrutura de Pastas

```
swp-crm/
├── app/                    # Código da aplicação (PHP)
│   ├── Http/               # Controllers, Middleware, Form Requests
│   │   ├── Controllers/    # Lógica de cada rota
│   │   ├── Middleware/      # Interceptadores de requisição
│   │   └── Requests/       # Validação de dados
│   ├── Models/             # Modelos Eloquent (tabelas do banco)
│   └── Providers/          # Service Providers (injeção de dependência)
│
├── bootstrap/              # Inicialização da aplicação
│   └── app.php             # Cria a instância do app (como main.ts no NestJS)
│
├── config/                 # Arquivos de configuração (PHP)
│   ├── app.php             # Nome, timezone, locale
│   ├── auth.php            # Autenticação
│   ├── database.php        # Conexões de banco
│   ├── mail.php            # Configuração de email
│   └── ...
│
├── database/               # Banco de dados
│   ├── migrations/         # "Commits" do banco de dados
│   ├── seeders/            # Dados iniciais/testes
│   ├── factories/          # Geradores de dados fake
│   └── database.sqlite     # Banco SQLite (desenvolvimento)
│
├── public/                 # Pasta pública (web root)
│   └── index.php           # Ponto de entrada (como server.ts)
│
├── resources/              # Frontend
│   ├── js/                 # React JSX
│   │   ├── Pages/          # Páginas React (como app/ no Next.js)
│   │   ├── Components/     # Componentes React
│   │   └── Layouts/        # Layouts compartilhados
│   └── views/              # Blade templates
│       └── app.blade.php   # Template raiz do Inertia
│
├── routes/                 # Definição de rotas
│   ├── web.php             # Rotas web (session-based)
│   ├── auth.php            # Rotas de autenticação
│   └── console.php         # Comandos Artisan
│
├── storage/                # Logs, cache, uploads
├── tests/                  # Testes PHPUnit
├── vendor/                 # Dependências PHP (como node_modules)
├── composer.json           # Dependências PHP (como package.json)
├── .env                    # Variáveis de ambiente
└── vite.config.js          # Configuração do build frontend
```

### Fluxo de uma Requisição

```
Browser → public/index.php → bootstrap/app.php → Rotas → Middleware → Controller → Response
```

Isso é similar ao NestJS:
```
Request → main.ts → Guards → Interceptors → Controller → Response
```

---

## 3. Rotas {#3-rotas}

### Conceito
Rotas definem **quais URLs** existem na aplicação e **quem as processa**. No NestJS, isso é feito com decorators (`@Get()`, `@Post()`) nos controllers. No Laravel, é um arquivo separado.

### Arquivo: `routes/web.php`

```php
// Rota simples
Route::get('/', function () {
    return redirect()->route('login');
});
```

**Equivalente NestJS:**
```typescript
@Controller()
export class AppController {
  @Get('/')
  redirect() {
    return this.router.redirect('/login');
  }
}
```

### Rotas de Recurso (CRUD)

```php
Route::resource('companies', CompanyController::class)->except('show');
```

Isso cria **6 rotas automaticamente** (menos `show`):

| Método | URL | Ação | Equivalente NestJS |
|--------|-----|------|--------------------|
| GET | `/companies` | `index` (listar) | `@Get('companies')` |
| GET | `/companies/create` | `create` (formulário) | `@Get('companies/create')` |
| POST | `/companies` | `store` (salvar) | `@Post('companies')` |
| GET | `/companies/{id}/edit` | `edit` (formulário) | `@Get('companies/:id/edit')` |
| PUT/PATCH | `/companies/{id}` | `update` (atualizar) | `@Put('companies/:id')` |
| DELETE | `/companies/{id}` | `destroy` (deletar) | `@Delete('companies/:id')` |

### Middleware nas Rotas

```php
// Grupo com middleware
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('companies', CompanyController::class)->except('show');
});
```

**Equivalente NestJS (Guards):**
```typescript
@Controller('companies')
@UseGuards(AuthGuard, VerifiedGuard)
export class CompaniesController { ... }
```

### Nomeação de Rotas

```php
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
```

Usado assim:
```php
redirect()->route('dashboard');  // Redireciona para /dashboard
route('dashboard');              // Gera a URL /dashboard
```

**Equivalente Next.js:** `router.push('/dashboard')` ou `useRouter()`

---

## 4. Controllers {#4-controllers}

### Conceito
Controllers contêm a **lógica de cada rota**. No NestJS, são classes com decorators. No Laravel, são classes simples com métodos públicos.

### Exemplo: `CompanyController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    // LISTAR (index)
    public function index(Request $request)
    {
        $companies = Company::query()
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15);

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
            'filters' => $request->only('search'),
        ]);
    }

    // CRIAR (store)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'website' => 'nullable|string|max:255',
        ]);

        Company::create($validated);

        return redirect()->route('companies.index');
    }

    // EDITAR (edit)
    public function edit(Company $company)
    {
        return Inertia::render('Companies/Edit', [
            'company' => $company,
        ]);
    }

    // ATUALIZAR (update)
    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([...]);
        $company->update($validated);
        return redirect()->route('companies.index');
    }

    // DELETAR (destroy)
    public function destroy(Company $company)
    {
        $company->delete();
        return redirect()->route('companies.index');
    }
}
```

### Equivalente NestJS

```typescript
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  findAll(@Query() query) {
    return this.companiesService.findAll(query);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }
}
```

### Diferenças Importantes

| NestJS | Laravel |
|--------|---------|
| Injeção via construtor | Model importado diretamente |
| DTOs para validação | `$request->validate()` inline |
| Return JSON | Return `Inertia::render()` ou `redirect()` |
| `@Param('id')` | `Route model binding` (automático) |

### Route Model Binding (Mágico do Laravel)

No `edit` e `update`, note que o método recebe `Company $company`:

```php
public function edit(Company $company)
```

O Laravel **automaticamente** busca o Company pelo ID da URL e injeta o objeto. Se o ID não existir, retorna 404.

**Equivalente NestJS:**
```typescript
@Get(':id')
findOne(@Param('id') id: string) {
  return this.companiesService.findOne(id);
}
```

---

## 5. Models e Eloquent ORM {#5-models}

### Conceito
Eloquent é o **ORM do Laravel**. Cada model representa uma **tabela do banco**. É similar ao TypeORM ou Prisma no NestJS.

### Exemplo: `Company.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    // Campos que podem ser preenchidos em massa
    protected $fillable = ['name', 'website', 'phone', 'address', 'notes'];

    // Relacionamento: Uma empresa tem muitos contatos
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    // Relacionamento: Uma empresa tem muitos negócios
    public function deals(): HasMany
    {
        return $this->hasMany(Deal::class);
    }
}
```

### Equivalente NestJS (TypeORM)

```typescript
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Contact, contact => contact.company)
  contacts: Contact[];
}
```

### Relacionamentos

#### One-to-Many (Um para Muitos)

```php
// Company hasMany Contact
public function contacts(): HasMany
{
    return $this->hasMany(Contact::class);
}

// Contact belongsTo Company
public function company(): BelongsTo
{
    return $this->belongsTo(Company::class);
}
```

**Uso:**
```php
$company = Company::find(1);
$company->contacts; // Collection de contatos
$company->contacts()->where('name', 'João')->first();

$contact = Contact::find(1);
$contact->company; // Objeto Company
```

**Equivalente Prisma:**
```prisma
model Company {
  id       Int       @id @default(autoincrement())
  name     String
  contacts Contact[]
}

model Contact {
  id       Int     @id @default(autoincrement())
  company  Company @relation(fields: [companyId], references: [id])
  companyId Int
}
```

### Tipos de Relacionamento

| Tipo | Laravel | Exemplo |
|------|---------|---------|
| One-to-One | `hasOne()` | User hasOne Profile |
| One-to-Many | `hasMany()` | Company hasMany Contacts |
| Many-to-One | `belongsTo()` | Contact belongsTo Company |
| Many-to-Many | `belongsToMany()` | User belongsToMany Roles (tabela pivô) |

### Consultas Eloquent

```php
// Buscar todos
$companies = Company::all();

// Buscar por ID
$company = Company::find(1);

// Buscar ou falhar
$company = Company::findOrFail(1);

// Filtros
$companies = Company::where('name', 'like', '%Tech%')
    ->orderBy('created_at', 'desc')
    ->paginate(15);

// Criar
Company::create(['name' => 'Acme Corp']);

// Atualizar
$company->update(['name' => 'Acme Corp 2.0']);

// Deletar
$company->delete();

// Eager loading (evitar N+1)
$contacts = Contact::with('company', 'deals')->get();

// where com callback
$companies = Company::query()
    ->when($search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
    ->get();
```

### Equivalente Prisma

```typescript
// Buscar todos
prisma.company.findMany()

// Filtros
prisma.company.findMany({
  where: { name: { contains: 'Tech' } },
  orderBy: { createdAt: 'desc' },
  take: 15
})

// Criar
prisma.company.create({ data: { name: 'Acme Corp' } })

// Eager loading
prisma.contact.findMany({
  include: { company: true, deals: true }
})
```

---

## 6. Migrations {#6-migrations}

### Conceito
Migrations são o **versionamento do banco de dados**. Cada migration é um "commit" do schema. No NestJS, você usaria `typeorm migration:generate`.

### Estrutura

```
database/migrations/
├── 0001_01_01_000000_create_users_table.php
├── 0001_01_01_000001_create_cache_table.php
├── 0001_01_01_000002_create_jobs_table.php
├── 2026_06_29_152223_create_companies_table.php
├── 2026_06_29_152223_create_contacts_table.php
├── 2026_06_29_152223_create_deals_table.php
└── 2026_06_29_152223_create_tasks_table.php
```

### Exemplo: Migration de Companies

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('website')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
```

### Exemplo: Migration com ForeignKey

```php
Schema::create('contacts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('company_id')
          ->nullable()
          ->constrained()          // Cria FK para companies.id
          ->nullOnDelete();        // Se deletar company, seta NULL no contato
    $table->string('name');
    $table->string('email')->nullable();
    $table->timestamps();
});
```

### Métodos de Coluna

```php
$table->id();                    // BIGINT auto-increment
$table->string('name');          // VARCHAR
$table->string('name', 100);     // VARCHAR(100)
$table->text('notes');           // TEXT
$table->integer('age');          // INT
$table->decimal('value', 12, 2); // DECIMAL(12,2)
$table->boolean('active');       // BOOLEAN
$table->date('birth_date');      // DATE
$table->timestamp('created_at'); // TIMESTAMP
$table->json('data');            // JSON
$table->enum('status', ['a','b']); // ENUM

// Modificadores
$table->string('name')->nullable();         // Pode ser NULL
$table->string('name')->default('N/A');     // Valor padrão
$table->string('name')->unique();           // UNIQUE
$table->string('name')->index();            // INDEX
$table->string('name')->comment('Nome');    // Comentário
```

### Equivalente NestJS (TypeORM)

```typescript
// Migration TypeORM
export class CreateCompanies1719655200000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
}
```

### Comandos Artisan

```bash
php artisan make:migration create_companies_table   # Criar migration
php artisan migrate                                  # Executar pendentes
php artisan migrate:rollback                         # Desfazer última
php artisan migrate:fresh                           # Drop + migrate (cuidado!)
```

---

## 7. Middleware {#7-middleware}

### Conceito
Middleware é um **"gatekeeper"** que intercepta todas as requisições antes de chegar ao controller. No NestJS, são Guards + Interceptors.

### Middleware Padrão do Laravel

```
Request → VerifyCsrfToken → EncryptCookies → StartSession → HandleInertiaRequests → Controller
```

**Equivalente NestJS:**
```
Request → RateLimitGuard → AuthGuard → RolesGuard → Controller
```

### Middleware Customizado

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user()->isAdmin()) {
            return redirect('/dashboard');
        }

        return $next($request);
    }
}
```

**Uso:**
```php
Route::middleware(['auth', EnsureUserIsAdmin::class])->group(function () {
    Route::resource('companies', CompanyController::class);
});
```

**Equivalente NestJS:**
```typescript
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.user.isAdmin;
  }
}
```

### Middleware Groups

```php
// bootstrap/app.php
$middleware->web(append: [
    HandleInertiaRequests::class,
]);
```

Groups são aplicados automaticamente a todas as rotas web.

### Classe de Middleware no Projeto

`app/Http/Middleware/HandleInertiaRequests.php` - Compartilha dados do usuário com todas as páginas React:

```php
public function share(Request $request): array
{
    return [
        'auth' => [
            'user' => $request->user(),
        ],
    ];
}
```

---

## 8. Autenticação {#8-autenticação}

### Como Funciona no Projeto

O projeto usa **Laravel Breeze** (scaffolding de autenticação). O Breeze gera tudo pronto.

### Fluxo de Login

```
1. Usuário acessa /login (GET)
2. Preenche formulário (email + password)
3. Envia POST /login
4. LoginRequest valida (throttle: 5 tentativas)
5. Auth::attempt() verifica credenciais
6. Session é criada
7. Redireciona para /dashboard
```

### Controllers de Auth (Breeze)

```
app/Http/Controllers/Auth/
├── AuthenticatedSessionController.php    # Login/Logout
├── RegisteredUserController.php          # Registro
├── PasswordController.php                # Mudar senha
├── PasswordResetLinkController.php       # Esqueci senha
├── NewPasswordController.php             # Resetar senha
├── ConfirmablePasswordController.php     # Confirmar senha
├── EmailVerificationPromptController.php # Verificação
├── EmailVerificationNotificationController.php
└── VerifyEmailController.php
```

### Rotas de Auth (`routes/auth.php`)

```php
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create']);
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::get('login', [AuthenticatedSessionController::class, 'create']);
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    // ...
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
    // ...
});
```

### Equivalente NestJS

```typescript
// NestJS com @nestjs/passport
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
```

### Diferença: Session vs Token

| Laravel (Breeze) | NestJS |
|-------------------|--------|
| Session-based | Token-based (JWT) |
| Cookie no browser | Header Authorization |
| Stateful (servidor guarda estado) | Stateless |
| Não precisa de storage extra | Precisa de blacklist/refresh |

### Sanctum (API Tokens - não usado ainda)

O projeto tem `laravel/sanctum` instalado mas não usa. Sanctum permite:
- API token authentication (como JWT)
- SPA authentication via cookie
- Mobile app authentication

---

## 9. Inertia.js + React {#9-inertia}

### Conceito
Inertia.js conecta Laravel (backend) com React (frontend) como se fosse uma aplicação monolithic. Não tem API separada - o controller retorna uma **página React** em vez de JSON.

### Fluxo

```
Browser → GET /companies
       → Laravel Route → CompanyController@index
       → Inertia::render('Companies/Index', ['companies' => $data])
       → Response HTML (React component hydratado com dados)
       → Browser renderiza React
```

**Equivalente Next.js:**
```
Browser → GET /companies
       → Next.js pages/companies/index.tsx
       → getServerSideProps() busca dados
       → renderiza React
```

### Como o Controller Renderiza

```php
// CompanyController.php
public function index(Request $request)
{
    $companies = Company::paginate(15);

    // Inertia renderiza o componente React 'Companies/Index'
    // e passa os dados como props
    return Inertia::render('Companies/Index', [
        'companies' => $companies,  // Vira props.companies no React
    ]);
}
```

### Como o React Recebe

```jsx
// resources/js/Pages/Companies/Index.jsx
import { usePage } from '@inertiajs/react';

export default function Index({ companies, filters }) {
    // companies é um objeto paginated do Laravel
    // companies.data = array de empresas
    // companies.links = links de paginação

    return (
        <div>
            {companies.data.map(company => (
                <div key={company.id}>{company.name}</div>
            ))}
        </div>
    );
}
```

### Navegação no React

```jsx
import { router } from '@inertiajs/react';

// GET /companies?search=tech (preserva filtros)
router.get('/companies', { search: 'tech' });

// POST /companies (criar)
router.post('/companies', { name: 'Acme Corp' });

// PUT /companies/1 (atualizar)
router.put('/companies/1', { name: 'Acme Corp 2.0' });

// DELETE /companies/1
router.delete('/companies/1');

// Redirect
router.visit('/dashboard');
```

**Equivalente Next.js:**
```typescript
import { useRouter } from 'next/router';
router.push('/companies');
```

### Por que não API + React separado?

| Abordagem | Prós | Contras |
|-----------|------|---------|
| **Inertia (atual)** | Simples, sem CORS, sem API tokens | Acoplado, não funciona para mobile |
| **API + SPA** | Independente, mobile-ready | Mais complexo, CORS, tokens |
| **Livewire** | Laravel puro, sem JS | Limitado em interatividade |

---

## 10. Validação de Dados {#10-validação}

### No Controller (Atual)

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'website' => 'nullable|string|max:255',
        'phone' => 'nullable|string|max:255',
    ]);

    Company::create($validated);
}
```

### Equivalente NestJS

```typescript
// DTO com class-validator
export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  website?: string;
}

// Pipe no controller
@Post()
create(@Body() createCompanyDto: CreateCompanyDto) {
  return this.companiesService.create(createCompanyDto);
}
```

### Regras de Validação Comuns

```php
'nome' => 'required|string|max:255',          // Obrigatório, string, máx 255
'email' => 'required|email|unique:users',      // Email válido, único na tabela users
'password' => 'required|min:8|confirmed',      // Mín 8, campo password_confirmation
'age' => 'required|integer|min:18|max:120',    // Inteiro entre 18-120
'price' => 'required|numeric|min:0',           // Número >= 0
'photo' => 'required|image|max:2048',          // Imagem, máx 2MB
'tags' => 'required|array',                    // Array obrigatório
'tags.*' => 'string',                          // Cada item é string
'website' => 'nullable|url',                   // URL válida ou null
'start_date' => 'required|date|after:today',   // Data futura
```

### Form Requests (Recomendado)

Crie classes dedicadas para validação:

```bash
php artisan make:request StoreCompanyRequest
```

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Quem pode usar? (ex: $this->user()->isAdmin())
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'website' => 'nullable|url',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'O nome é obrigatório',
            'website.url' => 'URL inválida',
        ];
    }
}
```

**Uso:**
```php
public function store(StoreCompanyRequest $request)
{
    // Validação já feita! Dados validados em $request->validated()
    Company::create($request->validated());
}
```

---

## 11. Blade Templates {#11-blade}

### Conceito
Blade é o **sistema de templates do Laravel**. No projeto atual, é usado apenas para o template raiz do Inertia. O frontend real é React.

### Template Raiz: `resources/views/app.blade.php`

```html
<!DOCTYPE html>
<html>
<head>
    <title>SWP CRM</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @routes  <!-- Ziggy: rotas Laravel disponíveis no JS -->
</head>
<body>
    @inertia  <!-- Ponto onde React renderiza -->
</body>
</html>
```

### Sintaxe Blade Básica

```php
{{-- Variáveis --}}
<h1>{{ $company->name }}</h1>

{{-- Condicional --}}
@if($companies->count())
    <ul>
        @foreach($companies as $company)
            <li>{{ $company->name }}</li>
        @endforeach
    </ul>
@else
    <p>Nenhuma empresa encontrada</p>
@endif

{{-- Layouts --}}
@extends('layouts.app')

@section('content')
    <h1>Dashboard</h1>
@endsection

{{-- Componentes --}}
<x-alert type="success" message="Empresa criada!" />

{{-- Rotas --}}
<a href="{{ route('companies.index') }}">Ver Empresas</a>
<form action="{{ route('companies.store') }}" method="POST">
    @csrf
    <button type="submit">Salvar</button>
</form>
```

### Equivalente NestJS (Handlebars/Thymeleaf)

```handlebars
<h1>{{company.name}}</h1>

{{#if companies.length}}
  {{#each companies}}
    <li>{{this.name}}</li>
  {{/each}}
{{/if}}
```

---

## 12. Configuração e Ambiente {#12-configuração}

### Arquivo `.env`

```env
APP_NAME="SWP CRM"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/Volumes/WorkSSD/dev/projects/swp-crm/database/database.sqlite

SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

### Arquivos de Configuração (`config/`)

```php
// config/database.php
'default' => env('DB_CONNECTION', 'sqlite'),

'connections' => [
    'sqlite' => [
        'driver' => 'sqlite',
        'database' => env('DB_DATABASE'),
    ],
    'mysql' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        // ...
    ],
],
```

**Equivalente NestJS:**
```typescript
// app.module.ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
    }),
  ],
})
```

### Acessando Config

```php
// No PHP
config('app.name');           // "SWP CRM"
config('database.default');   // "sqlite"

// No .env
env('DB_CONNECTION');         // "sqlite"
```

---

## 13. Artisan CLI {#13-artisan}

### Conceito
Artisan é o **CLI do Laravel**. Equivalente a `nest generate` ou `npm run` scripts.

### Comandos Mais Usados

```bash
# Criar controllers
php artisan make:controller CompanyController --resource
php artisan make:controller CompanyController --model=Company

# Criar models
php artisan make:model Company
php artisan make:model Company -mrc  # Model + Migration + Controller + Factory

# Criar migrations
php artisan make:migration create_companies_table
php artisan make:migration add_email_to_contacts_table --table=contacts

# Criar Form Requests
php artisan make:request StoreCompanyRequest

# Criar middleware
php artisan make:middleware EnsureUserIsAdmin

# Criar jobs
php artisan make:job SendWelcomeEmail

# Criar eventos
php artisan make:event CompanyCreated

# Criar seeders
php artisan make:seeder CompanySeeder

# Criar testes
php artisan make:test CompanyTest --unit
php artisan make:test CompanyTest --pest

# Banco de dados
php artisan migrate
php artisan migrate:rollback
php artisan migrate:fresh --seed

# Rodar o servidor
php artisan serve                    # http://localhost:8000
php artisan serve --port=3000

# Tinker (REPL)
php artisan tinker                   # Console interativo

# Limpar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Ver rotas
php artisan route:list
```

**Equivalente NestJS:**
```bash
nest generate controller companies
nest generate service companies
nest generate module companies
nest generate guard auth
```

---

## 14. Serviços e Providers {#14-serviços}

### Service Providers

Providers são como **módulos** no NestJS. Registram services no container de DI.

```php
// app/Providers/AppServiceProvider.php
use Illuminate\Support\ServiceProvider;
use App\Services\CompanyService;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(CompanyService::class, function ($app) {
            return new CompanyService();
        });
    }

    public function boot(): void
    {
        // Código que roda na inicialização
    }
}
```

**Equivalente NestJS:**
```typescript
@Module({
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
```

### Service Classes (Padrão Atual - Não existe)

O projeto **não usa Services** - a lógica está direto nos controllers. Para adicionar:

```bash
mkdir -p app/Services
```

```php
// app/Services/CompanyService.php
namespace App\Services;

use App\Models\Company;

class CompanyService
{
    public function create(array $data): Company
    {
        // Lógica complexa de criação
        return Company::create($data);
    }

    public function getCompaniesWithStats()
    {
        return Company::withCount(['contacts', 'deals'])
            ->with('contacts')
            ->get();
    }
}
```

### Uso no Controller

```php
class CompanyController extends Controller
{
    public function __construct(
        private CompanyService $companyService
    ) {}

    public function store(Request $request)
    {
        $this->companyService->create($request->validated());
    }
}
```

---

## 15. Filas e Jobs {#15-filas}

### Conceito
Filas permitem executar tarefas **assíncronas** (envio de email, processamento de imagem, etc.). Equivalente a Bull/Queue no NestJS.

### Criar um Job

```bash
php artisan make:job SendWelcomeEmail
```

```php
// app/Jobs/SendWelcomeEmail.php
namespace App\Jobs;

use App\Models\User;
use App\Mail\WelcomeMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendWelcomeEmail implements ShouldQueue
{
    use InteractsWithQueue, Queueable;

    public function __construct(
        private User $user
    ) {}

    public function handle(): void
    {
        Mail::to($this->user->email)->send(new WelcomeMail($this->user));
    }
}
```

### Disparar Jobs

```php
// No controller
SendWelcomeEmail::dispatch($user);

// Com delay
SendWelcomeEmail::dispatch($user)->delay(now()->addMinutes(5));
```

### Configuração

```env
QUEUE_CONNECTION=database  # ou redis, sqs, etc.
```

```bash
php artisan queue:work     # Processar filas
php artisan queue:listen   # Monitorar
```

---

## 16. Eventos e Listeners {#16-eventos}

### Conceito
Eventos implementam **Observer Pattern**. Quando algo acontece, dispara um evento que outros "ouvem".

### Criar Evento

```bash
php artisan make:event CompanyCreated
php artisan make:listener SendCompanyWelcomeEmail
```

```php
// app/Events/CompanyCreated.php
namespace App\Events;

use App\Models\Company;

class CompanyCreated
{
    public function __construct(
        public Company $company
    ) {}
}

// app/Listeners/SendCompanyWelcomeEmail.php
namespace App\Listeners;

use App\Events\CompanyCreated;

class SendCompanyWelcomeEmail
{
    public function handle(CompanyCreated $event): void
    {
        // Enviar email quando empresa é criada
    }
}
```

### Registrar no Provider

```php
// app/Providers/EventServiceProvider.php
protected $listen = [
    CompanyCreated::class => [
        SendCompanyWelcomeEmail::class,
    ],
];
```

### Disparar Evento

```php
// No controller
event(new CompanyCreated($company));
```

---

## 17. Testes {#17-testes}

### Estrutura

```
tests/
├── Feature/     # Testes de integração (HTTP requests, DB)
├── Unit/        # Testes unitários (classes isoladas)
└── TestCase.php # Classe base
```

### Exemplo: Teste Feature

```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CompanyTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_companies(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->get('/companies');

        $response->assertStatus(200);
    }

    public function test_can_create_company(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/companies', [
                'name' => 'Acme Corp',
            ]);

        $response->assertRedirect('/companies');
        $this->assertDatabaseHas('companies', ['name' => 'Acme Corp']);
    }

    public function test_cannot_create_company_without_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->post('/companies', []);

        $response->assertSessionHasErrors('name');
    }
}
```

### Comandos

```bash
php artisan test                          # Rodar todos
php artisan test --filter=CompanyTest      # Rodar arquivo específico
php artisan test --filter=test_can_create  # Rodar teste específico
php artisan test --parallel                # Paralelo
```

---

## 18. Comparação Direta: Laravel vs NestJS {#18-comparação}

### Estrutura de Pastas

| NestJS | Laravel |
|--------|---------|
| `src/` | `app/` |
| `src/controllers/` | `app/Http/Controllers/` |
| `src/services/` | `app/Services/` (não existe ainda) |
| `src/modules/` | `app/Providers/` |
| `src/guards/` | `app/Http/Middleware/` |
| `src/dto/` | `app/Http/Requests/` |
| `src/entities/` | `app/Models/` |
| `src/migrations/` | `database/migrations/` |
| `src/app.module.ts` | `bootstrap/app.php` |
| `src/main.ts` | `public/index.php` |
| `.env` | `.env` |

### Ciclo de Vida

| Etapa | NestJS | Laravel |
|-------|--------|---------|
| Inicialização | `NestFactory.create(AppModule)` | `bootstrap/app.php` |
| Módulos | `@Module({ imports })` | `AppServiceProvider` |
| Roteamento | `@Controller('path')` | `routes/web.php` |
| Guards/Middleware | `@UseGuards()` | `->middleware()` |
| Validação | `@UsePipes()` + DTO | `$request->validate()` |
| Response | `@HttpCode(200)` | `return response()` |

### Exemplo Completo Comparado

**NestJS:**
```typescript
// company.entity.ts
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

// company.dto.ts
export class CreateCompanyDto {
  @IsString()
  name: string;
}

// company.service.ts
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepo: Repository<Company>,
  ) {}

  create(dto: CreateCompanyDto) {
    return this.companiesRepo.save(dto);
  }

  findAll() {
    return this.companiesRepo.find();
  }
}

// company.controller.ts
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }
}

// company.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
```

**Laravel:**
```php
// app/Models/Company.php
class Company extends Model
{
    protected $fillable = ['name'];
}

// app/Http/Controllers/CompanyController.php
class CompanyController extends Controller
{
    public function index()
    {
        return Inertia::render('Companies/Index', [
            'companies' => Company::paginate(15),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(['name' => 'required']);
        Company::create($validated);
        return redirect()->route('companies.index');
    }
}

// routes/web.php
Route::resource('companies', CompanyController::class);
```

---

## 19. Mapa do Projeto CRM Atual {#19-mapa-projeto}

### Diagrama de Entidades

```
┌─────────────┐       ┌─────────────┐
│   Company    │       │   Contact   │
│─────────────│       │─────────────│
│ id          │──┐    │ id          │
│ name        │  ├───>│ company_id  │
│ website     │  │    │ name        │
│ phone       │  │    │ email       │
│ address     │  │    │ phone       │
│ notes       │  │    │ job_title   │
│ created_at  │  │    │ notes       │
│ updated_at  │  │    │ created_at  │
└─────────────┘  │    └─────────────┘
                 │           │
                 │           │ hasMany
                 │           ▼
                 │    ┌─────────────┐
                 │    │    Task     │
                 │    │─────────────│
                 │    │ id          │
                 │    │ contact_id  │<──┐
                 │    │ deal_id     │───┘
                 │    │ title       │
                 │    │ description │
                 │    │ due_date    │
                 │    │ status      │
                 │    └─────────────┘
                 │
                 └───>┌─────────────┐
                      │    Deal     │
                      │─────────────│
                      │ id          │
                      │ company_id  │<──┐
                      │ contact_id  │───┘
                      │ title       │
                      │ value       │
                      │ status      │
                      │ expected_close_date│
                      │ notes       │
                      └─────────────┘
```

### Fluxo CRUD (Criar Empresa)

```
1. Usuário clica "Nova Empresa"
   → React: router.get('/companies/create')
   → Laravel: CompanyController@create()
   → Retorna: Inertia::render('Companies/Create')

2. Usuário preenche formulário
   → React: <form onSubmit={handleSubmit}>
   → dados: { name: 'Acme', website: 'acme.com' }

3. Usuário envia
   → React: router.post('/companies', data)
   → Laravel: CompanyController@store()
   → Valida: $request->validate([...])
   → Cria: Company::create($validated)
   → Redireciona: redirect()->route('companies.index')

4. Browser recebe redirect
   → GET /companies
   → CompanyController@index()
   → Lista empresas atualizada
```

### Para Entender o Código

| Quer entender... | Leia o arquivo |
|-------------------|----------------|
| Por que a rota existe | `routes/web.php` |
| O que a rota faz | `app/Http/Controllers/CompanyController.php` |
| Estrutura da tabela | `database/migrations/2026_06_29_152223_create_companies_table.php` |
| Relacionamentos | `app/Models/Company.php` |
| Frontend da página | `resources/js/Pages/Companies/Index.jsx` |
| Layout geral | `resources/js/Layouts/AuthenticatedLayout.jsx` |
| Validação | `$request->validate()` dentro do controller |

---

## Dicas Rápidas

### Atalhos do Desenvolvedor

```bash
php artisan serve              # Rodar servidor (localhost:8000)
php artisan tinker             # Console interativo (como node REPL)
php artisan route:list         # Ver todas as rotas
php artisan migrate            # Rodar migrations
php artisan make:model X -mrc # Criar Model + Migration + Controller
```

### Estrutura de Arquivos

| Tipo | Localização |
|------|-------------|
| Lógica de rotas | `app/Http/Controllers/` |
| Regras de negócio | `app/Services/` (não existe ainda) |
| Consultas ao banco | `app/Models/` |
| Validação | `app/Http/Requests/` ou inline no controller |
| Frontend | `resources/js/Pages/` |
| Configuração | `config/*.php` |
| Migrations | `database/migrations/` |

### Referências

- [Documentação Oficial Laravel](https://laravel.com/docs/13.x)
- [Eloquent ORM](https://laravel.com/docs/13.x/eloquent)
- [Routing](https://laravel.com/docs/13.x/routing)
- [Inertia.js](https://inertiajs.com/)
- [Laravel Breeze](https://laravel.com/docs/13.x/starter-kits#laravel-breeze)
