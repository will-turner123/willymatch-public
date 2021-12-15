import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import cardImage from '../theme/img/square1.png';
import External from '../components/External';

const initialState = {
  name: '',
  username: '',
  email: '',
  description: '',
  password: '',
  confirmPassword: '',
  image: '',
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'username':
      return { ...state, username: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'description':
      return { ...state, description: action.payload };
    case 'password':
      return { ...state, password: action.payload };
    case 'confirmPassword':
      return { ...state, confirmPassword: action.payload };
    case 'image':
      return { ...state, image: action.payload };
    default:
      throw new Error();
  }
};
const RegisterPage = () => {
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
  const handleFileChange = (evt) => {
    const { target } = evt;
    dispatch({
      type: target.name,
      payload: target.files[0],
    });
  };
  const registerUser = (evt) => {
    evt.preventDefault();
    if (state.password !== state.confirmPassword) {
      setError('Error: Passwords do not match.');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(state.email, state.password)
      .then(async (doc) => {
        const { uid } = doc.user;
        const username = state.username;
        const imageRef = firebase.storage().ref(`/profiles/${uid}`);
        await imageRef.put(state.image);
        const imageUrl = await imageRef.getDownloadURL();
        firebase.firestore().collection('users').doc(username).set({
          name: state.name,
          username: state.username,
          description: state.description,
          imageUrl,
          likes: [],
          dislikes: [],
          favorites: [],
          matches: [],
          id: uid,
        }).then(
            localStorage.setItem('user', JSON.stringify({
                name: state.name,
                username: state.username,
                description: state.description,
                imageUrl,
                likes: [],
                dislikes: [],
                favorites: [],
                matches: [],
                id: uid,
            }))
        ).then(
            // create chatroom with user
            firebase.firestore().collection('chat').add({
                participants: [state.username, state.username],
                messages: {}
                })
        )
        .then(
            history('/redirect')
        )
        // await registerCometChatUser(state.name, uid);
        // await loginCometChatUser(uid);
      })
      .catch((err) => {
        setError(err.message);
        console.log(`Unable to register user: ${err.message}`);
        console.log(err);
      });
  };
  return (
      <div class="wrapper register-page">
          <div class="page-header">
              <div class="page-header-image"></div>
              <div class="content">
                  <div class="container">
                      <div class="row">
                          <div class="col-lg-5 col-md-6 offset-lg-0 offset-md-3">
                              <div id="square7" class="square square-7"></div>
                              <div id="square8" class="square square-8"></div>
                              <div class="card card-register">
                                  <div class="card-header">
                                      <img class="card-img" src={cardImage}/>
                                      <h4 class="card-title">Register</h4>
                                  </div>
                                  <div class="card-body">
                                      <form class="form" onSubmit={registerUser} id="registerForm">
                                          <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-single-02"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Name"
                                                    name="name"
                                                    autoComplete="name"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.name}
                                                    minLength={3}
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-tag"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Username"
                                                    name="username"
                                                    autoComplete="username"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.username}
                                                    minLength={3}
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-email-85"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    type="email"
                                                    class="form-control"
                                                    placeholder="Email"
                                                    name="email"
                                                    autoComplete="email"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.email}
                                                    minLength={3}
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-lock-circle"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    type="password"
                                                    class="form-control"
                                                    placeholder="Password"
                                                    name="password"
                                                    autoComplete="password"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.password}
                                                    minLength={3}
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-lock-circle"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    type="password"
                                                    class="form-control"
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                    autoComplete="password"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.confirmPassword}
                                                    minLength={3}
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-pencil"></i>
                                                  </div>
                                                </div>
                                                <textarea 
                                                    id="description"
                                                    name="description"
                                                    class="form-control"
                                                    autoComplete="description"
                                                    rows="5"
                                                    required
                                                    onChange={handleOnChange}
                                                    value={state.description}
                                                    placeholder="Describe yourself..."
                                                    maxLength="500"
                                                />
                                            </div>
                                            <div class="input-group">
                                              <div class="input-group-prepend">
                                                  <div class="input-group-text">
                                                      <i class="tim-icons icon-camera-18"></i>
                                                  </div>
                                                </div>
                                                <input 
                                                    id="image"
                                                    name="image"
                                                    type="file"
                                                    accept=".png,.jpeg,.jpg,.webp"
                                                    required
                                                    onChange={handleFileChange}
                                                    value={state.image.fileNamer}
                                                    className="my-5 appearance-none rounded-full relative block w-full py-3 px-4 font-bold border-2 border-gray-400 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 text-base"
                                                    placeholder="Name"
                                                    minLength={3}
                                                />
                                            </div>
                                      </form>
                                  </div>
                                  <div class="card-footer">
                                      <button type="submit" class="btn btn-info btn-round btn-lg" form="registerForm">Get Started</button>
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
        <External script="squares"></External>
      </div>
  )
};
export default RegisterPage;