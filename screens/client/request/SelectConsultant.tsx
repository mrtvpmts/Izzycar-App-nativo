import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useRequest } from '../../../context/RequestContext';

interface Consultant {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string;
}

const SelectConsultant: React.FC = () => {
  const navigate = useNavigate();
  const { setConsultantId } = useRequest();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultants();
  }, []);

  const fetchConsultants = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['employee', 'mechanic']); // Mostrar todos da equipe

      if (error) throw error;

      setConsultants(data || []);
    } catch (error) {
      console.error('Error fetching consultants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedId) {
      setConsultantId(selectedId);
      navigate('/request/date'); // Skip 'mechanic' for now since user flow seemed to imply one person choice or I will keep it simple
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
          <h1 className="text-lg font-bold">LC PNEUS</h1>
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
        <div className="w-6 h-px bg-slate-700"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-slate-700"></div>
          <p className="text-slate-500 text-xs font-medium">Data/Hora</p>
        </div>
      </div>

      <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-2">Escolha o Profissional</h1>
      <p className="px-4 text-[#A0A0A0] text-sm">Quem você prefere que atenda seu veículo?</p>

      <main className="flex-1 p-4 pb-24 flex flex-col gap-4 mt-4">
        {loading ? <p className="text-center text-gray-500">Carregando equipe...</p> : (
          <>
            <div
              onClick={() => setSelectedId('any')}
              className={`flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border cursor-pointer transition-all ${selectedId === 'any' ? 'border-[#800020] bg-[#2a1622]' : 'border-transparent hover:bg-[#2a2a2a]'}`}
            >
              <div className="h-14 w-14 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                <span className="material-symbols-outlined text-2xl">groups</span>
              </div>

              <div className="flex-1">
                <h3 className="text-white font-bold text-lg">Qualquer Disponível</h3>
                <p className="text-[#A0A0A0] text-sm">Primeiro horário livre</p>
              </div>

              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedId === 'any' ? 'border-[#800020] bg-[#800020]' : 'border-[#A0A0A0]'}`}>
                {selectedId === 'any' && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
              </div>
            </div>

            {consultants.map((person) => (
              <div
                key={person.id}
                onClick={() => setSelectedId(person.id)}
                className={`flex items-center gap-4 bg-[#1E1E1E] p-4 rounded-xl border cursor-pointer transition-all ${selectedId === person.id ? 'border-[#800020] bg-[#2a1622]' : 'border-transparent hover:bg-[#2a2a2a]'}`}
              >
                {person.avatar_url ? (
                  <img src={person.avatar_url} alt={person.full_name} className="h-14 w-14 rounded-full object-cover border-2 border-[#333333]" />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">{person.full_name || 'Sem Nome'}</h3>
                  <p className="text-[#A0A0A0] text-sm capitalize">{person.role === 'employee' ? 'Consultor Técnico' : person.role}</p>
                </div>

                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedId === person.id ? 'border-[#800020] bg-[#800020]' : 'border-[#A0A0A0]'}`}>
                  {selectedId === person.id && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
                </div>
              </div>
            ))}
          </>
        )}
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button
          onClick={handleNext}
          disabled={!selectedId}
          className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedId ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90' : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'}`}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default SelectConsultant;