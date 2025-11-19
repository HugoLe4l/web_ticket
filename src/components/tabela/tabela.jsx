import { useEffect, useState } from "react"
import "./tabela.css"
import Row from "./row/row"
export default function TabelaStyle({ ArrayDados, TipoTabela }) {
    
 

    return (
        <div className="box-tabela">
            <nav>
                <div className="nav-item-style">
                    <p>{TipoTabela}</p> <p className="cont-item">{TipoTabela === "Em atendimento" ? ArrayDados.filter(item => item.senha).length: ArrayDados?.length }</p>
                </div>

                <div className="nav-item-style style-sub-nav" style={{ transform: 'translateX(-10%)', zIndex: '-1' }}>
                    <p>SP</p> <p className="cont-item sp">{ArrayDados?.filter(item => item.tipo === "SP")?.length}</p>
                </div>

                <div className="nav-item-style style-sub-nav" style={{ transform: 'translateX(-20%)', zIndex: '-2' }}>
                    <p>SG</p> <p className="cont-item sg">{ArrayDados?.filter(item => item.tipo === "SG")?.length}</p>
                </div>

                <div className="nav-item-style style-sub-nav" style={{ transform: 'translateX(-30%)', zIndex: '-3' }}>
                    <p>SE</p> <p className="cont-item se">{ArrayDados?.filter(item => item.tipo === "SE")?.length}</p>
                </div>

            </nav>
            <div className="row cabecalho">
                <div className="c1" style={{flex: TipoTabela === 'Na fila' ? '0.4' : ''}}> <p>Senha</p> </div>
                <div className="c2" style={{flex: TipoTabela === 'Na fila' ? '0.15' : ''}}> <p>Tipo</p> </div>
                <div className="c3" style={{flex: TipoTabela === 'Na fila' ? '0.8' : ''}}> <p>Nome do paciente</p> </div>
                <div className="c4"> <p>Entrada</p> </div>
                {TipoTabela === 'Em atendimento' &&
                    <>
                        <div className="c5"> <p>Guichê </p> </div>
                        <div className="c6"> <p>Estado</p> </div>
                    </>
                }
            </div>

            <div className="tabela-rows">
                {ArrayDados?.map((item, index) => {
                    return (
                       <Row  key={index} index={index} TipoTabela={TipoTabela} item={item} />
                    )
                })}

                {ArrayDados?.length < 6 &&  TipoTabela !== "Em atendimento" && 
                    Array(6 - ArrayDados?.length).fill(0).map((_, index) => {
                        return(
                            <Row  key={index}/>
                        )
                    })
                }
            </div>
        </div>

    )
}