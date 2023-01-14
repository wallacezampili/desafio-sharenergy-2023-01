import { Request, Response } from 'express';
import {Model} from 'mongoose';

interface Client
{
    nome: string, 
    cpf: string,
    email: string,
    telefone: string,
    endereco: string
}


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');

const PORT = 3001;
const app = express();
const connectionString = process.env.CONNECTION_STRING;
const ClientModel:Model<Client> = require('./models/Client');
mongoose.set('strictQuery', false)


type dogData = {
    data: string
}

type User = {
        picture: {
            large: string,
            medium: string,
            thumbnail: string
        },
        name: {
            first: string,
            last: string,
            title: string
        },
        login: {
            username: string
        },
        dob: {
            age: number,
            date:string
        },
        email: string
}

type userRequest = {
    data: {
        results: User[]
    }
}

type userResponse = {
    picture: string,
    username: string,
    age: number,
    name: string,
    email:string
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Send Requests to HttpCat Api

app.get('/cats/:code', async (req: Request, res: Response) => {
    try {
        let code = req.params.code;

        await axios.get(`https://http.cat/${code}`).then((response: Response) => {
            res.send({ code: code });
        });
    }
    catch (err) {
        res.send({ Error: err });
    }
});

//Send Requests to RandomDog Api

app.get('/dogs', async (req: Request, res: Response) => {
    try {
        await axios.get("https://random.dog/woof?filter=mp4,webm").then((data: dogData) => {
            res.send({ image: data.data })

        })
    }
    catch (err) {
        res.send({ Error: err });
    }

});

//Send Requests to RandomUserGenerator Api
app.get('/users/', async (req: Request, res: Response) => {

    let results = req.query.results;

    let url = `https://randomuser.me/api/?results=${results}&seed=asda67`;

    try {

        await axios.get(url).then( (response: userRequest) => {

            let result:userResponse[] = []
            response.data.results.map(value => {

                let user:userResponse = {
                    picture: value.picture.medium,
                    username: value.login.username,
                    age: value.dob.age,
                    name: value.name.first + ' ' + value.name.last,
                    email: value.email
                }

                result.push(user);
            })
            res.send(result);
        });

    } catch (error) {
        res.send(error);
    }
});

//Get all clients from MongoDB
app.get('/clients', async (req: Request, res:Response) => {


    try{

        let clients = await ClientModel.find();
        res.status(200).send(clients);

    }
    catch(err){
        res.status(400).send(err);
    }


})

//Get user with id
app.get('/clients/:id', async (req: Request, res:Response) => {


    try{
        let {id} = req.params;
        let client = await ClientModel.findById(id);
        res.status(200).send(client);

    }
    catch(err){
        res.status(400).send(err);
    }


});

//Add client to MongoDB
app.post('/clients', async (req: Request, res:Response) => {

    try{

        let queryObject:Client = {
            nome: req.body.nome,
            telefone: req.body.telefone,
            cpf: req.body.cpf,
            endereco: req.body.endereco,
            email: req.body.email,
        }
        console.log(queryObject);
        let client = new ClientModel(queryObject);

        await client.save();
        res.status(200).send(JSON.stringify(client));

    }
    catch(err){
        res.status(400).send(err);
    }


})


app.patch('/clients/:id', async (req: Request, res:Response) => {

    try{

        let id = req.params.id;

        let queryObject:Client = req.body;

        let client = await ClientModel.findById(id);

        if(! client)
        {
            return res.status(404).send("Usuário não encontrado.");
        }

        await ClientModel.findByIdAndUpdate(id, queryObject);
        let modified = await ClientModel.findById(id);
        res.status(200).send(modified);


    }
    catch(err){
        res.status(400).send(err);
    }


})

app.delete('/clients/:id', async (req: Request, res:Response) => {

    try {

        let id = req.params.id;

        if(!id)
        {
           return res.status(400).send("Id não enviado");
        }
        
        await ClientModel.findByIdAndDelete(id);
        res.status(200).send(`Usuário deletado ${id}`);
        
    } catch (err) {
        res.status(400).send(err);
    }

})

app.post('/login', async (req: Request, res:Response) => {
    let {username, password, remember} = req.body;
    console.log(username, password, remember)
    if(username === 'desafiosharenergy' && password==='sh@r3n3rgy')
    {
        res.send({
            authentication: true,
            message: "Logged in"
        })


        return;
    }

    res.send({
        authentication: false,
        message: "Wrong password or username"
    })
    
    

});


async function run()
{
    app.listen(PORT, () => {
        console.log('Server listening on port ' + PORT);
    });

    await mongoose.connect(connectionString).then(() => {
        console.log('Connected to MongoDB');     
    });
}

run();