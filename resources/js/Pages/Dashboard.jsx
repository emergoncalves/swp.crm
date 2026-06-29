import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

const stats = [
    {
        name: 'Empresas',
        href: 'companies.index',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
        ),
        color: 'bg-blue-500',
        lightColor: 'bg-blue-50',
        textColor: 'text-blue-600',
    },
    {
        name: 'Contatos',
        href: 'contacts.index',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
        color: 'bg-emerald-500',
        lightColor: 'bg-emerald-50',
        textColor: 'text-emerald-600',
    },
    {
        name: 'Negócios Abertos',
        href: 'deals.index',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'bg-amber-500',
        lightColor: 'bg-amber-50',
        textColor: 'text-amber-600',
    },
    {
        name: 'Tarefas Pendentes',
        href: 'tasks.index',
        icon: (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'bg-primary-500',
        lightColor: 'bg-primary-50',
        textColor: 'text-primary-600',
    },
];

export default function Dashboard({ stats: dashboardStats, pendingTasks, recentDeals }) {
    const statValues = [dashboardStats.companies, dashboardStats.contacts, dashboardStats.openDeals, dashboardStats.pendingTasks];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Stats grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Link
                        key={stat.name}
                        href={route(stat.href)}
                        className="crm-card group p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="crm-stat-label">{stat.name}</p>
                                <p className="crm-stat-value mt-1">{statValues[index]}</p>
                            </div>
                            <div className={`rounded-xl ${stat.lightColor} p-3 ${stat.textColor} transition-transform group-hover:scale-110`}>
                                {stat.icon}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Content grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Pending tasks */}
                <div className="crm-card">
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                        <h3 className="crm-section-title mb-0">Próximas Tarefas</h3>
                        <Link href={route('tasks.index')} className="text-sm font-medium text-primary-500 hover:text-primary-600">
                            Ver todas
                        </Link>
                    </div>
                    <div className="p-6">
                        {pendingTasks.length === 0 ? (
                            <div className="flex flex-col items-center py-8 text-center">
                                <svg className="mb-3 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-slate-500">Nenhuma tarefa pendente</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {pendingTasks.map((task) => (
                                    <li key={task.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-900">{task.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {task.due_date && new Date(task.due_date).toLocaleDateString('pt-BR')}
                                                {task.contact && ` — ${task.contact.name}`}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Recent deals */}
                <div className="crm-card">
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                        <h3 className="crm-section-title mb-0">Negócios Recentes</h3>
                        <Link href={route('deals.index')} className="text-sm font-medium text-primary-500 hover:text-primary-600">
                            Ver todos
                        </Link>
                    </div>
                    <div className="p-6">
                        {recentDeals.length === 0 ? (
                            <div className="flex flex-col items-center py-8 text-center">
                                <svg className="mb-3 h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-slate-500">Nenhum negócio registrado</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {recentDeals.map((deal) => (
                                    <li key={deal.id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:bg-slate-50">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-900">{deal.title}</p>
                                            <p className="text-xs text-slate-500">
                                                {new Intl.NumberFormat('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                }).format(deal.value)}
                                                {deal.contact && ` — ${deal.contact.name}`}
                                                {deal.company && ` (${deal.company.name})`}
                                            </p>
                                        </div>
                                        <span className={`crm-badge ${
                                            deal.status === 'won' ? 'bg-emerald-100 text-emerald-800' :
                                            deal.status === 'lost' ? 'bg-red-100 text-red-800' :
                                            'bg-amber-100 text-amber-800'
                                        }`}>
                                            {deal.status === 'won' ? 'Ganho' : deal.status === 'lost' ? 'Perdido' : 'Aberto'}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
