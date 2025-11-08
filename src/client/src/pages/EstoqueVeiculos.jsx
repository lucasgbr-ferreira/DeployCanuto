import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// Importando ícones (adicionando os novos)
import { 
  CarFront, 
  Users,
  Heart,
  LogOut,
  Menu,
  X,
  Car,
  CheckSquare, 
  Wrench, 
  ArrowRight, 
  ChevronDown 
} from 'lucide-react';

import "../styles/landing.css"; 
import "../styles/stock.css"; 

// --- Variantes de Animação  ---
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};


// --- Sub-Componentes Reutilizados (Dropdown e Modal) ---
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="nav-link">
        Perfil
        <svg className={`dropdown-arrow ${isOpen ? 'open' : ''}`} width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="dropdown-menu"
          >
            <a href="#" className="dropdown-item"><Users width={16} height={16} /> Minha Conta</a>
            <a href="#" className="dropdown-item"><Heart width={16} height={16} /> Meus Favoritos</a>
            <hr />
            <a href="#" className="dropdown-item"><LogOut width={16} height={16} /> Sair</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoginModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose} 
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="modal-header">
              <h3>Acessar Conta</h3>
              <button onClick={onClose} className="modal-close-btn">
                <X width={24} height={24} />
              </button>
            </div>
            <form>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="emailInput">Email</label>
                  <input type="email" id="emailInput" placeholder="voce@exemplo.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordInput">Senha</label>
                  <input type="password" id="passwordInput" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn primary" style={{ width: '100%' }}>
                  Entrar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


// --- Componente Principal (O Dashboard) ---
export default function EstoqueVeiculos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '/' }, 
    { name: 'Veículos', href: '/catalog' },
    { name: 'Promoções', href: '/promocoes' },
  ];

  return (
    <main className="lp-root">
      
      {/* 1. Navbar (Menu Superior) */}
      <nav className="lp-header">
        <div className="lp-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="lp-brand">
            <CarFront /> 
            CanutoMotors
          </Link>

          <div className="lp-nav">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
            <ProfileDropdown />
            <button onClick={() => setIsModalOpen(true)} className="btn primary small">
              Entrar
            </button>
          </div>
          
          <div className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mobile-menu-dropdown"
            >
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="nav-link">
                  {link.name}
                </Link>
              ))}
              <ProfileDropdown />
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Seção Hero (Dashboard) */}
      <motion.header 
        className="dash-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.h1 variants={fadeUp}>
            Estoque de veículos da concessionária
          </motion.h1>
          <motion.p variants={fadeUp} custom={0.1}>
            Gerencie com precisão todos os veículos disponíveis em seu estoque. Acompanhe cada detalhe e mantenha o controle total de suas vendas.
          </motion.p>
          <motion.div className="dash-hero-cta" variants={fadeUp} custom={0.2}>
            <button className="btn primary">Adicionar Veículo</button>
            <button className="btn ghost">Filtrar Estoque</button>
          </motion.div>
        </div>
      </motion.header>

      {/* 3. Seção Introdução (Reutilizada do catalog.css) */}
      <motion.section 
        className="catalog-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <div className="lp-container">
          <motion.h6 variants={fadeUp}>Veículos</motion.h6>
          <motion.h2 variants={fadeUp} custom={0.1}>
            Catálogo completo
          </motion.h2>
          <motion.p variants={fadeUp} custom={0.2}>
            Visualize todos os veículos cadastrados em um único lugar.
          </motion.p>
        </div>
      </motion.section>

      {/* 4. Seção Grid de Ações */}
      <main className="lp-container" style={{ paddingBottom: '72px', paddingTop: '36px' }}>
        <motion.div 
          className="dash-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {/* Cards do Dashboard */}
          <DashboardCard
            icon={Car}
            title="Veículos disponíveis para venda"
            desc="Confira os detalhes de cada veículo do estoque."
            linkText="Detalhes"
          />
          <DashboardCard
            icon={CheckSquare}
            title="Veículos vendidos"
            desc="Histórico de vendas concluídas."
            linkText="Relatório"
          />
          <DashboardCard
            icon={Wrench}
            title="Veículos em manutenção"
            desc="Acompanhe veículos temporariamente indisponíveis."
            linkText="Manutenção"
          />
        </motion.div>

        {/* 5. Seção Adicionar Veículo */}
        <motion.section 
          className="dash-add-form"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
            <h2>Adicionar novo veículo</h2>
            <p>
              Insira todas as informações necessárias para cadastrar um novo veículo em seu estoque.
            </p>
            <div className="form-row">
              {/* Botão customizado que imita um <select> */}
              <button className="fake-select">
                <span>Selecione o veículo</span>
                <ChevronDown size={20} />
              </button>
              <button className="btn primary">
                Cadastrar
              </button>
            </div>
            <small style={{ color: 'var(--muted)', marginTop: '16px', display: 'block', fontSize: '12px' }}>
              Ao cadastrar, você confirma que todas as informações são verdadeiras e precisas.
            </small>
        </motion.section>
      </main>


      {/* 6. Footer (Reutilizado 100%) */}
      <footer className="lp-footer">
        <div className="lp-container">
          <small>© {new Date().getFullYear()} CanutoMotors — Todos os direitos reservados.</small>
        </div>
      </footer>

      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

function DashboardCard({ icon: Icon, title, desc, linkText }) {
  return (
    <motion.a 
      href="#" 
      className="dash-card"
      variants={fadeUp}
    >
      <div className="dash-card-icon">
        <Icon size={24} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="dash-card-link">
        {linkText}
        <ArrowRight size={16} />
      </span>
    </motion.a>
  );
}