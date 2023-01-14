import "./clients.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTrash as Del, FaPen as Edit } from "react-icons/fa";
import axios from "axios";
import Loading from "../../Layout/Loading/loading";
import Message from "../../Layout/Message/message";
import Form from "../../Layout/Form/form";

function Clients() {
  interface Client {
    _id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: string;
  }

  var [clientsData, setClientsData] = useState<Client[]>([]);
  var [loading, setLoading] = useState<boolean>(true);
  var [toggleForm, setToggleForm] = useState<boolean>(false);
  //Check if there is a message
  var [message, setMessage] = useState<boolean>(false);
  var [messageText, setMessageText] = useState<string>("");
  var [messageType, setMessageType] = useState<string>("");
  var location = useLocation();

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setMessage(true);
      setMessageText(location.state.message);
      setMessageType(location.state.type);
    }
  }, [location.state]);

  function destroyMessage() {
    if (location.state) {
      location.state.message = "";
      location.state.type = "";
    }
    setMessage(false);
    setMessageText("");
    setMessageType("");
  }

  function setForm() {
    setToggleForm(!toggleForm);
  }

  function checkMessage() {
    if (message) {
      return (
        <Message
          text={messageText}
          type={messageType}
          destroy={destroyMessage}
        />
      );
    }
  }

  useEffect(() => {
    async function getClients() {
      setLoading(true);

      await axios.get("/clients").then((data) => {
        let clients: Client[] = data.data;

        setClientsData(clients);
        setLoading(false);
        console.log(clients);
      });
    }

    getClients();
  }, []);

  async function handleDelete(
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) {
    e.preventDefault();
    await axios
      .delete(`/clients/${id}`)
      .then((res) => {
        setMessage(true);
        setMessageText("Usuário deletado com sucesso.");
        setMessageType("success");
        setClientsData(
          clientsData.filter((client) => {
            return client._id !== id;
          })
        );
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setMessage(true);
        setMessageText(err);
        setMessageType("error");
        window.scrollTo(0, 0);
      });
  }

  async function handleAdd(client: Client) {
    await axios
      .post("/clients", client)
      .then(async (res) => {
        setToggleForm(false);
        setMessage(true);
        setMessageText("Usuário adicionado com sucesso.");
        setMessageType("success");
        window.scrollTo(0, 0);

        await axios.get("/clients").then((data) => {
          let clients: Client[] = data.data;

          setClientsData(clients);
          setLoading(false);
          console.log(clients);
        });
      })
      .catch((err) => {
        setMessage(true);
        setMessageText(err);
        setMessageType("error");
        window.scrollTo(0, 0);
      });
  }

  return (
    <div className="clients-container">
      {checkMessage()}

      <button onClick={setForm} className="form-toggler">
        {toggleForm ? "Fechar" : "Adicionar Cliente"}
      </button>

      {toggleForm && <Form handlesubmit={handleAdd} />}
      <div className="table-container">
        {loading ? (
          <Loading />
        ) : (
          <table className="clients-table">
            <thead>
              <tr className="clients-table-header">
                <th colSpan={6}>Clientes</th>
              </tr>
              <tr className="clients-table-desc">
                <th>Nome</th>
                <th>Cpf</th>
                <th>Endereço</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clientsData.map((client, index) => {
                return (
                  <tr className="clients-table-data" key={index}>
                    <td data-title="Nome">{client.nome}</td>
                    <td data-title="Cpf">{client.cpf}</td>
                    <td data-title="Endereço">{client.endereco}</td>
                    <td data-title="E-mail">{client.email}</td>
                    <td data-title="Telefone">{client.telefone}</td>
                    <td className="table-actions">
                      <button className="table-btn table-edit">
                        <Link to={`/clients/${client._id}`} className="edit-link">
                          <Edit />
                        </Link>
                      </button>

                      <button
                        className="table-btn table-delete"
                        onClick={(e) => {
                          handleDelete(e, client._id);
                        }}
                      >
                        <Del />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Clients;
