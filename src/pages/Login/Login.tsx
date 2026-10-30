
import { useLocation, useNavigate } from "react-router-dom";
import logoEvent from "../../assets/logo-event.svg";

import "./Login.css";
import { useAuth } from "../../context/auth";
import { useEffect, useState, type FormEvent } from "react";
import Botao from "../../components/botao/Botao";
import Campo from "../../components/campo/Campo";
import { getApiErrorMessage } from "../../services/api";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login, autenticado } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

    useEffect(() => {
        if (autenticado) navigate("/home", { replace: true });
    }, [autenticado, navigate]);

    async function entrar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErro("");
        setEnviando(true);

        try {
            await login({ email: email.trim(), senha });

            const state = location.state as { from?: string } | null;

            navigate(state?.from || "/home", { replace: true });
        } catch (error) {
            setErro(getApiErrorMessage(error));
        } finally {
            setEnviando(false);
        }
    }

    return (
        <main className="login-page">
            <section className="login-container">

                <img
                    className="login-logo"
                    src={logoEvent}
                    alt="EventPlus"
                />

                <form className="login-form" onSubmit={entrar} noValidate>

                    <div className="login-campo">
                        <label htmlFor="login-email">Login</label>

                        <Campo
                            id="login-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder=""
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="login-campo">
                        <label htmlFor="login-senha">Senha</label>

                        <Campo
                            id="login-senha"
                            type="password"
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            placeholder=""
                            autoComplete="current-password"
                            minLength={8}
                            required
                        />
                    </div>

                    <p className="forgot-password">
                        Esqueceu a senha?
                    </p>

                    <Botao
                        texto={enviando ? "Entrando..." : "Entrar"}
                        type="submit"
                        disabled={enviando}
                    />

                    {erro && (
                        <p className="login-erro" role="alert">
                            {erro}
                        </p>
                    )}

                </form>
            </section>
        </main>
    );
}

export default Login;
