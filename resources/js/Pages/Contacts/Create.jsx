import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ companies }) {
    const { data, setData, post, processing, errors } = useForm({
        company_id: '',
        name: '',
        email: '',
        phone: '',
        job_title: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contacts.store'));
    };

    return (
        <AuthenticatedLayout header="Novo Contato">
            <Head title="Novo Contato" />

            <div className="mx-auto max-w-2xl">
                <div className="crm-card p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="crm-label">Nome *</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="crm-input mt-1"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

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
                            <label className="crm-label">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="crm-input mt-1"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="crm-label">Telefone</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="crm-input mt-1"
                                placeholder="(00) 00000-0000"
                            />
                        </div>

                        <div>
                            <label className="crm-label">Cargo</label>
                            <input
                                type="text"
                                value={data.job_title}
                                onChange={(e) => setData('job_title', e.target.value)}
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
                            <Link href={route('contacts.index')} className="crm-btn-secondary">
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
