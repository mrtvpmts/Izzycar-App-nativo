
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth(); // Get auth context
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [banners, setBanners] = useState<any[]>([]);

  // Helpers for RBAC
  const isAdmin = profile?.role === 'admin' || user?.email === 'adm@lcpneus.com.br';
  const isEmployee = profile?.role === 'employee' || profile?.role === 'mechanic' || profile?.role === 'admin';

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const { data } = await supabase.from('promotions').select('*').eq('active', true).order('created_at', { ascending: false });

      if (data && data.length > 0) {
        // Map to expected format if needed, or use directly
        const mapped = data.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle,
          image: p.image_url,
          action: p.action_text || 'Saber Mais',
          media_type: p.media_type
        }));
        setBanners(mapped);
      } else {
        // Fallback default banners if no active promotions
        setBanners([
          {
            id: 'default-1',
            title: 'Bem-vindo à LC Pneus',
            subtitle: 'O melhor cuidado para seu carro.',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlb6wQmOF9OeEJJ96ymdLJxi6HWfYViLwbDfuN-3ktVLMIfw7Wn9vTNp9R7yEdN0_QGgcP1YsYHQqooW4smFVSZqF70JRbCSSHG34owh7g5iU1iWkq33cOcpcx-HAmeVomq8pR9jsGU6MtBKkVsmwPfrwwLA8vi2QzsP4YlxR5FyP87vkHAjgZE6UMFmSRgc_POY6LrwuT6tY9e-ZIF3ya1w8iOtbBzvAs3TRCnl-i03IU_ck2ZkzQh9LYfqmJB9h5q-8SM1JznKE',
            action: 'Agendar',
            media_type: 'image'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextSlide = (activeSlide + 1) % banners.length;
        const width = scrollRef.current.offsetWidth * 0.85 + 16; // 85% width + 16px gap

        scrollRef.current.scrollTo({
          left: nextSlide * width,
          behavior: 'smooth'
        });
        setActiveSlide(nextSlide);
      }
    }, 4000); // 4 segundos

    return () => clearInterval(interval);
  }, [activeSlide, banners]);

  // Handle manual scroll to update dots
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollLeft / width);
      setActiveSlide(index);
    }
  };

  const handleVipAccess = () => {
    // Simulação: Verifica localStorage. Se 'isVip' for true, entra. Se não, vai comprar.
    const isVip = localStorage.getItem('isVip') === 'true';
    if (isVip) {
      navigate('/vip-menu');
    } else {
      navigate('/choose-plan');
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Header Centralizado com Padding */}
      <header className="flex justify-between items-center py-4 px-6 bg-[#121212] sticky top-0 z-20 border-b border-[#1E1E1E] shadow-sm">
        {/* Placeholder para equilíbrio */}
        <div className="w-10"></div>

        {/* Logo Central (CSS Composition) */}
        <div className="flex-1 flex justify-center items-center gap-1.5 px-6">
          <div className="h-7 w-7 bg-[#d41142] rounded flex items-center justify-center transform -skew-x-12">
            <span className="material-symbols-outlined text-white text-base transform skew-x-12">tire_repair</span>
          </div>
          <h1 className="text-white text-xl font-black italic tracking-tighter leading-none" style={{ fontFamily: 'Arial, sans-serif' }}>
            LC<span className="text-[#d41142]">PNEUS</span>
          </h1>
        </div>

        {/* Chat Shortcut */}
        <div className="w-10 flex justify-end">
          <button onClick={() => navigate('/chat')} className="flex items-center justify-center h-10 w-10 rounded-full bg-[#1E1E1E] text-[#d41142] hover:bg-[#2a1622] transition-colors border border-[#333333]">
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col p-4 pb-24 space-y-6">
        <div className="px-2 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-white">Olá, João!</h1>
            <p className="text-[#A0A0A0] text-sm mt-1">Bem-vindo à LC Pneus.</p>
          </div>
          <div onClick={() => navigate('/profile')} className="h-12 w-12 rounded-full bg-cover bg-center cursor-pointer border-2 border-[#800020]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAyefDiGpwI5QZKMke2XhUx4n3H3bod-QtF-4bRotsuDJbfaecqo2AOJgnlvIWisdyUQk-wcI9oeYlJwu5NJLeCIDErBphHDMg314xSgpXG491DCRP9su_2YmXMinHFwN8XMTYwFXHOlKZtTHr0B4UZldqXz9xh1EezYBRU0xvklJ31fKp2yAwuEmngAirkSMUPpnHhLLFXBZoKZ6l5m2fN4msdEc_A_f749-YmcopoNt7pE5TOmfvP6m2OJ9wMnz3TcpxMi-QMJI")' }}></div>
        </div>

        {/* Carousel Automático */}
        <div className="relative w-full space-y-3">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory overflow-x-auto pb-4 gap-4 scrollbar-hide"
          >
            {banners.map((banner, index) => (
              <div key={index} className="snap-center flex-shrink-0 w-[85%]">
                <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden h-40 flex flex-col justify-end p-4 border border-[#333333]">
                  {banner.media_type === 'video' ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      src={banner.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-60" src={banner.image} />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-white text-lg mb-1">{banner.title}</h3>
                    <p className="text-sm text-gray-200 mb-2">{banner.subtitle}</p>
                    <button
                      onClick={() => navigate(`/promo/${banner.id}`)}
                      className="inline-block bg-[#d41142] text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-[#b00e36] transition-colors shadow-lg shadow-[#d41142]/20"
                    >
                      {banner.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicadores do Carrossel */}
          <div className="flex justify-center items-center space-x-2">
            {banners.map((_, index) => (
              <div
                key={index}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-[#d41142]' : 'w-2.5 bg-[#333333]'}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Grid Menu */}
        <div className="grid grid-cols-2 gap-4">

          {/* Meus Agendamentos */}
          <div onClick={() => navigate('/appointments')} className="col-span-2 bg-[#1E1E1E] rounded-xl p-5 cursor-pointer hover:bg-[#252525] transition-colors shadow-sm border border-[#333333] flex justify-between items-center group">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-[#A0A0A0] uppercase tracking-wide mb-2 group-hover:text-white transition-colors">Próximo Agendamento</h2>
              <div className="flex items-center gap-4">
                {/* Thumbnail do Veículo */}
                <div className="h-14 w-14 rounded-lg bg-cover bg-center border border-[#333333] shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc")' }}></div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase bg-[#d41142]/10 text-[#d41142] px-1.5 py-0.5 rounded border border-[#d41142]/20">25 JUL • 14:00</span>
                  </div>
                  <p className="font-bold text-white text-lg mt-0.5">Revisão Completa</p>
                  <p className="text-xs text-[#A0A0A0] font-medium">Honda Civic</p>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#555555] group-hover:text-white transition-colors">chevron_right</span>
          </div>

          {/* Agendar Novo Serviço - Featured */}
          <div onClick={() => navigate('/request/select-vehicle')} className="col-span-2 bg-gradient-to-r from-[#800020] to-[#b00e36] rounded-xl p-5 flex flex-row items-center justify-between cursor-pointer hover:shadow-lg hover:shadow-[#d41142]/30 transition-all border border-[#d41142]/50 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
            <div className="flex flex-col relative z-10">
              <h3 className="font-black text-white text-xl uppercase italic tracking-tight">Agendar Serviço</h3>
              <p className="text-xs text-white/90 mt-1 font-medium">Revisão, Óleo, Freios...</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
          </div>

          {/* Buscar e Entregar Veículo - New Feature */}
          <div onClick={() => navigate('/pickup/request')} className="col-span-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-5 flex flex-row items-center justify-between cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition-all border border-blue-500/50 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-black/20 to-transparent"></div>
            <div className="flex flex-col relative z-10">
              <h3 className="font-black text-white text-xl uppercase italic tracking-tight">Buscar e Entregar</h3>
              <p className="text-xs text-white/90 mt-1 font-medium">Buscamos e entregamos seu veículo</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">local_shipping</span>
            </div>
          </div>

          {/* MENU VIP - Destaque (Dourado) - CARD NOVO */}
          <div onClick={handleVipAccess} className="col-span-2 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-xl p-5 flex flex-row items-center justify-between cursor-pointer hover:shadow-lg hover:shadow-yellow-500/20 transition-all border border-yellow-500/30 relative overflow-hidden group">
            <div className="absolute right-0 top-0 h-full w-2/3 bg-gradient-to-l from-black/30 to-transparent"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl">diamond</span>
              </div>
              <div>
                <h3 className="font-black text-white text-lg uppercase tracking-tight">Menu V.I.P</h3>
                <p className="text-xs text-white/90 font-medium">Área Exclusiva</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white relative z-10">chevron_right</span>
          </div>

          {/* Quick Actions Grid - Standardized Cards */}

          <div onClick={() => navigate('/vehicles')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">directions_car</span>
            <div>
              <h3 className="font-bold text-white text-sm">Veículos</h3>
              <p className="text-[10px] text-[#A0A0A0]">Gerenciar</p>
            </div>
          </div>

          <div onClick={() => navigate('/order-status')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">schedule</span>
            <div>
              <h3 className="font-bold text-white text-sm">Status OS</h3>
              <p className="text-[10px] text-[#A0A0A0]">Acompanhar</p>
            </div>
          </div>

          <div onClick={() => navigate('/history')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">history</span>
            <div>
              <h3 className="font-bold text-white text-sm">Histórico</h3>
              <p className="text-[10px] text-[#A0A0A0]">Manutenções</p>
            </div>
          </div>

          {/* Orçamentos - Simplificado */}
          <div onClick={() => navigate('/quote')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">receipt_long</span>
            <div>
              <h3 className="font-bold text-white text-sm">Orçamentos</h3>
              <p className="text-[10px] text-[#A0A0A0]">Receber/Aprovar</p>
            </div>
          </div>

          {/* Checklist Digital */}
          <div onClick={() => navigate('/checklist')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">checklist</span>
            <div>
              <h3 className="font-bold text-white text-sm">Checklist Digital</h3>
              <p className="text-[10px] text-[#A0A0A0]">Verificar itens</p>
            </div>
          </div>

          {/* Fale Conosco */}
          <div onClick={() => navigate('/chat')} className="bg-[#1E1E1E] rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-[#252525] border border-[#333333] hover:border-[#d41142]/30 transition-all group">
            <span className="material-symbols-outlined text-3xl text-[#d41142] group-hover:scale-110 transition-transform">support_agent</span>
            <div>
              <h3 className="font-bold text-white text-sm">Fale Conosco</h3>
              <p className="text-[10px] text-[#A0A0A0]">Tire dúvidas</p>
            </div>
          </div>

          {/* ADMIN / EMPLOYEE ACCESS */}
          {isAdmin && (
            <div onClick={() => navigate('/admin')} className="col-span-2 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-5 flex flex-row items-center justify-between cursor-pointer hover:shadow-lg transition-all border border-gray-600 relative overflow-hidden group">
              <div className="flex flex-col relative z-10">
                <h3 className="font-black text-white text-xl uppercase italic tracking-tight">Painel Admin</h3>
                <p className="text-xs text-white/90 mt-1 font-medium">Gerenciar Loja e Assinaturas</p>
              </div>
              <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm relative z-10 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
              </div>
            </div>
          )}

          {isEmployee && !isAdmin && (
            <div onClick={() => navigate('/employee/checklist')} className="col-span-2 bg-[#2a1622] rounded-xl p-5 flex flex-row items-center justify-between cursor-pointer border border-[#d41142]/30 hover:bg-[#381d2d]">
              <div className="flex flex-col">
                <h3 className="font-bold text-white text-lg">Área do Funcionário</h3>
                <p className="text-xs text-[#A0A0A0]">Acessar Checklist e Serviços</p>
              </div>
              <span className="material-symbols-outlined text-[#d41142] text-3xl">engineering</span>
            </div>
          )}

        </div>
      </main>

      <BottomMenu />
    </div>
  );
};

export default Dashboard;
