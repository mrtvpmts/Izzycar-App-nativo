import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../context/AuthContext';
import { useRequest } from '../../../context/RequestContext';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: string;
  plate: string;
  // image?: string; // Optional if we add images later
}

const SelectVehicle: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setVehicleId } = useRequest();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchVehicles();
    }
  }, [user]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', user?.id)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (selectedId) {
      setVehicleId(selectedId === 'other' ? 'other' : selectedId);
      navigate('/request/services');
    }
  };

  // Mock function to get image based on brand (for visual consistency)
  const getVehicleImage = (brand: string) => {
    const lower = brand.toLowerCase();
    if (lower.includes('honda')) return 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc';
    if (lower.includes('toyota')) return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI';
    return 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI'; // Default
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Agendar Serviço</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-[28px] font-bold leading-tight">Qual veículo precisa de atenção?</h2>
        <p className="text-[#A0A0A0] text-base">Selecione um dos seus veículos cadastrados ou indique outro.</p>
      </div>

      <main className="flex-1 p-4 pb-24">
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#A0A0A0]">
              <span className="material-symbols-outlined animate-spin text-4xl mb-4">progress_activity</span>
              <p>Carregando veículos...</p>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="h-32 w-32 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-[#333333]">
                <span className="material-symbols-outlined text-[64px] text-[#555555]">no_crash</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhum veículo encontrado</h3>
              <p className="text-[#A0A0A0] text-sm mb-8 max-w-[250px]">
                Para agendar um serviço, primeiro precisamos saber qual é o seu veículo.
              </p>

              <button
                onClick={() => navigate('/vehicles/add')}
                className="w-full bg-[#d41142] text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b00e36] transition-colors shadow-lg shadow-[#d41142]/20 mb-4"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Cadastrar Veículo
              </button>

              <button
                onClick={() => setSelectedId('other')}
                className={`text-[#A0A0A0] text-sm hover:text-white transition-colors py-2 px-4 rounded-lg border border-transparent hover:border-[#333333] ${selectedId === 'other' ? 'text-white font-bold bg-[#1E1E1E] border-[#800020]' : ''}`}
              >
                Usar outro veículo pontualmente
              </button>
            </div>
          ) : (
            vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => setSelectedId(vehicle.id)}
                className={`bg-[#1E1E1E] rounded-xl overflow-hidden cursor-pointer transition-all border-2 relative ${selectedId === vehicle.id ? 'border-[#800020]' : 'border-transparent'}`}
              >
                <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url("${getVehicleImage(vehicle.brand)}")` }}></div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-white">{vehicle.brand} {vehicle.model}</h2>
                    <p className="text-[#A0A0A0] text-sm mt-1">{vehicle.plate}</p>
                  </div>
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedId === vehicle.id ? 'border-[#800020] bg-[#800020]' : 'border-[#A0A0A0]'}`}>
                    {selectedId === vehicle.id && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Option for Unregistered/Other Vehicle - Only show if list is NOT empty (otherwise handled in Empty State) */}
          {vehicles.length > 0 && (
            <div
              onClick={() => setSelectedId('other')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 bg-[#1E1E1E] ${selectedId === 'other' ? 'border-[#800020]' : 'border-transparent'}`}
            >
              <div className="h-12 w-12 rounded-full bg-[#333333] flex items-center justify-center text-[#A0A0A0]">
                <span className="material-symbols-outlined">directions_car_off</span>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white">Outro Veículo / Não Cadastrado</h3>
                <p className="text-xs text-[#A0A0A0]">Informe os dados na próxima etapa.</p>
              </div>
              <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${selectedId === 'other' ? 'border-[#800020] bg-[#800020]' : 'border-[#A0A0A0]'}`}>
                {selectedId === 'other' && <span className="material-symbols-outlined text-white text-base font-bold">check</span>}
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="p-4 pt-2 border-t border-[#333333] sticky bottom-0 bg-[#121212]">
        <button
          onClick={handleNext}
          disabled={!selectedId}
          className={`w-full h-14 rounded-xl font-bold text-base flex items-center justify-center transition-colors ${selectedId ? 'bg-[#800020] text-white shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90' : 'bg-[#333333] text-[#A0A0A0] cursor-not-allowed'}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SelectVehicle;