import logo from './logo.svg';
import './App.css';
import './theme/css/nucleo-icons.css';
import ReactDOM from 'react-dom';
// import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

// page imports
import Base from "./pages/Base";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import LogOut from './pages/Logout';
import DiscoverPage from './pages/Discover';
import RedirectPage from './pages/Redirect';
// firebase imports
import firebaseConfig from './firebaseConf';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/firestore';
import React, { useEffect } from 'react';

import PrivateRoute from './components/PrivateRoute';
import ChatPage from './pages/Chat';



// todo:
// fix no messages


// use cookies instead of local storage?
//  make request from server to browser


// context api

// useEffect

firebase.initializeApp(firebaseConfig);

export default function App() {


  // useEffect(() => {
  //   const user = firebase.auth().currentUser;
  //   if(user){
  //     firebase
  //     .firestore()
  //     .collection('users')
  //     .where("id", "==", user.uid)
  //     .get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs[0]
  //       console.log(data.data())
  //       localStorage.setItem('user', JSON.stringify({
  //         ...data.data(),
  //         id: data.id,
  //       }))
  //     })
  //   }
  //   else{
  //     localStorage.removeItem('user');
  //   }
  
  // })
  // // stores user consistently throughout session
  useEffect(() => {
    const user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        // store the user on local storage
        firebase
          .firestore()
          .collection('users')
          .where("id", "==", user.uid)
          .get()
          .then((querySnapshot) => {
            if(querySnapshot.docs.length > 0){
              const data = querySnapshot.docs[0];
              localStorage.setItem('user', JSON.stringify({
                ...data.data(),
                id: data.id,
              }));
            }

          });
      } else {
        // removes the user from local storage on logOut
        localStorage.removeItem('user');
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<PrivateRoute><DiscoverPage/></PrivateRoute>} />
          <Route index element={<PrivateRoute><DiscoverPage/></PrivateRoute>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/redirect" element={<PrivateRoute><RedirectPage/></PrivateRoute>}></Route>
          {/* <Route path="/profile/:user" element={<Profile />}/> */}
          <Route path="/profile/*" element={<PrivateRoute><Profile/></PrivateRoute>}></Route>
          <Route path="/chat/*" element={<PrivateRoute><ChatPage/></PrivateRoute>}></Route>
          <Route path="/discover" element={<PrivateRoute><DiscoverPage/></PrivateRoute>}></Route>

          {/* <PrivateRoute path="/profile/*" element={<Profile/>}></PrivateRoute> */}
          <Route path="/logout" element={<LogOut/>}/>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
        <App/>
  </React.StrictMode>,
  document.getElementById("root")
);

// export default App;
