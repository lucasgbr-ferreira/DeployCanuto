// src/pages/HomeConcessionaria.jsx //

//  IMPORTS //

import React, { useEffect, useState } from "react";
import HeaderConcessionaria from '../components/HeaderConcessionaria.jsx';
import HeroConcessionaria from '../components/HeroConcessionaria.jsx';
import ContactConcessionaria from '../components/ContactConcessionaria.jsx'
import FooterConcessionaria from '../components/FooterConcessionaria.jsx'
import DestaqueConcessionaria from '../components/DestaqueConcessionaria.jsx'
//  IMPORTS  //

// CONTEÚDO DA PÁGINA //

export default function HomeConcessionaria() {

    const [nomeUsuario, setNomeUsuario] = useState("");
    const [concessionaria, setConcessionaria] = useState(null);

    useEffect(() => {
        // Nome do usuário
        const nome = localStorage.getItem("nomeUsuario") || "Usuário";
        setNomeUsuario(nome);

        // Dados da concessionária
        const stored = localStorage.getItem("concessionaria");
        if (stored) {
            setConcessionaria(JSON.parse(stored));
        }
    }, []);

    return (
        <div>
            <HeaderConcessionaria />
            <HeroConcessionaria nome={nomeUsuario} />
            <DestaqueConcessionaria />
            {concessionaria && (
                <ContactConcessionaria
                    email={concessionaria.email_comercial}
                    telefone={concessionaria.telefone}
                    endereco={concessionaria.endereco}
                />
            )}
            <FooterConcessionaria nome={nomeUsuario}/>
        </div>
    );
}