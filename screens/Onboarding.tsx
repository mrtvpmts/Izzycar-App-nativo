
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] overflow-hidden">
      <div className="flex h-full w-full grow flex-col justify-between p-4">
        
        {/* Header */}
        <header className="flex w-full items-center justify-between pt-4 px-2">
           {step === 1 ? (
             <>
                <div className="h-6"></div> {/* Spacer */}
                <span className="text-sm font-bold text-[#800020]/80 uppercase tracking-widest">1 de 3</span>
             </>
           ) : (
             <>
               <div className="flex size-10 shrink-0 items-center justify-center text-[#F5F5F5]">
                  <span className="material-symbols-outlined text-3xl text-[#800020]">build_circle</span>
               </div>
               <div className="flex items-center justify-end">
                  <button onClick={handleSkip} className="text-[#A0A0A0] text-sm font-bold leading-normal tracking-wide uppercase hover:text-white transition-colors">Pular</button>
               </div>
             </>
           )}
        </header>

        {/* Content */}
        <main className="flex flex-col items-center justify-center gap-6 text-center grow relative z-10">
          
          {/* Image Container with Red Overlay Effect */}
          <div className="w-full max-w-[340px] aspect-square relative rounded-full overflow-hidden border-4 border-[#800020]/20 shadow-2xl shadow-[#800020]/10 bg-[#1E1E1E]">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212] z-20"></div>
             {/* Red Tint Overlay */}
             <div className="absolute inset-0 bg-[#800020] mix-blend-overlay opacity-20 z-10"></div>
             
             <div className="w-full h-full flex justify-center items-center p-0">
                {step === 1 && (
                  <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1000&auto=format&fit=crop")' }}></div>
                )}
                {step === 2 && (
                   <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop")' }}></div>
                )}
                {step === 3 && (
                   <div className="w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605218427306-0343d6114e44?q=80&w=1000&auto=format&fit=crop")' }}></div>
                )}
             </div>
          </div>
          
          <div className="flex flex-col gap-3 px-4 mt-4">
            <h1 className="text-white tracking-tight text-[28px] font-extrabold leading-tight text-center">
              {step === 1 && "Serviços Automotivos ao Seu Alcance"}
              {step === 2 && "Transparência Total no Seu Reparo"}
              {step === 3 && "Tudo Pronto para Cuidar do Seu Carro"}
            </h1>
            <p className="text-[#A0A0A0] text-base font-medium leading-relaxed text-center max-w-xs mx-auto">
              {step === 1 && "Agende revisões, trocas de óleo e reparos com poucos cliques. A qualidade que você confia, agora digital."}
              {step === 2 && "Receba orçamentos detalhados, aprove serviços e acompanhe o status do seu veículo em tempo real."}
              {step === 3 && "Histórico completo, checklists digitais e atendimento via chat. Vamos começar?"}
            </p>
          </div>
        </main>

        <footer className="flex flex-col w-full items-center gap-8 pb-8 pt-4">
          <div className="flex w-full flex-row items-center justify-center gap-2">
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-[#d41142]' : 'w-2 bg-[#333333]'}`}></div>
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-[#d41142]' : 'w-2 bg-[#333333]'}`}></div>
             <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-[#d41142]' : 'w-2 bg-[#333333]'}`}></div>
          </div>
          
          <button 
            onClick={handleNext}
            className="flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#800020] to-[#d41142] hover:from-[#600018] hover:to-[#b00e36] px-6 text-base font-bold text-white shadow-lg shadow-[#800020]/40 transition-all active:scale-95"
          >
            <span>{step === 3 ? "Acessar Oficina" : "Continuar"}</span>
            <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Onboarding;
