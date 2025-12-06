
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyefDiGpwI5QZKMke2XhUx4n3H3bod-QtF-4bRotsuDJbfaecqo2AOJgnlvIWisdyUQk-wcI9oeYlJwu5NJLeCIDErBphHDMg314xSgpXG491DCRP9su_2YmXMinHFwN8XMTYwFXHOlKZtTHr0B4UZldqXz9xh1EezYBRU0xvklJ31fKp2yAwuEmngAirkSMUPpnHhLLFXBZoKZ6l5m2fN4msdEc_A_f749-YmcopoNt7pE5TOmfvP6m2OJ9wMnz3TcpxMi-QMJI'
            }
          }
        });
        if (signUpError) throw signUpError;
        alert('Conta criada com sucesso! Faça login.');
        setIsSignUp(false);
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 bg-[#221010]">
      {/* Logo Container */}
      <div className="mb-8 flex w-full max-w-xs justify-center">
        <div
          className="h-24 w-24 rounded-full bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD_SKxW8AZjSBP_QN1uXFzlcqy2kTJZ-eOSJZNLzRMmthQj3twMYVnTSW9QCTX8ipuD1GXFu8IbCWy9YwHQRiQ0rOxfjmHHOtnnLOxrqsjlQ45dD3wgs-YXmceStgi5kGDOYhC1zsMO1BE4ottRu30LPe2SoOP3Bn2vIsbhKos4Zl0fees1goFLB-bhmeGElIQpT6RZoKkAB_lQtFpcvAo3Uh0P42Xt-KJQ11fYvMvPOkJFq8_hoscLiLUURBxWB-PUkoU2qLAdYBQ")' }}
        ></div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md space-y-6 rounded-lg bg-[#331919]/50 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">{isSignUp ? 'Criar Conta' : 'Bem-vindo de volta!'}</h1>
          <p className="mt-2 text-sm text-[#c99292]">{isSignUp ? 'Preencha os dados abaixo' : 'Acesse sua conta para continuar.'}</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {isSignUp && (
            <label className="flex flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-white">Nome Completo</p>
              <input
                className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded border border-[#673232] bg-[#331919] p-[15px] text-base font-normal leading-normal text-white placeholder:text-[#c99292] focus:border-[#a50d0d] focus:outline-0 focus:ring-0"
                placeholder="Seu nome"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </label>
          )}

          <label className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal text-white">E-mail</p>
            <input
              className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded border border-[#673232] bg-[#331919] p-[15px] text-base font-normal leading-normal text-white placeholder:text-[#c99292] focus:border-[#a50d0d] focus:outline-0 focus:ring-0"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-col">
            <p className="pb-2 text-base font-medium leading-normal text-white">Senha</p>
            <div className="flex w-full flex-1 items-stretch rounded">
              <input
                className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l border border-r-0 border-[#673232] bg-[#331919] p-[15px] pr-2 text-base font-normal leading-normal text-white placeholder:text-[#c99292] focus:border-[#a50d0d] focus:outline-0 focus:ring-0"
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-center rounded-r border border-l-0 border-[#673232] bg-[#331919] pr-[15px] text-[#c99292]">
                <span className="material-symbols-outlined cursor-pointer">visibility</span>
              </div>
            </div>
          </label>
        </div>

        {!isSignUp && (
          <div className="flex justify-end">
            <p className="cursor-pointer text-sm font-normal leading-normal text-[#c99292] underline hover:text-white">Esqueci a Senha</p>
          </div>
        )}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="flex h-12 min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#a50d0d] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <span className="truncate">{loading ? 'Carregando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}</span>
        </button>

        <div className="flex justify-center pt-4">
          <p className="cursor-pointer text-sm font-normal leading-normal text-center text-[#c99292]">
            {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'} <span onClick={() => setIsSignUp(!isSignUp)} className="font-bold text-white underline">{isSignUp ? 'Faça Login' : 'Crie uma agora'}</span>
          </p>
        </div>

        {/* Links to other flows for Demo purposes */}
        <div className="pt-8 border-t border-[#673232] flex flex-wrap gap-2 justify-center text-xs text-[#c99292]">
          <span onClick={() => navigate('/admin')} className="cursor-pointer hover:text-white underline">Admin</span>
          <span onClick={() => navigate('/employee/checklist')} className="cursor-pointer hover:text-white underline">Mecânico</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
