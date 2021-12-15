import React from "react";

import doSquares from '../theme/js/squares';
import doNav from '../theme/js/navbar';
import Scrollbar from 'smooth-scrollbar';

class External extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        if(this.props.script === "squares"){
            doSquares();
        }
        if(this.props.script === "navbar"){
            doNav();
        }
        if(this.props.script === "scrollbar"){
            Scrollbar.init(document.querySelector(".chats"));
        }
        if(this.props.script === "scrollbarMatches"){
            Scrollbar.init(document.querySelector(".matchList"));
        }
    }
    render(){
        return ""
    }
}

export default External;