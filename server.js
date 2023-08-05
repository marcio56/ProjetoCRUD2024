//verbos ou métodos http (protocolo de conversa entre o cliente e servidor) - express (rotas ou routes)
//get (ver), post (criar), put (editar), delete 

//importando as nossas bibliotecas
const express = require("express")
const app = express()
const uri = "mongodb+srv://dbuser:dbuser@cluster0.cctlbjn.mongodb.net/?retryWrites=true&w=majority"
const {MongoClient} = require("mongodb-legacy")
const ObjectId = require('mongodb-legacy').ObjectId
const client  = new MongoClient(uri)
const db = client.db("crud-db")
const collection = db.collection("crud")

    // static file
    app.use(express.static('public'))
    app.use('/css', express.static(__dirname +'public/css'))
    app.use('/js', express.static(__dirname +'public/js'))
    app.use('/img', express.static(__dirname +'public/img'))


app.listen(3001, function(){
    console.log("Nosso servidor está rodando na porta 3001")
})

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}))    

app.post("/show", (req, res) => {
       collection.insertOne(req.body, (err, result)=> {
        if(err) return console.log(err)
        console.log("SALVOU COM SUCESSO NO NOSSO BANCO DE DADOS")
        res.redirect("/show")
        collection.find().toArray((err, results) =>{
            console.log(results)
        })
       })
    })

//renderizar e retornar o conteúdo do nosso banco
app.get('/', (req, res) => {
    let cursor = db.collection('crud').find()
    })
    //renderizar e retornar o conteúdo do nosso banco
    app.get('/show', (req, res) => {
        collection.find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', {crud: results})
    })
})
//criando a nossa rota e comandos para editar
//criando a nossa rota e comandos para editar
app.route('/edit/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('crud').find(new ObjectId(id)).toArray((err, result) => {
        if(err) return res.send(err)
        res.render('edit.ejs', {crud: result})
    })
})
.post((req, res) => {
    var id = req.params.id
    var name = req.body.name
    var surname = req.body.surname

    db.collection('crud').updateOne({_id: new ObjectId(id)}, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if(err) return res.send(err)
        res.redirect('/show')
        console.log('Banco de dados atualizado')


    })
})

//criando a nossa rota e comandos para deletar
app.route ('/delete/:id')
.get((req, res) => {
    var id = req.params.id

    db.collection('crud').deleteOne({_id: new ObjectId(id)}, (err, result) => {
        if(err) return res.send(500, err)
        console.log('Deletando do nosso banco de dados!')
        res.redirect('/show')
    })
})
app.put('/updateuser/:id', function(req, res) {
    var db = req.db;
    var userToUpdate = req.params.id;
    db.collection('userlist').update({ _id: new ObjectId(userToUpdate)}, req.body, function (err, result) {
        res.send(
            (err === null) ? {msg: ''} : {msg: err}
        );
    });
});