
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../../components/BottomMenu';

const PersonalData: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        birthdate: '1990-05-15'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        // Aqui você implementaria a lógica de salvar os dados
        alert('Dados salvos com sucesso!');
        navigate(-1);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] text-white overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#121212]/95 backdrop-blur-sm border-b border-[#333333]">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Meus Dados</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-4 pb-24">
                <div className="flex flex-col gap-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-cover bg-center border-2 border-[#800020]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAyefDiGpwI5QZKMke2XhUx4n3H3bod-QtF-4bRotsuDJbfaecqo2AOJgnlvIWisdyUQk-wcI9oeYlJwu5NJLeCIDErBphHDMg314xSgpXG491DCRP9su_2YmXMinHFwN8XMTYwFXHOlKZtTHr0B4UZldqXz9xh1EezYBRU0xvklJ31fKp2yAwuEmngAirkSMUPpnHhLLFXBZoKZ6l5m2fN4msdEc_A_f749-YmcopoNt7pE5TOmfvP6m2OJ9wMnz3TcpxMi-QMJI")' }}></div>
                            <button className="absolute bottom-0 right-0 h-8 w-8 bg-[#800020] rounded-full flex items-center justify-center border-2 border-[#121212] hover:bg-[#b00e36] transition-colors">
                                <span className="material-symbols-outlined text-sm">photo_camera</span>
                            </button>
                        </div>
                        <button className="text-[#800020] text-sm font-bold">Alterar Foto</button>
                    </div>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-4">
                        {/* Nome Completo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A0A0A0]">Nome Completo</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-xl bg-[#1E1E1E] border border-[#333333] text-white focus:outline-none focus:border-[#800020] transition-colors"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A0A0A0]">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-xl bg-[#1E1E1E] border border-[#333333] text-white focus:outline-none focus:border-[#800020] transition-colors"
                            />
                        </div>

                        {/* Telefone */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A0A0A0]">Telefone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-xl bg-[#1E1E1E] border border-[#333333] text-white focus:outline-none focus:border-[#800020] transition-colors"
                            />
                        </div>

                        {/* CPF */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A0A0A0]">CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-xl bg-[#1E1E1E] border border-[#333333] text-white focus:outline-none focus:border-[#800020] transition-colors"
                            />
                        </div>

                        {/* Data de Nascimento */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-[#A0A0A0]">Data de Nascimento</label>
                            <input
                                type="date"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                className="h-12 px-4 rounded-xl bg-[#1E1E1E] border border-[#333333] text-white focus:outline-none focus:border-[#800020] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="h-12 rounded-xl bg-[#800020] text-white font-bold hover:bg-[#b00e36] transition-colors shadow-lg shadow-[#800020]/20"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </main>

            <BottomMenu />
        </div>
    );
};

export default PersonalData;
