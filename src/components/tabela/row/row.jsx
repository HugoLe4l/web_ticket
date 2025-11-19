import "./row.css"

export default function Row({ item, TipoTabela, index }) {
    return (
        <div className="row row-paciente"  >
            <div className="c1" style={{flex: TipoTabela === 'Na fila' ? '0.4' : ''}}> <p>{item?.senha}</p> </div>
            
            <div className="c2" style={{flex: TipoTabela === 'Na fila' ? '0.15' : ''}}><p className="tag-tipo-senha-01"
                style={{ backgroundColor: item?.tipo === "SP" ? '#E53935' : item?.tipo === "SG" ? '#7CB342' : '#FB8C00' }}>{item?.tipo}</p></div>
            
            <div className="c3" style={{flex: TipoTabela === 'Na fila' ? '0.8' : ''}}> <p>{item?.nome}</p> </div>

            <div className="c4"> <p>{item?.data_entrada} {item?.hora_entrada}</p> </div>

            {TipoTabela === "Em atendimento" &&
                <>
                    <div className="c5"> <p>{item?.guiche + 1}</p> </div>
                    <div className="c6"> <p className="estado-style"> <i className="bi bi-circle-fill" style={{ color: item?.estado ? '#D2A100' : '#119C30' }}></i> {item?.estado ? item?.estado : 'Livre'}  </p> </div>
                </>
            }

        </div>
    )
}   