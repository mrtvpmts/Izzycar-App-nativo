import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useCart } from '../../context/CartContext';

const PromoDetails: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState<any>(null);

    useEffect(() => {
        if (id) fetchPromo();
    }, [id]);

    const fetchPromo = async () => {
        try {
            const { data, error } = await supabase.from('promotions').select('*').eq('id', id).single();
            if (error) throw error;
            setPromo(data);
        } catch (error) {
            console.error(error);
            navigate('/dashboard'); // Fallback
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async () => {
        if (!promo) return;

        // If linked to a product, add to cart and go to cart
        if (promo.linked_product_id) {
            // We need to fetch the product details to add to cart properly, or just use the promo price?
            // Ideally we add the *Product* to the cart, but maybe override price? 
            // The CartContext usually takes { id, name, price, image_url }.
            // Let's fetch the product first to be safe, or assume standard product.

            // Allow fetching product details
            const { data: product } = await supabase.from('products').select('*').eq('id', promo.linked_product_id).single();

            if (product) {
                // Use promotional price if available, otherwise product price
                const finalPrice = promo.promotional_price || product.price;

                addToCart({
                    id: product.id,
                    name: product.name,
                    price: finalPrice,
                    image_url: product.image_url,
                    description: product.description
                });
                navigate('/cart');
            } else {
                alert('Produto vinculado não encontrado.');
            }
        } else {
            // Service Flow
            navigate('/request/select-vehicle');
        }
    };

    if (loading) return <div className="min-h-screen bg-[#121212] flex items-center justify-center text-white">Carregando oferta...</div>;
    if (!promo) return null;

    // Calculate Discount %
    const original = promo.original_price;
    const current = promo.promotional_price;
    let discountInfo = promo.subtitle; // Default fallback

    if (original && current && original > current) {
        const percent = Math.round(((original - current) / original) * 100);
        discountInfo = `${percent}% OFF`;
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] font-display overflow-x-hidden text-white">
            {/* Hero Image */}
            <div className="relative h-64 w-full">
                {promo.media_type === 'video' ? (
                    <video src={promo.image_url} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${promo.image_url}")` }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]"></div>
                <button onClick={() => navigate(-1)} className="absolute top-4 left-4 h-10 w-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-20">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </div>

            <main className="flex-1 px-6 -mt-10 relative z-10 pb-24">
                <div className="flex flex-col gap-4">
                    <div>
                        <span className="bg-[#d41142] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-[#d41142]/30 mb-2 inline-block">
                            {discountInfo}
                        </span>
                        <h1 className="text-3xl font-bold leading-tight">{promo.title}</h1>

                        {/* Price Rendering */}
                        <div className="mt-2 text-xl font-bold">
                            {promo.original_price && promo.promotional_price ? (
                                <div className="flex flex-col">
                                    <span className="text-gray-500 text-sm line-through font-normal">De R$ {promo.original_price.toFixed(2)}</span>
                                    <span className="text-[#800020] text-3xl">Por R$ {promo.promotional_price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-[#800020]">{promo.subtitle}</span>
                            )}
                        </div>
                    </div>

                    <p className="text-[#A0A0A0] text-sm leading-relaxed">
                        {/* If no long description, use subtitle or generic text */}
                        Aproveite essa oferta exclusiva da LC Pneus. Garantia de qualidade e serviço especializado.
                    </p>

                    <div className="bg-[#1E1E1E] rounded-xl p-5 border border-[#333333] mt-2">
                        <h3 className="font-bold text-white mb-3">Detalhes:</h3>
                        <div className="text-sm text-[#E0E0E0] whitespace-pre-wrap">
                            {promo.linked_product_id ? 'Produto disponível para compra imediata na loja virtual.' : 'Serviço agendável diretamente pelo app.'}
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#121212] border-t border-[#333333] max-w-md mx-auto">
                <button
                    onClick={handleAction}
                    className="w-full h-14 rounded-xl bg-[#800020] text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-[#800020]/20 hover:bg-[#800020]/90 transition-all active:scale-95"
                >
                    {promo.action_text || 'Quero Aproveitar'}
                </button>
            </div>
        </div>
    );
};

export default PromoDetails;
