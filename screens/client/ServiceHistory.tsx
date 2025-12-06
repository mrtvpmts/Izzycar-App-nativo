
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const ServiceHistory: React.FC = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<any>(null);
  const [filterPeriod, setFilterPeriod] = useState('todos');
  const [sortOption, setSortOption] = useState('date-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const history = [
    {
      id: 1,
      service: 'Revisão Completa',
      type: 'Revisão',
      date: '10 de Agosto, 2024',
      rawDate: '2024-08-10',
      vehicle: 'Honda Civic',
      vehicleImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc',
      price: 'R$ 350,00',
      rawPrice: 350,
      status: 'Concluído',
      parts: ['Filtro de óleo', 'Filtro de ar', '4L Óleo 5W30', 'Aditivo Radiador'],
      observations: 'Veículo em bom estado geral. Pastilhas de freio com 60% de vida útil.'
    },
    {
      id: 2,
      service: 'Troca de Óleo e Filtro',
      type: 'Manutenção',
      date: '15 de Fevereiro, 2024',
      rawDate: '2024-02-15',
      vehicle: 'Honda Civic',
      vehicleImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc',
      price: 'R$ 250,00',
      rawPrice: 250,
      status: 'Concluído',
      parts: ['Filtro de óleo', '4L Óleo 5W30'],
      observations: 'Cliente solicitou verificação de ruído, nada constatado.'
    },
    {
      id: 3,
      service: 'Alinhamento e Balanceamento',
      type: 'Pneus',
      date: '02 de Dezembro, 2023',
      rawDate: '2023-12-02',
      vehicle: 'Toyota Corolla',
      vehicleImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHRXF4k6ufJVuKFRtGFYF9h8hiDbMzWm8FLwHHEwh40dFP37Xjd0_Tc0w2S3myErWVv61L--Tbv1egL6hPTTngbDrZ8QY0XljfAzuFiYbYyzNBT611bTiDDXs3K0O5eQR3CN7-Z-bEzSDbJWLlYwCE4XX0Uth1cvo528QrpHe_x6L5P1JBxbbql_u9cI4jkBhp3_ij5Pbt7NSEQ-SzyjyLnYBKIXmerl6hvX4tyNPk5FmA6p9OWiXe1LEBLnF6NtY7Z-4bxhsG2SI',
      price: 'R$ 120,00',
      rawPrice: 120,
      status: 'Concluído',
      parts: ['Chumbos de balanceamento'],
      observations: 'Geometria corrigida. Pneus traseiros com desgaste irregular.'
    }
  ];

  const filteredHistory = useMemo(() => {
    let data = [...history];

    // Filter
    if (filterPeriod === '2024') {
      data = data.filter(item => item.rawDate.startsWith('2024'));
    } else if (filterPeriod === '2023') {
      data = data.filter(item => item.rawDate.startsWith('2023'));
    }

    // Sort
    data.sort((a, b) => {
      switch (sortOption) {
        case 'date-desc': return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
        case 'date-asc': return new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime();
        case 'price-desc': return b.rawPrice - a.rawPrice;
        case 'price-asc': return a.rawPrice - b.rawPrice;
        default: return 0;
      }
    });

    return data;
  }, [filterPeriod, sortOption]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Revisão': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'Manutenção': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'Pneus': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-40 shadow-sm">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Histórico</h1>
        <div className="size-10 shrink-0"></div>
      </div>

      {/* Filters & Sorting */}
      <div className="px-4 py-2 sticky top-[56px] bg-[#121212] z-30 pb-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide items-center">
          
          {/* Sort Button */}
          <div className="relative">
            <button 
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1 bg-[#1E1E1E] border border-[#333333] px-3 py-1.5 rounded-full text-sm text-[#A0A0A0] whitespace-nowrap hover:bg-[#2a2a2a] active:bg-[#333333]"
            >
                <span className="material-symbols-outlined text-lg">sort</span>
                Ordenar
            </button>
            
            {showSortMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1E1E1E] border border-[#333333] rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
                    <button onClick={() => {setSortOption('date-desc'); setShowSortMenu(false)}} className={`text-left px-4 py-3 text-sm hover:bg-[#2a2a2a] ${sortOption === 'date-desc' ? 'text-[#800020] font-bold' : 'text-[#A0A0A0]'}`}>Mais recentes</button>
                    <button onClick={() => {setSortOption('date-asc'); setShowSortMenu(false)}} className={`text-left px-4 py-3 text-sm hover:bg-[#2a2a2a] ${sortOption === 'date-asc' ? 'text-[#800020] font-bold' : 'text-[#A0A0A0]'}`}>Mais antigos</button>
                    <button onClick={() => {setSortOption('price-desc'); setShowSortMenu(false)}} className={`text-left px-4 py-3 text-sm hover:bg-[#2a2a2a] ${sortOption === 'price-desc' ? 'text-[#800020] font-bold' : 'text-[#A0A0A0]'}`}>Maior preço</button>
                    <button onClick={() => {setSortOption('price-asc'); setShowSortMenu(false)}} className={`text-left px-4 py-3 text-sm hover:bg-[#2a2a2a] ${sortOption === 'price-asc' ? 'text-[#800020] font-bold' : 'text-[#A0A0A0]'}`}>Menor preço</button>
                </div>
            )}
          </div>

          {/* Filter Chips */}
          <button 
            onClick={() => setFilterPeriod('todos')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterPeriod === 'todos' ? 'bg-[#800020] text-white' : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#333333]'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilterPeriod('2024')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterPeriod === '2024' ? 'bg-[#800020] text-white' : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#333333]'}`}
          >
            2024
          </button>
          <button 
            onClick={() => setFilterPeriod('2023')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterPeriod === '2023' ? 'bg-[#800020] text-white' : 'bg-[#1E1E1E] text-[#A0A0A0] border border-[#333333]'}`}
          >
            2023
          </button>
        </div>
      </div>

      {/* Close sort menu when clicking outside */}
      {showSortMenu && <div className="fixed inset-0 z-20" onClick={() => setShowSortMenu(false)}></div>}

      <main className="flex-1 p-4 pb-24 pt-0">
        <div className="flex flex-col gap-4">
          {filteredHistory.map((item) => (
            <div 
                key={item.id} 
                onClick={() => setSelectedService(item)}
                className="bg-[#1E1E1E] rounded-xl p-3 border border-[#333333] hover:border-[#800020]/50 transition-colors cursor-pointer shadow-sm"
            >
              <div className="flex gap-3">
                {/* Vehicle Thumbnail */}
                <div 
                    className="h-20 w-20 rounded-lg bg-cover bg-center shrink-0 border border-[#333333]" 
                    style={{backgroundImage: `url("${item.vehicleImage}")`}}
                ></div>
                
                <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border w-fit mb-1 ${getTypeColor(item.type)}`}>
                                {item.type}
                            </span>
                            <h3 className="text-white font-bold text-base leading-tight">{item.service}</h3>
                        </div>
                        <span className="text-[#800020] font-bold text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                        <p className="text-[#A0A0A0] text-xs flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {item.date}
                        </p>
                        <div className="bg-[#2E7D32]/10 text-[#2E7D32] px-2 py-0.5 rounded text-[10px] font-bold border border-[#2E7D32]/20">
                            {item.status}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredHistory.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-[#A0A0A0]">
                  <span className="material-symbols-outlined text-4xl mb-2 opacity-50">history_toggle_off</span>
                  <p>Nenhum serviço encontrado neste período.</p>
              </div>
          )}
        </div>
      </main>

      {/* Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-[#1E1E1E] w-full max-w-md h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-2xl sm:rounded-2xl flex flex-col border border-[#333333] shadow-2xl animate-in slide-in-from-bottom duration-300">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#333333]">
                    <h2 className="text-lg font-bold text-white">Detalhes do Serviço</h2>
                    <button 
                        onClick={() => setSelectedService(null)} 
                        className="h-8 w-8 rounded-full bg-[#333333] flex items-center justify-center text-white hover:bg-[#444444]"
                    >
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
                    {/* Header Info */}
                    <div className="flex gap-4">
                        <div className="h-24 w-24 rounded-xl bg-cover bg-center shrink-0 border border-[#333333]" style={{backgroundImage: `url("${selectedService.vehicleImage}")`}}></div>
                        <div className="flex flex-col justify-center">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border w-fit mb-1 ${getTypeColor(selectedService.type)}`}>
                                {selectedService.type}
                            </span>
                            <h3 className="text-xl font-bold text-white leading-tight">{selectedService.service}</h3>
                            <p className="text-[#A0A0A0] text-sm mt-1">{selectedService.vehicle}</p>
                            <p className="text-[#A0A0A0] text-sm">{selectedService.date}</p>
                        </div>
                    </div>

                    {/* Parts List */}
                    <div className="bg-[#2a1622]/50 rounded-xl p-4 border border-[#333333]">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#800020]">build</span>
                            Peças e Serviços
                        </h4>
                        <ul className="flex flex-col gap-2">
                            {selectedService.parts.map((part: string, idx: number) => (
                                <li key={idx} className="flex items-center gap-2 text-[#E0E0E0] text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#800020]"></div>
                                    {part}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Observations */}
                    <div className="bg-[#121212] rounded-xl p-4 border border-[#333333]">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[#A0A0A0]">description</span>
                            Observações
                        </h4>
                        <p className="text-[#A0A0A0] text-sm italic leading-relaxed">
                            "{selectedService.observations}"
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-[#333333] bg-[#1E1E1E] rounded-b-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[#A0A0A0]">Total do Serviço</span>
                        <span className="text-[#800020] text-2xl font-bold">{selectedService.price}</span>
                    </div>
                    <button className="w-full h-12 bg-[#800020] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#800020]/90">
                        <span className="material-symbols-outlined">receipt_long</span>
                        Ver Nota Fiscal
                    </button>
                </div>
            </div>
        </div>
      )}

      <BottomMenu />
    </div>
  );
};

export default ServiceHistory;
