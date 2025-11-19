import { createContext, useState, useContext, useEffect, use } from "react";

const DadosContexto = createContext()

export function DadosProvider({ children }) {
    const [ContadorDiarioSenhas, setContadorDiarioSenhas] = useState(0)
    const [FilaOrganizada, setFilaOrganizada] = useState([])

    const [UltimasSenhas, setUltimasSenhas] = useState(Array(5).fill([]))
    const [EmAtendimento, setEmAtendimento] = useState(Array.from({ length: 5 }, (_, index) => ({ guiche: index })))
    const [AtendimentoFinalizado, setAtendimentoFinalizado] = useState([])



    useEffect(() => {
        const FilaLocalStorage = JSON.parse(window.localStorage.getItem('fila')) || []
        setFilaOrganizada(FilaLocalStorage)
    }, [])

    
   /*  const filaAtual = JSON.parse(window.localStorage.getItem('fila')) || []
    filaAtual.push(novoPaciente)
    localStorage.setItem('fila', JSON.stringify(filaAtual)) */

    return (
        <DadosContexto.Provider value={{ ContadorDiarioSenhas, setContadorDiarioSenhas, FilaOrganizada, setFilaOrganizada, EmAtendimento, setEmAtendimento, AtendimentoFinalizado, setAtendimentoFinalizado, UltimasSenhas, setUltimasSenhas }}>
            {children}
        </DadosContexto.Provider>
    )
}

export function useDados() {
    return useContext(DadosContexto)
}