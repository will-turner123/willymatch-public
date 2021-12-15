import firebase from 'firebase/compat/app';
import 'firebase/auth';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useRef } from 'react';
import External from '../components/External';
import MatchList from '../components/MatchList';
import moment from 'moment';

const ChatMessage = (props) => {
    const {text, author, timestamp} = props.message;
    const currentUser = props.user;
    const chatUser = props.chatUser;

    var now = moment(new Date());
    var dateString = moment.duration(now.diff(moment(timestamp))).humanize() + " ago"
    return(<>
        <div class={author === currentUser.username ? "chat chat-right" : "chat chat-left"}>
            <div class="chat-avatar">
                <img src={author === currentUser.username ? currentUser.imageUrl : chatUser.imageUrl} class="rounded-circle chat-avatar-img"/>
            </div>
            <div class="chat-body">
                <div class="chat-content">
                    <p>{ text }</p>
                    <time class="chat-time">{ dateString }</time>
                </div>
            </div>
        </div>
    </>)
}


const ChatPage = (props) => {

    const params = useParams();
    const username = params['*'];
    const [chat, setChat] = useState(username)
    const [chatUser, setChatUser] = useState(username)
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);
    const [hasChat, setHasChat] = useState(false);
    const [formValue, setFormValue] = useState('');
    const [chatId, setChatId] = useState();
    const [listenerLoaded, setListenerLoaded] = useState(false);
    const dummy = useRef();
    const [shouldUpdate, setShouldUpdate] = useState(false);


    useEffect(() => {
        if(username){
            firebase
            .firestore()
            .collection('users')
            .doc(username)
            .get()
            .then((doc) => {
                if (doc.exists){
                    setChatUser(doc.data())
                }
                else{
                    hasChat(false);
                }
            })
            .then(
            firebase
            .firestore()
            .collection('chat')
            .where("participants", "array-contains", currentUser.username)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if(doc.data().participants.includes(username)){
                        console.log(doc.data())
                        setChatId(doc.id);
                        setChat(doc.data());
                        setHasChat(true);
                        setLoading(false);
                        if(!listenerLoaded){
                            loadListener(doc.id);
                        }
                    }
                })
            }))

        }
        else{
            setHasChat(false);
            setLoading(false);
        }
    }, [shouldUpdate]);

    const loadListener = (id) => {
        setListenerLoaded(true);
        firebase.firestore().collection('chat').doc(id).onSnapshot((doc) => {
            console.log(doc);
            console.log(doc.data());
            setChat(doc.data())
            setShouldUpdate(!shouldUpdate);
        })
    }



    const sendMessage = async (e) => {
        e.preventDefault();
        setFormValue('');
        const msg = {}
        await firebase.firestore().collection('chat').doc(chatId).update({
            messages: firebase.firestore.FieldValue.arrayUnion({
                text: formValue,
                author: currentUser.username,
                timestamp: Date.now()
            })
        }).then(
            setShouldUpdate(!shouldUpdate)
        ).then(
            dummy.current.scrollIntoView({ behavior: 'smooth'})
        )
    }


    return(    
        <div class="wrapper index-page">
            <div class="page-header header-filter">
                <div class="squares square1"></div>
                <div class="squares square2"></div>
                <div class="squares square3"></div>
                <div class="squares square4"></div>
                <div class="squares square5"></div>
                <div class="squares square6"></div>
                <div class="squares square7"></div>
                <External script="squares"></External>
            <div class="container-fluid discover-page">
                <div class="row">
                    <div class="col-lg-8 col-sm-12 order-lg-12 order-sm-1">
                        {loading && <h1 class="loading text-center">Loading...</h1>}
                        {!loading
                            && <div class="card">
                                    <div class="card-header">
                                        <h4>Your chat with {chatUser.name}</h4>
                                    </div>
                                    <div class="card-body">
                                        <div class="chats" data-scrollbar>
                                            {chat.messages && chat.messages.length > 0 && chat.messages.map((message, index) => <ChatMessage user={currentUser} chatUser={chatUser} message={message} key={index} />
                                                )}
                                        <span ref={dummy}></span>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <form onSubmit={sendMessage}>
                                            <div class="input-group chatInput">
                                                <input class="form-control" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Send a message..."/>
                                                <div class="input-group-append">
                                                    <button type="submit" disabled={!formValue} class="btn btn-primary">Send</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/* <External script="scrollbar"/> */}
                                </div> 
                        }
                    </div>
                    <div class="col-lg-4 col-sm-12 order-lg-1 order-sm-12">
                        {loading && <h1 class="loading">Loading...</h1>}
                        {!loading
                            && <MatchList person={currentUser}/>
                        }
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ChatPage;