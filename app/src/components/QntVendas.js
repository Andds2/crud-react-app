import './css/QntVendas.css'

const QntVendas = (props) => {
    return(
        <div className="list-card-qntvendas">
            <div className='list-card-nome'>
                <h2>{props.nome}</h2>
            </div>
            <div className='list-card-qntd'>
                <h2>{props.qntvendas} Vendas</h2>
            </div>
        </div>
    )
}

export default QntVendas