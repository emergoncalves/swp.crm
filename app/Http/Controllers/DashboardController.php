<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use App\Models\Task;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'companies' => Company::count(),
                'contacts' => Contact::count(),
                'openDeals' => Deal::where('status', 'open')->count(),
                'pendingTasks' => Task::where('status', 'pending')->count(),
            ],
            'pendingTasks' => Task::with(['contact', 'deal'])
                ->where('status', 'pending')
                ->orderBy('due_date')
                ->limit(5)
                ->get(),
            'recentDeals' => Deal::with(['company', 'contact'])
                ->latest()
                ->limit(5)
                ->get(),
        ]);
    }
}
