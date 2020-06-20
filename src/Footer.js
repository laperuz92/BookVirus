import React, { Component } from 'react';
import { Button, Panel, PanelHeader, Div, Group } from '@vkontakte/vkui';
import {connect} from 'react-redux';
import './Footer.css'

class Footer extends Component {
    
    render() {
        return (
            <Div className="footer">
                <Button className="button" level="3" component="a" onClick={this.openAbout.bind(this)}>Правила</Button>
            </Div>
        );
    }

    openAbout() {
        this.props.router.navigate('about');
    }
}

function mapStateToProps(state) {
    return {
    };
}

export default connect(mapStateToProps)(Footer);
