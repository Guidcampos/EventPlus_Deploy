import React, { useContext } from "react";
import "./NextEvent.css";
import { UserContext } from "../../context/AuthContext";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";
import { Link, useParams } from "react-router-dom";


const NextEvent = ({ title, description, eventDate, idEvento, classAdd = false }) => {
  const { userData } = useContext(UserContext);
  
  
  function conectar(idEvento) {
    // dá pra usar a prop idEvento? testar
    //alert(`Chamar o recurso para conectar: ${idEvento}`);
    if (!classAdd) {

      alert(`Conectando ao evento: ${idEvento}`)
      return
    }
  }
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"

        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      {/* <a onClick={() => {conectar(idEvento);}} className="event-card__connect-link">Conectar</a> */}
      {/* <a onClick={() => { conectar(idEvento) }} href="" className={`event-card__connect-link${classAdd ? "--off " : ""}`} >{classAdd ? "Detalhes" : "Conectar"}</a> */}
      
      <Link to={classAdd ? `/detalhes-evento/${idEvento}`: (userData.role === "Comum" ? "/eventos-aluno" : "eventos" ) } onClick={() => { conectar(idEvento) }} href="" className={`event-card__connect-link${classAdd ? "--off " : ""}`}  >{classAdd ? "Detalhes" : "Conectar"}</Link>


    </article>
  );
};

export default NextEvent;

export const DetalhesEvents = ({ title, description, eventDate, idEvento }) => {
  function conectar(idEvento) {
    // dá pra usar a prop idEvento? testar
    alert(`Chamar o recurso para conectar: ${idEvento}`);
  }
  return (
    <article className="event-card--detalhes">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"

        data-tooltip-id={idEvento}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {description} 
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>


    </article>
  );
};


