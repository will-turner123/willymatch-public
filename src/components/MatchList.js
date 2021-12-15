import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import purpleImg from '../theme/img/square-purple-1.png';
import External from './External';

export default function MatchList({ person }){
    const [matches, setMatches] = useState([]);
    const { username, name, imageUrl } = person;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const matchListener = firebase.firestore().collection('/users').doc(username).onSnapshot((doc) => {
            const currentMatches = doc.data().matches || [];
            firebase
            .firestore()
            .collection('users')
            .where('username', 'in', [...currentMatches, username])
            .get()
            .then((querySnapshot) => {
                const newMatches = [];
                querySnapshot.forEach((match) => {
                    if (match.username !== username){
                        newMatches.push(match.data());
                    }
                });
                setMatches(newMatches)
                setLoading(false);
            });
        });
        return () => {
            matchListener();
        };
    }, []);

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="card matchList">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-4">
                                        <img src={purpleImg} class="rounded-circle profile-img" alt="Logo" />
                                    </div>
                                    <div class="col-8">
                                        <h4>Discover New Matches</h4>
                                        <p>Start rating to connect with new people!</p>
                                    </div>
                                </div>
                            </div>
                            <hr class="align-self-center w-100"/>
                            <div class="card-body">
                                {loading && (
                                    <div class="matchWrapper w-100">
                                        <div class="row">
                                            <div class="col-12 text-center">
                                            <div class="spinner-border text-secondary align-self-center" role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {matches.length === 0 && !loading && <p>You currently have no matches :/</p>}
                                {matches.length > 0 && !loading
                                && (
                                    <>
                                    {React.Children.toArray(matches.map((match) => (
                                        <Link exact="true" to={"../chat/" + match.username}>
                                        <div class="matchWrapper w-100">
                                            <div class="row">
                                                <div class="col-4">
                                                    <img src={match.imageUrl} class="rounded-circle profile-img" alt="New match"/>
                                                </div>
                                                <div class="col-8">
                                                    <h4>{match.name}</h4>
                                                    <p>You have matched with {match.name}</p>
                                                </div>
                                            </div>
                                        <hr class="align-self-center w-100"/>
                                        </div>
                                        </Link>
                                    )))}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <External script="scrollbarMatches"/> */}
        </div>
        )
}