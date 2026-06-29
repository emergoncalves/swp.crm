<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Deal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DealController extends Controller
{
    public function index(Request $request)
    {
        $deals = Deal::query()
            ->with(['company', 'contact'])
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->latest()
            ->paginate(15);

        return Inertia::render('Deals/Index', [
            'deals' => $deals,
            'filters' => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Deals/Create', [
            'companies' => Company::orderBy('name')->get(),
            'contacts' => Contact::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'nullable|exists:companies,id',
            'contact_id' => 'nullable|exists:contacts,id',
            'title' => 'required|string|max:255',
            'value' => 'required|numeric|min:0',
            'status' => 'required|string|in:open,won,lost',
            'expected_close_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        Deal::create($validated);

        return redirect()->route('deals.index');
    }

    public function edit(Deal $deal)
    {
        return Inertia::render('Deals/Edit', [
            'deal' => $deal->load(['company', 'contact']),
            'companies' => Company::orderBy('name')->get(),
            'contacts' => Contact::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Deal $deal)
    {
        $validated = $request->validate([
            'company_id' => 'nullable|exists:companies,id',
            'contact_id' => 'nullable|exists:contacts,id',
            'title' => 'required|string|max:255',
            'value' => 'required|numeric|min:0',
            'status' => 'required|string|in:open,won,lost',
            'expected_close_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $deal->update($validated);

        return redirect()->route('deals.index');
    }

    public function destroy(Deal $deal)
    {
        $deal->delete();

        return redirect()->route('deals.index');
    }
}
