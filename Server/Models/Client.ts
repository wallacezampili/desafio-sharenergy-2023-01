
import { Schema, model } from "mongoose";

interface Client
{
    nome: string, 
    cpf: string,
    email: string,
    telefone: string,
    endereco: string
}

const ClientSchema = new Schema<Client>( {
    nome: {type: String, required: true}, 
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    endereco: {type: String, required: true}
} );

const ClientModel = model<Client>('Client', ClientSchema);

module.exports = ClientModel;