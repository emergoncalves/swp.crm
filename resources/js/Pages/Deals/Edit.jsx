import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ deal, companies, contacts }) {
    const { data, setData, put, processing, errors } = useForm({
        company_id: deal.company_id || '',
        contact_id: deal.contact_id || '',
        title: deal.title,
        value: deal.value,
        status: deal.status,
        expected_close_date: deal.expected_close_date ? deal.expected_close_date.split('T')[0] : '',
        notes: deal.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('deals.update', deal));
    };

    return (
        <AuthenticatedLayout header="Editar Negócio">
            <Head title="Editar Negócio" />

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
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="crm-label">Valor *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.value}
                                    onChange={(e) => setData('value', e.target.value)}
                                    className="crm-input mt-1"
                                />
                                {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
                            </div>
                            <div>
                                <label className="crm-label">Status *</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="crm-select mt-1"
                                >
                                    <option value="open">Aberto</option>
                                    <option value="won">Ganho</option>
                                    <option value="lost">Perdido</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="crm-label">Empresa</label>
                                <select
                                    value={data.company_id}
                                    onChange={(e) => setData('company_id', e.target.value)}
                                    className="crm-select mt-1"
                                >
                                    <option value="">Selecione...</option>
                                    {companies.map((company) => (
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    ))}
                                </select>
                            </div>
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
                        </div>

                        <div>
                            <label className="crm-label">Data Prevista de Fechamento</label>
                            <input
                                type="date"
                                value={data.expected_close_date}
                                onChange={(e) => setData('expected_close_date', e.target.value)}
                                className="crm-input mt-1"
                            />
                        </div>

                        <div>
                            <label className="crm-label">Notas</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                className="crm-input mt-1"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                            <Link href={route('deals.index')} className="crm-btn-secondary">
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
