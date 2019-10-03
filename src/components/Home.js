import React from "react";
import {Container} from "react-bootstrap";

const Home = (props) => {
    return (
        <Container className={"mt-4"}>
            <h1>
                Doc.com Herramientas openEHR
            </h1>
            En esta página podrás encontrar herramientas para procesar OPTs. Solo selecciona la transformación que quieras realizar de la barra de navegación
        </Container>
    )
};

export default Home