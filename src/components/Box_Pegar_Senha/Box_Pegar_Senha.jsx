import "./Box_Pegar_Senha.css"

import { useDados } from "../../hook/useDados"
import { useEffect, useRef, useState } from "react"

export default function Box_Pegar_Senha() {
    const { ContadorDiarioSenhas, setContadorDiarioSenhas, FilaOrganizada, setFilaOrganizada } = useDados()
    const RefInputNome = useRef(null)

    const [SelectTipoSenha, setSelectTipoSenha] = useState('')
    const [TextRespostaNegativa, setTextRespostaNegativa] = useState('')
    const [EstadoTextRespostaNegativa, setEstadoTextRespostaNegativa] = useState(false)



    function criar_nova_senha(nome, tipo) {
        if (!nome) {
            setTextRespostaNegativa("Preenche o nome");
            setEstadoTextRespostaNegativa(true)
            setTimeout(() => {
                setEstadoTextRespostaNegativa(false)
            }, 2000);
            return;
        }
        if (!tipo) {
            setTextRespostaNegativa("Defina o tipo de senha");
            setEstadoTextRespostaNegativa(true)
            setTimeout(() => {
                setEstadoTextRespostaNegativa(false)
            }, 2000);
            return;
        }
        const hoje = new Date()
        const dia = String(hoje.getDate()).padStart(2, '0')
        const mes = String(hoje.getMonth() + 1).padStart(2, '0')
        const ano = String(hoje.getFullYear()).slice(2)

        const horas = String(hoje.getHours()).padStart(2, '0')
        const minutos = String(hoje.getMinutes()).padStart(2, '0')
        const segundos = String(hoje.getSeconds()).padStart(2, "0")

        setContadorDiarioSenhas(ContadorDiarioSenhas + 1)
        const novoPaciente = {
            senha: `${ano}${mes}${dia}${tipo}${String(ContadorDiarioSenhas + 1).padStart(2, '0')}`,
            tipo: tipo,
            nome: nome,
            data_entrada: `${dia}/${mes}/${ano}`,
            hora_entrada: `${horas}:${minutos}:${segundos}`
        }

        let FilaNova = FilaOrganizada
        FilaNova.push(novoPaciente)

        const PegaSP = FilaNova.filter(item => item.tipo === "SP")
        const organizaSP = PegaSP.sort((a, b) => a.hora_entrada.localeCompare(b.hora_entrada))

        const PegaSG = FilaNova.filter(item => item.tipo === "SG")
        const organizaSG = PegaSG.sort((a, b) => a.hora_entrada.localeCompare(b.hora_entrada))

        const PegaSE = FilaNova.filter(item => item.tipo === "SE")
        const organizaSE = PegaSE.sort((a, b) => a.hora_entrada.localeCompare(b.hora_entrada))
        FilaNova = [];
        FilaNova.push(...organizaSP, ...organizaSE, ...organizaSG)
        console.log(FilaNova);
        
        setFilaOrganizada(FilaNova)

        localStorage.setItem('fila', JSON.stringify(FilaNova))
    }
    return (
        <div className="box-pegar-senha">
            <div><p>Horario de atendimento <br />das 07:00 ás 17:00</p></div>

            <div className="box-central">
                <input ref={RefInputNome} type="text" placeholder="Seu nome" />
                <div className="tipo-senha">
                    <p>Tipo de senha</p>
                    <div className="box-tags">
                        <p className="sp" onClick={() => setSelectTipoSenha('SP')} style={{ opacity: SelectTipoSenha === "SP" ? '100%' : '30%' }}>SP</p>
                        <p className="sg" onClick={() => setSelectTipoSenha('SG')} style={{ opacity: SelectTipoSenha === "SG" ? '100%' : '30%' }}>SG</p>
                        <p className="se" onClick={() => setSelectTipoSenha('SE')} style={{ opacity: SelectTipoSenha === "SE" ? '100%' : '30%' }}>SE</p> </div>
                </div>
            </div>

            <button onClick={() => criar_nova_senha(RefInputNome.current.value, SelectTipoSenha)}>Pegar senha</button>
            <p className="text-resposta" style={{ opacity: EstadoTextRespostaNegativa ? '1' : '0' }}>{TextRespostaNegativa}</p>
        </div>
    )
}