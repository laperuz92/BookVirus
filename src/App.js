import React from 'react';
import {Cell, Group, List, Panel, PanelHeader, View} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.invintationID = "";
    }
    
    componentDidMount() {
        bridge.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppStorageGetResult':
                    this.getStoredInvitationKey(e.detail.data.keys);
                    break;
                case 'VKWebAppStorageSetResult':
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        bridge.send('VKWebAppStorageGet', {"keys": ["invitationID"]});
    }
      
    getInvitationID = (string) => {
        let linkParams = string.split("&");
        
        for(var i=0; i < linkParams.length; i++){
            let value = linkParams[i].split("=");
            if (value[0] === "id"){
                return value[1];
            }
        }
        return "";
    }
    
    getStoredInvitationKey = (string) => {
        let data = JSON.parse(string);
        this.invintationID = data["invintationID"];
    }
    
    saveInvintationID = (string) => {
        bridge.send("VKWebAppStorageSet", {"key": "invitationID", "value": string});
    }
    
    render() {
        const invintationID = this.getInvitationID(window.location.search.substring(1));
        
        if (this.invintationID === "" && invintationID != ""){
            this.invintationID = invintationID;
            this.saveInvintationID(invintationID);
        }
        
        if(invintationID === ""){
            return (<h1>{this.invintationID}</h1>)
        }else{
                return (<h2>{this.invintationID}</h2>)
        }
    }
}

export default App;
