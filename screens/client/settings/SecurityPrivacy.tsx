
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomMenu from '../../../components/BottomMenu';

const SecurityPrivacy: React.FC = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        twoFactorAuth: false,
        biometricAuth: true,
        notifications: true,
        emailMarketing: false,
        dataSharing: false
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings({
            ...settings,
            [key]: !settings[key]
        });
    };

    const handleChangePassword = () => {
        alert('Funcionalidade de trocar senha em desenvolvimento');
    };

    const handleDeleteAccount = () => {
        if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
            alert('Exclusão de conta em desenvolvimento');
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] text-white overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-[#121212]/95 backdrop-blur-sm border-b border-[#333333]">
                <button onClick={() => navigate(-1)} className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Segurança e Privacidade</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-4 pb-24">
                <div className="flex flex-col gap-6">
                    {/* Segurança */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-sm font-bold text-[#A0A0A0] uppercase tracking-wide px-2">Segurança</h2>

                        <div className="bg-[#1E1E1E] rounded-xl p-2 border border-[#333333]">
                            {/* Trocar Senha */}
                            <div
                                onClick={handleChangePassword}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">lock</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Trocar Senha</p>
                                        <p className="text-xs text-[#A0A0A0]">Última alteração há 3 meses</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-[#555555]">chevron_right</span>
                            </div>

                            {/* Autenticação de 2 Fatores */}
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">shield</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Autenticação de 2 Fatores</p>
                                        <p className="text-xs text-[#A0A0A0]">Proteção extra para sua conta</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('twoFactorAuth')}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-[#800020]' : 'bg-[#333333]'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </button>
                            </div>

                            {/* Biometria */}
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">fingerprint</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Autenticação Biométrica</p>
                                        <p className="text-xs text-[#A0A0A0]">Use digital ou Face ID</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('biometricAuth')}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.biometricAuth ? 'bg-[#800020]' : 'bg-[#333333]'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.biometricAuth ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Privacidade */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-sm font-bold text-[#A0A0A0] uppercase tracking-wide px-2">Privacidade</h2>

                        <div className="bg-[#1E1E1E] rounded-xl p-2 border border-[#333333]">
                            {/* Notificações Push */}
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">notifications</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Notificações Push</p>
                                        <p className="text-xs text-[#A0A0A0]">Receber atualizações</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('notifications')}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.notifications ? 'bg-[#800020]' : 'bg-[#333333]'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.notifications ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </button>
                            </div>

                            {/* Email Marketing */}
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">mail</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Emails Promocionais</p>
                                        <p className="text-xs text-[#A0A0A0]">Ofertas e novidades</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('emailMarketing')}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.emailMarketing ? 'bg-[#800020]' : 'bg-[#333333]'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.emailMarketing ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </button>
                            </div>

                            {/* Compartilhamento de Dados */}
                            <div className="flex items-center justify-between p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-[#800020]/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#800020]">share</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">Compartilhar Dados</p>
                                        <p className="text-xs text-[#A0A0A0]">Para melhorar o serviço</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleToggle('dataSharing')}
                                    className={`relative w-12 h-7 rounded-full transition-colors ${settings.dataSharing ? 'bg-[#800020]' : 'bg-[#333333]'
                                        }`}
                                >
                                    <div
                                        className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings.dataSharing ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    ></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Zona de Perigo */}
                    <div className="flex flex-col gap-3 mt-4">
                        <h2 className="text-sm font-bold text-red-500 uppercase tracking-wide px-2">Zona de Perigo</h2>

                        <div className="bg-[#1E1E1E] rounded-xl p-2 border border-red-500/30">
                            <div
                                onClick={handleDeleteAccount}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-red-500">delete_forever</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-red-500">Excluir Conta</p>
                                        <p className="text-xs text-[#A0A0A0]">Ação irreversível</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-red-500">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BottomMenu />
        </div>
    );
};

export default SecurityPrivacy;
