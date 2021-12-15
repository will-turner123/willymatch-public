import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


export default function Swipe({ persons, username }){
    const [personsArray, setPersonsArray] = useState(persons);
    const [loading, setLoading] = useState(true);
    const buttonIcons = {
        like: ('icon-heart-2'),
        favorite: ('icon-shape-star'),
        dislike: ('icon-simple-remove'),
    }
    const buttonClasses = {
        like: ('btn btn-primary btn-fab btn-icon btn-round btn-lg ml-1 mr-1'),
        favorite: ('btn btn-success btn-fab btn-icon btn-round btn-lg ml-1 mr-1'),
        dislike: ('btn btn-danger btn-fab btn-icon btn-round btn-lg ml-1 mr-1'),
    }

    useEffect(() => {
        setLoading(false);
    }, [])

    const takeAction = async(action) => {
        setLoading(true);

        try{
            const localUserData = JSON.parse(localStorage.getItem('user'));
            localUserData[`${action}s`].push(personsArray[0].username);
            localStorage.setItem('user', JSON.stringify(localUserData));

            const [ratedPerson, ...rest] = personsArray;
            await firebase.firestore().collection('users').doc(username).update({
                [`${action}s`]: firebase.firestore.FieldValue.arrayUnion(ratedPerson.username),
            });
            setPersonsArray(rest);

            if(action === 'like' || action === 'favorite'){
                try{
                    const ratedPersonDocument = await (await firebase.firestore().collection('users').doc(ratedPerson.username).get()).data();
                    if(ratedPersonDocument.likes.includes(username)
                    || ratedPersonDocument.favorites.includes(username) 
                    || ratedPersonDocument.username === "willy"){ // always match with willy
                        await firebase.firestore().collection('users').doc(username).update({
                            matches: firebase.firestore.FieldValue.arrayUnion(ratedPerson.username),
                        });
                        await firebase.firestore().collection('users').doc(ratedPerson.username).update({
                            matches: firebase.firestore.FieldValue.arrayUnion(username),
                        });
                    // create chatroom with user
                    firebase.firestore().collection('chat').add({
                        participants: [username, ratedPerson.username],
                        messages: {}
                      })
                    }

                } catch (error){
                    console.log(error);
                }
            }
        } catch (error){
            console.log(error);
        }
        setLoading(false);
    }

    const currentPerson = personsArray[0];

    const ActionButton = (action) => (
        <button class={buttonClasses[action['action']]} onClick={() => takeAction(action['action'])}>
            <i class={"tim-icons " + buttonIcons[action['action']]}></i>
            
        </button>
    );

    return (
        <>
            {loading && (
                <div class="container-fluid">
                    <div class="card loadingCard">
                        <div class="card-body text-center d-flex justify-content-center">
                            <div class="spinner-border text-primary align-self-center" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div> 
                    </div>
                </div>
            )}
            {personsArray.length === 0 && !loading && (
                <div class="container-fluid">
                <div class="card loadingCard">
                    <div class="card-body text-center d-flex justify-content-center align-items-center">
                        <h3>You have run out of people to match with :/</h3>
                    </div> 
                </div>
            </div>
            )}
            {personsArray.length > 0 && !loading &&(
                <div class="container-fluid">
                    <div class="row">
                    <div class="card w-100">
                        <div class="card-header">
                            <img src={currentPerson.imageUrl} class="img-center rounded-circle profile-img" alt={currentPerson.name}/>
                            <h1 class="title">{currentPerson.name}</h1>
                        </div>
                        <div class="card-body text-center">
                            <h4 class="profile-description w-75 mx-auto pb-5">{currentPerson.description}</h4>
                            <div class="actionButtons">
                            <ActionButton action="like"/>
                            <ActionButton action="favorite"/>
                            <ActionButton action="dislike"/>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </>
    )
}