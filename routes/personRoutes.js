const router = require('express').Router();
const Person = require('../models/Person');

//rotas da Api:

//criacao de usuarios
router.post('/', async (req, res) => {
    //req.body
    const { name, salary, approved } = req.body;

    if (!name) {
        res.status(422).json({ error: "O nome e Obrigatorio!" });
        return;
    }

    const person = {
        name,
        salary,
        approved,
    }
    //create do mongoose
    try {
        //criando dados no banco
        await Person.create(person);
        res.status(201).json({ message: 'Usuario criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error })
    }
})


//Leitura de dados

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({ error: error })
    }
});


// busca dados por id
router.get('/:id', async (req, res) => {
    //extrair dados da url com req.params
    const id = req.params.id;
    try {
        const person = await Person.findById({ _id: id });
        if (!person) {
            res.status(422).json({ message: 'Usuario nao encontrado!' });
            return;
        }
        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({ error: error })
    }
});


//atualizar dados

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuario nao encontrado!' });
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

//deletar dados

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const person = await Person.findById({ _id: id });

    try {
        if (!person) {
            res.status(422).json({ message: 'Usuario nao encontrado!' });
            return;
        }

        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: 'Usuario deletado com sucesso!' });

    } catch (error) {
        res.status(500).json({ error: error })
    }
});

module.exports = router;