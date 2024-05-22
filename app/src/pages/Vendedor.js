import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import './css/Vendedor.css'
import ListaVendedor from '../components/ListaVendedor'

const Vendedor = () => {

    const [valor, setValor] = useState({
        nome: '',
        sobrenome: '',
        data_contratacao: ''
    })
    const [lista, setLista] = useState([])

    const handleInsert = async (e) => {
        e.preventDefault();
        try{
            const requisicao = await Axios.post('http://localhost:3001/cadvendedor', valor)

            if(requisicao.status === 200) alert(requisicao.data)

        } catch (err){
            if(err.response) alert(`Erro: ${err.response.data}`)
        }
        window.location.reload()
    }

    const handleAltValor = (value) => {
        setValor((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendedor').then((response) => {
            setLista(response.data)
        })
    }, [])

    return(
        <div className='form-cad-vendedor'>
            <h1>Cadastro de Vendedores</h1>
            <form onSubmit={handleInsert} className='form-cad'>
                <div className='form-input'>
                    <label for='name'>Nome</label>
                    <input type="text" name='nome' placeholder='digite aqui...' onChange={handleAltValor}/>
                </div>
                <div className='form-input'>
                    <label for='sobrenome'>Sobrenome</label>
                    <input type="text" name='sobrenome' placeholder='digite aqui...' onChange={handleAltValor}/>
                </div>
                <div className='form-input'>
                    <label for='data_contratacao'>Data de Contratação</label>
                    <input type="date" name='data_contratacao' onChange={handleAltValor}/>
                </div>
                <button type='submit'>Cadastrar</button>
            </form>
            <div className='content-list-vendedor'>
                {lista.map((val) => (
                    <ListaVendedor lista={val.lista} setLista={val.setLista} key={val.id} id={val.id} nome={val.nome} sobrenome={val.sobrenome} data_contratacao={val.data_contratacao}/>
                ))}
            </div>
        </div>
    )
}

export default Vendedor

// meio 1, 1 e 3