import { useEffect, useRef } from "react"
import "./senha.css"


export default function Senha({ ultimo, tipo_senha, senha, guiche }) {
    const RefTagSenha = useRef(null)

    useEffect(() => {
        if (!RefTagSenha.current || !ultimo) return
        RefTagSenha.current.classList.add('animate-tag-senha')
        setTimeout(() => {
           RefTagSenha.current.classList.remove('animate-tag-senha')
        }, 1000);
        

    }, [ultimo, tipo_senha, senha, guiche])

    return (
        <>
            {tipo_senha && senha &&
                (
                    <div ref={RefTagSenha} className={`tag-senha ${ultimo ? 'ultimo' : ''}`}>
                        <div className={`${tipo_senha === 'SP' ? 'sp' : tipo_senha === 'SG' ? 'sg' : 'se'}`}><p>{senha}</p></div>
                        <div><p>GUICHÊ 0{guiche+1}</p></div>
                    </div>
                )
            }
        </>
    )


}




