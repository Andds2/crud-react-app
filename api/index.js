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
    const Query = 'SELECT * FROM vendedor'

    database.query(Query, (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })
})

// Lista vendas
app.get('/listvendas', (req, res) => {
    const Query = 'SELECT vendas.id, vendas.produto, vendas.valor, DATE_FORMAT(vendas.data_venda, "%d/%m/%y") as data_venda, CONCAT(vendedor.nome, " ", vendedor.sobrenome) as nome FROM vendas JOIN vendedor ON vendedor.id = vendas.id_vendedor ORDER BY data_venda DESC'

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

// Lista de vendedor para update
app.get('/listvendedor/:id', (req, res) => {
    const {id} = req.params

    const Query = 'SELECT * FROM vendedor WHERE id = ?'

    database.query(Query, [id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})

// Lista de venda para update
app.get('/listvenda/:id', (req, res) => {
    const {id} = req.params

    const Query = 'SELECT vendas.id, vendas.produto, vendas.valor, DATE_FORMAT(vendas.data_venda, "%d/%m/%y") as data_venda, CONCAT(vendedor.nome, " ", vendedor.sobrenome) as nome FROM vendas JOIN vendedor ON vendedor.id = vendas.id_vendedor WHERE vendas.id = ?'

    database.query(Query, [id], (err, result) => {
        if(err) console.log(err)
        else res.send(result)
    })

})

/* Fim de Rotas de Listagens */



/* Inicio de Rotas de Cadastros */

// Cadastro de Vendedor
app.post('/cadvendedor', (req, res) => {
    const {nome, sobrenome, email} = req.body

    if(!nome || !sobrenome || !email){
        return res.status(400).send('É necessario preencher todos os campos!')
    }

    const Query = 'INSERT INTO vendedor (nome, sobrenome, email) VALUES (?,?,?)'

    database.query(Query, [nome, sobrenome, email], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, Vendedor não cadastrado!')
        }
        return res.status(200).send('Vendedor cadastrado com sucesso!')
    })
})

// Cadastro de Vendas
app.post('/cadvendas', (req, res) => {
    const {produto, valor, data_venda, id_vendedor} = req.body

    if(!produto || !valor || !data_venda || !id_vendedor){
        return res.status(400).send('É necessario preencher todos os campos!')
    }

    const Query = 'INSERT INTO vendas (produto, valor, data_venda, id_vendedor) VALUES (?,?,?,?)'

    database.query(Query, [produto, valor, data_venda, id_vendedor], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, Venda não cadastrada!')
        }
        return res.status(200).send('Venda cadastrada com sucesso!')
    })
})

/* Fim de Rotas de Cadastros */



/* Inicio de Rotas de Deletes */

// Deletar vendedor
app.delete('/deletevendedor/:id', (req, res) => {
    const {id} = req.params

    const Query = 'DELETE FROM vendedor WHERE id = ?'

    database.query(Query, [id], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, Vendedor não deletado!')
        }
        return res.status(200).send('Vendedor deletado com sucesso!')
    })
})

// Deletar Vendas
app.delete('/deletevenda/:id', (req, res) => {
    const {id} = req.params

    const Query = 'DELETE FROM vendas WHERE id = ?'

    database.query(Query, [id], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, Venda não deletada!')
        }
        return res.status(200).send('Venda deletado com sucessa!')
    })
})

/* Fim de Rotas de Deletes */



/* Inicio Rotas de Update */

// Update de vendedor
app.put('/altvendedor/:id', (req, res) => {
    const {id} = req.params
    const {nome, sobrenome, email} = req.body

    const Query = 'UPDATE vendedor SET nome = ?, sobrenome = ?, email = ? WHERE id = ?'

    database.query(Query, [nome, sobrenome, email, id], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, vendedor não alterado!')
        }
        return res.status(200).send('Vendedor alterado com sucesso!')
    })
})

// Update de venda
app.put('/altvenda/:id', (req, res) => {
    const {id} = req.params
    const {produto, valor, data_venda, id_vendedor} = req.body

    const Query = 'UPDATE vendas SET produto = ?, valor = ?, data_venda = ?, id_vendedor = ? WHERE id = ?'

    database.query(Query, [produto, valor, data_venda, id_vendedor, id], (err) => {
        if(err){
            console.log(err)
            return res.status(500).send('Ocorreu um erro com o servidor, venda não alterada!')
        }
        return res.status(200).send('Venda alterada com sucesso!')
    })
})

/* Fim rotas de Update*/

app.listen(3001, () => {
    console.log("Rodando!")
})
