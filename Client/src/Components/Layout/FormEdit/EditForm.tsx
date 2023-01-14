import './EditForm.css';
import Input from '../Input/input'
import {useState} from "react";

interface Client {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;
}

interface formProps
{
    handlesubmit: (client:Client) => Promise<void>,
    clientData: Client
}

function EditForm(props : formProps) {

    
    
    var [clientData, setClientData] = useState<Client>(props.clientData);

    function handleChange(e:React.ChangeEvent<HTMLInputElement>)
    {
        if(clientData)
        {
            setClientData({...clientData, [e.target.name] : e.target.value});
        }
        
    }
    function handleSubmit(e : React.FormEvent<HTMLFormElement>)
    {   
        e.preventDefault();
        if(!clientData)
        {
            return;
        }
        
        props.handlesubmit(clientData);
    }


    return ( 
        <div className='form-container'>
            
            <h1>Editar Cliente</h1>
            
            <form className='form' onSubmit={handleSubmit}>
                
                {
                    props.clientData && (
                        <>
                            <Input type='text' placeholder='Digite o nome do cliente' defaultValue={props.clientData.nome ? props.clientData.nome: ""} name='nome' handleChange={handleChange}/>
                            <Input type='text' placeholder='Digite o cpf do cliente' defaultValue={props.clientData.cpf} name='cpf' handleChange={handleChange}/>
                            <Input type='text' placeholder='Digite o endereco do cliente' defaultValue={props.clientData.endereco} name='endereco' handleChange={handleChange}/>         
                            <Input type='text' placeholder='Digite o e-mail do cliente' defaultValue={props.clientData.email} name='email' handleChange={handleChange}/>
                            <Input type='text' placeholder='Digite o telefone do cliente' defaultValue={props.clientData.telefone} name='telefone' handleChange={handleChange}/>

                            <input type="submit" className='submit' value="Editar Cliente"/>
                        </>
                    )
                }

            </form>


        </div>
     );
}

export default EditForm;