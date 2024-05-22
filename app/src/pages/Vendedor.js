import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import './css/Vendedor.css'

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
            <form onSubmit={handleInsert}>
                <input type="text" name='nome' placeholder='nome' onChange={handleAltValor}/>
                <input type="text" name='sobrenome' placeholder='nome' onChange={handleAltValor}/>
                <input type="date" name='data_contratacao' onChange={handleAltValor}/>
                <button type='submit'>Cadastrar</button>
            </form>
        </div>
    )
}

export default Vendedor