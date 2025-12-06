
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../../components/BottomMenu';

const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<number | null>(null);

  // Mock data for vehicles
  const vehicles = [
    {
      id: 1,
      brand: 'Honda',
      model: 'Civic',
      year: '2022',
      plate: 'ABC-1234',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc'
    },
    {
      id: 2,
      brand: 'Toyota',
      model: 'Corolla',
      year: '2021',
      plate: 'XYZ-9876',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI'
    }
  ];

  const handleDeleteClick = (e: React.MouseEvent, id: number) => {
      e.stopPropagation();
      setVehicleToDelete(id);
      setShowDeleteModal(true);
  };

  const confirmDelete = () => {
      // Logic to delete vehicle would go here
      console.log(`Deleting vehicle ${vehicleToDelete}`);
      setShowDeleteModal(false);
      setVehicleToDelete(null);
  };

  const cancelDelete = () => {
      setShowDeleteModal(false);
      setVehicleToDelete(null);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 shadow-md">
        <button onClick={() => navigate('/profile')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Meus Veículos</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 p-4 pb-24">
        <div className="flex flex-col gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} onClick={() => navigate(`/vehicles/edit/${vehicle.id}`)} className="bg-[#1E1E1E] rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-[#800020]/50 shadow-md">
                <div className="h-32 w-full bg-cover bg-center" style={{backgroundImage: `url("${vehicle.image}")`}}></div>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white">{vehicle.brand} {vehicle.model}</h2>
                            <div className="flex gap-4 mt-1">
                                <p className="text-[#A0A0A0] text-sm">Ano: {vehicle.year}</p>
                                <p className="text-[#A0A0A0] text-sm">Placa: {vehicle.plate}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-[#333333]">
                        <button 
                            onClick={(e) => { e.stopPropagation(); navigate(`/vehicles/edit/${vehicle.id}`); }}
                            className="flex items-center gap-1 text-white bg-[#333333] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#444444]"
                        >
                            <span className="material-symbols-outlined text-sm">edit</span>
                            Editar
                        </button>
                        <button 
                            onClick={(e) => handleDeleteClick(e, vehicle.id)}
                            className="flex items-center gap-1 text-[#ff4d4d] bg-[#ff4d4d]/10 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#ff4d4d]/20"
                        >
                            <span className="material-symbols-outlined text-sm">delete</span>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
          ))}
          
          <div onClick={() => navigate('/vehicles/add')} className="bg-[#1E1E1E] border border-dashed border-[#333333] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#2a2a2a] transition-colors">
             <div className="h-12 w-12 rounded-full bg-[#800020]/20 flex items-center justify-center text-[#800020]">
                <span className="material-symbols-outlined text-2xl">add</span>
             </div>
             <p className="text-[#A0A0A0] font-medium">Adicionar novo veículo</p>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-[#333333]">
                  <div className="flex flex-col items-center text-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-[#ff4d4d]/10 flex items-center justify-center text-[#ff4d4d]">
                          <span className="material-symbols-outlined text-3xl">warning</span>
                      </div>
                      <div>
                          <h3 className="text-xl font-bold text-white mb-2">Excluir Veículo?</h3>
                          <p className="text-[#A0A0A0] text-sm">Tem certeza que deseja remover este veículo? Esta ação não pode ser desfeita.</p>
                      </div>
                      <div className="flex gap-3 w-full mt-2">
                          <button onClick={cancelDelete} className="flex-1 h-12 rounded-xl bg-[#333333] text-white font-bold hover:bg-[#444444]">
                              Cancelar
                          </button>
                          <button onClick={confirmDelete} className="flex-1 h-12 rounded-xl bg-[#ff4d4d] text-white font-bold hover:bg-[#e60000]">
                              Excluir
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <BottomMenu />
    </div>
  );
};

export default VehicleList;
