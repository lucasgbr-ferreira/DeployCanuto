import React from "react";
import "../styles/DestaqueConcessionaria.css";

export default function DestaqueConcessionaria() {
  const cards = [
    {
      titulo: "Hatch com baixa quilometragem",
      texto: "Econômico, ideal para cidade e alta demanda diária.",
      img: "https://i.imgur.com/0oH3xJ1.jpeg",
    },
    {
      titulo: "SUV compacto para cidade e estrada",
      texto: "Conforto e versatilidade para todos os terrenos.",
      img: "https://i.imgur.com/x8WyW0J.jpeg",
    },
    {
      titulo: "Hatch econômico e urbano",
      texto: "Perfeito para mobilidade nas grandes cidades.",
      img: "https://i.imgur.com/G3oN0FZ.jpeg",
    },
    {
      titulo: "Sedan confortável",
      texto: "Estabilidade, conforto e ótimo espaço interno.",
      img: "https://i.imgur.com/fqGQ8qs.jpeg",
    },
    {
      titulo: "SUV completo",
      texto: "Ideal para família, tecnologia e segurança.",
      img: "https://i.imgur.com/1WTAM1K.jpeg",
    },
    {
      titulo: "Picape robusta",
      texto: "Força, desempenho e ideal para trabalho pesado.",
      img: "https://i.imgur.com/MmXNh2T.jpeg",
    },
  ];

  return (
    <section className="lp-destaque">
      <div className="lp-destaque-header">
        <p className="lp-destaque-tag">Destaque</p>
        <h2 className="lp-destaque-title">Veículos em alta</h2>
        <p className="lp-destaque-desc">
          Selecionamos os melhores carros para você encontrar seu modelo ideal.
        </p>
      </div>

      <div className="lp-destaque-grid">
        {cards.map((carro, index) => (
          <div className="lp-destaque-card" key={index}>
            <p className="lp-card-tag">Seminovo</p>
            <h3 className="lp-card-title">{carro.titulo}</h3>
            <p className="lp-card-text">{carro.texto}</p>

            <a href="#" className="lp-card-link">
              Ver <span>›</span>
            </a>

            <img src={carro.img} alt={carro.titulo} className="lp-card-img" />
          </div>
        ))}
      </div>
    </section>
  );
}

