
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PromoDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock de dados da promoção
  const promo = id === 'oil' ? {
      title: 'Troca de Óleo',
      discount: '15% OFF',
      description: 'Garanta o melhor desempenho para o motor do seu carro. Utilizamos óleo sintético de alta performance e trocamos o filtro gratuitamente.',
      price: 'De R$ 250,00 por R$ 212,50',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlb6wQmOF9OeEJJ96ymdLJxi6HWfYViLwbDfuN-3ktVLMIfw7Wn9vTNp9R7yEdN0_QGgcP1YsYHQqooW4smFVSZqF70JRbCSSHG34owh7g5iU1iWkq33cOcpcx-HAmeVomq8pR9jsGU6MtBKkVsmwPfrwwLA8vi2QzsP4YlxR5FyP87vkHAjgZE6UMFmSRgc_POY6LrwuT6tY9e-ZIF3ya1w8iOtbBzvAs3TRCnl-i03IU_ck2ZkzQh9LYfqmJB9h5q-8SM1JznKE',
      features: ['Óleo Sintético 5W30', 'Filtro de Óleo Incluso', 'Revisão de 15 itens grátis']
  } : {
      title: 'Alinhamento 3D',
      discount: 'Promoção Especial',
      description: 'Evite desgaste irregular dos pneus e garanta mais segurança na direção com nosso alinhamento computadorizado 3D.',
      price: 'Apenas R$ 100,00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAriJUwj2HKQq1dE4N0uDQBEfqEZc2hJFmd5w7b9Vy115g_JoSbqYdqRPSwDmjmrOLKGkv91AtAUIA-HS_O6CkHhAERDQqqlSCgbrar69IVOjNjSY1B9amUQMt-LkmTEaByO7h6nud0LYfyijhiH5lRuA_B2vcGxz080oGS24xHraqLdJY_QhsE6fNFxCYCtTCDzEwau0P5PvqoWGXkZ9I5tqPoa_uG4zAcCzDqIHReXVUOxPmDHdGXbOKe4DrudsWheCBm47emW0s',
      features: ['Tecnologia 3D', 'Balanceamento incluso', 'Relatório impresso']
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] font-display overflow-x-hidden text-white">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${promo.image}")`}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]"></div>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 h-10 w-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20">
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>

      <main className="flex-1 px-6 -mt-10 relative z-10 pb-24">
        <div className="flex flex-col gap-4">
            <div>
                <span className="bg-[#d41142] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-[#d41142]/30 mb-2 inline-block">
                    {promo.discount}
                </span>
                <h1 className="text-3xl font-bold leading-tight">{promo.title}</h1>
                <p className="text-[#800020] text-xl font-bold mt-1">{promo.price}</p>
            </div>

            <p className="text-[#A0A0A0] text-sm leading-relaxed">
                {promo.description}
            </p>

            <div className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333333] mt-2">
                <h3 className="font-bold text-white mb-3">O que está incluso:</h3>
                <ul className="space-y-3">
                    {promo.features.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-[#E0E0E0]">
                            <span className="material-symbols-outlined text-[#2E7D32]">check_circle</span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#121212] border-t border-[#333333] max-w-md mx-auto">
        <button 
            onClick={() => navigate('/request/select-vehicle')}
            className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-all active:scale-95"
        >
            Quero Aproveitar
        </button>
      </div>
    </div>
  );
};

export default PromoDetails;
