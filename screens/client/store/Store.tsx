import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useCart, Product } from '../../../context/CartContext';

const Store: React.FC = () => {
    const navigate = useNavigate();
    const { addToCart, cartCount } = useCart();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState<any[]>([]);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        fetchProducts();
        fetchPromotions();
    }, []);

    const fetchPromotions = async () => {
        try {
            const { data } = await supabase.from('promotions').select('*').eq('active', true).order('created_at', { ascending: false });

            if (data && data.length > 0) {
                const mapped = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    subtitle: p.subtitle,
                    image: p.image_url,
                    action: p.action_text || 'Comprar',
                    media_type: p.media_type
                }));
                setBanners(mapped);
            } else {
                setBanners([
                    {
                        id: 'store-default-1',
                        title: 'Ofertas da Semana',
                        subtitle: 'Descontos em pneus e óleos.',
                        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT-w6q_FfkG4TylR0tDWEvBvJ-9eL_4Wq5Z-vQwb-cCMl5A_wOQ6kZ-KxTskK3D0xGzH1-zHz7EwQf9_p5_r5_C5-h5_y5_D5-v5_E5',
                        action: 'Ver Ofertas',
                        media_type: 'image'
                    }
                ]);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*').eq('active', true);
            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-scroll logic
    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            if (scrollRef.current) {
                const nextSlide = (activeSlide + 1) % banners.length;
                const width = scrollRef.current.offsetWidth * 0.85 + 16;
                scrollRef.current.scrollTo({ left: nextSlide * width, behavior: 'smooth' });
                setActiveSlide(nextSlide);
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [activeSlide, banners]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const width = scrollRef.current.offsetWidth * 0.85;
            const index = Math.round(scrollLeft / width);
            setActiveSlide(index);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#121212] group/design-root overflow-x-hidden text-white">
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-[#121212] z-50 border-b border-[#333]">
                <button onClick={() => navigate('/dashboard')} className="text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold">Loja Oficina</h1>
                <button onClick={() => navigate('/cart')} className="relative flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {cartCount > 0 && (
                        <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-[#d41142] text-[10px] font-bold flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>

            {/* Carousel */}
            <div className="w-full space-y-3 mt-4 mb-2">
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex snap-x snap-mandatory overflow-x-auto px-4 gap-4 scrollbar-hide"
                >
                    {banners.map((banner, index) => (
                        <div key={index} className="snap-center flex-shrink-0 w-[85%]">
                            <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden h-40 flex flex-col justify-end p-4 border border-[#333333]">
                                {banner.media_type === 'video' ? (
                                    <video className="absolute inset-0 w-full h-full object-cover opacity-60" src={banner.image} autoPlay muted loop playsInline />
                                ) : (
                                    <img alt={banner.title} className="absolute inset-0 w-full h-full object-cover opacity-60" src={banner.image} />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="relative z-10">
                                    <h3 className="font-bold text-white text-lg mb-1">{banner.title}</h3>
                                    <p className="text-sm text-gray-200 mb-2">{banner.subtitle}</p>
                                    <button className="inline-block bg-[#d41142] text-white text-xs font-bold py-1.5 px-4 rounded-full hover:bg-[#b00e36] transition-colors shadow-lg shadow-[#d41142]/20">
                                        {banner.action}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Indicadores */}
                <div className="flex justify-center items-center space-x-2">
                    {banners.map((_, index) => (
                        <div key={index} className={`h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-4 bg-[#d41142]' : 'w-1.5 bg-[#333333]'}`}></div>
                    ))}
                </div>
            </div>

            <main className="flex-1 p-4 pb-24 grid grid-cols-2 gap-4">
                {loading ? (
                    <p className="col-span-2 text-center text-[#A0A0A0]">Carregando produtos...</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#333] flex flex-col">
                            <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
                            <div className="p-3 flex-1 flex flex-col">
                                <h3 className="font-bold text-sm text-white line-clamp-2">{product.name}</h3>
                                <p className="text-[#A0A0A0] text-xs mt-1 line-clamp-2 flex-1">{product.description}</p>
                                <div className="mt-3 flex items-center justify-between">
                                    <span className="font-bold text-[#d41142]">R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="h-8 w-8 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-[#d41142] transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">add</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default Store;
