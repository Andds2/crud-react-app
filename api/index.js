const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())


const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja',
})

/* Inicios de Rotas de Listagens */

// Lista vendedores
app.get('/listvendedor', (req, res) => {
    const Query = 'SELECT id, nome, sobrenome, DATE_FORMAT(data_contratacao, "%d/%m/%Y") AS data_contratacao FROM vendedor'

    database.query(Query, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

// Lista vendas
app.get('/listvendas', (req, res) => {
    const Query = 'SELECT vendas.id, vendas.produto, vendas.valor, DATE_FORMAT(vendas.data_venda, "%d/%m/%y") as data_venda, CONCAT(vendedor.nome, " ", vendedor.sobrenome) as nome FROM vendas JOIN vendedor ON vendedor.id = vendas.id_vendedor'

    database.query(Query, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})


// Lista quantidade de vendas
app.get('/listqntvendas', (req, res) => {
    const Query = 'SELECT vendedor.nome, COUNT(*) as qnt_vendas FROM vendas JOIN vendedor ON vendedor.id = vendas.id_vendedor GROUP BY vendas.id_vendedor'

    database.query(Query, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})


// Lista maior venda
app.get('/listmaiorvenda', (req, res) => {
    const Query = 'SELECT vendedor.nome, vendas.produto, vendas.valor FROM `vendas` JOIN vendedor ON vendedor.id = vendas.id_vendedor WHERE vendas.valor = (SELECT MAX(vendas.valor) FROM vendas)'

    database.query(Query, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

/* Fim de Rotas de Listagens */



/* Inicio de Rotas de Cadastros */

// Cadastro de Vendedor
app.post('/cadvendedor', (req, res) => {
    const {nome, sobrenome, data_contratacao} = req.body

    if(!nome || !sobrenome || !data_contratacao){
        return res.status(400).send('É necessario preencher todos os campos!')
    }

    const Query = 'INSERT INTO vendedor (nome, sobrenome, data_contratacao) VALUES (?,?,?)'

    database.query(Query, [nome, sobrenome, data_contratacao], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, Vendedor não cadastrado!')
        }
        return res.status(200).send('Vendedor cadastrado com sucesso!')
    })
})

/* Fim de Rotas de Cadastros */





app.listen(3001, () => {
    console.log("Rodando!")
})

// SELECT vendedor.nome, vendas.produto, vendas.valor FROM `vendas` JOIN vendedor ON vendedor.id = vendas.id_vendedor WHERE vendas.valor = (SELECT MAX(vendas.valor) FROM vendas);
// SELECT vendedor.nome, COUNT(*) as qnt_vendas FROM vendas JOIN vendedor ON vendedor.id = vendas.id_vendedor GROUP BY vendas.id_vendedor;