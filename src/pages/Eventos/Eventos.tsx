
import { useEffect, useMemo, useState } from "react";
import { eventoService } from "../../services/eventPlusservice";
import type { Evento } from "../../types/api";

import "./Eventos.css";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CardEvento from "../../components/cardEvento/CardEvento";

function Eventos() {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");

    useEffect(() => {
        async function carregar() {
            try {
                const dados = await eventoService.listar();
                setEventos(dados);
            } catch (error) {
                console.error("Erro ao carregar eventos:", error);
            }
        }

        void carregar();
    }, []);

    const categorias = useMemo(() => {
        const categoriasExistentes = eventos
            .map((evento) => evento.idTipoEventoNavigation?.titulo)
            .filter((titulo): titulo is string => Boolean(titulo));

        return ["Todos", ...new Set(categoriasExistentes)];
    }, [eventos]);

    const eventosFiltrados = eventos.filter((evento) =>
        categoriaSelecionada === "Todos" ||
        evento.idTipoEventoNavigation?.titulo === categoriaSelecionada
    );

    return (
        <>
            <Header />

            <main className="pagina-eventos">
                <div className="container-eventos">

                    <nav className="filtros-eventos">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                className={
                                    categoriaSelecionada === categoria
                                        ? "filtro-evento ativo"
                                        : "filtro-evento"
                                }
                                onClick={() => setCategoriaSelecionada(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </nav>

                    <div className="eventos">
                        {eventosFiltrados.length > 0 ? (
                            eventosFiltrados.map((evento) => (
                                <CardEvento
                                    key={evento.idEvento}
                                    id={evento.idEvento}
                                    imagem={evento.imagemUrl}
                                    categoria={evento.idTipoEventoNavigation?.titulo}
                                    titulo={evento.nome}
                                    descricao={evento.descricao}
                                />
                            ))
                        ) : (
                            <p className="eventos-vazio">
                                Nenhum evento encontrado nesta categoria.
                            </p>
                        )}
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}

export default Eventos;
