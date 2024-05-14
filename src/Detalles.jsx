import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import PeliculaCard from "./PeliculaCard";
import { useParams } from "react-router-dom";
import { API_URL } from "./App";


const Detalles = () => {
    const { id } = useParams();
    const [pelicula, setPelicula] = useState();

    const buscarPelicula = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const data = await response.json();
            setPelicula(data);
        } catch (error) {
            console.error({mensaje: 'Debe iniciar su servidor de base de datos', error});
        }
    };

    useEffect(() => {
        buscarPelicula(id);
    }, [id]);


    return (
        <>
            <h2 className="text-center">Detalle de película</h2>

            <Container className="mt-4">
                {(pelicula != null) 
                    ? (
                        <PeliculaCard pelicula={pelicula} showSinopsis={true} key={pelicula.peliculaId} />
                    ) : (
                        <Alert variant="warning">No se encontró la película</Alert>
                    )
                }
            </Container>
        </>
    );
};

export default Detalles;