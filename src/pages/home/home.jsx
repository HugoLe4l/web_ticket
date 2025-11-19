import "./home.css"
import { useEffect, useRef, useState } from "react"

import Header_01 from "../../components/Header/Header_01/Header_01"
import TabelaStyle from "../../components/tabela/tabela"
import Senha from "../../components/tabela/senha/senha"
import Box_Pegar_Senha from "../../components/Box_Pegar_Senha/Box_Pegar_Senha"

import ding_dong from "../../assets/audio/ding-dong.mp3"
import { useDados } from "../../hook/useDados"

export default function HomePage() {
    const { FilaOrganizada, setFilaOrganizada, EmAtendimento, setEmAtendimento, setAtendimentoFinalizado, UltimasSenhas, setUltimasSenhas } = useDados()
    const RefSelectOption = useRef(null)

    function ProximoAtendimento(guiche) {
        guiche = guiche - 1
        const pegaGuicheDados = EmAtendimento.find(item => item.guiche === guiche)

        if (pegaGuicheDados.senha) {
            console.log(`Guichê 0${guiche + 1}: Está ocupado`);
            return
        }
        if (FilaOrganizada?.length < 1) {
            console.log(`Guichê 0${guiche + 1}: Não a pacientes na fila para atender`);
            return
        }
        const audio = new Audio(ding_dong)
        audio.volume = 0.1
        audio.play()
        const pegaProximoDaFila = FilaOrganizada[0]

        setEmAtendimento(prev => { const copia = [...prev]; copia[guiche] = { ...copia[guiche], ...pegaProximoDaFila, estado: "Em atendimento" }; return copia })
        setFilaOrganizada(prev => prev.slice(1))
        setUltimasSenhas(prev => [{ senha: pegaProximoDaFila?.senha, tipo: pegaProximoDaFila?.tipo, guiche: guiche }, ...prev].slice(0, 5))
        console.log(`Guichê 0${guiche + 1}: Proximo da fila!`);

    }

    function ConcluirAtendimento(guiche) {
        guiche = guiche - 1
        const pegaGuicheDados = EmAtendimento.find(item => item.guiche === guiche)

        if (!pegaGuicheDados.senha) {
            console.log(`Guichê 0${guiche + 1}: Guiche ja está vazio`);
            return
        }
        setEmAtendimento(prev => { const copia = [...prev]; copia[guiche] = { guiche: guiche }; return copia })
        console.log(`Guichê 0${guiche + 1}: Concluiu o atendimento.`);

    }
    return (

        <>
            <Header_01 />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "0.5%" }}>
                <select ref={RefSelectOption} name="" id="">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button style={{ width: '200px', padding: '1%', cursor: "pointer" }} onClick={() => ProximoAtendimento(parseInt(RefSelectOption.current.value))}>CHAMAR PROXIMO</button>
                <button style={{ width: '200px', padding: '1%', cursor: "pointer" }} onClick={() => ConcluirAtendimento(parseInt(RefSelectOption.current.value))}>CONCLUIR ATENDIMENTO</button>
            </div>

            <main className="main-home-page">
                <section className="section section-1">

                    <div className="column-1">
                        <div className="bloco" id="bloco-colunm-1"> <p> Horario de atendimento das 07:00 ás 17:00 </p> </div>
                        <TabelaStyle ArrayDados={EmAtendimento} TipoTabela={'Em atendimento'} />
                    </div>


                    <div className="column-2">
                        <div className="bloco" id="bloco-colunm-2"> <p> Ultimas 5 senhas chamadas </p> </div>
                        <div className="box-ultimas-senhas">
                            <div className="box-content-ultimas-sehas">
                                {UltimasSenhas?.map((item, index) => {
                                    return (
                                        <Senha key={index} ultimo={index === 0 ? true : false} tipo_senha={item?.tipo} senha={item?.senha} guiche={item?.guiche} />
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </section>



                <section className="section section-2">
                    <div className="column-1">
                        <TabelaStyle ArrayDados={FilaOrganizada} TipoTabela={'Na fila'} />
                    </div>

                    <div className="column-2">
                        <Box_Pegar_Senha />
                    </div>
                </section>
            </main>
        </>
    )
}