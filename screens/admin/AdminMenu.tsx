
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#121212] font-display text-white">
      <div className="flex items-center bg-[#121212] p-4 pb-2 justify-between sticky top-0 z-10">
        <div onClick={() => navigate('/login')} className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-zinc-300">arrow_back_ios_new</span>
        </div>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Área Administrativa</h1>
        <div className="size-12 shrink-0"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 px-6 py-4">
        <h2 className="text-2xl font-bold text-center mb-4">O que deseja gerenciar?</h2>

        {/* Gestão da Oficina */}
        <div
          onClick={() => navigate('/admin/shop')}
          className="w-full max-w-sm bg-[#1E1E1E] rounded-2xl p-6 border border-[#333333] cursor-pointer hover:bg-[#2a1a1d] hover:border-[#d41132] transition-all group shadow-lg"
        >
          <div className="h-16 w-16 bg-[#d41132]/20 rounded-full flex items-center justify-center text-[#d41132] mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">store</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Gestão da Oficina</h3>
          <p className="text-[#A0A0A0] text-sm">Gerencie serviços, preços, equipe, horários de funcionamento e feriados.</p>
        </div>

        {/* Gestão de Assinaturas */}
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="w-full max-w-sm bg-[#1E1E1E] rounded-2xl p-6 border border-[#333333] cursor-pointer hover:bg-[#2a1a1d] hover:border-amber-500 transition-all group shadow-lg"
        >
          <div className="h-16 w-16 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">diamond</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Gestão de Assinaturas</h3>
          <p className="text-[#A0A0A0] text-sm">Acompanhe métricas financeiras, assinantes ativos, churn e planos VIP.</p>
        </div>

        {/* Gestão da Loja */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-4">
          <div
            onClick={() => navigate('/admin/products')}
            className="bg-[#1E1E1E] rounded-2xl p-4 border border-[#333333] cursor-pointer hover:bg-[#2a1a1d] hover:border-green-500 transition-all group shadow-lg"
          >
            <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
            <h3 className="font-bold text-white mb-1">Produtos</h3>
            <p className="text-[#A0A0A0] text-xs">Catálogo</p>
          </div>
          <div
            onClick={() => navigate('/admin/orders')}
            className="bg-[#1E1E1E] rounded-2xl p-4 border border-[#333333] cursor-pointer hover:bg-[#2a1a1d] hover:border-blue-500 transition-all group shadow-lg"
          >
            <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-500 mb-3 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">shopping_bag</span>
            </div>
            <h3 className="font-bold text-white mb-1">Pedidos</h3>
            <p className="text-[#A0A0A0] text-xs">Vendas</p>
          </div>
        </div>

        {/* Mini ERP */}
        <div
          onClick={() => navigate('/admin/erp')}
          className="w-full max-w-sm bg-[#1E1E1E] rounded-2xl p-6 border border-[#333333] cursor-pointer hover:bg-[#2a1a1d] hover:border-purple-500 transition-all group shadow-lg"
        >
          <div className="h-16 w-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-500 mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-4xl">monitoring</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">ERP / Financeiro</h3>
          <p className="text-[#A0A0A0] text-sm">Visão geral sensível do negócio. Faturamento, ticket médio e fluxo de caixa.</p>
        </div>

      </main>
    </div>
  );
};

export default AdminMenu;
