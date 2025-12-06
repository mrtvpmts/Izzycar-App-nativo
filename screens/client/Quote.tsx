
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Quote: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-[#E0E0E0]">
      <header className="flex items-center bg-[#121212] p-4 pb-2 justify-center sticky top-0 z-10">
        <img onClick={() => navigate('/dashboard')} alt="Logo da Oficina" className="h-8 cursor-pointer" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7p8tFaqTDEu771N_fXU9943_QtnZDVyOIUzWFmAoXMiRD59u_2zFNYvjHp5t7FBqXRC-R6K3njQbN1-cIuzTNg09PZC_7iPj-8vBUXB4xlv8jlxW4-yrpgE2vZaF4chj8DDR-tlnpOTMYUxcI9CSBIuHEPeJY1th7iqITU0UTYO6iHgoUyXQ4BkT16fyky2i-bfrpDYkWN-6s6-TTYyPQAT1gWowoxg5uHKIfhTZbXAvduZ5lMyBwGexeVhOzW37a0_sjWccDd1k" />
      </header>

      <main className="flex-1 px-4 py-4 space-y-6">
        <div className="text-center">
           <h1 className="text-white tracking-light text-[32px] font-bold leading-tight">Orçamento #12045</h1>
           <p className="text-[#A0A0A0] text-sm font-normal leading-normal pt-1">Data: 23 de Outubro, 2024</p>
        </div>

        {/* Vehicle Card with Image - Restored */}
        <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#333333] shadow-lg">
           <div className="h-40 w-full bg-cover bg-center relative" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI")'}}>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-[#1E1E1E]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                 <h2 className="text-white text-xl font-bold">Toyota Corolla 2021</h2>
                 <p className="text-[#A0A0A0] text-sm">Placa: BRA2E19</p>
              </div>
           </div>
           <div className="p-4 pt-0">
              <div className="flex items-center gap-2 pt-3 border-t border-[#333333]/50">
                 <span className="material-symbols-outlined text-[#800020]">person</span>
                 <p className="text-[#E0E0E0] text-sm font-medium">Cliente: José da Silva</p>
              </div>
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#333333]">
           <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Serviços</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-start text-sm">
                 <div>
                    <p className="text-white font-normal">Troca de óleo do motor e filtro</p>
                    <p className="text-[#A0A0A0]">1x R$ 150,00</p>
                 </div>
                 <p className="text-white font-bold">R$ 150,00</p>
              </div>
              <div className="border-t border-[#333333]"></div>
              <div className="flex justify-between items-start text-sm">
                 <div>
                    <p className="text-white font-normal">Alinhamento e Balanceamento</p>
                    <p className="text-[#A0A0A0]">1x R$ 120,00</p>
                 </div>
                 <p className="text-white font-bold">R$ 120,00</p>
              </div>
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#333333]">
           <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Peças</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-start text-sm">
                 <div>
                    <p className="text-white font-normal">Filtro de Óleo</p>
                    <p className="text-[#A0A0A0]">1x R$ 45,50</p>
                 </div>
                 <p className="text-white font-bold">R$ 45,50</p>
              </div>
              <div className="border-t border-[#333333]"></div>
              <div className="flex justify-between items-start text-sm">
                 <div>
                    <p className="text-white font-normal">Óleo Sintético 5W30</p>
                    <p className="text-[#A0A0A0]">4x R$ 55,00</p>
                 </div>
                 <p className="text-white font-bold">R$ 220,00</p>
              </div>
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#333333]">
           <div className="flex justify-between items-center text-sm mb-2">
              <p className="text-[#A0A0A0]">Subtotal</p>
              <p className="text-white">R$ 535,50</p>
           </div>
           <div className="flex justify-between items-center text-sm mb-4">
              <p className="text-[#A0A0A0]">Descontos</p>
              <p className="text-white">R$ 0,00</p>
           </div>
           <div className="border-t border-[#333333] my-3"></div>
           <div className="flex justify-between items-center">
              <p className="text-white font-bold text-lg">Total</p>
              <p className="text-[#800020] font-bold text-2xl">R$ 535,50</p>
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#333333]">
           <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">Observações</h3>
           <p className="text-[#A0A0A0] text-sm font-normal leading-relaxed">Recomendamos a verificação do sistema de freios na próxima revisão. Nenhum outro problema foi identificado durante a inspeção inicial.</p>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 border border-[#333333]">
           <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Fotos Anexadas</h3>
           <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              <img className="h-20 w-20 object-cover rounded-lg flex-shrink-0 border border-[#333333]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7AVeZl2pgS-MsbgOlgfdwQiStO-5fnaci8-GAuixEnUkAT5rZyF5aIgNsk6T-eT9aSj4TsIvtNWBbjwmKQ30sihmUn7eNC0J8hwDay3Aa_x_j21aedm8E-MEREvZOXWHeTfEr3YzVgPUzueYHRSoXQ96hOG4QAU90w0HNmdUQz6RVAh8PvqO_FiM_FMY0YhxtGqIOHq9lGDyfvBYc4Rw-zHpHpsNYh3caSfop1_7XgyDuuq26vYL4C-UPDU9z0P_WYwWdaZYaQlA" alt="Photo 1" />
              <img className="h-20 w-20 object-cover rounded-lg flex-shrink-0 border border-[#333333]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_OERmdOrKCN9vEFi86YqdteL_QehHuFL70Cou76FWixWXOlnkJS4QS0CL-10YzfP6wuaODEiwVdEnHITmW94eBvcDnpG_WNR19KeHKaBH9vsa99whl2zmaEXwMiyCdaeF8EsraS2THMLofYVC27xliM1Y8vawmS4JQIn_w1u3IiEcHZo9jBjEGNoKB9TkyogDZ0gXf_aFmhXTKrEZLbESRofGzQWP6JkqArFbwoxDDwtzdOO7l6MmhUwei82tBKCAdE7_FDKwigE" alt="Photo 2" />
              <img className="h-20 w-20 object-cover rounded-lg flex-shrink-0 border border-[#333333]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeXBxz2fNpgP8scf9DPx8-desCPoGJSlhVqlNe8sBwn32pHN8nS3G0-p8DhL_7Jcqsd0MTAD29Z5AX4ZqfuEwBD-z7ZpgF9UqwM_xJ-T2iAO9wmrpPXzQP7KtEvasC4Z2aoiPE5y2Cw75FRabSdL30tRWgKzO9cLQRHbuTzuNc-fQ48lg3pBWeR5kjMSfEb0EvhD5A9BGBdeDtW0AyU3cPGj82cp5eQP2HZO9aFPL2KibvUkMdK_3StLafiZNXgZFaDeZf1jrVUNc" alt="Photo 3" />
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 text-center border border-[#333333]">
           <img className="h-16 mx-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNb2jSLmfZ5oqyiMXNXzZ9c62zg28PBggGrEmZ6JZTCU-Ujd09qDb5UgtpCCCspOW1tJI-qeqa_YxSE50uKoW93Ens9mLEvb9rdsrnIvCYS60uXzhbLKKlsIiRg9KyLkl2h73H3pS--ABJsK3c9K0WMevDHYHYPjcEIbgGEeNl0_KUD_HlL0o55PGIwcs4cpMpt1Afg87At1c-wSvSUfCgjAnZYSZYqd_mUxAb-P4sZo9UTlt0GLs0v2t249YNJLsznFe-JkIaLUg" alt="Signature" />
           <p className="text-white text-sm font-bold mt-2">Carlos Almeida</p>
           <p className="text-[#A0A0A0] text-xs">Mecânico Responsável</p>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-[#121212] p-4 space-y-3 border-t border-[#333333]">
        <button className="w-full bg-[#800020] text-white font-bold py-4 rounded-lg text-base hover:bg-[#800020]/90">Aprovar Orçamento</button>
        <button className="w-full bg-[#333333] text-[#E0E0E0] font-bold py-4 rounded-lg text-base hover:bg-[#444444]">Rejeitar Orçamento</button>
      </footer>
    </div>
  );
};

export default Quote;
