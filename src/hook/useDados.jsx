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

        const EmAtendimentoLocalStorage = JSON.parse(window.localStorage.getItem('EmAtendimento')) || Array.from({ length: 5 }, (_, index) => ({ guiche: index }))
        console.log(EmAtendimentoLocalStorage);
        setEmAtendimento(EmAtendimentoLocalStorage)


        const UltimaSenhaLocalStorage = JSON.parse(window.localStorage.getItem('UltimasSenhas')) || Array(5).fill([])
        setUltimasSenhas(UltimaSenhaLocalStorage)
        
    }, [])

    useEffect(() => {
        console.log(UltimasSenhas);
        
    },[UltimasSenhas])
    return (
        <DadosContexto.Provider value={{ ContadorDiarioSenhas, setContadorDiarioSenhas, FilaOrganizada, setFilaOrganizada, EmAtendimento, setEmAtendimento, AtendimentoFinalizado, setAtendimentoFinalizado, UltimasSenhas, setUltimasSenhas }}>
            {children}
        </DadosContexto.Provider>
    )
}

export function useDados() {
    return useContext(DadosContexto)
}