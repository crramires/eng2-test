const server = require('../src/jogos');
const supertest = require('supertest')
const request = supertest(server)

let jogo = [];

beforeEach(() => {
    jogo = [{
        nome: "NBA 2k14",
        plataforma: "PC",
        preco: 120
    },
    {
        nome: "Uncharted",
        plataforma: "PS",
        preco: 75
    }]
})


// STATUS 200

test('Deve ser possivel listar jogos', async () => {
    await request.get('/jogos').expect(200)
})


test('Deve ser possivel adicionar um novo jogo', async () => {
    await request.post('/jogos').send(jogo[0]).expect(200);
})


test('Deve ser possivel deletar um jogo', async () => {
    await request.delete('/jogos/1').expect(200)
} )


test('Deve ser possivel atualizar a plataforma de um jogo', async () => {
    await request.put('/jogos/1').send({plataforma: "Xbox"}).expect(200);
})


// STATUS 400

test('Não deve adicionar jogo com erro de cadastro.', async () => {
    await request.post('/jogos').send({nome: "The Witcher III", plataforma: "PC", valor: 120}).expect(400);
})

test('Não deve ser possível deletar um jogo inexistente.', async () => {
    await request.delete('/jogos/10').expect(400);
})

test('Não deve ser possível atualizar um jogo inexistente', async () => {
    await request.put('/jogos/10').send({plataforma: "xbox"}).expect(400);
})

