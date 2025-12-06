import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] font-display text-white">
      <div className="flex items-center bg-[#121212] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start">
            <img alt="Client Logomark" className="h-8 w-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQw3ismh-OwQBB6VyUozmZl_ymA_wfBvGRFrG486G01pzjc7ppEbbsEEJtKFWi4ajVeGkXRWsbPO0HIP__CIRki5oxFHc61J1bmOQzZKAR5ZYVeQt8C2Okyw0W9B7TPl-FtYZ6WTwI8idU8guEsW_w_TheboFl1RAq419eXeRBKgU0l8HFx3Gy_oZChXiRH5e55sLP82yfT5B1IBZytdEtuO7F-46BKlTh-NcpGWKDfdc_I6yX7tP1VT8fZO17q0BoK7oBPBLhiMU" />
        </div>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Gestão de Assinaturas</h1>
        <div className="flex w-12 items-center justify-end">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                <span className="material-symbols-outlined text-white" style={{fontSize: '24px'}}>more_vert</span>
            </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#1C1C1E] border border-[#2A2A2C]">
                <p className="text-[#BDBDBD] text-sm font-medium leading-normal">Total de Assinantes</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">1,250</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#1C1C1E] border border-[#2A2A2C]">
                <p className="text-[#BDBDBD] text-sm font-medium leading-normal">Assinantes Ativos</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">980</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#800020]/20 border border-[#800020]">
                <p className="text-[#800020] text-sm font-medium leading-normal">Receita Mensal (MRR)</p>
                <p className="text-white tracking-light text-2xl font-bold leading-tight">R$ 24.500,00</p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg p-4 bg-[#800020]/20 border border-[#800020]">
                <p className="text-[#800020] text-sm font-medium leading-normal">Taxa de Churn</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-white tracking-light text-2xl font-bold leading-tight">5.2%</p>
                    <div className="flex items-center text-red-400">
                        <span className="material-symbols-outlined text-base">arrow_upward</span>
                        <span className="text-xs font-semibold">0.5%</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Distribution */}
        <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col gap-4 rounded-lg border border-[#2A2A2C] bg-[#1C1C1E] p-4">
                <p className="text-white text-base font-bold leading-normal">Distribuição por Plano</p>
                <div className="flex items-center gap-4">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                        <svg className="h-full w-full" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#800020" strokeWidth="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#BDBDBD" strokeDasharray="60 40" strokeDashoffset="25" strokeWidth="4"></circle>
                            <circle cx="18" cy="18" fill="transparent" r="15.9" stroke="#FFFFFF" strokeDasharray="30 70" strokeDashoffset="25" strokeWidth="4"></circle>
                        </svg>
                        <p className="absolute text-white text-lg font-bold">980</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#800020]"></div>
                            <p className="text-[#BDBDBD] text-sm">Plano Ouro (30%)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#FFFFFF]"></div>
                            <p className="text-[#BDBDBD] text-sm">Plano Prata (40%)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-[#BDBDBD]"></div>
                            <p className="text-[#BDBDBD] text-sm">Plano Básico (30%)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Control */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-2">Controle de Planos</h2>
            <div className="flex flex-col gap-3">
                <details className="flex flex-col rounded-xl border border-[#2A2A2C] bg-[#1C1C1E] px-4 group" open>
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-3 list-none">
                        <p className="text-white text-base font-medium leading-normal">Plano Ouro</p>
                        <span className="material-symbols-outlined text-white group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div className="pb-4 flex flex-col gap-4">
                        <p className="text-[#BDBDBD] text-sm font-normal leading-normal">Adicione ou remova benefícios deste plano.</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between p-2 bg-[#121212] rounded-lg">
                                <p className="text-white text-sm">Troca de óleo gratuita</p>
                                <button className="text-[#800020]"><span className="material-symbols-outlined" style={{fontSize: '20px'}}>delete</span></button>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-[#121212] rounded-lg">
                                <p className="text-white text-sm">Diagnóstico eletrônico</p>
                                <button className="text-[#800020]"><span className="material-symbols-outlined" style={{fontSize: '20px'}}>delete</span></button>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <input className="flex-1 rounded-xl border-[#2A2A2C] bg-[#121212] text-white text-sm placeholder:text-[#BDBDBD] focus:border-[#800020] focus:ring-[#800020]" placeholder="Adicionar novo benefício" type="text"/>
                            <button className="bg-[#800020] text-white px-4 py-2 rounded-xl text-sm font-bold">Salvar</button>
                        </div>
                    </div>
                </details>
                <details className="flex flex-col rounded-xl border border-[#2A2A2C] bg-[#1C1C1E] px-4 group">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-3 list-none">
                        <p className="text-white text-base font-medium leading-normal">Plano Prata</p>
                        <span className="material-symbols-outlined text-white group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                </details>
            </div>
            
            <button className="w-full bg-[#800020]/20 text-[#800020] font-bold py-3 rounded-xl border border-[#800020] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">add_circle</span>
                <span>Adicionar Novo Plano</span>
            </button>

            {/* Subscriber List */}
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-2">Lista de Assinantes</h2>
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-4 rounded-xl bg-[#1C1C1E] p-3">
                  <img className="h-12 w-12 rounded-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAd-yiHBZqNeM7iD3eqC89Dh2xDdstwVAjWVgLz7LsWvWdF4H8BKwpEqGEK5lf5jZB9S-gg1fVaiHGVub0VJ3w4mGG-Fn0gBq5xzm2RY1oGtPSw_mD0fMqY2ZWa4ucb77Fu8CPS2IMXckRDwEwOAYe4Y2hm8HKl3LJrp8OIebmYdiYqmJAbjwrP9ER6QmurRXmSinMq-dsgPHoj11DjDI2dYyrIuVPJekZwvZL7paPfH3jKIGOWDhBeIjB-Bfw46UAE1fuzfANzmjo" />
                  <div className="flex-1">
                     <p className="text-white font-semibold">Carlos Almeida</p>
                     <p className="text-[#BDBDBD] text-sm">Plano Ouro</p>
                  </div>
                  <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Ativo</span>
               </div>
               <div className="flex items-center gap-4 rounded-xl bg-[#1C1C1E] p-3">
                  <img className="h-12 w-12 rounded-full object-cover" alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTThthmZx1RmfaIC0ctBUi2J2Ako53fJvE5HJDxk-to3Ef84Extv9IIxs_QHjh9Yxss3JmwjHhjc0ZA0WuSRkzRT-L-mgOhKnM97sg-IGeJh4ldu1qzcdztrrjPDcnSu-GI0oG-p5-0_tlhltx__fjEAVDRBgQMP5fvU7HOq1WqxewocJqVpGEbrVEEOLtIS_OaVKqIQ4k88oQXQiUfBZH8LWnTF8iImTy8GLOYmrhSyVdn80pBDMJLZqjCVh0cWeQD9g19O11uo4" />
                  <div className="flex-1">
                     <p className="text-white font-semibold">Mariana Costa</p>
                     <p className="text-[#BDBDBD] text-sm">Plano Prata</p>
                  </div>
                  <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Ativo</span>
               </div>
            </div>
        </div>
      </div>
      <div className="h-5 bg-[#121212]"></div>
    </div>
  );
};

export default AdminDashboard;