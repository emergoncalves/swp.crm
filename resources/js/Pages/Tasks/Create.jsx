import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ contacts, deals }) {
    const { data, setData, post, processing, errors } = useForm({
        contact_id: '',
        deal_id: '',
        title: '',
        description: '',
        due_date: '',
        status: 'pending',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout header="Nova Tarefa">
            <Head title="Nova Tarefa" />

            <div className="mx-auto max-w-2xl">
                <div className="crm-card p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="crm-label">Título *</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="crm-input mt-1"
                                placeholder="Título da tarefa"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="crm-label">Data de Vencimento</label>
                                <input
                                    type="datetime-local"
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    className="crm-input mt-1"
                                />
                            </div>
                            <div>
                                <label className="crm-label">Status *</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="crm-select mt-1"
                                >
                                    <option value="pending">Pendente</option>
                                    <option value="done">Concluída</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="crm-label">Contato</label>
                                <select
                                    value={data.contact_id}
                                    onChange={(e) => setData('contact_id', e.target.value)}
                                    className="crm-select mt-1"
                                >
                                    <option value="">Selecione...</option>
                                    {contacts.map((contact) => (
                                        <option key={contact.id} value={contact.id}>{contact.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="crm-label">Negócio</label>
                                <select
                                    value={data.deal_id}
                                    onChange={(e) => setData('deal_id', e.target.value)}
                                    className="crm-select mt-1"
                                >
                                    <option value="">Selecione...</option>
                                    {deals.map((deal) => (
                                        <option key={deal.id} value={deal.id}>{deal.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="crm-label">Descrição</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                className="crm-input mt-1"
                                placeholder="Detalhes da tarefa..."
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                            <Link href={route('tasks.index')} className="crm-btn-secondary">
                                Cancelar
                            </Link>
                            <button type="submit" disabled={processing} className="crm-btn-primary">
                                {processing ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
