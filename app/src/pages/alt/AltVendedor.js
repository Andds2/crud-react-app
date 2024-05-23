import './css/AltVendedor.css'
import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'


const AltVendedor = () => {
    const { id } = useParams()
    const history = useNavigate()
    const [vendedorAlt, setVendedorAlt] = useState([])
    const [valor, setValor] = useState({
        nome: '',
        sobrenome: '',
        email: ''
    })

    useEffect(() => {
        const vendedor = async () => {
            try{
                const requisicao = await Axios.get(`http://localhost:3001/listvendedor/${id}`)
                setVendedorAlt(requisicao.data)

            } catch(err){
                alert('Erro com o servidor, vendedor não encontrado')
                history('/vendedor')
            }
        }

        vendedor()
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
            const requisicao = await Axios.put(`http://localhost:3001/altvendedor/${id}`, valor)

            if(requisicao.status === 200) alert(requisicao.data)
            history('/vendedor')

        } catch (err){
            if(err.response) alert(`Erro: ${err.response.data}`)
        }
    }

    return(
        <div className='main-form-container'>
            <h1>Alteração de Vendedor</h1>
            <div className='form-container-alt-vendedor' >
                {vendedorAlt.map((val) => (
                        <div className='form-card-alt-vendedor' key={val.id}>
                            <h3>Dados: </h3>
                            <div></div>
                            <p><b>Nome: </b> {val.nome}</p>
                            <p><b>Sobrenome: </b>{val.sobrenome}</p>
                            <p><b>Email: </b>{val.email}</p>
                        </div> 
                ))}
                <form onSubmit={handleUpdate}>
                    <div className='form-alt-vendedor-input'>
                        <label htmlFor='nome'>Nome </label>
                        <input type='text' placeholder='digite aqui...' name='nome' id='nome' onChange={handleAltValor} required/>
                    </div>
                    <div className='form-alt-vendedor-input'>
                        <label htmlFor='sobrenome'>Sobrenome </label>
                        <input type='text' placeholder='digite aqui...' name='sobrenome' id='sobrenome' onChange={handleAltValor} required/>
                    </div>
                    <div className='form-alt-vendedor-input'>
                        <label htmlFor='email'>Email </label>
                        <input type='text' placeholder='digite aqui...' name='email' id='email' onChange={handleAltValor} required/>
                    </div>
                    <button type='submit'>Salvar</button>
                </form>
            </div>

        </div>
    )
}

export default AltVendedor