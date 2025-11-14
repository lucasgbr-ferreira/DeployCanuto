// src/pages/HomeConcessionaria.jsx //

// IMPORTS //

import React, { useEffect, useState } from "react";
import HeaderConcessionaria from '../components/HeaderConcessionaria.jsx';
import HeroConcessionaria from '../components/HeroConcessionaria.jsx';
// IMPORTS //

// CONTEÚDO DA PÁGINA //

export default function HomeConcessionaria() {
    const [nomeConcessionaria, setNomeConcessionaria] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:3000/api/concessionarias/id", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await res.json();
                setNomeConcessionaria(data.nome); 
            } catch (error) {
                console.error("Erro ao buscar a concessionária:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <HeaderConcessionaria />
            <HeroConcessionaria nome={nomeConcessionaria} />
        </div>
    );
}