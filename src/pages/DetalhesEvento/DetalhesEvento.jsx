import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import api, { eventsResource } from "../../Services/Service";


import "./DetalhesEvento.css";
import { UserContext } from "../../context/AuthContext";
import { DetalhesEvents } from "../../components/NextEvent/NextEvent";



const DetalhesEvento = () => {
    const [showSpinner, setShowSpinner] = useState(false);
   
    const [eventos, setEventos] = useState([]);
    const [idEvento, setidEvento] = useState("1d576a4c-08e1-4a43-92ab-a9f5c58fc2ef");
    const [nomeEvento, setnomeEvento] = useState("");
    const [descricao, setdescricao] = useState("");  
    const [dataEvento, setdataEvento] = useState("");  

    
    


    useEffect(() => {
        async function loadEventsType() {
            setShowSpinner(true);
      
            try {
              const promise = await api.get(eventsResource)
              setEventos(promise.data);
              const promiseEvento = await api.get(`/Evento/${idEvento}`)
              setdescricao(promiseEvento.data.instituicao.titulo)
              setnomeEvento(promiseEvento.data.nomeEvento)
              setdataEvento(promiseEvento.data.dataEvento)
      
            
            } catch (error) {}
            setShowSpinner(false);
          }
      
          loadEventsType();

    }, [])


    return (
        <>
            <MainContent>
                <Container>
                    <Title titleText={"Detalhes"} additionalClass="custom-title" />
                    
                            <DetalhesEvents
                            key={idEvento}
                            title={nomeEvento}
                            description={descricao}
                            eventDate={dataEvento}
                            
                            />
                     
                  
             
                </Container>
            </MainContent>
            {/* SPINNER -Feito com position */}
            {showSpinner ? <Spinner /> : null}


        </>
    );
};

export default DetalhesEvento;
