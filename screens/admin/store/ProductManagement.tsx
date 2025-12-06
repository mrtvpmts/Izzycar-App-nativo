import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    active: boolean;
}

const ProductManagement: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        active: true
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                image_url: formData.image_url,
                active: formData.active
            };

            if (editingProduct) {
                const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('products').insert(productData);
                if (error) throw error;
            }

            fetchProducts();
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Erro ao salvar produto.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            price: product.price.toString(),
            image_url: product.image_url || '',
            active: product.active
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '', image_url: '', active: true });
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 pb-24">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Gestão de Produtos</h1>
                    <p className="text-[#A0A0A0] text-sm">Gerencie o catálogo da loja</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsModalOpen(true); }}
                    className="bg-[#d41142] hover:bg-[#b00e36] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">add</span> Novo Produto
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="bg-[#1E1E1E] rounded-xl border border-[#333] overflow-hidden flex flex-col">
                        <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url("${product.image_url}")` }}></div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">{product.name}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${product.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    {product.active ? 'Ativo' : 'Inativo'}
                                </span>
                            </div>
                            <p className="text-[#A0A0A0] text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                            <div className="flex justify-between items-center mt-auto">
                                <span className="font-bold text-xl text-[#d41142]">R$ {product.price.toFixed(2)}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => openEdit(product)} className="p-2 hover:bg-white/10 rounded-full text-blue-400">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-white/10 rounded-full text-red-400">
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-md border border-[#333] overflow-hidden">
                        <div className="p-4 border-b border-[#333] flex justify-between items-center">
                            <h3 className="font-bold text-lg">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-[#A0A0A0] hover:text-white"><span className="material-symbols-outlined">close</span></button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm text-[#A0A0A0] mb-1">Nome do Produto</label>
                                <input
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41142] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-[#A0A0A0] mb-1">Descrição</label>
                                <textarea
                                    value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41142] outline-none h-24 resize-none"
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm text-[#A0A0A0] mb-1">Preço (R$)</label>
                                    <input
                                        type="number" step="0.01"
                                        value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full bg-[#121212] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41142] outline-none"
                                    />
                                </div>
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                            className="accent-[#d41142] h-5 w-5"
                                        />
                                        <span className="text-sm font-bold">Ativo na Loja</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[#A0A0A0] mb-1">URL da Imagem</label>
                                <input
                                    value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                    className="w-full bg-[#121212] border border-[#333] rounded-lg p-3 text-white focus:border-[#d41142] outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                        <div className="p-4 border-t border-[#333] flex gap-3">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-[#333] font-bold hover:bg-[#333] transition-colors">Cancelar</button>
                            <button onClick={handleSave} className="flex-1 py-3 rounded-xl bg-[#d41142] font-bold text-white hover:bg-[#b00e36] transition-colors">Salvar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductManagement;
