import firebase from 'firebase/compat/app';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';
import External from '../components/External';
import MatchList from '../components/MatchList';
import Swipe from '../components/Swipe';



const DiscoverPage = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
      useEffect(() => {
        firebase
          .firestore()
          .collection('users')
          .where('username', 'not-in', [userData.username])
          .get()
          .then((querySnapshot) => {
            const newPersons = [];
            querySnapshot.forEach((person) => {
                // for some reason the not-in statement returns stuff it shouldn't this is my fix
            if(!userData.likes.includes(person.data().username) && !userData.dislikes.includes(person.data().username) && !userData.dislikes.includes(person.data().username)){
                newPersons.push(person.data())
            }
            }
            );
            setPersons(newPersons);
            setLoading(false);
          });
      }, []);
    return (
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
                    <div class="col-lg-8 col-sm-12 order-lg-12 order-sm-1 text-center">
                        {loading && <h1 class="loading">Loading...</h1>}
                        {!loading
                            && <Swipe persons={persons} username={userData.username}/>
                        }
                    </div>
                    <div class="col-lg-4 col-sm-12 order-lg-1 order-sm-12">
                        {loading && <h1 class="loading">Loading...</h1>}
                        {!loading
                            && <MatchList person={userData}/>
                        }
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    ) 
}


// const DiscoverPageOld = () => {
//     const [persons, setPersons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userData, setUserData] = useState({username: "", name: "", imageUrl: "", likes: [], dislikes: [], favorites: [], id: ""});
//       useEffect(() => {
//         firebase
//         .firestore()
//         .collection('users')
//         .where('id', '==', firebase.auth().currentUser.uid)
//         .get()
//         .then((querySnapshot) => {
//             const data = querySnapshot.docs[0].data()
//             console.log(firebase.auth().currentUser.uid)
//             setUserData({username: data.username,
//                          id: data.id,
//                          name: data.name,
//                          imageUrl: data.imageUrl, 
//                          likes: data.likes,
//                          dislikes: data.dislikes,
//                          favorites: data.favorites,
//                          matches: data.matches})
//         }).then(
//         firebase
//           .firestore()
//           .collection('users')
//           .where('username', 'not-in', [userData.username])
//           .get()
//           .then((querySnapshot) => {
//             const newPersons = [];
//             querySnapshot.forEach((person) => {
//             console.log(data);
//                 // for some reason the not-in statement returns stuff it shouldn't this is my fix
//             if(!data.likes.includes(person.data().username)&&!data.dislikes.includes(person.data().username)&&!data.favorites.includes(person.data().username)){
//                 newPersons.push(person.data())
//                 console.log(person.data().username)

//             }
//             }
//             );
//             setPersons(newPersons);
//             setLoading(false);
//           }));
//       }, []);
//     return (
//         <div class="wrapper index-page">
//             <div class="page-header header-filter">
//                 <div class="squares square1"></div>
//                 <div class="squares square2"></div>
//                 <div class="squares square3"></div>
//                 <div class="squares square4"></div>
//                 <div class="squares square5"></div>
//                 <div class="squares square6"></div>
//                 <div class="squares square7"></div>
//                 <External script="squares"></External>
//             <div class="container-fluid discover-page">
//                 <div class="row">
//                     <div class="col-lg-8 col-sm-12 order-lg-12 order-sm-1 text-center">
//                         {loading && <h1 class="loading">Loading...</h1>}
//                         {!loading
//                             && <Swipe persons={persons} username={userData.username}/>
//                         }
//                     </div>
//                     <div class="col-lg-4 col-sm-12 order-lg-1 order-sm-12">
//                         {loading && <h1 class="loading">Loading...</h1>}
//                         {!loading
//                             && <MatchList person={userData}/>
//                         }
                        
//                     </div>
//                 </div>
//             </div>
//             </div>
//         </div>
//     )
// }

export default DiscoverPage;