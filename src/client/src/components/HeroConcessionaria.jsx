// IMPORTS //

import React from "react";
import "../styles/HeroConcessionaria.css";
import FundoHero from "../assets/fundo_homepageConcessionaria.jpg";

// IMPORTS //


// PRINCIPAL //

export default function HeroConcessionaria() {
  return (
    <section 
      className="hero-concessionaria"
      style={{ backgroundImage: `url(${FundoHero})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Encontre seu próximo veículo com a
        </h1>

        <h1 className="hero-title-strong">
          Concessionaria
        </h1>

        <p className="hero-subtitle">
          Plataforma inteligente para compra e gestão de veículos. Conectamos compradores,
          concessionárias e administradores em uma única solução.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">Buscar</button>
          <button className="btn-secondary">Explorar</button>
        </div>
      </div>
    </section>
  );
}

// PRINCIPAL //