import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ company }) {
    const { data, setData, put, processing, errors } = useForm({
        name: company.name,
        website: company.website || '',
        phone: company.phone || '',
        address: company.address || '',
        notes: company.notes || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('companies.update', company));
    };

    return (
        <AuthenticatedLayout header="Editar Empresa">
            <Head title="Editar Empresa" />

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
                            <label className="crm-label">Website</label>
                            <input
                                type="text"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                className="crm-input mt-1"
                                placeholder="https://..."
                            />
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
                            <label className="crm-label">Endereço</label>
                            <input
                                type="text"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
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
                            <Link href={route('companies.index')} className="crm-btn-secondary">
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
