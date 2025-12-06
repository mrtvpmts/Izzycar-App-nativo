import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import { useRequest } from '../../../context/RequestContext';

const SchedulingSummary: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { vehicleId, serviceId, consultantId, mechanicId, date, time, resetRequest } = useRequest();

    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [details, setDetails] = useState({
        vehicle: null as any,
        service: null as any,
        consultant: null as any,
        mechanic: null as any
    });

    useEffect(() => {
        fetchDetails();
    }, [vehicleId, serviceId, consultantId, mechanicId]);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const fetches = [];

            if (vehicleId && vehicleId !== 'other') fetches.push(supabase.from('vehicles').select('*').eq('id', vehicleId).single().then(r => ({ key: 'vehicle', val: r.data })));
            if (serviceId) fetches.push(supabase.from('services').select('*').eq('id', serviceId).single().then(r => ({ key: 'service', val: r.data })));
            if (consultantId && consultantId !== 'any') fetches.push(supabase.from('profiles').select('*').eq('id', consultantId).single().then(r => ({ key: 'consultant', val: r.data })));
            if (mechanicId && mechanicId !== 'any') fetches.push(supabase.from('profiles').select('*').eq('id', mechanicId).single().then(r => ({ key: 'mechanic', val: r.data })));

            const results = await Promise.all(fetches);
            const newDetails = { ...details };
            results.forEach((r: any) => {
                if (r.val) newDetails[r.key as keyof typeof details] = r.val;
            });
            setDetails(newDetails);

        } catch (error) {
            console.error('Error fetching summary details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!user || !date || !time) return;

        try {
            setSubmitting(true);

            // Construct DB Date object (YYYY-MM-DD)
            const dbDate = date.toISOString().split('T')[0];

            const payload = {
                user_id: user.id,
                vehicle_id: vehicleId === 'other' ? null : vehicleId,
                service_id: serviceId,
                consultant_id: consultantId === 'any' ? null : consultantId,
                mechanic_id: mechanicId === 'any' ? null : mechanicId,
                date: dbDate,
                time: time, // HH:mm
                status: 'pending'
            };

            const { error } = await supabase.from('appointments').insert(payload);

            if (error) throw error;

            setIsSuccess(true);

            // Reset context after delay
            setTimeout(() => {
                resetRequest();
                navigate('/dashboard');
            }, 2500);

        } catch (error) {
            console.error('Error submitting appointment:', error);
            alert('Erro ao agendar. Tente novamente.');
            setSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex h-screen w-full flex-col items-center justify-center bg-[#121212] p-4 text-center">
                <div className="h-24 w-24 rounded-full bg-[#2E7D32]/20 flex items-center justify-center mb-6 animate-bounce">
                    <span className="material-symbols-outlined text-[#2E7D32] text-5xl">check_circle</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Agendamento Confirmado!</h1>
                <p className="text-[#A0A0A0]">Sua solicitação foi enviada com sucesso. Em breve você receberá a confirmação.</p>
            </div>
        );
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
            {/* Top App Bar */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Resumo</h1>
                <div className="size-10 shrink-0"></div>
            </div>

            <main className="flex-1 p-4 pb-24 flex flex-col gap-6">
                <h2 className="text-[28px] font-bold leading-tight">Tudo certo?</h2>
                <p className="text-[#A0A0A0] text-base -mt-4">Confira os detalhes do seu agendamento.</p>

                {loading ? <p className="text-center text-gray-500">Carregando detalhes...</p> : (
                    <div className="flex flex-col gap-4">
                        {/* Vehicle Card */}
                        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex items-center gap-4">
                            <div className="h-14 w-14 rounded-lg bg-cover bg-center shrink-0 bg-[#333]" style={{ backgroundImage: details.vehicle ? `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc")` : 'none' }}>
                                {!details.vehicle && <span className="material-symbols-outlined h-full w-full flex items-center justify-center text-gray-500">directions_car</span>}
                            </div>
                            <div>
                                <p className="text-[#A0A0A0] text-xs uppercase font-bold">Veículo</p>
                                <h3 className="text-white font-bold">{details.vehicle ? `${details.vehicle.brand} ${details.vehicle.model}` : 'Outro / Não cadastrado'}</h3>
                                <p className="text-[#A0A0A0] text-sm">{details.vehicle?.plate || 'A informar'}</p>
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[#A0A0A0] text-xs uppercase font-bold">Serviço</p>
                                    <h3 className="text-white font-bold">{details.service?.name || 'Serviço Selecionado'}</h3>
                                </div>
                                <span className="material-symbols-outlined text-[#800020]">build</span>
                            </div>
                            <div className="h-px bg-[#333333] w-full"></div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[#A0A0A0] text-xs uppercase font-bold">Data</p>
                                    <p className="text-white font-medium">{date?.toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div>
                                    <p className="text-[#A0A0A0] text-xs uppercase font-bold">Horário</p>
                                    <p className="text-white font-medium">{time}</p>
                                </div>
                            </div>
                        </div>

                        {/* Team */}
                        <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                {details.consultant?.avatar_url ? (
                                    <img src={details.consultant.avatar_url} className="h-10 w-10 rounded-full object-cover" />
                                ) : (
                                    <span className="material-symbols-outlined h-10 w-10 text-gray-500 bg-[#333] rounded-full flex items-center justify-center">person</span>
                                )}
                                <div>
                                    <p className="text-[#A0A0A0] text-xs uppercase font-bold">Consultor</p>
                                    <p className="text-white font-medium">{details.consultant?.full_name || 'Qualquer Disponível'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
                <button
                    onClick={handleConfirm}
                    disabled={submitting}
                    className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-base flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-colors disabled:opacity-50"
                >
                    {submitting ? 'Enviando...' : 'Confirmar Agendamento'}
                </button>
            </div>
        </div>
    );
};

export default SchedulingSummary;