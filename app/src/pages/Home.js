import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import './css/Home.css'
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import QntVendas from '../components/QntVendas';
import MaiorVenda from '../components/MaiorVenda';

const Home = () => {

    const [listQntVendas, setListQntVendas] = useState([])
    const [listMaiorVendas, setListMaiorVendas] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listqntvendas').then((response) => {
            setListQntVendas(response.data)
        })
        Axios.get('http://localhost:3001/listmaiorvenda').then((response) => {
            setListMaiorVendas(response.data)
        })
      }, [])

    return(
        <div className='home-container'>
            <h1>Controle de Vendas</h1>
            <div className='home-content'>
                <div className='home-content-list'>
                    <div className='home-content-card'>
                        <h1 className='card-icon'><IoPersonCircleOutline /></h1>
                        <h2 className='card-title'>Vendedores</h2>
                        <p className='card-text'>Para conferir todos os nossos vendedores, clique no botão abaixo</p>
                        <Link to='/listavendedores'>Acessar</Link>
                    </div>
                </div>
                <div className='home-content-list'>
                    <div className='home-content-card'>
                        <h1 className='card-icon'><FaMoneyBillTrendUp /></h1>
                        <h2 className='card-title'>Vendas</h2>
                        <p className='card-text'>Para conferir todas as vendas efetuadas pela nossa loja, clique no botão abaixo</p>
                        <Link to='/listavendas'>Acessar</Link>
                    </div>
                </div>
            </div>
            <div className='home-list-content'>
                <div className='home-content-list'>
                    <div className='home-list-card'>
                        {listQntVendas.map((val) => ( 
                            <QntVendas listQntVendas={listQntVendas} setListQntVendas={setListQntVendas} key={val.id} id={val.id} nome={val.nome} qntvendas={val.qnt_vendas}/>
                        ))}
                    </div>

                </div>
                <div className='home-content-list'>
                    <div className='home-list-card'>
                        {listMaiorVendas.map((val) => ( 
                            <MaiorVenda listMaiorVendas={listMaiorVendas} setListMaiorVendas={setListMaiorVendas} key={val.id} id={val.id} nome={val.nome} produto={val.produto} valor={val.valor}/>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home

