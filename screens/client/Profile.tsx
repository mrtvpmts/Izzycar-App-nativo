
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../components/BottomMenu';

const Profile: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative mx-auto flex h-auto min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-[#121212] text-[#E0E0E0]">
            <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-[#121212]/80 px-4 backdrop-blur-sm shadow-md">
                <button onClick={() => navigate(-1)} className="text-white"><span className="material-symbols-outlined">arrow_back_ios</span></button>
                <h1 className="text-lg font-bold">LOGOMARCA DO CLIENTE</h1>
                <div className="w-6"></div>
            </header>

            <main className="flex-1 p-4 pb-24">
                <div className="flex w-full flex-col gap-8">
                    <div className="flex w-full flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div className="h-28 w-28 rounded-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAAyefDiGpwI5QZKMke2XhUx4n3H3bod-QtF-4bRotsuDJbfaecqo2AOJgnlvIWisdyUQk-wcI9oeYlJwu5NJLeCIDErBphHDMg314xSgpXG491DCRP9su_2YmXMinHFwN8XMTYwFXHOlKZtTHr0B4UZldqXz9xh1EezYBRU0xvklJ31fKp2yAwuEmngAirkSMUPpnHhLLFXBZoKZ6l5m2fN4msdEc_A_f749-YmcopoNt7pE5TOmfvP6m2OJ9wMnz3TcpxMi-QMJI")' }}></div>
                            <button className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-[#121212] bg-[#800020] text-white">
                                <span className="material-symbols-outlined !text-xl">edit</span>
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#E0E0E0]">Nome do Usuário</p>
                            <p className="text-sm font-normal leading-normal text-[#A0A0A0]">Editar Perfil</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 rounded-lg bg-[#1E1E1E] p-2">
                        <div onClick={() => navigate('/settings/personal-data')} className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <p className="flex-1 truncate font-medium text-[#E0E0E0]">Meus Dados</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex h-7 w-7 items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => navigate('/vehicles')} className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                                    <span className="material-symbols-outlined">directions_car</span>
                                </div>
                                <p className="flex-1 truncate font-medium text-[#E0E0E0]">Meus Veículos</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex h-7 w-7 items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => navigate('/settings/addresses')} className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                                    <span className="material-symbols-outlined">home_pin</span>
                                </div>
                                <p className="flex-1 truncate font-medium text-[#E0E0E0]">Endereços</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex h-7 w-7 items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 rounded-lg bg-[#1E1E1E] p-2">
                        <div onClick={() => navigate('/notifications')} className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <p className="flex-1 truncate font-medium text-[#E0E0E0]">Notificações</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex h-7 w-7 items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </div>
                        </div>

                        <div onClick={() => navigate('/settings/security')} className="flex min-h-[56px] cursor-pointer items-center justify-between gap-4 rounded-md px-3 py-2 transition-colors hover:bg-white/5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#800020]/20 text-[#800020]">
                                    <span className="material-symbols-outlined">security</span>
                                </div>
                                <p className="flex-1 truncate font-medium text-[#E0E0E0]">Segurança e Privacidade</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex h-7 w-7 items-center justify-center text-[#A0A0A0]">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                        <button onClick={() => navigate('/login')} className="flex h-12 w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-[#800020] text-lg font-bold text-white transition-opacity hover:opacity-90">
                            <span className="material-symbols-outlined">logout</span>
                            <span className="truncate">Sair</span>
                        </button>
                    </div>
                </div>
            </main>

            <BottomMenu />
        </div>
    );
};

export default Profile;
