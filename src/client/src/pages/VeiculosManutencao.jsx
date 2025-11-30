// src/pages/VeiculosManutencao.jsx

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Wrench,
    Edit,
    AlertCircle,
    CheckCircle2,
    Gauge,
    Calendar,
    Palette,
    Fuel,
    Settings,
    RotateCcw,
    ClipboardList,
    Search,
} from 'lucide-react';

import EditarLaudoModal from '../components/EditarLaudoModal';
import '../styles/landing.css';
import '../styles/stock.css';
import '../styles/manutencao.css';

import HeaderConcessionaria from "../components/HeaderConcessionaria.jsx";
import FooterConcessionaria from '../components/FooterConcessionaria.jsx'

const API_BASE_URL = 'http://localhost:3000';

// Variantes de Animação
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }
    })
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 }
    }
};

// Componente Principal
export default function VeiculosManutencao() {
    const [veiculos, setVeiculos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Estados do Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filtrar veículos por busca
    const filteredVeiculos = useMemo(() => {
        if (!searchTerm.trim()) return veiculos;
        const term = searchTerm.toLowerCase();
        return veiculos.filter(v =>
            v.marca?.toLowerCase().includes(term) ||
            v.modelo?.toLowerCase().includes(term) ||
            v.placa?.toLowerCase().includes(term)
        );
    }, [veiculos, searchTerm]);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRaw = localStorage.getItem('user');
    const user = userRaw ? JSON.parse(userRaw) : null;

    useEffect(() => {
        if (!token || user?.role !== 'concessionaria') {
            navigate('/login');
        }
    }, [navigate, token, user]);

    // Função para buscar veículos em manutenção
    const fetchVeiculosManutencao = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        // Demo mode - dados mockados quando não há token
        if (!token) {
            setTimeout(() => {
                setVeiculos([
                    {
                        id: 1,
                        marca: 'Honda',
                        modelo: 'Civic',
                        placa: 'ABC-1234',
                        ano: 2022,
                        quilometragem: 35000,
                        cor: 'Prata',
                        combustivel: 'Flex',
                        preco: 125000,
                        status: 'Em Manutenção',
                        laudoTecnico: '',
                    },
                    {
                        id: 2,
                        marca: 'Toyota',
                        modelo: 'Corolla',
                        placa: 'XYZ-5678',
                        ano: 2021,
                        quilometragem: 42000,
                        cor: 'Branco',
                        combustivel: 'Híbrido',
                        preco: 138000,
                        status: 'Em Manutenção',
                        laudoTecnico: 'Revisão completa realizada. Troca de óleo e filtros.',
                    },
                    {
                        id: 3,
                        marca: 'Volkswagen',
                        modelo: 'Golf',
                        placa: 'DEF-9012',
                        ano: 2020,
                        quilometragem: 58000,
                        cor: 'Preto',
                        combustivel: 'Gasolina',
                        preco: 98000,
                        status: 'Em Manutenção',
                    },
                ]);
                setIsLoading(false);
            }, 500);
            return;
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/api/veiculos/estoque`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const veiculosManutencao = response.data.filter(
                (veiculo) => veiculo.status === 'Em Manutenção'
            );
            setVeiculos(veiculosManutencao);
        } catch (err) {
            console.error("Erro ao buscar veículos em manutenção:", err);
            setError("Não foi possível carregar os veículos em manutenção.");
            setVeiculos([]);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchVeiculosManutencao();
    }, [fetchVeiculosManutencao]);

    // Abrir modal para editar laudo
    const handleOpenModal = useCallback((veiculo) => {
        setVeiculoSelecionado(veiculo);
        setIsModalOpen(true);
    }, []);

    // Fechar modal
    const handleCloseModal = useCallback(() => {
        if (!isSubmitting) {
            setIsModalOpen(false);
            setVeiculoSelecionado(null);
        }
    }, [isSubmitting]);

    // Salvar laudo e disponibilizar veículo
    const handleSaveLaudo = useCallback(async (laudoTecnico) => {
        if (!veiculoSelecionado) return;

        setIsSubmitting(true);

        try {
            // Demo mode - simula salvamento
            if (!token) {
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Remove o veículo da lista (não está mais em manutenção)
                setVeiculos(prev => prev.filter(v => v.id !== veiculoSelecionado.id));

                setIsModalOpen(false);
                setVeiculoSelecionado(null);

                alert('Laudo técnico salvo e veículo disponibilizado para venda com sucesso!');
                return;
            }

            const dadosAtualizacao = {
                laudoTecnico,
                status: 'Disponível'
            };

            await axios.put(
                `${API_BASE_URL}/api/veiculos/${veiculoSelecionado.id}`,
                dadosAtualizacao,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Remove o veículo da lista (não está mais em manutenção)
            setVeiculos(prev => prev.filter(v => v.id !== veiculoSelecionado.id));

            setIsModalOpen(false);
            setVeiculoSelecionado(null);

            alert('Laudo técnico salvo e veículo disponibilizado para venda com sucesso!');
        } catch (err) {
            console.error('Erro ao atualizar laudo técnico:', err);
            if (err.response?.data?.errors) {
                alert(`Erro de validação: ${err.response.data.errors.join(', ')}`);
            } else {
                throw err; // Re-throw para o modal tratar
            }
        } finally {
            setIsSubmitting(false);
        }
    }, [veiculoSelecionado, token]);

    // Funções de formatação
    const formatPrice = (price) => {
        if (!price) return 'R$ 0,00';
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const formatKm = (km) => {
        if (km === null || km === undefined) return '0 Km';
        return new Intl.NumberFormat('pt-BR').format(km) + ' km';
    };

    return (
        <main className="lp-root">
            {/* Header */}
            <HeaderConcessionaria/>
            
            {/* Hero */}
            <motion.header
                className="dash-hero"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <div className="lp-container">
                    <motion.h1 variants={fadeUp}>
                        Veículos em Manutenção
                    </motion.h1>
                    <motion.p variants={fadeUp} custom={0.1}>
                        Gerencie e acompanhe o processo de manutenção dos veículos.
                    </motion.p>
                    <motion.div className="dash-hero-cta" variants={fadeUp} custom={0.2}>
                        <Link to="/dashboard/estoque" className="btn ghost">
                            Voltar ao Estoque
                        </Link>
                    </motion.div>
                </div>
            </motion.header>

            {/* Introdução */}
            <motion.section
                className="catalog-intro"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
            >
                <div className="lp-container" style={{ marginTop: "48px", textAlign: "center" }}>
                    <motion.h2
                        variants={fadeUp}
                        custom={0.1}
                        style={{
                            color: '#ffffff',
                            fontSize: 'clamp(26px, 4vw, 36px)',
                            fontWeight: 700,
                            marginBottom: '12px'
                        }}
                    >
                        Controle de Manutenção
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        custom={0.2}
                        style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '17px',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.5'
                        }}
                    >
                        Acompanhe os veículos em manutenção e atualize os laudos técnicos para disponibilizá-los para venda.
                    </motion.p>
                </div>
            </motion.section>

            {/* Seção Principal */}
            <main className="lp-container" style={{ paddingBottom: '80px', paddingTop: '40px' }}>
                {/* Estatísticas */}
                <motion.div
                    className="dash-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                    style={{ marginBottom: '40px' }}
                >
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)' }}>
                            <Wrench size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{veiculos.length}</h3>
                            <p>Veículos em Manutenção</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4ecdc4, #00b894)' }}>
                            <Settings size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{veiculos.filter(v => v.laudoTecnico).length}</h3>
                            <p>Com Laudo Técnico</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #74b9ff, #0984e3)' }}>
                            <RotateCcw size={24} />
                        </div>
                        <div className="stat-content">
                            <h3>{veiculos.filter(v => !v.laudoTecnico).length}</h3>
                            <p>Aguardando Laudo</p>
                        </div>
                    </div>
                </motion.div>

                {/* Lista de Veículos */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeUp}
                >
                    <div className="section-header">
                        <h2>Veículos em Processo de Manutenção</h2>
                        <p>Clique em "Editar Laudo" para atualizar as informações técnicas e disponibilizar o veículo para venda.</p>
                    </div>

                    {/* Campo de Busca */}
                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por placa, marca ou modelo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            {searchTerm && (
                                <button
                                    className="search-clear"
                                    onClick={() => setSearchTerm('')}
                                    type="button"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <p className="search-results-count">
                                {filteredVeiculos.length} veículo(s) encontrado(s)
                            </p>
                        )}
                    </div>

                    {isLoading && (
                        <div className="loading-state">
                            <div className="loading-spinner"></div>
                            <p>Carregando veículos em manutenção...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-state">
                            <AlertCircle size={48} />
                            <p>{error}</p>
                            <button onClick={fetchVeiculosManutencao} className="btn primary">
                                Tentar Novamente
                            </button>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="veiculos-grid">
                            {filteredVeiculos.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">🔧</div>
                                    <h3>{searchTerm ? 'Nenhum veículo encontrado' : 'Nenhum veículo em manutenção'}</h3>
                                    <p>{searchTerm ? 'Tente buscar por outro termo.' : 'Todos os veículos estão disponíveis para venda no momento.'}</p>
                                    {!searchTerm && (
                                        <Link to="/dashboard/estoque" className="btn primary">
                                            Ver Estoque Completo
                                        </Link>
                                    )}
                                </div>
                            ) : (
                                filteredVeiculos.map(veiculo => (
                                    <VeiculoCard
                                        key={veiculo.id}
                                        veiculo={veiculo}
                                        onEdit={handleOpenModal}
                                        formatPrice={formatPrice}
                                        formatKm={formatKm}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </motion.section>
            </main>

            {/* Modal de Edição de Laudo */}
            <EditarLaudoModal
                isOpen={isModalOpen}
                veiculo={veiculoSelecionado}
                onClose={handleCloseModal}
                onSave={handleSaveLaudo}
                isSubmitting={isSubmitting}
            />

            {/* Footer */}
            <FooterConcessionaria/>
        </main>
    );
}

// Sub-componente: Card de Veículo
function VeiculoCard({ veiculo, onEdit, formatPrice, formatKm }) {
    return (
        <div className="veiculo-card manutencao">
            <div className="veiculo-card-img-container">
                <img
                    src={veiculo.photos && veiculo.photos[0]
                        ? `${API_BASE_URL}/api/media/veiculos/${veiculo.id}/photo`
                        : 'https://placehold.co/300x200/334155/FFF?text=Em+Manutenção'}
                    alt={`${veiculo.marca} ${veiculo.modelo}`}
                    className="veiculo-card-img"
                />
                <div className="veiculo-status-badge manutencao-badge">
                    <Wrench size={11} />
                    Em Manutenção
                </div>
            </div>

            <div className="veiculo-card-body">
                <div className="veiculo-card-header">
                    <h4 className="veiculo-card-title">{veiculo.marca} {veiculo.modelo}</h4>
                    <span className="veiculo-card-placa">{veiculo.placa}</span>
                </div>

                <div className="veiculo-card-grid">
                    {veiculo.ano && (
                        <div className="veiculo-card-info-item">
                            <Calendar size={16} className="info-icon" />
                            <span className="info-value">{veiculo.ano}</span>
                        </div>
                    )}
                    <div className="veiculo-card-info-item">
                        <Gauge size={14} className="info-icon" />
                        <span className="info-value">{formatKm(veiculo.quilometragem)}</span>
                    </div>
                    {veiculo.cor && (
                        <div className="veiculo-card-info-item">
                            <Palette size={14} className="info-icon" />
                            <span className="info-value">{veiculo.cor}</span>
                        </div>
                    )}
                    {veiculo.combustivel && (
                        <div className="veiculo-card-info-item">
                            <Fuel size={14} className="info-icon" />
                            <span className="info-value">{veiculo.combustivel}</span>
                        </div>
                    )}
                </div>

                {veiculo.preco && (
                    <div className="veiculo-card-price-section">
                        <p className="veiculo-card-preco">{formatPrice(veiculo.preco)}</p>
                    </div>
                )}

                {veiculo.laudoTecnico && (
                    <div className="laudo-preview">
                        <h5 className="laudo-title">
                            <ClipboardList size={14} />
                            Laudo Técnico
                        </h5>
                        <p className="laudo-content">
                            {veiculo.laudoTecnico.length > 120
                                ? `${veiculo.laudoTecnico.substring(0, 120)}...`
                                : veiculo.laudoTecnico}
                        </p>
                    </div>
                )}

                <div className={`laudo-status ${veiculo.laudoTecnico ? 'completo' : 'pendente'}`}>
                    {veiculo.laudoTecnico ? (
                        <>
                            <CheckCircle2 size={14} />
                            Laudo Pronto
                        </>
                    ) : (
                        <>
                            <AlertCircle size={14} />
                            Laudo Pendente
                        </>
                    )}
                </div>

                <div className="veiculo-card-actions">
                    <button
                        className="btn-edit-laudo"
                        onClick={() => onEdit(veiculo)}
                    >
                        <Edit size={16} />
                        {veiculo.laudoTecnico ? 'Editar Laudo' : 'Preencher Laudo'}
                    </button>
                </div>
            </div>
        </div>
    );
}
