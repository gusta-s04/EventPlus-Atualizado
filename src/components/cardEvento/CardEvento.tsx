
import { Link } from "react-router-dom";

import imagemPadrao from "../../assets/banner-3.png";
import "./CardEvento.css";

interface CardEventoProps {
    id: string;
    imagem?: string | null;
    categoria?: string;
    titulo: string;
    descricao: string;
    emEdicao?: boolean;
    onEditar?: () => void;
    onExcluir?: () => void;
}

function CardEvento({
    id,
    imagem,
    categoria,
    titulo,
    descricao,
    emEdicao,
    onEditar,
    onExcluir
}: CardEventoProps) {

    const administravel = Boolean(onEditar || onExcluir);

    return (
        <article className="home-evento-card">

            <img
                className="home-evento-card-imagem"
                src={imagem || imagemPadrao}
                alt={`Imagem do evento ${titulo}`}
            />

            <div className="home-evento-card-conteudo">

                <span className="home-evento-card-categoria">
                    {categoria || "Evento"}
                </span>

                <h3>{titulo}</h3>

                <p>{descricao}</p>

                {administravel ? (
                    <div className="home-evento-card-acoes">

                        <Link to={`/eventos/${id}`}>
                            Ver
                        </Link>

                        {emEdicao && (
                            <p>Este evento está sendo editado.</p>
                        )}

                        <button type="button" onClick={onEditar}>
                            Editar
                        </button>

                        <button type="button" onClick={onExcluir}>
                            Excluir
                        </button>

                    </div>
                ) : (
                    <Link
                        className="home-evento-card-link"
                        to={`/eventos/${id}`}
                    >
                        Ver evento
                    </Link>
                )}

            </div>
        </article>
    );
}

export default CardEvento;
