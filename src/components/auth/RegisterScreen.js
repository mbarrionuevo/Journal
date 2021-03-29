import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui';
import { startRegistrerWithEmailAndPassword } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = values;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegistrerWithEmailAndPassword(email, password, name));
        }

    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError("El nombre no puede estar vacio"));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError("El email no es valido"));
            return false;
        } else if (password !== password2 && password.length < 5) {
            dispatch(setError("la contraseña tienen que ser iguales "));
            return false;
        }

        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={handleOnSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError && <span className="auth__alert-error">
                        {msgError}
                    </span>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
