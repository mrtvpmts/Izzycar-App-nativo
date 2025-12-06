import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopManagement: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#221013] font-display text-white">
      <div className="flex items-center bg-[#221013] p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start">
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbU9Kk3iH7-d-f2BySIj10fn6bhz4teQg697izBRoPkDQDY37SHbZY1V_4_T_4VE_ShFkFV5F1u9mxP4drGq9fQHuAtlErNzTWW4O4AMzbE8TcMXuysaMqHXbHIdRgQTF7x9gaWwPaczHTseBWRC8TDAkr148Pe6DJ451OpDgqKLrOMJ13lpFEs7zf6sGU_yNksiv9epL1HLxDrzmXu5NhKh8jLbhNk_KabK49PsG2iO8IsQHFK4sS8WX0L2_rCGbAlT9f_6drQ54")'}}></div>
        </div>
        <h1 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Gestão da Oficina</h1>
        <div onClick={() => navigate('/login')} className="flex size-12 shrink-0 items-center justify-end cursor-pointer"><span className="material-symbols-outlined">logout</span></div>
      </div>

      <main className="flex-1 flex flex-col gap-6 px-4 py-4">
        {/* Services Card */}
        <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Serviços Oferecidos</h2>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 py-3 justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="text-white flex items-center justify-center rounded-lg bg-[#482329] shrink-0 size-12">
                            <span className="material-symbols-outlined text-3xl">tire_repair</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal">Alinhamento e Balanceamento</p>
                            <p className="text-[#c9929b] text-sm font-normal leading-normal">Preço: R$120,00 | Duração: 1h 30m</p>
                        </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <div className="text-white flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">edit</span></div>
                        <div className="text-[#d41132] flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">delete</span></div>
                    </div>
                </div>
                <div className="flex gap-4 py-3 justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="text-white flex items-center justify-center rounded-lg bg-[#482329] shrink-0 size-12">
                            <span className="material-symbols-outlined text-3xl">oil_barrel</span>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal">Troca de Óleo e Filtro</p>
                            <p className="text-[#c9929b] text-sm font-normal leading-normal">Preço: R$250,00 | Duração: 45m</p>
                        </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <div className="text-white flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">edit</span></div>
                        <div className="text-[#d41132] flex size-7 items-center justify-center cursor-pointer"><span className="material-symbols-outlined">delete</span></div>
                    </div>
                </div>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#d41132] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Adicionar Serviço</span>
            </button>
        </div>

        {/* Team Card */}
        <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Equipe</h2>
            <div className="flex flex-col gap-2">
                <div className="flex gap-4 py-3 justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <img className="rounded-full size-12 shrink-0 object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOmYiktVEajxMJTeC4ZLeQWnTGm1YEIlQYT4_3_LZORhme2DYV2lSWntsjwl11U6en7-90AqCwi4GxDagpUKfQYBYC5RkAOrURbzlI2crFyB5ABmRYm9iHSzkShz8w_tgnR8Ts-wdECH3Phk7FpT6v8fQivaV6dh9Qe-CCVMY_yeiabidB8oBShmS8l540EXl_g-yk49dLfkRI-cfQivBmpOvEZITTgDFMpkxAZ5g8w-Msf6XrZd2YMkoT_xv6PfWjciS4MGBGlcY" />
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal">Carlos Silva</p>
                            <p className="text-[#c9929b] text-sm font-normal leading-normal">Consultor Técnico</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-green-500"></div>
                        <p className="text-green-400 text-sm">Online</p>
                    </div>
                </div>
                <div className="flex gap-4 py-3 justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img className="rounded-full size-12 shrink-0 object-cover" alt="Member" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpDRBdCpaljKUvi2XALL1TpWC-T1ZW-bbe2Ewbs8TwE_HWjy0fFHUELQg_G7BWOeBI3Ongcl4NN0zhvvGNT944QeC36I3DZFrqwUaX2ZpqGv0mxoNmGwM-oR4l7_AbG3m_fId4D4TdjwRdcRrrmI0RnP2zgtqRNUhrNLOOg0Q9pggrSLiTMkbXgE0S2teTyd7ZdX7NPOanVvpcJLS4vY3TOBPz96O1_HKKiDeZThiZudXez1YQA2_LjugYBSxO2JUfTGLuuIsUfg" />
                        <div className="flex flex-1 flex-col justify-center">
                            <p className="text-white text-base font-medium leading-normal">Ana Pereira</p>
                            <p className="text-[#c9929b] text-sm font-normal leading-normal">Mecânica Chefe</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-gray-500"></div>
                        <p className="text-gray-400 text-sm">Offline</p>
                    </div>
                </div>
            </div>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#d41132] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="material-symbols-outlined text-xl">add</span>
                <span className="truncate">Adicionar Funcionário</span>
            </button>
        </div>

        {/* Hours */}
        <div className="flex flex-col gap-4 rounded-xl bg-[#2a1a1d] p-4">
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Horários de Funcionamento</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <label className="flex-1 text-white">Segunda-feira</label>
                    <div className="flex items-center gap-2">
                        <input className="w-20 rounded-lg border-none bg-[#482329] text-white text-center text-sm focus:ring-[#d41132]" type="text" defaultValue="08:00" />
                        <span className="text-[#c9929b]">-</span>
                        <input className="w-20 rounded-lg border-none bg-[#482329] text-white text-center text-sm focus:ring-[#d41132]" type="text" defaultValue="18:00" />
                    </div>
                    <input className="form-checkbox h-5 w-5 rounded-md text-[#d41132] bg-[#482329] border-none focus:ring-[#d41132]" type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between gap-4 opacity-60">
                    <label className="flex-1 text-white">Sábado</label>
                    <div className="flex items-center gap-2">
                        <input className="w-20 rounded-lg border-none bg-[#482329] text-white text-center text-sm" disabled type="text" defaultValue="Fechado" />
                    </div>
                    <input className="form-checkbox h-5 w-5 rounded-md text-[#d41132] bg-[#482329] border-none focus:ring-[#d41132]" type="checkbox" />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default ShopManagement;