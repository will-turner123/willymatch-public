import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { useNavigate, Link, Navigate, useParams } from 'react-router-dom';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import dots from '../theme/img/dots.png';
import path from '../theme/img/path4.png';
// TODO: use getState fuckery (however that works lol) to handle awaited data


// use useEffect - a listener
// if i want it to just run once upon mount include empty array at end
// 


// https://github.com/hegner123/pps-front/blob/main/src/_components/privateRoute/PrivateRoute.jsx

// pull parameters react router use params - returns object with all url params
const ProfilePage = (props) => {

    // initiate with username = useParams()
    //  if username is none, get username with db query on uid of current user
    //  else get where doc = users/<username>
    //      if nothing is found, return 404
    const params = useParams();
    const username = params['*'];
    // const [user, setUser] = useState(
    //      {username} ? firebase.firestore().collection('users').doc(`${username}`).get() : 
    //      firebase.firestore().collection('users').where('uid', '==', firebase.auth().currentUser.uid)) 
    const [user, setUser] = useState(username)
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        // if no passed user
        // if(!user['user'] || user['user'] === undefined){
        if(username){
            firebase
            .firestore()
            .collection('users')
            .where("username", "==", username)
            .get()
            .then((querySnapshot) => {
              const data = querySnapshot.docs[0]
              console.log(data.data())
              setUser(data.data());
            });
        }
        else{
            // firebase
            // .firestore()
            // .collection('users')
            // .where("id", "==", firebase.auth().currentUser.uid)
            // .get()
            // .then((querySnapshots) => {
            //     const data = querySnapshots.docs[0];
            //     console.log(data.data());
            //     setUser(data.data());
            // })
            setUser(currentUser);
            console.log('else profile page')
            console.log(user);
        }
    }, [])

    // const [user, setUser] = useState(firebase.auth().currentUser)
    // const user = firebase.auth().currentUser;
    // logic for discover page is .where('id', 'not-in', [id, ...likes, ...dislikes, ...favorites])
   
    // if props.user is not undefinedm setUser to get whatever da fuck
    // useEffect(() => {})
    // if(!firebase.auth().currentUser){
    //     console.log(firebase.auth().currentUser);
    //     return <LoginPage/>;
    // }
    return(    
        <div class="wrapper">
            <div class="page-header profile-page justify-content-center">
                <img src={dots} class="dots"/>
                <img src={path} class="path"/>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10 col-md-8 col-sm-12">
                            <Profile data={user}></Profile>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;