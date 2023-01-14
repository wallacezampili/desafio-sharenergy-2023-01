import EditForm from "../../Layout/FormEdit/EditForm";
import "./editClient.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

interface Client {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;
}

function EditClient() {

    let {id} = useParams();
    let navigate = useNavigate();
    let [clientData, setClientData] = useState<Client>();
    
    useEffect(() => {

        async function getClientData() {
          
          await axios.get("/clients/" + id).then((data) => {
            let client: Client = data.data;
            setClientData(client);
          });

        }       
        getClientData();
    }, [id]);
    

    async function handlePatch(clientData : Client)
    {
        await axios.patch(`/clients/${id}`, clientData).then(async (res) => {
            
            await axios.get("/clients").then((data) => {
              let clients: Client[] = data.data;
              console.log(clients);
              navigate('/clients', {state: {message : "Cliente atualizado com sucesso.", type : "success"}});
            });        
    
          })
          .catch((err) => {
            
                console.log(err);
                navigate('/clients', {state: {message : err, type : "success"}});
          });
    }

    return (
        <div>
            {
              clientData && (
                <EditForm handlesubmit={handlePatch} clientData={clientData}/>
              )
            }   
        </div>
    );
}

export default EditClient;