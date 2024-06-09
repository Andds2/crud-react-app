import './css/AltVenda.css'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const AltVenda = () =>{
    const { id } = useParams()
    const history = useNavigate()
    const [vendaAlt, setVendaAlt] = useState([])
    const [valor, setValor] = useState({
        produto: '',
        valor: '',
        data_venda: '',
        id_vendedor: '',
    })

    useEffect(() => {
        const venda = async () => {
            try{
                const requisicao = await Axios.get(`http://localhost:3001/listvenda/${id}`)
                setVendaAlt(requisicao.data)

            } catch(err){
                alert('Erro com o servidor, venda não encontrada')
                history('/vendas')
            }
        }

        venda()
    }, [id, history])

    const handleAltValor = (value) => {
        setValor((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try{
            const requisicao = await Axios.put(`http://localhost:3001/altvenda/${id}`, valor)

            if(requisicao.status === 200) alert(requisicao.data)
            history('/vendas')

        } catch (err){
            if(err.response) alert(`Erro: ${err.response.data}`)
        }
    }

    const [listaVendedor, setListaVendedor] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendedor').then((response) => {
            setListaVendedor(response.data)
        })
    }, [])

    return(
        <div className='main-form-container'>
            <h1>Alteração de Venda</h1>
            <div className='form-container-alt-venda' >
                {vendaAlt.map((val) => (
                        <div className='form-card-alt-venda' key={val.id}>
                            <h3>Dados: </h3>
                            <div></div>
                            <p><b>Produto: </b> {val.produto}</p>
                            <p><b>Valor: </b>{val.valor}</p>
                            <p><b>Data: </b>{val.data_venda}</p>
                            <p><b>Nome: </b>{val.nome}</p>
                        </div> 
                ))}
                <form onSubmit={handleUpdate}>
                    <div className='form-alt-venda-input'>
                        <label htmlFor='produto'>Produto </label>
                        <input type='text' placeholder='digite aqui...' name='produto' id='produto' onChange={handleAltValor} required/>
                    </div>
                    <div className='form-alt-venda-input'>
                        <label htmlFor='valor'>Valor </label>
                        <input type='number' placeholder='digite aqui...' name='valor' id='valor' step='0.01' onChange={handleAltValor} required/>
                    </div>
                    <div className='form-alt-venda-input'>
                        <label htmlFor='data_venda'>Data </label>
                        <input type='date' placeholder='digite aqui...' name='data_venda' id='data_venda' onChange={handleAltValor} required/>
                    </div>
                    <div className='form-alt-venda-input'>
                        <label htmlFor='nome'>Vendedor </label>
                        <select className='form-cad-venda-select' name='id_vendedor' id='id_vendedor' required onChange={handleAltValor}>
                            <option value="">Selecione uma opção</option>
                            {listaVendedor.map((val) => (
                                <option value={val.id} key={val.id}>{val.nome} {val.sobrenome}</option>
                            ))}
                        </select>
                    </div>
                    <button type='submit'>Salvar</button>
                </form>
            </div>

        </div>
    )
}

export default AltVenda