import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useNavigate } from 'react-router-dom';

const FinancialDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        tempRevenue: 0, // Pending
        totalOrders: 0,
        avgTicket: 0,
        recentTx: [] as any[]
    });

    useEffect(() => {
        fetchFinancials();
    }, []);

    const fetchFinancials = async () => {
        try {
            // Fetch Orders
            const { data: orders } = await supabase.from('orders').select('*');

            // Mock fetching appointments revenue (assuming we had a payments table linked, but here we estimate from 'appointments' or just use orders for now as the 'store' erp)
            // For this MVP, we focus on the Store Revenue + Mock Service Revenue

            const paidOrders = orders?.filter(o => o.status === 'paid' || o.status === 'shipped') || [];
            const pendingOrders = orders?.filter(o => o.status === 'pending') || [];

            const revenue = paidOrders.reduce((sum, o) => sum + o.total_amount, 0);
            const potential = pendingOrders.reduce((sum, o) => sum + o.total_amount, 0);
            const count = paidOrders.length;
            const avg = count > 0 ? revenue / count : 0;

            setStats({
                totalRevenue: revenue,
                tempRevenue: potential,
                totalOrders: count,
                avgTicket: avg,
                recentTx: orders?.slice(0, 5) || [] // Just showing last 5 mixed
            });
        } catch (error) {
            console.error('Error fetching financials', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 pb-24">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#d41142]">monitoring</span>
                        ERP Financeiro
                    </h1>
                    <p className="text-[#A0A0A0] text-sm">Visão Geral do Negócio (White Label)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Card 1: Faturamento */}
                <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-[#333] relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-emerald-900/20 to-transparent"></div>
                    <div className="relative z-10">
                        <p className="text-[#A0A0A0] text-sm font-bold uppercase tracking-wider">Faturamento Total</p>
                        <h3 className="text-3xl font-bold text-white mt-1">R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                        <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            Receita Confirmada
                        </p>
                    </div>
                </div>

                {/* Card 2: Ticket Médio */}
                <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-[#333] relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[#A0A0A0] text-sm font-bold uppercase tracking-wider">Ticket Médio</p>
                        <h3 className="text-3xl font-bold text-white mt-1">R$ {stats.avgTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                        <p className="text-blue-500 text-xs font-bold mt-2">Por Venda</p>
                    </div>
                </div>

                {/* Card 3: Pendente */}
                <div className="bg-[#1E1E1E] p-5 rounded-2xl border border-[#333] relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[#A0A0A0] text-sm font-bold uppercase tracking-wider">A Receber</p>
                        <h3 className="text-3xl font-bold text-white mt-1">R$ {stats.tempRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                        <p className="text-yellow-500 text-xs font-bold mt-2">Processando</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <h3 className="text-xl font-bold mb-4">Últimas Transações</h3>
            <div className="bg-[#1E1E1E] rounded-2xl border border-[#333] overflow-hidden">
                {stats.recentTx.map((tx, idx) => (
                    <div key={tx.id} className={`p-4 flex justify-between items-center ${idx !== stats.recentTx.length - 1 ? 'border-b border-[#333]' : ''}`}>
                        <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                            <div>
                                <p className="font-bold text-white">Pedido #{tx.id.slice(0, 6)}</p>
                                <p className="text-xs text-[#A0A0A0]">{new Date(tx.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-white">R$ {tx.total_amount.toFixed(2)}</p>
                            <p className="text-xs uppercase font-bold text-[#A0A0A0]">{tx.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinancialDashboard;
