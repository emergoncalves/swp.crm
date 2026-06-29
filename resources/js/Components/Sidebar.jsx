import { Link, usePage } from '@inertiajs/react';

const navigation = [
    {
        name: 'Dashboard',
        href: 'dashboard',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
            </svg>
        ),
    },
    {
        name: 'Empresas',
        href: 'companies.index',
        routePattern: 'companies.*',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
        ),
    },
    {
        name: 'Contatos',
        href: 'contacts.index',
        routePattern: 'contacts.*',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        ),
    },
    {
        name: 'Negócios',
        href: 'deals.index',
        routePattern: 'deals.*',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
    {
        name: 'Tarefas',
        href: 'tasks.index',
        routePattern: 'tasks.*',
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export default function Sidebar({ collapsed, onToggle }) {
    const { url, component } = usePage();
    const user = usePage().props.auth.user;

    const isActive = (item) => {
        if (item.routePattern) {
            return component.startsWith(item.href.split('.')[0]);
        }
        return component === item.href || url === `/${item.href}`;
    };

    return (
        <aside
            className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 transition-all duration-300 ${
                collapsed ? 'w-[72px]' : 'w-[260px]'
            }`}
            style={{ backgroundColor: '#F6F6F0' }}
        >
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
                {!collapsed && (
                    <Link href={route('dashboard')} className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900">
                            swp<span className="text-primary-500">.</span>crm
                        </span>
                    </Link>
                )}
                {collapsed && (
                    <Link href={route('dashboard')} className="text-lg font-bold text-slate-900">
                        s<span className="text-primary-500">.</span>c
                    </Link>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                    {navigation.map((item) => {
                        const active = isActive(item);
                        return (
                            <li key={item.name}>
                                <Link
                                    href={route(item.href)}
                                    className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        active
                                            ? 'bg-primary-50 text-primary-600'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    } ${collapsed ? 'justify-center' : ''}`}
                                    title={collapsed ? item.name : undefined}
                                >
                                    <span className={`flex-shrink-0 ${active ? 'text-primary-500' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                        {item.icon}
                                    </span>
                                    {!collapsed && <span>{item.name}</span>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* User section */}
            <div className="border-t border-slate-100 p-3">
                <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${collapsed ? 'justify-center' : ''}`}>
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    {!collapsed && (
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-slate-900">{user.name}</p>
                            <p className="truncate text-xs text-slate-500">{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
