import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

const statusLabels = { pending: 'Pendente', done: 'Concluída' };
const statusColors = {
    pending: 'bg-amber-100 text-amber-800',
    done: 'bg-emerald-100 text-emerald-800',
};

export default function Index({ tasks, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('tasks.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Tarefas">
            <Head title="Tarefas" />

            <div className="crm-page-header">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar tarefa..."
                            className="w-72 rounded-lg border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                    </form>
                </div>

                <Link href={route('tasks.create')} className="crm-btn-primary">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nova Tarefa
                </Link>
            </div>

            <div className="crm-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="crm-table">
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Status</th>
                                <th>Vencimento</th>
                                <th>Contato</th>
                                <th>Negócio</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.data.map((task) => (
                                <tr key={task.id}>
                                    <td className="font-medium text-slate-900">{task.title}</td>
                                    <td>
                                        <span className={`crm-badge ${statusColors[task.status]}`}>
                                            {statusLabels[task.status]}
                                        </span>
                                    </td>
                                    <td className="text-slate-600">
                                        {task.due_date ? new Date(task.due_date).toLocaleDateString('pt-BR') : '-'}
                                    </td>
                                    <td className="text-slate-600">{task.contact?.name || '-'}</td>
                                    <td className="text-slate-600">{task.deal?.title || '-'}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <Link
                                                href={route('tasks.edit', task)}
                                                className="crm-btn-ghost"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                                                        router.delete(route('tasks.destroy', task));
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

            {tasks.last_page > 1 && (
                <div className="mt-4 flex justify-center gap-1">
                    {tasks.links.map((link, i) => (
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
