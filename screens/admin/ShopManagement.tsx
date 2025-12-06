import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const ShopManagement: React.FC = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState<any[]>([]);
    const [team, setTeam] = useState<any[]>([]);
    const [hours, setHours] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchShopData();
    }, []);

    const fetchShopData = async () => {
        try {
            setLoading(true);
            // Fetch Services
            const { data: servicesData } = await supabase.from('services').select('*').eq('active', true);
            if (servicesData) setServices(servicesData);

            // Fetch Team (Employees/Mechanics)
            const { data: teamData } = await supabase.from('profiles').select('*').in('role', ['mechanic', 'employee']);
            if (teamData) setTeam(teamData);

            // Fetch Hours
            const { data: hoursData } = await supabase.from('business_hours').select('*').order('day_of_week');
            if (hoursData) setHours(hoursData);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteService = async (id: string) => {
        // Logic to soft delete
        await supabase.from('services').update({ active: false }).eq('id', id);
        fetchShopData();
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#221013] font-display text-white">
            <div className="flex items-center bg-[#221013] p-4 pb-2 justify-between sticky top-0 z-10">
                <div className="flex size-12 shrink-0 items-center justify-start">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbU9Kk3iH7-d-f2BySIj10fn6bhz4teQg697izBRoPkDQDY37SHbZY1V_4_T_4VE_ShFkFV5F1u9mxP4drGq9fQHuAtlErNzTWW4O4AMzbE8TcMXuysaMqHXbHIdRgQTF7x9gaWwPaczHTseBWRC8TDAkr148Pe6DJ451OpDgqKLrOMJ13lpFEs7zf6sGU_yNksiv9epL1HLxDrzmXu5NhKh8jLbhNk_KabK49PsG2iO8IsQHFK4sS8WX0L2_rCGbAlT9f_6drQ54")' }}></div>
                </div>
                <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Gestão da Oficina</h1>
                <div onClick={() => navigate('/login')} className="flex size-12 shrink-0 items-center justify-end cursor-pointer"><span className="material-symbols-outlined">logout</span></div>
            </div>

            <main className="flex-1 flex flex-col gap-6 px-4 py-4">
                {/* Services Card */}
                <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Serviços Oferecidos</h2>
                    <div className="flex flex-col gap-2">
                        {services.map(service => (
                            <div key={service.id} className="flex gap-4 py-3 justify-between items-center border-b border-white/10 last:border-none">
                                <div className="flex items-center gap-4">
                                    <div className="text-white flex items-center justify-center rounded-lg bg-[#482329] shrink-0 size-12">
                                        <span className="material-symbols-outlined text-3xl">tire_repair</span>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center">
                                        <p className="text-white text-base font-medium leading-normal">{service.name}</p>
                                        <p className="text-[#c9929b] text-sm font-normal leading-normal">Preço: R${service.price} | Duração: {service.duration_minutes}m</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <div className="text-white flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">edit</span></div>
                                    <div onClick={() => handleDeleteService(service.id)} className="text-[#d41132] flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">delete</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#d41132] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="material-symbols-outlined text-xl">add</span>
                        <span className="truncate">Adicionar Serviço</span>
                    </button>
                </div>

                {/* Team Card */}
                <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Equipe</h2>
                    <div className="flex flex-col gap-2">
                        {team.length === 0 && <p className="text-[#c9929b]">Nenhum funcionário encontrado.</p>}
                        {team.map(member => (
                            <div key={member.id} className="flex gap-4 py-3 justify-between items-center border-b border-white/10 last:border-none">
                                <div className="flex items-center gap-4">
                                    <img className="rounded-full size-12 shrink-0 object-cover" alt="Member" src={member.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} />
                                    <div className="flex flex-1 flex-col justify-center">
                                        <p className="text-white text-base font-medium leading-normal">{member.full_name || 'Sem nome'}</p>
                                        <p className="text-[#c9929b] text-sm font-normal leading-normal capitalize">{member.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`size-3 rounded-full ${member.is_online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <p className={`${member.is_online ? 'text-green-400' : 'text-gray-400'} text-sm`}>{member.is_online ? 'Online' : 'Offline'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#d41132] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="material-symbols-outlined text-xl">add</span>
                        <span className="truncate">Adicionar Funcionário</span>
                    </button>
                </div>

                {/* Hours */}
                <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Horários de Funcionamento</h2>
                    <div className="flex flex-col gap-4">
                        {hours.length === 0 && <p className="text-[#c9929b]">Nenhum horário configurado.</p>}
                        {hours.map(hour => (
                            <div key={hour.id} className="flex items-center justify-between gap-4">
                                <label className="flex-1 text-white">{hour.day_of_week}</label>
                                <div className="flex items-center gap-2">
                                    <input disabled={hour.is_closed} className="w-20 rounded-lg border-none bg-[#482329] text-white text-center text-sm focus:ring-[#d41132] disabled:opacity-50" type="text" defaultValue={hour.open_time?.slice(0, 5) || "--:--"} />
                                    <span className="text-[#c9929b]">-</span>
                                    <input disabled={hour.is_closed} className="w-20 rounded-lg border-none bg-[#482329] text-white text-center text-sm focus:ring-[#d41132] disabled:opacity-50" type="text" defaultValue={hour.close_time?.slice(0, 5) || "--:--"} />
                                </div>
                                <input className="form-checkbox h-5 w-5 rounded-md text-[#d41132] bg-[#482329] border-none focus:ring-[#d41132]" type="checkbox" defaultChecked={!hour.is_closed} />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ShopManagement;