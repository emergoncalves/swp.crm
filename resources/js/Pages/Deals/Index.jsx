import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import KanbanBoard from '@/Components/KanbanBoard';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusLabels = { open: 'Aberto', won: 'Ganho', lost: 'Perdido' };
const statusColors = {
    open: 'bg-amber-100 text-amber-800',
    won: 'bg-emerald-100 text-emerald-800',
    lost: 'bg-red-100 text-red-800',
};

export default function Index({ deals, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [view, setView] = useState('kanban');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('deals.index'), { search }, { preserveState: true });
    };

    const allDeals = deals.data || deals;

    return (
        <AuthenticatedLayout header="Negócios">
            <Head title="Negócios" />

            <div className="crm-page-header">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar negócio..."
                                className="w-72 rounded-lg border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                            />
                        </form>
                    </div>

                    {/* View toggle */}
                    <div className="flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
                        <button
                            onClick={() => setView('kanban')}
                            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                view === 'kanban'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            Kanban
                        </button>
                        <button
                            onClick={() => setView('table')}
                            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                                view === 'table'
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.375" />
                            </svg>
                            Tabela
                        </button>
                    </div>
                </div>

                <Link href={route('deals.create')} className="crm-btn-primary">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Novo Negócio
                </Link>
            </div>

            {view === 'kanban' ? (
                <KanbanBoard deals={allDeals} />
            ) : (
                <div className="crm-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="crm-table">
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Contato</th>
                                    <th>Empresa</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allDeals.map((deal) => (
                                    <tr key={deal.id}>
                                        <td className="font-medium text-slate-900">{deal.title}</td>
                                        <td className="font-semibold text-slate-900">
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(deal.value)}
                                        </td>
                                        <td>
                                            <span className={`crm-badge ${statusColors[deal.status]}`}>
                                                {statusLabels[deal.status]}
                                            </span>
                                        </td>
                                        <td className="text-slate-600">{deal.contact?.name || '-'}</td>
                                        <td className="text-slate-600">{deal.company?.name || '-'}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route('deals.edit', deal)}
                                                    className="crm-btn-ghost"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Tem certeza que deseja excluir este negócio?')) {
                                                            router.delete(route('deals.destroy', deal));
                                                        }
                                                    }}
                                                    className="crm-btn-ghost text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {view === 'table' && deals.last_page > 1 && (
                <div className="mt-4 flex justify-center gap-1">
                    {deals.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
}
