import './css/MaiorVenda.css'
import { FaMoneyBillWave } from "react-icons/fa";

const MaiorVenda = (props) => {
    const valor = props.valor

    return(
        <div className='mrvenda-container'>
            <h2><FaMoneyBillWave /> Maior Venda Efetuada</h2>
            
            <table>
                <tr>
                    <th>Vendedor</th>
                    <td>{props.nome}</td>
                </tr>
                <tr>
                    <th>Produto</th>
                    <td>{props.produto}</td>
                </tr>
                <tr>
                    <th>Valor</th>
                    <td>R$ {valor.toFixed(2)}</td>
                </tr>
            </table>
        </div>
    )   
}

export default MaiorVenda