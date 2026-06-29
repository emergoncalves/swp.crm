import { router, Link } from '@inertiajs/react';
import { useState } from 'react';

const columns = [
    { id: 'open', label: 'Aberto', color: 'bg-amber-500', lightColor: 'bg-amber-50', borderColor: 'border-amber-200' },
    { id: 'won', label: 'Ganho', color: 'bg-emerald-500', lightColor: 'bg-emerald-50', borderColor: 'border-emerald-200' },
    { id: 'lost', label: 'Perdido', color: 'bg-red-500', lightColor: 'bg-red-50', borderColor: 'border-red-200' },
];

function DealCard({ deal, onDragStart }) {
    const formatValue = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, deal)}
            className="kanban-card"
        >
            <div className="mb-2 flex items-start justify-between">
                <h4 className="text-sm font-semibold text-slate-900">{deal.title}</h4>
                <span className="crm-badge-info text-[10px]">
                    #{deal.id}
                </span>
            </div>
            <p className="mb-3 text-lg font-bold text-slate-900">
                {formatValue(deal.value)}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
                {deal.contact && (
                    <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        {deal.contact.name}
                    </span>
                )}
                {deal.company && (
                    <span className="flex items-center gap-1">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        {deal.company.name}
                    </span>
                )}
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                {deal.expected_close_date && (
                    <span className="text-xs text-slate-400">
                        {new Date(deal.expected_close_date).toLocaleDateString('pt-BR')}
                    </span>
                )}
                <div className="flex gap-1">
                    <Link
                        href={route('deals.edit', deal)}
                        className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function KanbanColumn({ column, deals, onDragStart, onDrop }) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        onDrop(e, column.id);
    };

    const totalValue = deals.reduce((sum, deal) => sum + parseFloat(deal.value), 0);

    return (
        <div className={`kanban-column flex-1 min-w-[300px] max-w-[400px] ${isDragOver ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''}`}>
            {/* Column header */}
            <div className={`flex items-center justify-between rounded-t-xl border-b ${column.borderColor} px-4 py-3 ${column.lightColor}`}>
                <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${column.color}`}></span>
                    <span className="text-sm font-semibold text-slate-700">{column.label}</span>
                    <span className="crm-badge-neutral">{deals.length}</span>
                </div>
                <span className="text-sm font-medium text-slate-500">
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(totalValue)}
                </span>
            </div>

            {/* Cards */}
            <div
                className="flex flex-1 flex-col gap-3 p-3 overflow-y-auto max-h-[calc(100vh-280px)]"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {deals.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <svg className="mb-2 h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        <p className="text-xs text-slate-400">Nenhum negócio</p>
                    </div>
                ) : (
                    deals.map((deal) => (
                        <DealCard key={deal.id} deal={deal} onDragStart={onDragStart} />
                    ))
                )}
            </div>
        </div>
    );
}

export default function KanbanBoard({ deals }) {
    const [localDeals, setLocalDeals] = useState(deals);
    const [draggedDealId, setDraggedDealId] = useState(null);

    const handleDragStart = (e, deal) => {
        e.dataTransfer.setData('dealId', deal.id);
        e.dataTransfer.effectAllowed = 'move';
        setDraggedDealId(deal.id);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const dealId = e.dataTransfer.getData('dealId');
        if (!dealId) return;

        setDraggedDealId(null);

        setLocalDeals((prev) =>
            prev.map((d) =>
                String(d.id) === String(dealId) ? { ...d, status: newStatus } : d
            )
        );

        router.patch(
            route('deals.update', dealId),
            { status: newStatus },
            {
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    router.reload({ only: ['deals'], preserveScroll: true });
                },
            }
        );
    };

    const dealsByStatus = {
        open: localDeals.filter((d) => d.status === 'open'),
        won: localDeals.filter((d) => d.status === 'won'),
        lost: localDeals.filter((d) => d.status === 'lost'),
    };

    return (
        <div className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                    deals={dealsByStatus[column.id]}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
}
