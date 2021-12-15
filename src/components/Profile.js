import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import blank from '../theme/img/blank.png';
import External from './External';
// function getUserData(uid) {
//     firebase.database().ref('users/' + uid).once("value", snap => {
//         console.log(snap.val())
//     })
// }

// will have separate action button on discover page
// to remove person from match queue
const ProfileActionButton = (props) => {
    const [person, setPerson] = useState(props['person']);
    const [user, setUsername] = useState(JSON.parse(localStorage.getItem('user')));
    

    const takeAction = async(action) => {
        try {
            console.log('user username:')
            console.log(user.username);
            console.log('person:')
            await firebase.firestore().collection('users').doc(user.username).update({
                [`${action}s`]: firebase.firestore.FieldValue.arrayUnion(props.person)
            })
        }
        catch(error){
            console.log(error);
        }
    }

    if(props.person != user.username){
        if(props.action === "like"){
            return (<button class="btn btn-success btn-fan btn-icon btn-round" onClick={() => takeAction("like")}>
                <i class='tim-icons icon-heart-2'></i>
            </button>)
        }
    }
    else{
        console.log("else")
        return <p class="text-danger">You can't like yourself!</p>
    }
    
}

function ProfilePic(props){
    if(props.imageUrl === false){
        return <img src={blank} class="img-center img-fluid rounded-circle blank"/>
    }
    return <img src={props.imageUrl} class="img-center img-fluid rounded-circle blank"/>
}

function ProfileText(props){
    if(props.isFetching){
        return <li class="list-group-item profile-card loading01 text-center">Loading...</li>
    }
    else{
    return <li class="list-group-item profile-card text-center">{props.text}</li>
    }
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            username: props['data']['username'],
            name: props['data']['name'],
            description: props['data']['description'],
            imageUrl: props['data']['imageUrl'],
            uid: props['data']['uid'],
        }
    }
    render(){ return(
    <div class="card card-coin card-plain">
            <div class="card card-coin card-plain text-center">
                <div class="card-header">
                    <ProfilePic imageUrl={this.props['data']['imageUrl']}></ProfilePic>
                    <h4 class="title">{this.props['data']['name']}</h4>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <ProfileText text={this.props.data.description} isFetching={this.state.isFetching}></ProfileText>
                    </ul>
                    <ProfileActionButton person={this.props['data']['username']} action="like"></ProfileActionButton>
                </div>
            </div>
        </div>

    )}
}


export default Profile;