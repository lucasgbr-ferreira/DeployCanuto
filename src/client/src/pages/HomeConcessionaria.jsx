// src/pages/HomeConcessionaria.jsx //

// IMPORTS //

import React, { useEffect, useState } from "react";
import HeaderConcessionaria from '../components/HeaderConcessionaria.jsx';
import HeroConcessionaria from '../components/HeroConcessionaria.jsx';
import ContactConcessionaria from '../components/ContactConcessionaria.jsx'
// IMPORTS //

// CONTEÚDO DA PÁGINA //

export default function HomeConcessionaria() {

    const [nomeUsuario, setNomeUsuario] = useState("");

    useEffect(() => {
        const nome = localStorage.getItem("nomeUsuario") || "Usuário";
        setNomeUsuario(nome);
    }, []);

    return (
        <div>
            <HeaderConcessionaria />
            <HeroConcessionaria nome={nomeUsuario} />
            <ContactConcessionaria />
        </div>
    );
}