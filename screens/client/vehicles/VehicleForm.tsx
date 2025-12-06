
import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VehicleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [plate, setPlate] = useState(isEditing ? 'ABC-1234' : '');
  const [plateError, setPlateError] = useState('');
  
  const [year, setYear] = useState(isEditing ? '2022' : '');
  const [yearError, setYearError] = useState('');

  const [imagePreview, setImagePreview] = useState<string | null>(
    isEditing ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnSbWvW5nVpdIoabOZUSz96VI7YKRBFAvjpHYrL3YNTiHao5uwMIfW1c0RUXovCd07O5PuyngYx3cpfHgcGV0v_gGxgdXSbsk7ZAJ5hK_SzMrq7-QxQCFNHu3itubog1A-WIKaEQujn8J7KjdSD8r0SOfkXCHJ94V3RAloOraH9AbMkp8pZZ4y_o4oqM23Yqo7JpLxBkggMjhMczbUa319n4TU5UmGWxF16JAZDCj3aVvGZVSlnVXmYnS0WEzdMtTElzeovlsmBnc' : null
  );
  const [isImageLoading, setIsImageLoading] = useState(false);

  const validatePlate = (value: string) => {
    // Regex for both old standard (ABC-1234) and Mercosul (ABC1D23)
    const regex = /^([A-Z]{3}-?[0-9]{4}|[A-Z]{3}[0-9][A-Z][0-9]{2})$/;
    if (!regex.test(value.toUpperCase().replace(/[^A-Z0-9]/g, ''))) {
      setPlateError('Formato de placa inválido');
      return false;
    }
    setPlateError('');
    return true;
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setPlate(val);
    if (val.length >= 7) {
        validatePlate(val);
    }
  };

  const validateYear = (val: string) => {
    const currentYear = new Date().getFullYear();
    const yearNum = parseInt(val, 10);
    
    if (isNaN(yearNum) || yearNum < 1950 || yearNum > currentYear + 1) {
        setYearError(`Ano deve ser entre 1950 e ${currentYear + 1}`);
        return false;
    }
    setYearError('');
    return true;
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setYear(val);
      if (val.length === 4) {
          validateYear(val);
      }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        // Simulating a delay for the "upload"
        setTimeout(() => {
            setImagePreview(reader.result as string);
            setIsImageLoading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const serviceHistory = [
    { id: 1, date: '10/08/2024', service: 'Revisão Completa', price: 'R$ 350,00' },
    { id: 2, date: '15/02/2024', service: 'Troca de Óleo', price: 'R$ 250,00' },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
      {/* Top App Bar */}
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-10">
        <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            {isEditing ? 'Detalhes do Veículo' : 'Adicionar Veículo'}
        </h1>
        <div className="size-10 shrink-0"></div>
      </div>

      <main className="flex-1 p-4 pb-4">
        <div className="flex flex-col gap-6">
            {/* Photo Upload Area */}
            <div className="flex flex-col items-center gap-2">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*"
                />
                <div 
                    onClick={handlePhotoClick}
                    className="h-40 w-full rounded-xl bg-[#1E1E1E] border-2 border-dashed border-[#333333] flex flex-col items-center justify-center cursor-pointer hover:bg-[#2a1622] transition-colors relative overflow-hidden"
                >
                    {isImageLoading ? (
                        <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-[#800020] animate-spin text-3xl">progress_activity</span>
                            <p className="text-[#A0A0A0] text-sm">Carregando imagem...</p>
                        </div>
                    ) : imagePreview ? (
                        <img src={imagePreview} alt="Vehicle Preview" className="w-full h-full object-cover" />
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-4xl text-[#800020] mb-2">add_a_photo</span>
                            <p className="text-[#A0A0A0] text-sm">Adicionar foto do veículo</p>
                        </>
                    )}
                    
                    {!isImageLoading && imagePreview && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-white text-3xl">edit</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[#E0E0E0] text-sm font-medium ml-1">Marca</label>
                    <input 
                        type="text" 
                        defaultValue={isEditing ? "Honda" : ""}
                        className="w-full h-12 rounded-xl bg-[#1E1E1E] border border-[#333333] px-4 text-white placeholder-[#A0A0A0] focus:border-[#800020] focus:ring-1 focus:ring-[#800020] focus:outline-none"
                        placeholder="Ex: Toyota"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[#E0E0E0] text-sm font-medium ml-1">Modelo</label>
                    <input 
                        type="text" 
                        defaultValue={isEditing ? "Civic" : ""}
                        className="w-full h-12 rounded-xl bg-[#1E1E1E] border border-[#333333] px-4 text-white placeholder-[#A0A0A0] focus:border-[#800020] focus:ring-1 focus:ring-[#800020] focus:outline-none"
                        placeholder="Ex: Corolla"
                    />
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-[#E0E0E0] text-sm font-medium ml-1">Ano</label>
                        <input 
                            type="number" 
                            value={year}
                            onChange={handleYearChange}
                            onBlur={(e) => validateYear(e.target.value)}
                            className={`w-full h-12 rounded-xl bg-[#1E1E1E] border px-4 text-white placeholder-[#A0A0A0] focus:outline-none ${yearError ? 'border-red-500 focus:ring-red-500' : 'border-[#333333] focus:border-[#800020] focus:ring-1 focus:ring-[#800020]'}`}
                            placeholder="2022"
                        />
                        {yearError && <p className="text-red-500 text-xs ml-1">{yearError}</p>}
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-[#E0E0E0] text-sm font-medium ml-1">Cor</label>
                        <input 
                            type="text" 
                            defaultValue={isEditing ? "Prata" : ""}
                            className="w-full h-12 rounded-xl bg-[#1E1E1E] border border-[#333333] px-4 text-white placeholder-[#A0A0A0] focus:border-[#800020] focus:ring-1 focus:ring-[#800020] focus:outline-none"
                            placeholder="Prata"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[#E0E0E0] text-sm font-medium ml-1">Placa</label>
                    <input 
                        type="text" 
                        value={plate}
                        onChange={handlePlateChange}
                        onBlur={(e) => validatePlate(e.target.value)}
                        className={`w-full h-12 rounded-xl bg-[#1E1E1E] border px-4 text-white placeholder-[#A0A0A0] focus:outline-none uppercase ${plateError ? 'border-red-500 focus:ring-red-500' : 'border-[#333333] focus:border-[#800020] focus:ring-1 focus:ring-[#800020]'}`}
                        placeholder="ABC-1234"
                    />
                    {plateError && <p className="text-red-500 text-xs ml-1">{plateError}</p>}
                </div>
            </div>

            {/* Service History Section - Only visible in Edit mode */}
            {isEditing && (
                <div className="flex flex-col gap-3 pt-4 border-t border-[#333333]">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-lg font-bold text-white">Histórico de Serviços</h2>
                        <button onClick={() => navigate('/history')} className="text-[#800020] text-sm font-bold flex items-center gap-1 hover:text-[#800020]/80">
                            Ver todos
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                    
                    {serviceHistory.map((history) => (
                        <div key={history.id} onClick={() => navigate('/history')} className="bg-[#1E1E1E] rounded-xl p-4 flex justify-between items-center border border-[#333333] cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                            <div className="flex gap-4 items-center">
                                <div className="h-10 w-10 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020] shrink-0">
                                    <span className="material-symbols-outlined">history</span>
                                </div>
                                <div>
                                    <p className="text-white font-medium">{history.service}</p>
                                    <p className="text-[#A0A0A0] text-xs">{history.date}</p>
                                </div>
                            </div>
                            <p className="text-[#800020] font-bold text-sm">{history.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </main>

      <div className="p-4 pt-2 border-t border-[#333333]">
        <button 
            onClick={() => navigate('/vehicles')}
            className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-base flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-colors"
        >
            Salvar Veículo
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;
