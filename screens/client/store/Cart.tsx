import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 border-b border-[#333]">
                <button onClick={() => navigate(-1)} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Carrinho</h1>
                <div className="size-10"></div>
            </div>

            <main className="flex-1 p-4 pb-32 flex flex-col gap-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#A0A0A0]">
                        <span className="material-symbols-outlined text-6xl mb-4">remove_shopping_cart</span>
                        <p>Seu carrinho está vazio.</p>
                        <button onClick={() => navigate('/store')} className="mt-6 font-bold text-[#d41142]">Ir para a loja</button>
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="flex gap-4 bg-[#1E1E1E] p-3 rounded-xl border border-[#333]">
                            <div className="h-20 w-20 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url("${item.image_url}")` }}></div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                                    <p className="text-[#A0A0A0] text-xs">R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 bg-[#333] rounded-lg px-2 py-1">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white">-</button>
                                        <span className="text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-[#A0A0A0] hover:text-red-500">
                                        <span className="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>

            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] border-t border-[#333] p-4 pb-8 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[#A0A0A0]">Total</span>
                        <span className="text-xl font-bold text-white">R$ {cartTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full h-12 bg-[#d41142] rounded-xl font-bold text-white hover:bg-[#b00e36] transition-colors shadow-lg shadow-[#d41142]/20"
                    >
                        Finalizar Compra
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
