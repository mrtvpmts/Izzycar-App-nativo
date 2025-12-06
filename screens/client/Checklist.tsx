
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checklist: React.FC = () => {
  const navigate = useNavigate();

  // Mock de dados que viriam do ERP
  const inspectionData = {
    totalItems: 32,
    issuesFound: 3,
    status: 'Attention', // OK, Attention, Critical
    mechanic: 'Carlos Almeida',
    date: '18/07/2024 - 14:30',
    items: [
      { id: 1, name: 'Pastilhas de freio dianteiras', status: 'problem', category: 'Freios' },
      { id: 2, name: 'Palhetas do limpador', status: 'problem', category: 'Visibilidade' },
      { id: 3, name: 'Lâmpada farol direito', status: 'problem', category: 'Elétrica' },
      { id: 4, name: 'Nível do óleo', status: 'ok', category: 'Motor' },
      { id: 5, name: 'Filtro de ar', status: 'ok', category: 'Motor' },
      { id: 6, name: 'Pressão dos pneus', status: 'ok', category: 'Pneus' },
      { id: 7, name: 'Fluído de freio', status: 'ok', category: 'Freios' },
    ]
  };

  const problems = inspectionData.items.filter(i => i.status === 'problem');
  const okItems = inspectionData.items.filter(i => i.status === 'ok');

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden font-display text-white">
      {/* Header */}
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212]/90 backdrop-blur-md z-10">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Relatório de Inspeção</h1>
        <div className="size-10 shrink-0"></div>
      </header>

      <main className="flex flex-col gap-6 p-4 pb-24">
        
        {/* Vehicle Header & Summary */}
        <div className="flex flex-col gap-4">
            <div className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-between overflow-hidden rounded-2xl min-h-[200px] relative p-4" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI")'}}>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40"></div>
                <div className="relative z-10 flex justify-end">
                    <span className="bg-[#B71C1C] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">Atenção Necessária</span>
                </div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white">Toyota Corolla</h2>
                    <p className="text-white/80 text-sm">BRA-2E19 • {inspectionData.date}</p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333] flex flex-col items-center">
                    <span className="text-3xl font-bold text-white">{inspectionData.totalItems}</span>
                    <span className="text-[#A0A0A0] text-xs uppercase tracking-wide">Itens Verificados</span>
                </div>
                <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#B71C1C]/50 flex flex-col items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1">
                        <div className="h-2 w-2 bg-[#B71C1C] rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-3xl font-bold text-[#B71C1C]">{inspectionData.issuesFound}</span>
                    <span className="text-[#B71C1C]/80 text-xs uppercase tracking-wide">Problemas</span>
                </div>
            </div>
        </div>

        {/* Problems Section (Highlighted) */}
        <div>
            <h3 className="text-white text-lg font-bold leading-tight px-1 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#B71C1C]">error</span>
                Itens com Atenção
            </h3>
            <div className="flex flex-col bg-[#2a1215] border border-[#B71C1C]/30 rounded-xl overflow-hidden">
                {problems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-[#B71C1C]/20 last:border-0">
                        <div className="flex flex-col">
                            <span className="text-white font-medium">{item.name}</span>
                            <span className="text-[#E57373] text-xs">{item.category}</span>
                        </div>
                        <span className="material-symbols-outlined text-[#B71C1C]">cancel</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Technical Report / Observations */}
        <div>
            <h3 className="text-white text-lg font-bold leading-tight px-1 pb-3">Parecer Técnico</h3>
            <div className="bg-[#1E1E1E] rounded-xl p-4 border border-[#333333]">
                <div className="flex items-center gap-3 mb-3">
                    <img alt="Mecânico" className="h-10 w-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6g5FOeQ0wbn6774SgaXQraCVyCB3SOHPfHoi52KIwD7724UTMmFxWIAO3LxwMkXErBgY608M6o8-LdLOa6rsozs-xTzte2Og7l12CGcYQ18iY31WL8sfLUSd_FlNmNaXJAXnP-pg3lAlFJimCe9L1Hmd8yYWJ7miRkVyK-PssG0__FGQMWiBtRr40wLtGyTsWuYKfW0rUmbxnS3_LGVhSSijZiV71sxp3fuB8U57-d9iBc57Kh83xqMHoOp7fGvLThu2oTLHd5A8" />
                    <div>
                        <p className="text-white font-bold text-sm">{inspectionData.mechanic}</p>
                        <p className="text-[#A0A0A0] text-xs">Mecânico Responsável</p>
                    </div>
                </div>
                <p className="text-[#E0E0E0] text-sm font-normal leading-relaxed italic">
                    "Identificamos desgaste acentuado nas pastilhas dianteiras (menos de 20% de vida útil). Recomendamos a troca imediata para evitar danos aos discos. As palhetas estão ressecadas e podem riscar o vidro."
                </p>
            </div>
        </div>

        {/* Evidence Photos */}
        <div>
            <h3 className="text-white text-lg font-bold leading-tight px-1 pb-3">Evidências Visuais</h3>
            <div className="flex w-full gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="relative w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden group">
                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGU5XTOMk-T6plOM7T7JZO57ZYjy_kvxfhDr47dZwlVPTGbSpTpx8iIU3WeU4nCsE4AkZOyhKKB9w8iyCmjljGzf3sKL-87BWrD8wZ9_98hc1tWIL_S7ySdgrGz1vyQuih7SSSSWU9KiDkc6akmJirJ4wOOow0TYQ4ENpM7MoNylJtBVG9qaTsdqNtmnSSYdKb3vKmBU6F4fRJSs8BAXkAOpiO9QA2_2fFyRuMmH0e6sDG2RBAaFI3Fq2hwdW0yNkZ0-A9pHADuWQ")'}}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs font-bold">Pastilhas</p>
                    </div>
                </div>
                <div className="relative w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden group">
                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCMTmN1szlmIRrxD1gGpEbtxjeLWOfv6M-qPPBuXeTAlc5yfwbcKMn2Dvc7yaE5e0tDgSb9B3xTyD7-lZGyIwSkHN4ywwBrYbjtN1o1fOS-pzufU2Gup9Fms4pkfp40qn_4EGWOCXKkRyqdOmwwikG9TcMYHwprvFj_vU9-7vL7aXpfgyRij4Dib_YwLCVGL-C9kWafUuKJXzH93979_psRig3psDif0IoB94aCL9O6hsrSMJh0mAUp3HrGhzDHq74sO27yB-pvlug")'}}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs font-bold">Disco</p>
                    </div>
                </div>
                <div className="relative w-36 h-36 flex-shrink-0 rounded-xl overflow-hidden group">
                    <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2zTBSsA9K20DRal9d8bbTorZ5-crtGmY7KrwzVPldjDQzKOcdM9F9mQA9V-xWNGbWsxrLARsIIVJQtfiA693Y6O_TDluc9AxkML2B6Op3Nu4Z7js4ZYT8WI9_NzjB7XenqqD9uT9yVTKQudXIaVkLdsfkDRnLPx2gV9L4HgIt9pY2kHKXqbT49mtR15sulVZoelLr2mHiwjzmmaF0RMn7iqo9NvzPDLUMS0RAxHP11wjKxCjeaBS-1TzKtxTjLLiW-CIu_DKHizI")'}}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
                        <p className="text-white text-xs font-bold">Geral</p>
                    </div>
                </div>
            </div>
        </div>

        {/* OK Items (Collapsed view idea, represented as list for now) */}
        <div>
            <h3 className="text-white text-lg font-bold leading-tight px-1 pb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2E7D32]">check_circle</span>
                Itens Aprovados
            </h3>
            <div className="flex flex-col bg-[#1E1E1E] border border-[#333333] rounded-xl overflow-hidden">
                {okItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border-b border-[#333333] last:border-0">
                        <div className="flex flex-col">
                            <span className="text-[#A0A0A0] font-medium">{item.name}</span>
                        </div>
                        <span className="material-symbols-outlined text-[#2E7D32] text-xl">check</span>
                    </div>
                ))}
            </div>
        </div>

      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#121212] border-t border-[#333333] flex flex-col gap-3 max-w-md mx-auto">
            <button className="flex items-center justify-center gap-2 w-full bg-[#800020] text-white font-bold py-3.5 px-4 rounded-xl text-base shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-all">
                <span className="material-symbols-outlined">picture_as_pdf</span>
                Baixar Laudo Técnico
            </button>
            <button className="flex items-center justify-center gap-2 w-full bg-[#1E1E1E] text-[#E0E0E0] font-bold py-3.5 px-4 rounded-xl text-base border border-[#333333] hover:bg-[#2a2a2a] transition-all">
                <span className="material-symbols-outlined">share</span>
                Compartilhar
            </button>
      </div>
    </div>
  );
};

export default Checklist;
