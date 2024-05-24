const ListaVendas = (props) => {
    return(
        <tbody>
            <tr>
                <td>{props.id}</td>
                <td>{props.produto}</td>
                <td>{props.valor}</td>
                <td>{props.data_venda}</td>
                <td>{props.nome}</td>
                <td><button>Edit</button></td>
                <td><button>Excluir</button></td>
            </tr>
        </tbody>
    )
}

export default ListaVendas