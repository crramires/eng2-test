const express = require("express");
const routes = express();
routes.use(express.json());


const jogo = [{
    id: 1,
    nome: "Fifa 21",
    plataforma: "PC",
    preco: 120
}];


// LISTA
routes.get('/jogos', (req, res) => {
    res.status(200).json(jogo);
})


// ADICIONA
routes.post('/jogos', (req, res) => {
    const {nome, plataforma, preco} = req.body;
    if(!nome || !plataforma || !preco) {
        res.status(400).json({erro: "Enviar nome, plataforma e preco", });
        return;
    }

    try {
        jogo.push({
            id: jogo.length+1,
            nome: nome,
            plataforma: plataforma,
            preco: preco
        })
        res.status(200).json({msg: "Jogo cadastrado!"})
    } catch (error) {
        res.status(400).json({erro: error.message});
    }
})

//DELETA
routes.delete('/jogos/:id', (req, res) => {
    const id = req.params.id;

    for(let i = 0; i < jogo.length; i++) {
        if( id == jogo[i].id){
            jogo.slice(id-1, 1)
            res.status(200).json({msg: "Jogo removido com sucesso."})
            return;
        }
    }
    res.status(400).json({msg: "Jogo não encontrado!"})
})

// ATUALIZA
routes.put('/jogos/:id', (req, res) => {
    const id = req.params.id
    const plataforma = req.body.plataforma;
    const novoJogo = jogo.find((aux) => aux.id == id);

    if(novoJogo) {
        novoJogo.plataforma = plataforma;
        res.status(200).json({msg: "Plataforma atualizada com sucesso"})
    } else {
        res.status(400).json({msg: "Erro ao atualizar plaforma."})
    }
})

module.exports = routes;