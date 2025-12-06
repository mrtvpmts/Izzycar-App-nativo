import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectVehicle: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  // Mock data - In a real app, this would come from the same source as VehicleList
  const vehicles = [
    {
      id: 1,
      brand: 'Honda',
      model: 'Civic',
      year: '2022',
      plate: 'ABC-1234',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc',
      isFavorite: true
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
      year: '2021',
      plate: 'XYZ-9876',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI',
      isFavorite: false
    }
  ];

  // Sort favorites first
  const sortedVehicles = [...vehicles].sort((a, b) => (b.isFavorite === a.isFavorite) ? 0 : b.isFavorite ? 1 : -1);

  const handleNext = () => {
    if (selectedId) {
      navigate('/request/services');
    }
  };

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
          {sortedVehicles.map((vehicle) => (
            <div 
                key={vehicle.id} 
                onClick={() => setSelectedId(vehicle.id)} 
                className={`bg-[#1E1E1E] rounded-xl overflow-hidden cursor-pointer transition-all border-2 relative ${selectedId === vehicle.id ? 'border-[#800020]' : 'border-transparent'}`}
            >
                <div className="h-32 w-full bg-cover bg-center" style={{backgroundImage: `url("${vehicle.image}")`}}></div>
                {vehicle.isFavorite && (
                    <div className="absolute top-2 right-2 bg-[#800020] rounded-full p-1.5 shadow-md">
                        <span className="material-symbols-outlined text-white text-sm">star</span>
                    </div>
                )}
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
          ))}

          {/* Option for Unregistered/Other Vehicle */}
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
          
          <div onClick={() => navigate('/vehicles/add')} className="p-4 rounded-xl border border-dashed border-[#333333] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1E1E1E]/50 transition-colors text-[#A0A0A0] mt-2">
             <span className="material-symbols-outlined">add_circle</span>
             <span>Cadastrar novo veículo</span>
          </div>
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