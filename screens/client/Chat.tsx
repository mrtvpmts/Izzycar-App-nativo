import React from 'react';
import { useNavigate } from 'react-router-dom';

const Chat: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-x-hidden bg-[#221015]">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f8f6f6]/80 dark:bg-[#221015]/80 p-4 pb-2 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="flex h-12 w-12 items-center justify-center rounded-full text-white">
           <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Atendimento</h2>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center"></div>
      </div>

      {/* Messages */}
      <div className="flex flex-1 flex-col justify-end p-4 pb-24">
        <div className="flex flex-col gap-4">
           {/* Agent */}
           <div className="flex items-end gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-0rknuhGs1NGDgIENmHGo11ADqtiteW8vFfVtv1T0fQlfenWWqOpf_ZULNmV8BYJO0LKelWgp73NTzNk_T3f_BxiPzeCbiWJU06hEdsLxEJVs_32QXvwskv3VvVCKWoRC0n3hR3n848PNKBv-m8kOHW2O3A7My2MUDLQnLPaJrWPJg4sXUJ8eFZjkjw59dSoxKD7YIOj6iiqlgkv3FjYq0C3QJprX_m_b7OVnuVV0DklxpS3j0Ohq3ofMGDd_4WMc1OdTFD27_cw")'}}></div>
              <div className="flex flex-1 flex-col items-start gap-1">
                 <p className="max-w-[360px] text-[13px] font-normal leading-normal text-[#c992a0]">Atendente</p>
                 <p className="flex max-w-[360px] rounded-xl rounded-bl-none bg-[#48232c] px-4 py-3 text-base font-normal leading-normal text-white">Olá! Como podemos te ajudar hoje?</p>
              </div>
           </div>

           {/* User */}
           <div className="flex items-end justify-end gap-3">
              <div className="flex flex-1 flex-col items-end gap-1">
                 <p className="max-w-[360px] text-right text-[13px] font-normal leading-normal text-[#c992a0]">Você</p>
                 <p className="flex max-w-[360px] rounded-xl rounded-br-none bg-[#d41142] px-4 py-3 text-base font-normal leading-normal text-white">Gostaria de saber o status do meu veículo.</p>
              </div>
              <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBvq2heLJQOUziheCLnxhYp1ZwU12NfEg6xBxeriXNQzRMX_LJjIw5StoaUDshG8BTGh3943W8eB65UZKan6yaMgN8fwNdRCqhZ4Mq79fvjuKxhgGiOVURm1XMX5PHF_WRzqIAtFcRiZpxhwby4BpbCAHD0H93040F1eLD2ZpcTBBPgCRkZi4BAb-JSRTyJXWC9zNamogy8nPhnZm_IospEvx4Lh-hiiB-0H-LZA6gjteqES0ed-5XYI2idVKGR9zjTUelqgqlMSQw")'}}></div>
           </div>

           {/* Agent */}
           <div className="flex items-end gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYir0PlVnigfhDB9gS1fHPqi6oHflBLdEgBC1VvvBH2VXLFy5LDWWQnvsVRxZRFuqiBX4Q989rZgWkIzn7ui81D14CwgUNCwZDIBeYuV8S5d7rgZ6LyphYukpT002JxyXqVUSG6jMxtEG942Egm9E7YuDG-EjHkONx4T13CEFFjxtBwTMQ47UssKjmGXreJQoH3eX2EWDFwU4RmQ2sY3-tzLNp_HkxH_SMfNBlVEW0QSiL2ryYCtWIt-JcRwY2q_HWgBnwAtULijk")'}}></div>
              <div className="flex flex-1 flex-col items-start gap-1">
                 <p className="max-w-[360px] text-[13px] font-normal leading-normal text-[#c992a0]">Atendente</p>
                 <p className="flex max-w-[360px] rounded-xl rounded-bl-none bg-[#48232c] px-4 py-3 text-base font-normal leading-normal text-white">Claro, qual é a placa ou o número da OS?</p>
              </div>
           </div>

           {/* User */}
           <div className="flex items-end justify-end gap-3">
              <div className="flex flex-1 flex-col items-end gap-1">
                 <p className="max-w-[360px] text-right text-[13px] font-normal leading-normal text-[#c992a0]">Você</p>
                 <p className="flex max-w-[360px] rounded-xl rounded-br-none bg-[#d41142] px-4 py-3 text-base font-normal leading-normal text-white">A placa é XYZ-1234.</p>
              </div>
              <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5z1KizolmL7r7wlK3AzOfpO65eJEENkdeRtik44E_ca3EyTjoNX7S-G09aIs9eFmxTzU-x2AUhCeLhh5AtR3XEE8FIuEUaprbAxaBZFe6aqwJptMg9b0BZ4k01HzI0DkpbBXA3DuzkeJRO-pftwJs84BOQWfOpNMa1nxXMOz6ULqp7wCPd6V8OEjIjTEucutumReoVxW43tI2p1BaAK3r6YDeB9rKcQ0UQvNlgsWBU4p6VzQBeDfyLl0q3xJP6VKq1bJhJgGED0g")'}}></div>
           </div>

           {/* Typing */}
           <div className="flex items-end gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC3DCfuxenr7fz0y3Hq62Tf3srjhm1ErduSZqNWgDQTSeC6iMlkN8jyNNtSSl5RRssoqZ5gam1f7QFUNF7i2T9SWEGOJ_gcwl-6uZEo5cEpLPnRcp6_0VrZ7Vz6uyoYN0P1sBDvyYBzB6e-svNFTKvChTlWNlO9VAW3SY_H8FTsQIsPeh1yRpeU5hJvyQhaw0ACpuTHovsH-VEOn3fmYk2aXFeqVO9gdU9GdJ8VKY2WateBpJk2bV37v-HtLnZOGqcPUwXTmcW7e9s")'}}></div>
              <div className="flex flex-1 flex-col items-start gap-1">
                 <p className="flex max-w-[360px] rounded-xl rounded-bl-none bg-[#48232c] px-4 py-3 text-base font-normal leading-normal text-white">
                    <span className="flex items-center gap-1.5">
                       <span className="h-2 w-2 animate-pulse rounded-full bg-white/50 [animation-delay:-0.3s]"></span>
                       <span className="h-2 w-2 animate-pulse rounded-full bg-white/50 [animation-delay:-0.15s]"></span>
                       <span className="h-2 w-2 animate-pulse rounded-full bg-white/50"></span>
                    </span>
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 flex items-center gap-3 bg-[#f8f6f6]/80 dark:bg-[#221015]/80 p-4 pt-3 backdrop-blur-sm">
         <label className="flex h-12 flex-1 flex-col">
            <div className="flex h-full w-full flex-1 items-stretch">
               <div className="flex items-center justify-center rounded-l-full border-none bg-[#48232c] pl-4">
                  <button className="flex items-center justify-center p-1.5 text-[#c992a0] hover:text-white">
                     <span className="material-symbols-outlined text-2xl">add_circle</span>
                  </button>
               </div>
               <input className="form-input h-full min-w-0 flex-1 resize-none overflow-hidden border-none bg-[#48232c] px-2 text-base font-normal leading-normal text-white placeholder:text-[#c992a0] focus:border-none focus:outline-0 focus:ring-0" placeholder="Digite sua mensagem..." />
               <div className="flex items-center justify-center rounded-r-full border-none bg-[#48232c] pr-2">
                  <button className="flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#d41142] text-white">
                     <span className="material-symbols-outlined text-2xl">send</span>
                  </button>
               </div>
            </div>
         </label>
      </div>
    </div>
  );
};

export default Chat;