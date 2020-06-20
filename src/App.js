import React, {Component} from 'react';
import {connect} from 'react-redux';
import { ConfigProvider, Root, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import About from './About';
import Footer from './Footer';
import Personal from './Personal';
import Rating from './Rating';
import { RouteNode } from 'react-router5'

class App extends Component {
        
    getParameter = (string, parameter) => {
        let linkParams = string.split("&");
        
        for(var i=0; i < linkParams.length; i++){
            let value = linkParams[i].split("=");
            if (value[0] === parameter){
                return value[1];
            }
        }
        return "";
    }

    render() {
        const querystring = window.location.search.substring(1);
        const invintationID = this.getParameter(querystring, 'id');
        const currentID = this.getParameter(querystring, 'userID');
        
        let activePanel = 'personalPanel';
        
        const routename = this.props.route.name;
        
        switch(routename){
         case 'about':
            activePanel = 'aboutPanel'
            break;
        case 'rating':
            activePanel = 'ratingPanel'
            break;
        default:
            break;
        }
        return (
            <ConfigProvider insets={this.props.insets}>
                <Root activeView="mainView">
                    <View id="mainView" activePanel={activePanel}>
                        <Personal router={this.props.router} id="personalPanel"/>
                        <About router={this.props.router} id="aboutPanel"/>
                        <Rating router={this.props.router} id="ratingPanel"/>
                    </View>
                </Root>
            </ConfigProvider>
        );
    }
}


function mapStateToProps(state) {
    return {
        accessToken: "1",
        insets: "2",
    };
}

export default connect(mapStateToProps)(
    (props) => (
        <RouteNode nodeName="">
            {({ route }) => <App route={route} {...props}/>}
        </RouteNode>
    )
);
