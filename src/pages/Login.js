import React, { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import External from '../components/External';
import cardImage from '../theme/img/square1.png';

const initialState = {
  email: '',
  password: '',
};

const reducer = (state, action) => {
    switch(action.type){
        case 'email':
            return { ...state, email: action.payload };
        case 'password':
            return { ...state, password: action.payload };
        default:
            throw new Error();
        }
};

const LoginPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [error, setError] = useState('');
    const history = useNavigate();
    const handleOnChange = (evt) => {
      const { target } = evt;
      dispatch({
        type: target.name,
        payload: target.value,
      });
    };
    const loginUser = async (evt) => {
        evt.preventDefault();
        try {
            // const doc = await firebase.auth().signInWithEmailAndPassword(state.email, state.password);
            firebase.auth().signInWithEmailAndPassword(state.email, state.password).then(
                history('/discover')
            )

        }
        catch (err){
            console.log(err);
            setError(err.message);
            console.log(`Unable to login: ${err.message}`)
        }
    };

    return (
        <div class="wrapper register-page">
            <div class="page-header">
                <div class="content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
                                <div id="square7" class="square square-7"></div>
                                <div id="square8" class="square square-8"></div>
                                <div class="card card-register">
                                    <div class="card-header">
                                        <img class="card-img" src={cardImage}/>
                                        <h4 class="card-title">Login</h4>
                                    </div>
                                    <div class="card-body">
                                        <form class="form" onSubmit={loginUser} id="login">
                                        {error && (
                                            <p className="text-danger pt-2">{error}</p>
                                        )}
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="tim-icons icon-email-85"></i>
                                                    </div>
                                                </div>
                                                <input 
                                                    class="form-control"
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    onChange={handleOnChange}
                                                    placeholder="Email"
                                                />
                                            </div>
                                            <div class="input-group">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">
                                                        <i class="tim-icons icon-email-85"></i>
                                                    </div>
                                                </div>
                                                <input 
                                                    id="password"
                                                    class="form-control"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="password"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.password}
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div class="mt-3 ml-1 text-light">
                                                Don't have an account? <Link to="/register">Get started now</Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="card-footer">
                                    <button
                                        type="submit"
                                        form="login"
                                        class="btn btn-info btn-round btn-lg">
                                            Log in
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="register-bg"></div>
                        <div id="square1" class="square square-1"></div>
                        <div id="square2" class="square square-2"></div>
                        <div id="square3" class="square square-3"></div>
                        <div id="square4" class="square square-4"></div>
                        <div id="square5" class="square square-5"></div>
                        <div id="square6" class="square square-6"></div>
                    </div>
                </div>
            </div>
            <External script="squares"/>
        </div>
    )

 
}

export default LoginPage;