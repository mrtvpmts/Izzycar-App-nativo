import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface Plan {
    id: string;
    name: string;
    price: number;
    color?: string;
    features: string[];
    active: boolean;
}

interface KpiStats {
    total_subscribers: number;
    active_subscribers: number;
    mrr: number;
    churn_rate: number;
}

interface Subscriber {
    id: string;
    full_name: string;
    plan_name: string;
    status: string;
    avatar_url?: string;
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [kpis, setKpis] = useState<KpiStats>({ total_subscribers: 0, active_subscribers: 0, mrr: 0, churn_rate: 0 });
    const [plans, setPlans] = useState<Plan[]>([]);
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

    // Modal State
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [planForm, setPlanForm] = useState<{ name: string, price: string, features: string[] }>({ name: '', price: '', features: [] });
    const [newFeature, setNewFeature] = useState('');

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // 1. KPIs (Mock for now, or RPC if implemented)
            // const { data: stats } = await supabase.rpc('get_admin_dashboard_stats');
            // if (stats) setKpis(stats); 
            // Using mock for immediate feedback if RPC fails or is empty
            setKpis({ total_subscribers: 1250, active_subscribers: 980, mrr: 24500, churn_rate: 5.2 });

            // 2. Plans
            const { data: plansData } = await supabase.from('plans').select('*').order('price', { ascending: false });
            if (plansData) setPlans(plansData);

            // 3. Subscribers (Mock join for display)
            // Ideally: properties join plans join subscriptions
            const mockSubs = [
                { id: '1', full_name: 'Carlos Almeida', plan_name: 'Plano Ouro', status: 'Ativo', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd-yiHBZqNeM7iD3eqC89Dh2xDdstwVAjWVgLz7LsWvWdF4H8BKwpEqGEK5lf5jZB9S-gg1fVaiHGVub0VJ3w4mGG-Fn0gBq5xzm2RY1oGtPSw_mD0fMqY2ZWa4ucb77Fu8CPS2IMXckRDwEwOAYe4Y2hm8HKl3LJrp8OIebmYdiYqmJAbjwrP9ER6QmurRXmSinMq-dsgPHoj11DjDI2dYyrIuVPJekZwvZL7paPfH3jKIGOWDhBeIjB-Bfw46UAE1fuzfANzmjo' },
                { id: '2', full_name: 'Mariana Costa', plan_name: 'Plano Prata', status: 'Ativo', avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTThthmZx1RmfaIC0ctBUi2J2Ako53fJvE5HJDxk-to3Ef84Extv9IIxs_QHjh9Yxss3JmwjHhjc0ZA0WuSRkzRT-L-mgOhKnM97sg-IGeJh4ldu1qzcdztrrjPDcnSu-GI0oG-p5-0_tlhltx__fjEAVDRBgQMP5fvU7HOq1WqxewocJqVpGEbrVEEOLtIS_OaVKqIQ4k88oQXQiUfBZH8LWnTF8iImTy8GLOYmrhSyVdn80pBDMJLZqjCVh0cWeQD9g19O11uo4' }
            ];
            setSubscribers(mockSubs);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- Plan Logic ---
    const handleEditPlan = (plan: Plan) => {
        setEditingPlan(plan);
        setPlanForm({
            name: plan.name,
            price: plan.price.toString(),
            features: Array.isArray(plan.features) ? plan.features : []
        });
        setShowPlanModal(true);
    };

    const handeNewPlan = () => {
        setEditingPlan(null);
        setPlanForm({ name: '', price: '', features: [] });
        setShowPlanModal(true);
    };

    const addFeature = () => {
        if (!newFeature.trim()) return;
        setPlanForm({ ...planForm, features: [...planForm.features, newFeature] });
        setNewFeature('');
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...planForm.features];
        newFeatures.splice(index, 1);
        setPlanForm({ ...planForm, features: newFeatures });
    };

    const savePlan = async () => {
        const payload = {
            name: planForm.name,
            price: parseFloat(planForm.price),
            features: planForm.features, // JSONB handles array
            active: true
        };

        if (editingPlan) {
            await supabase.from('plans').update(payload).eq('id', editingPlan.id);
        } else {
            await supabase.from('plans').insert(payload);
        }

        setShowPlanModal(false);
        fetchDashboardData();
    };

    const deletePlan = async (id: string) => {
        if (confirm('Tem certeza que deseja remover este plano?')) {
            await supabase.from('plans').delete().eq('id', id);
            fetchDashboardData();
        }
    };


    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] font-display text-white">
            <div className="flex items-center bg-[#1E1E1E] p-4 pb-2 justify-between sticky top-0 z-10 border-b border-[#333]">
                <div onClick={() => navigate('/admin')} className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back</span>
                </div>
                <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Gestão de Assinaturas</h1>
                <div className="w-12"></div>
            </div>

            <main className="flex flex-col gap-6 p-4 max-w-4xl mx-auto w-full">
                {/* KPI Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#1C1C1E] border border-[#2A2A2C]">
                        <p className="text-[#BDBDBD] text-sm font-medium leading-normal">Total de Assinantes</p>
                        <p className="text-white tracking-light text-2xl font-bold leading-tight">{kpis.total_subscribers}</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#1C1C1E] border border-[#2A2A2C]">
                        <p className="text-[#BDBDBD] text-sm font-medium leading-normal">Assinantes Ativos</p>
                        <p className="text-white tracking-light text-2xl font-bold leading-tight">{kpis.active_subscribers}</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#800020]/20 border border-[#800020]">
                        <p className="text-[#800020] text-sm font-medium leading-normal">Receita Mensal (MRR)</p>
                        <p className="text-white tracking-light text-2xl font-bold leading-tight">R$ {kpis.mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#800020]/20 border border-[#800020]">
                        <p className="text-[#800020] text-sm font-medium leading-normal">Taxa de Churn</p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-white tracking-light text-2xl font-bold leading-tight">{kpis.churn_rate}%</p>
                            <div className="flex items-center text-red-400">
                                <span className="material-symbols-outlined text-base">arrow_upward</span>
                                <span className="text-xs font-semibold">0.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Plan Control */}
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-2">Controle de Planos</h2>
                <div className="flex flex-col gap-3">
                    {plans.map(plan => (
                        <details key={plan.id} className="flex flex-col rounded-xl border border-[#2A2A2C] bg-[#1C1C1E] px-4 group">
                            <summary className="flex cursor-pointer items-center justify-between gap-6 py-3 list-none">
                                <div className="flex items-center gap-3">
                                    <p className="text-white text-base font-medium leading-normal">{plan.name}</p>
                                    <span className="text-green-400 font-bold bg-green-400/10 px-2 py-0.5 rounded text-xs">R$ {plan.price}</span>
                                </div>
                                <span className="material-symbols-outlined text-white group-open:rotate-180 transition-transform">expand_more</span>
                            </summary>
                            <div className="pb-4 flex flex-col gap-4 border-t border-[#333] pt-4 mt-2">
                                <p className="text-[#BDBDBD] text-sm font-normal leading-normal">Benefícios inclusos:</p>
                                <ul className="flex flex-col gap-2">
                                    {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                            <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-2 justify-end mt-2">
                                    <button onClick={() => deletePlan(plan.id)} className="text-red-400 px-4 py-2 text-sm hover:underline">Excluir</button>
                                    <button onClick={() => handleEditPlan(plan)} className="bg-[#121212] border border-[#333] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#252525]">
                                        <span className="material-symbols-outlined text-sm">edit</span> Editar
                                    </button>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>

                <button onClick={handeNewPlan} className="w-full bg-[#800020]/20 text-[#800020] font-bold py-3 rounded-xl border border-[#800020] flex items-center justify-center gap-2 hover:bg-[#800020]/30 transition-colors">
                    <span className="material-symbols-outlined">add_circle</span>
                    <span>Adicionar Novo Plano</span>
                </button>

                {/* Subscriber List */}
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-2">Últimos Assinantes</h2>
                <div className="flex flex-col gap-3">
                    {subscribers.map(sub => (
                        <div key={sub.id} className="flex items-center gap-4 rounded-xl bg-[#1C1C1E] p-3 border border-[#333]">
                            <img className="h-10 w-10 rounded-full object-cover bg-gray-600" alt="User" src={sub.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} />
                            <div className="flex-1">
                                <p className="text-white font-semibold text-sm">{sub.full_name}</p>
                                <p className="text-[#BDBDBD] text-xs">{sub.plan_name}</p>
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">{sub.status}</span>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- Plan Modal --- */}
            {showPlanModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl w-full max-w-md border border-[#333] shadow-2xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-4">{editingPlan ? 'Editar Plano' : 'Novo Plano'}</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Nome do Plano</label>
                                <input value={planForm.name} onChange={e => setPlanForm({ ...planForm, name: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Preço Mensal (R$)</label>
                                <input type="number" value={planForm.price} onChange={e => setPlanForm({ ...planForm, price: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            </div>

                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Benefícios</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        value={newFeature}
                                        onChange={e => setNewFeature(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && addFeature()}
                                        placeholder="Ex: Guincho 24h"
                                        className="flex-1 bg-[#252525] border border-[#333] rounded-lg p-2 text-sm text-white focus:border-[#d41132] outline-none"
                                    />
                                    <button onClick={addFeature} className="bg-[#252525] border border-[#333] text-white px-3 rounded-lg hover:bg-[#333]"><span className="material-symbols-outlined">add</span></button>
                                </div>
                                <ul className="flex flex-col gap-1 max-h-32 overflow-y-auto">
                                    {planForm.features.map((f, i) => (
                                        <li key={i} className="flex justify-between items-center bg-[#121212] p-2 rounded text-sm text-gray-300">
                                            <span>{f}</span>
                                            <button onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300"><span className="material-symbols-outlined text-sm">close</span></button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setShowPlanModal(false)} className="flex-1 bg-gray-700 py-3 rounded-lg font-bold">Cancelar</button>
                                <button onClick={savePlan} className="flex-1 bg-[#d41132] py-3 rounded-lg font-bold">Salvar Plano</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;