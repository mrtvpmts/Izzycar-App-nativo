import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';

interface Order {
    id: string;
    user_id: string;
    total_amount: number;
    status: string;
    created_at: string;
    items: any[];
    profiles?: {
        full_name: string;
        email: string;
        phone: string;
    };
}

const OrderManagement: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Fetch orders with user profile data
            const { data, error } = await supabase
                .from('orders')
                .select('*, profiles:user_id (full_name, email, phone)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        try {
            const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
            if (error) throw error;
            fetchOrders(); // Refresh
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Erro ao atualizar status.');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-500 bg-yellow-500/10';
            case 'paid': return 'text-green-500 bg-green-500/10';
            case 'shipped': return 'text-blue-500 bg-blue-500/10';
            case 'cancelled': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-400 bg-gray-500/10';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'pending': return 'Pendente';
            case 'paid': return 'Pago';
            case 'shipped': return 'Enviado/Concluído';
            case 'cancelled': return 'Cancelado';
            default: return status;
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 pb-24">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Pedidos da Loja</h1>
                    <p className="text-[#A0A0A0] text-sm">Acompanhe as vendas e entregas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {orders.map(order => (
                    <div key={order.id} className="bg-[#1E1E1E] rounded-xl border border-[#333] p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:border-[#555] transition-colors" onClick={() => setSelectedOrder(order)}>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(order.status)}`}>
                                    {getStatusLabel(order.status)}
                                </span>
                                <span className="text-[#A0A0A0] text-xs">#{order.id.slice(0, 8)}</span>
                                <span className="text-[#A0A0A0] text-xs">• {new Date(order.created_at).toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-bold text-white">{order.profiles?.full_name || 'Usuário Desconhecido'}</h3>
                            <p className="text-sm text-[#A0A0A0]">{order.items?.length || 0} itens</p>
                        </div>
                        <div className="text-right">
                            <span className="block font-bold text-xl text-white">R$ {order.total_amount.toFixed(2)}</span>
                            <span className="text-xs text-[#A0A0A0]">{order.profiles?.email}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
                    <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-lg border border-[#333] overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-4 border-b border-[#333] flex justify-between items-center">
                            <h3 className="font-bold text-lg">Detalhes do Pedido</h3>
                            <button onClick={() => setSelectedOrder(null)} className="text-[#A0A0A0] hover:text-white"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[70vh]">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-[#A0A0A0]">Cliente</p>
                                    <p className="font-bold text-lg">{selectedOrder.profiles?.full_name}</p>
                                    <p className="text-sm text-[#A0A0A0]">{selectedOrder.profiles?.email}</p>
                                    <p className="text-sm text-[#A0A0A0]">{selectedOrder.profiles?.phone}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-[#A0A0A0] mb-1">Status Atual</p>
                                    <span className={`text-sm font-bold px-3 py-1 rounded ${getStatusColor(selectedOrder.status)}`}>
                                        {getStatusLabel(selectedOrder.status)}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-bold mb-3 border-b border-[#333] pb-2">Itens do Pedido</h4>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item: any) => (
                                        <div key={item.id} className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-cover bg-center rounded" style={{ backgroundImage: `url("${item.image_url}")` }}></div>
                                                <div>
                                                    <p className="font-bold text-sm">{item.name}</p>
                                                    <p className="text-xs text-[#A0A0A0]">{item.quantity}x R$ {item.price}</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#333]">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-xl text-[#d41142]">R$ {selectedOrder.total_amount.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-[#121212] p-4 rounded-xl border border-[#333]">
                                <h4 className="font-bold text-sm mb-3 text-[#A0A0A0] uppercase">Ações do Pedido</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {selectedOrder.status === 'pending' && (
                                        <button onClick={() => updateStatus(selectedOrder.id, 'paid')} className="bg-green-600/20 text-green-500 border border-green-600/50 py-2 rounded-lg font-bold text-sm hover:bg-green-600/30">
                                            Marcar como Pago
                                        </button>
                                    )}
                                    {selectedOrder.status === 'paid' && (
                                        <button onClick={() => updateStatus(selectedOrder.id, 'shipped')} className="bg-blue-600/20 text-blue-500 border border-blue-600/50 py-2 rounded-lg font-bold text-sm hover:bg-blue-600/30">
                                            Marcar como Enviado
                                        </button>
                                    )}
                                    <button onClick={() => updateStatus(selectedOrder.id, 'cancelled')} className="bg-red-600/20 text-red-500 border border-red-600/50 py-2 rounded-lg font-bold text-sm hover:bg-red-600/30 col-span-2">
                                        Cancelar Pedido
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
