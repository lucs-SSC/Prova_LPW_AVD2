const express = require("express")
const app = express()
const uuid= require("uuid")

app.use(express.json())

//Validações com Middlewares
//1° Validação de campo inexistente
const validaCampo = (request, response, next) =>{
    const {dataCompra, localCompra,valor, responsavel}= request.body

    if(!dataCompra || !localCompra || !valor || !responsavel){
        return response
            .status(400)
            .json({Erro: "Algum campo necessário para registro está ausente"})
    }
    return next()
}
//2º Validação de id inexistente
const validaID = (request,response,next) =>{
    const { id } = request.params
    const checkID = infoCompras.filter(info => info.id === id)

    if(checkID.length ==0){
        return response
            .status(400)
            .json({Erro: "ID inexistente"})
    }
    return next()
}




/*Crie um array com dois objetos contendo o id, dataCompra, localCompra, valor,
responsavel. Enviar a data como string no formato 'aaaa/mm/dd', exemplo:
'2021/06/15'*/

let infoCompras = [
    {id:uuid.v4() , dataCompra:"2021/03/18", localCompra:"Casa do Arroz", valor:500, responsavel:"Carla"},
    {id:uuid.v4() , dataCompra:"2021/04/19", localCompra:"Venturão", valor:1000, responsavel:"Jose"}
]

/*a) Crie uma rota (/despesas) para incluir um gasto no array. Deverá ser enviado
um json com a data data compra, local da compra, valor e o responsável pelo
pagamento. Se um destes campos não for enviado a aplicação deverá exibir a
mensagem de advertência para o usuário*/
app.post('/despesas', validaCampo, (request,response)=>{
    const {dataCompra, localCompra, valor, responsavel} = request.body
    const info ={
        id: uuid.v4(),
        dataCompra, 
        localCompra, 
        valor, 
        responsavel
    }
    infoCompras = [...infoCompras,info]
    return response
        .status(200)
        .json({message: "Despesa Adicionada!!"})
})

/*b)Crie uma rota (/despesas) para listar todas as despesas. Deverá ser
retornado um json contendo o id, data data compra, local da compra, valor e o
responsável pelo pagamento*/
app.get('/despesas', (request,response)=>{
    return response
        .status(200)
        .json(infoCompras)
})
//Letra C se encontra após a letra E!!!


/*d) Crie uma rota (/despesas/gastototal) para retornar o valor total gasto de
todos os responsáveis. Se o valor total de todas as despesas foi R$ 5000,00
(cinco mil reais), deverá ser retornado um json no seguinte formato:
"gasto total": 5000.00 }*/
app.get('/despesas/gastototal', (request,response)=>{
    const gastoTotal = infoCompras.reduce((tot,x)=> tot += x.valor, 0)
    
    return response
        .status(200)
        .json({ "Gasto Total": gastoTotal})


})
/*e)Crie uma rota (/despesas/gastoresponsavel) para retornar todos os gastos
do respectivo responsável, por exemplo. Se a Maria fez várias compras no
período. Na requisição deverá ser enviada da seguinte forma:
http://localhost:3333/despesas/gastoresponsavel/?responsavel='Maria' */
app.get('/despesas/gastoresponsavel/', (request,response)=>{
    const { responsavel } = request.query

    const findByName = infoCompras.filter((info) => info.responsavel === responsavel)
    return response
        .status(200)
        .json(findByName)

})


/*c) Crie uma rota (/despesas) para listar todas as despesas pelo ID. Deverá ser
retornado um json contendo o id, data data compra, local da compra, valor e o
responsável pelo pagamento. Se o ID não existir deverá retornar uma
mensagem que o ID não existe.*/
app.get('/despesas/:id', validaID, (request,response)=>{
    const { id } = request.params
    const findByID = infoCompras.filter(info => info.id == id)

    return response
        .status(200)
        .json(findByID)
})






app.listen(3333, ()=>{
    console.log("Servidor Rodando!!")
})