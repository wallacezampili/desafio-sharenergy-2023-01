import './form.css';
import Input from '../Input/input'
import {useState} from "react";

interface Client {
    _id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;
}

interface formProps
{
    handlesubmit: (client:Client) => Promise<void>
}

function Form(props : formProps) {

    
    var [clientData, setClientData] = useState<Client>({_id: "",
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        endereco: ""
    });



    function handleChange(e:React.ChangeEvent<HTMLInputElement>)
    {
        setClientData({...clientData, [e.target.name] : e.target.value});
    }
    function handleSubmit(e : React.FormEvent<HTMLFormElement>)
    {   
        e.preventDefault();
        props.handlesubmit(clientData);
    }

    return ( 
        <div className='form-container'>
            
            <h1>Adicionar Cliente</h1>
            
            <form className='form' onSubmit={handleSubmit}>
                
                <Input type='text' placeholder='Digite o nome do cliente' defaultValue='' name='nome' handleChange={handleChange}/>
                <Input type='text' placeholder='Digite o cpf do cliente' defaultValue='' name='cpf' handleChange={handleChange}/>
                <Input type='text' placeholder='Digite o endereco do cliente' defaultValue='' name='endereco' handleChange={handleChange}/>         
                <Input type='text' placeholder='Digite o e-mail do cliente' defaultValue='' name='email' handleChange={handleChange}/>
                <Input type='text' placeholder='Digite o telefone do cliente' defaultValue='' name='telefone' handleChange={handleChange}/>

                <input type="submit" className='submit' value="Adicionar Cliente"/>

            </form>


        </div>
     );
}

export default Form;