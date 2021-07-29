import React, {useState} from 'react';
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState(null);
    const historial = useHistory();

    const RegisterUser = (e) => {
        e.preventDefault();
        if (!email.trim() || !password.trim()) {
            setMsgError('Debe llenar todos los campos');
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(r => {
                alert('Usuario registrado exitosamente');
                historial.push('/');
            })
            .catch(e => {
                if (e.code === 'auth/invalid-email') {
                    setMsgError('Formato de email incorrecto');
                } 
                if (e.code === 'auth/weak-password') {
                    setMsgError('La contraseña debe tener más de 6 caracteres')
                }
            });

        setEmail('');
        setPassword('');
        setMsgError(null);
    }

    const LoginUser = () => {
        if (!email.trim() || !password.trim()) {
            setMsgError('Debe llenar todos los campos');
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(r => {
                setEmail('');
                setPassword('');
                setMsgError(null);
                historial.push('/');
            })
            .catch(e => {
                setMsgError('Credenciales incorrectas');
            });
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form className="form-group" onSubmit={RegisterUser}>
                    <input 
                        onChange={(e) => {setEmail(e.target.value)}}
                        className="form-control"
                        placeholder="Introduce el email"
                        type="text"
                        value={email}/>

                    <input 
                        onChange={(e) => {setPassword(e.target.value)}}
                        className="form-control mt-4"
                        placeholder="Introduce la contraseña"
                        type="password"
                        value={password}/>

                    <div className="d-grid gap-2">
                        <input 
                            className="btn btn-dark btn-block mt-4"
                            value="Registrar"
                            type="submit"/>
                    </div>
                   
                </form>
                
                <div className="d-grid gap-2">
                    <button onClick={LoginUser} className="btn btn-success mt-2">
                        Iniciar sesión
                    </button>
                </div>

                {
                    msgError != null ?
                    (
                        <div className="alert alert-danger mt-3">
                            {msgError}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login;