import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import Spinner from "../../components/Spinner/Spinner";
import api, { commentaryEventResource, eventsResource } from "../../Services/Service";



import "./DetalhesEvento.css";
import { UserContext } from "../../context/AuthContext";
import { DetalhesEvents } from "../../components/NextEvent/NextEvent";
import { useParams } from "react-router-dom";
import Table from "./TableDetalhes/TableDetalhes";



const DetalhesEvento = () => {
    const [showSpinner, setShowSpinner] = useState(false);

    // Use o hook useParams para obter o ID da URL
    const { id } = useParams();
    const { userData } = useContext(UserContext);

    const [eventos, setEventos] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [idEvento, setidEvento] = useState(id);
    const [nomeEvento, setNomeEvento] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEvento, setDataEvento] = useState("");

    




    async function loadEventsType() {
        setShowSpinner(true);

        try {
            const promise = await api.get(eventsResource)
            setEventos(promise.data);
            const promiseEvento = await api.get(`/Evento/${idEvento}`)
            setDescricao(promiseEvento.data.descricao)
            setNomeEvento(promiseEvento.data.nomeEvento)
            setDataEvento(promiseEvento.data.dataEvento)


        } catch (error) { }
        setShowSpinner(false);
    }
    async function loadComentario() {
        setShowSpinner(true);

        try {
            const promiseFull = await api.get(commentaryEventResource + `?id=${id}`)
            const promise = await api.get(commentaryEventResource + `/ListarExibe?id=${id}`)
           
            console.log(userData.role);
           setComentarios(userData.role === "Administrador"  ? promiseFull.data : promise.data );
           
           
        } catch (error) { }
        setShowSpinner(false);
    }
    
    

    useEffect(() => {

        loadEventsType();
        loadComentario();

    }, [userData])


    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={"Detalhes"} additionalClass="custom-title" />
                    <br />
                        

                    <div className="container__detalhes">

                       
                        <DetalhesEvents
                            key={idEvento}
                            title={nomeEvento}
                            description={descricao}
                            eventDate={dataEvento}
                        />

                       
                        <Table
                            dados={comentarios}
                            idEvento={idEvento}
                        />




                    </div>

                </Container>
            </MainContent>
            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}


        </>
    );
};

export default DetalhesEvento;
