import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface Service {
    id: string;
    name: string;
    price: number;
    duration_minutes: number;
    description?: string;
}

interface Profile {
    id: string;
    full_name: string;
    role: string;
    avatar_url: string;
    is_online: boolean;
    email?: string;
}

interface Promotion {
    id: string;
    title: string;
    subtitle: string;
    image_url: string;
    action_text: string;
    active: boolean;
    media_type?: 'image' | 'video';
}

const ShopManagement: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [services, setServices] = useState<Service[]>([]);
    const [team, setTeam] = useState<Profile[]>([]);
    const [hours, setHours] = useState<any[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);

    // Modal States
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [showEmployeeModal, setShowEmployeeModal] = useState(false);
    const [showPromoModal, setShowPromoModal] = useState(false);

    // Form States
    const [serviceForm, setServiceForm] = useState({ name: '', price: '', duration: '', description: '' });
    const [employeeForm, setEmployeeForm] = useState({ email: '', full_name: '', password: '', role: 'employee' });

    // Promo Form - Enhanced
    const [promoForm, setPromoForm] = useState({ title: '', subtitle: '', image_url: '', action_text: 'Saber Mais', media_type: 'image' });
    const [promoFile, setPromoFile] = useState<File | null>(null);

    useEffect(() => {
        fetchShopData();
    }, []);

    const fetchShopData = async () => {
        try {
            setLoading(true);
            // Services
            const { data: s } = await supabase.from('services').select('*').eq('active', true).order('name');
            if (s) setServices(s);

            // Team
            const { data: t } = await supabase.from('profiles').select('*').in('role', ['mechanic', 'employee']);
            if (t) setTeam(t);

            // Hours
            const { data: h } = await supabase.from('business_hours').select('*').order('day_of_week');
            if (h) setHours(h);

            // Promotions
            const { data: p } = await supabase.from('promotions').select('*').order('created_at', { ascending: false });
            if (p) setPromotions(p);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // --- Services Logic ---
    const handleSaveService = async () => {
        const payload = {
            name: serviceForm.name,
            price: parseFloat(serviceForm.price),
            duration_minutes: parseInt(serviceForm.duration),
            description: serviceForm.description,
            active: true
        };

        if (editingService) {
            await supabase.from('services').update(payload).eq('id', editingService.id);
        } else {
            await supabase.from('services').insert(payload);
        }
        setShowServiceModal(false);
        setEditingService(null);
        setServiceForm({ name: '', price: '', duration: '', description: '' });
        fetchShopData();
    };

    const handleDeleteService = async (id: string) => {
        if (!confirm('Tem certeza?')) return;
        await supabase.from('services').update({ active: false }).eq('id', id);
        fetchShopData();
    };

    // --- Employee Logic ---
    const handleAddEmployee = async () => {
        try {
            // Create Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: employeeForm.email,
                password: employeeForm.password,
                options: {
                    data: {
                        full_name: employeeForm.full_name,
                        role: employeeForm.role
                    }
                }
            });

            if (authError) throw authError;
            alert('Funcionário criado com sucesso!');
            setShowEmployeeModal(false);
            setEmployeeForm({ email: '', full_name: '', password: '', role: 'employee' });
            fetchShopData();

        } catch (error: any) {
            alert('Erro: ' + error.message);
        }
    };

    const handleDeleteEmployee = async (id: string) => {
        // Soft delete or role change logic? For now just alert.
        alert('Para remover acesso, altere o cargo no banco de dados ou desative o usuário.');
    };


    // --- Hours Logic ---
    const handleHoursChange = (index: number, field: string, value: any) => {
        const newHours = [...hours];
        newHours[index][field] = value;
        setHours(newHours);
    };

    const saveHours = async () => {
        const updates = hours.map(h => ({
            id: h.id,
            open_time: h.open_time,
            close_time: h.close_time,
            is_closed: h.is_closed
        }));

        const { error } = await supabase.from('business_hours').upsert(updates);
        if (error) alert('Erro ao salvar horários');
        else alert('Horários atualizados!');
    };

    // --- Promotions Logic ---

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setPromoFile(file);
            // Auto-detect type
            const type = file.type.startsWith('video/') ? 'video' : 'image';
            setPromoForm({ ...promoForm, media_type: type });
        }
    };

    const handleSavePromo = async () => {
        try {
            // 1. Check Limit (if creating new active)
            const activeCount = promotions.filter(p => p.active).length;
            if (activeCount >= 6) {
                alert('Limite máximo de 6 promoções ativas atingido. Desative ou remova uma existente.');
                return;
            }

            setUploading(true);
            let finalUrl = promoForm.image_url;

            // 2. Upload File if present
            if (promoFile) {
                const fileExt = promoFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const { error: uploadError } = await supabase.storage.from('promotions').upload(fileName, promoFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage.from('promotions').getPublicUrl(fileName);
                finalUrl = publicUrl;
            }

            if (!finalUrl) {
                alert('Selecione uma imagem/vídeo ou forneça uma URL.');
                setUploading(false);
                return;
            }

            // 3. Save to DB
            const payload = {
                title: promoForm.title,
                subtitle: promoForm.subtitle,
                image_url: finalUrl,
                media_type: promoForm.media_type,
                action_text: promoForm.action_text || 'Saber Mais',
                active: true
            };

            await supabase.from('promotions').insert(payload);

            setShowPromoModal(false);
            setPromoForm({ title: '', subtitle: '', image_url: '', action_text: '', media_type: 'image' });
            setPromoFile(null);
            fetchShopData();

        } catch (error: any) {
            console.error(error);
            alert('Erro ao salvar promoção: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const togglePromoActive = async (id: string, current: boolean) => {
        // If enabling, check limit
        if (!current) {
            const activeCount = promotions.filter(p => p.active).length;
            if (activeCount >= 6) {
                alert('Limite máximo de 6 promoções ativas atingido.');
                return;
            }
        }
        await supabase.from('promotions').update({ active: !current }).eq('id', id);
        fetchShopData();
    };

    const handleDeletePromo = async (id: string) => {
        if (confirm('Excluir esta promoção?')) {
            await supabase.from('promotions').delete().eq('id', id);
            fetchShopData();
        }
    }


    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#121212] font-display text-white">
            <div className="flex items-center bg-[#1E1E1E] p-4 pb-2 justify-between sticky top-0 z-20 border-b border-[#333]">
                <div onClick={() => navigate('/admin/dashboard')} className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back</span>
                </div>
                <h1 className="text-white text-lg font-bold flex-1 text-center">Gestão da Loja</h1>
                <div className="w-12"></div>
            </div>

            <main className="flex-1 flex flex-col gap-6 px-4 py-6 max-w-4xl mx-auto w-full">

                {/* --- SEÇÃO 1: SERVIÇOS --- */}
                <section className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Serviços</h2>
                        <button onClick={() => { setEditingService(null); setServiceForm({ name: '', price: '', duration: '', description: '' }); setShowServiceModal(true); }} className="bg-[#d41132] hover:bg-[#b00e36] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                            <span className="material-symbols-outlined text-sm">add</span> Novo
                        </button>
                    </div>

                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {services.map(s => (
                            <div key={s.id} className="flex justify-between items-center bg-[#252525] p-3 rounded-lg border border-[#333] hover:border-[#d41132]/30 transition-colors">
                                <div>
                                    <p className="font-bold">{s.name}</p>
                                    <p className="text-xs text-gray-400">R${s.price} • {s.duration_minutes} min</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setEditingService(s); setServiceForm({ name: s.name, price: s.price.toString(), duration: s.duration_minutes.toString(), description: s.description || '' }); setShowServiceModal(true); }} className="text-blue-400 hover:text-blue-300"><span className="material-symbols-outlined">edit</span></button>
                                    <button onClick={() => handleDeleteService(s.id)} className="text-[#d41132] hover:text-red-400"><span className="material-symbols-outlined">delete</span></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SEÇÃO 2: EQUIPE --- */}
                <section className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Equipe</h2>
                        <button onClick={() => setShowEmployeeModal(true)} className="bg-[#d41132] hover:bg-[#b00e36] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                            <span className="material-symbols-outlined text-sm">person_add</span> Add
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {team.map(t => (
                            <div key={t.id} className="flex justify-between items-center bg-[#252525] p-3 rounded-lg border border-[#333]">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gray-700 overflow-hidden">
                                        {t.avatar_url ? <img src={t.avatar_url} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined w-full h-full flex items-center justify-center text-gray-400">person</span>}
                                    </div>
                                    <div>
                                        <p className="font-bold">{t.full_name || 'Sem nome'}</p>
                                        <p className="text-xs text-gray-400 capitalize">{t.role}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className={`text-xs px-2 py-0.5 rounded-full ${t.is_online ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                        {t.is_online ? 'Online' : 'Offline'}
                                    </div>
                                    <button onClick={() => handleDeleteEmployee(t.id)} className="text-[#d41132] text-xs hover:underline mt-1">Remover</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SEÇÃO 3: PROMOÇÕES --- */}
                <section className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Campanhas (Banners)</h2>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">Ativas: {promotions.filter(p => p.active).length}/6</span>
                            <button onClick={() => setShowPromoModal(true)} className="bg-[#d41132] hover:bg-[#b00e36] text-white px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">add_photo_alternate</span> Nova
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {promotions.map(p => (
                            <div key={p.id} className={`group relative h-40 rounded-lg overflow-hidden border border-[#333] ${!p.active ? 'opacity-50 grayscale' : ''}`}>
                                {p.media_type === 'video' ? (
                                    <video src={p.image_url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <img src={p.image_url} className="absolute inset-0 w-full h-full object-cover" />
                                )}

                                <div className="absolute inset-0 bg-black/40 p-3 flex flex-col justify-between">
                                    <div>
                                        {p.media_type === 'video' && <span className="bg-black/50 text-xs px-2 py-0.5 rounded text-white flex items-center w-fit gap-1 mb-1"><span className="material-symbols-outlined text-xs">videocam</span> Vídeo</span>}
                                        <p className="font-bold text-white shadow-sm">{p.title}</p>
                                        <p className="text-xs text-gray-200">{p.subtitle}</p>
                                    </div>
                                    <div className="flex justify-end gap-2 text-white">
                                        <button onClick={() => togglePromoActive(p.id, p.active)} className="bg-black/50 p-1 rounded hover:bg-black/70" title={p.active ? "Desativar" : "Ativar"}><span className="material-symbols-outlined">{p.active ? 'visibility' : 'visibility_off'}</span></button>
                                        <button onClick={() => handleDeletePromo(p.id)} className="bg-[#d41132]/80 p-1 rounded hover:bg-[#d41132]" title="Excluir"><span className="material-symbols-outlined">delete</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- SEÇÃO 4: HORÁRIOS --- */}
                <section className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Horários</h2>
                        <button onClick={saveHours} className="text-[#d41132] font-bold text-sm hover:underline">Salvar Alterações</button>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {hours.map((h, idx) => (
                            <div key={h.id} className="flex items-center justify-between py-2 border-b border-[#333] last:border-0">
                                <span className="w-24 font-medium text-gray-300">{h.day_of_week}</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="time"
                                        value={h.open_time?.slice(0, 5) || ''}
                                        onChange={(e) => handleHoursChange(idx, 'open_time', e.target.value)}
                                        disabled={h.is_closed}
                                        className="bg-[#252525] border-none rounded px-2 py-1 text-sm w-20 text-center text-white"
                                    />
                                    <span>-</span>
                                    <input
                                        type="time"
                                        value={h.close_time?.slice(0, 5) || ''}
                                        onChange={(e) => handleHoursChange(idx, 'close_time', e.target.value)}
                                        disabled={h.is_closed}
                                        className="bg-[#252525] border-none rounded px-2 py-1 text-sm w-20 text-center text-white"
                                    />
                                </div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={h.is_closed}
                                        onChange={(e) => handleHoursChange(idx, 'is_closed', e.target.checked)}
                                        className="rounded border-gray-600 bg-[#252525] text-[#d41132] focus:ring-[#d41132]"
                                    />
                                    <span className="text-xs text-gray-400">Fechado</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* --- MODALS --- */}

            {/* Service Modal */}
            {showServiceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl w-full max-w-md border border-[#333] shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">{editingService ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                        <div className="space-y-3">
                            <input placeholder="Nome do Serviço" value={serviceForm.name} onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            <div className="flex gap-3">
                                <input type="number" placeholder="Preço (R$)" value={serviceForm.price} onChange={e => setServiceForm({ ...serviceForm, price: e.target.value })} className="w-1/2 bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                                <input type="number" placeholder="Duração (min)" value={serviceForm.duration} onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })} className="w-1/2 bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            </div>
                            <textarea placeholder="Descrição (opcional)" value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none h-24" />

                            <div className="flex gap-3 mt-4">
                                <button onClick={() => setShowServiceModal(false)} className="flex-1 bg-gray-700 py-3 rounded-lg font-bold">Cancelar</button>
                                <button onClick={handleSaveService} className="flex-1 bg-[#d41132] py-3 rounded-lg font-bold">Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Employee Modal */}
            {showEmployeeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl w-full max-w-md border border-[#333] shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Novo Funcionário</h3>
                        <div className="space-y-3">
                            <input placeholder="Nome Completo" value={employeeForm.full_name} onChange={e => setEmployeeForm({ ...employeeForm, full_name: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            <input type="email" placeholder="Email" value={employeeForm.email} onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            <input type="password" placeholder="Senha Provisória" value={employeeForm.password} onChange={e => setEmployeeForm({ ...employeeForm, password: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            <select value={employeeForm.role} onChange={e => setEmployeeForm({ ...employeeForm, role: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none">
                                <option value="employee">Funcionário/Atendente</option>
                                <option value="mechanic">Mecânico</option>
                            </select>

                            <div className="flex gap-3 mt-4">
                                <button onClick={() => setShowEmployeeModal(false)} className="flex-1 bg-gray-700 py-3 rounded-lg font-bold">Cancelar</button>
                                <button onClick={handleAddEmployee} className="flex-1 bg-[#d41132] py-3 rounded-lg font-bold">Criar Acesso</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Promo Modal */}
            {showPromoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1E1E1E] p-6 rounded-xl w-full max-w-md border border-[#333] shadow-2xl">
                        <h3 className="text-xl font-bold mb-4">Nova Campanha</h3>
                        <div className="space-y-3">
                            <input placeholder="Título (ex: Oferta de Inverno)" value={promoForm.title} onChange={e => setPromoForm({ ...promoForm, title: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />
                            <input placeholder="Subtítulo (ex: 20% OFF)" value={promoForm.subtitle} onChange={e => setPromoForm({ ...promoForm, subtitle: e.target.value })} className="w-full bg-[#252525] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41132] outline-none" />

                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-gray-400">Banner (Imagem ou Vídeo)</label>
                                <input
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileSelect}
                                    className="w-full bg-[#252525] border border-[#333] rounded-lg p-2 text-white text-sm focus:border-[#d41132] outline-none"
                                />
                                {promoForm.media_type === 'video' && <p className="text-xs text-yellow-500">Vídeo selecionado (reprodução automática sem som)</p>}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button onClick={() => setShowPromoModal(false)} className="flex-1 bg-gray-700 py-3 rounded-lg font-bold">Cancelar</button>
                                <button onClick={handleSavePromo} disabled={uploading} className="flex-1 bg-[#d41132] py-3 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center">
                                    {uploading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : 'Criar Banner'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopManagement;