import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

const SelectMechanic: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // State for fetched mechanics
  const [mechanics, setMechanics] = useState<any[]>([]);

  React.useEffect(() => {
    fetchMechanics();
  }, []);

  const fetchMechanics = async () => {
    try {
      const { data } = await supabase.from('profiles').select('*').eq('role', 'mechanic');
      if (data && data.length > 0) {
        const mapped = data.map(p => ({
          id: p.id,
          name: p.full_name || 'Mecânico',
          role: 'Especialista', // Could be dynamic if added to schema
          image: p.avatar_url,
          available: p.is_online
        }));
        // Add 'Indiferente' option
        mapped.push({ id: 'any', name: 'Indiferente', role: 'Qualquer Especialista', image: '', icon: 'handyman', available: true });
        setMechanics(mapped);
      } else {
        setMechanics([
          { id: 'any', name: 'Indiferente', role: 'Qualquer Especialista', image: '', icon: 'handyman', available: true },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="h-10 flex items-center justify-center">
          <img alt="Logomarca do Cliente" className="h-8 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsiRbUmhueXVuex4B9iRhXip81KPtGc2db9kEYFOSBpSNMjPoLnVQIRTqJ_DNMXQkAHVSFacFBmkQmk2YUKFZsTcGXmeol4QA_9Y1CclWC-4taT7_3IHgnMhe0QCh_zS4GheE9UZhEMeseUaFS3gcjyWnKMlGGYQP04EMj6kPvdqd-U9o8NGFIActwtcwFQK3OAvguEtBMYDn6q8rK-ANqVcBPLVhTQ9AudnI0O6FtXO2-3-YrPKCtLK21zdNGqwqVn0xLTT73yCM" />
        </div>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Stepper */}
      <div className="flex w-full flex-row items-center justify-center gap-3 py-5 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Serviço</p>
        </div>
        <div className="w-6 h-px bg-[#800020]"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Consultor</p>
        </div>
        <div className="w-6 h-px bg-[#800020]"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#800020]"></div>
          <p className="text-[#800020] text-xs font-bold">Mecânico</p>
        </div>
        <div className="w-6 h-px bg-slate-700"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
          <p className="text-slate-500 text-xs font-medium">Data/Hora</p>
        </div>
      </div>

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-2">Escolha o Mecânico</h1>
      <p className="px-4 text-[#A0A0A0] text-sm">Tem preferência por algum especialista?</p>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-4 mt-4">
        {mechanics.map((person) => (
          <div
            key={person.id}
            onClick={() => setSelectedId(person.id)}
            className={`flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border cursor-pointer transition-all ${selectedId === person.id ? 'border-[#800020] bg-[#2a1622]' : 'border-transparent hover:bg-[#2a2a2a]'}`}
          >
            {person.image ? (
              <img src={person.image} alt={person.name} className="h-14 w-14 rounded-full object-cover border-2 border-[#333333]" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                <span className="material-symbols-outlined text-2xl">{person.icon}</span>
              </div>
            )}

            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{person.name}</h3>
              <p className="text-[#A0A0A0] text-sm">{person.role}</p>
            </div>

            <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedId === person.id ? 'border-[#800020] bg-[#800020]' : 'border-[#A0A0A0]'}`}>
              {selectedId === person.id && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
            </div>
          </div>
        ))}
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button
          onClick={() => navigate('/request/date')}
          disabled={!selectedId}
          className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedId ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90' : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default SelectMechanic;