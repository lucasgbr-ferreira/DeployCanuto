import React from "react";
import { motion } from "framer-motion";
import "../styles/landing.css";

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

export default function LandingPage() {
  return (
    <main className="lp-root">
      {/* HERO */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <motion.h1
            className="lp-hero-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
          >
            GesCar — gestão e experiência automotiva
          </motion.h1>

          <motion.p
            className="lp-hero-sub"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.12}
          >
            Plataforma para concessionárias e clientes: estoque, agendamentos, propostas e muito mais.
          </motion.p>

          <motion.div
            className="lp-hero-cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0.24}
          >
            <a href="#cadastro" className="btn primary">Criar conta</a>
            <a href="#sobre" className="btn ghost">Saber mais</a>
          </motion.div>
        </div>

        <motion.div
          className="lp-hero-visual"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Placeholder visual — troque pela sua imagem / SVG */}
          <div className="lp-car-card">
            <div className="lp-car-photo">🚗</div>
            <div className="lp-car-meta">
              <h3>Descubra seu próximo carro</h3>
              <p>Catálogo atualizado com condições exclusivas.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="lp-features">
        <motion.div
          className="lp-features-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {[
            { t: "Inventário Dinâmico", d: "Gerencie estoque e filtros com facilidade" },
            { t: "Painel de Gestão", d: "Acompanhe vendas, propostas e agendamentos" },
            { t: "Credenciamento Rápido", d: "Cadastro simples para clientes e concessionárias" }
          ].map((it, i) => (
            <motion.article
              className="lp-feature-card"
              key={i}
              variants={fadeUp}
              custom={0.06 * i}
            >
              <div className="lp-feature-ico">●</div>
              <h4>{it.t}</h4>
              <p>{it.d}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="sobre" className="lp-about">
        <motion.div
          className="lp-about-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
        >
          <h3>Sobre a Concessionária</h3>
          <p>
            Nós conectamos compradores e concessionárias com uma interface limpa, rápida e confiável.
            O backend é preparado para autenticação, gerenciamento de usuários e integração com seu estoque.
          </p>
          <a href="#cadastro" className="btn primary">Começar</a>
        </motion.div>
      </section>

      {/* CTA / Footer simplified */}
      <section className="lp-cta" id="cadastro">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="lp-cta-inner"
        >
          <h3>Pronto para começar?</h3>
          <p>Crie sua conta ou faça login para acessar o painel.</p>
          <div style={{ marginTop: 12 }}>
            <a href="/register" className="btn primary">Criar Conta</a>
            <a href="/login" className="btn ghost">Entrar</a>
          </div>
        </motion.div>
      </section>

      <footer className="lp-footer">
        <small>© {new Date().getFullYear()} GesCar — Todos os direitos reservados</small>
      </footer>
    </main>
  );
}
