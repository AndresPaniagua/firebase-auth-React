import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebaseConfig';

const Menu = () => {
    const [usuario, setUsuario] = useState(null);
    const historial = useHistory();
    
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email);
            }
        });
    }, []);

    const Logout = () => {
        auth.signOut();
        setUsuario(null);
        historial.push('/');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li>
                        {
                            usuario ?
                            (
                                <Link className="nav-link" to="/Admin">Admin</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li>
                        {
                            !usuario ?
                            (
                                <Link className="nav-link" to="/Login">Login</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                </ul>
                {
                    usuario ?
                    (
                        <button
                            onClick={Logout}
                            className="btn btn-danger ml-5">
                                Cerrar Sesión
                        </button>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default Menu;