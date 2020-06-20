import React, {Component} from 'react';
import {
    SimpleCell,
    InfoRow,
    Button,
    Panel,
    Header,
    Switch,
    PanelHeader,
    Cell,
    Group,
    FormLayout,
    FormLayoutGroup,
    Input,
    Div
} from '@vkontakte/vkui';
import Footer from './Footer'
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types'
import { actionTypes } from 'redux-router5'

const { TRANSITION_SUCCESS } = actionTypes

class Auth extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const {cookies} = props;
        this.state = {
            user_id: cookies.get('user_id') || null,
            name: cookies.get('user_name') || '',
            parent_id:cookies.get('parent_id') || null,
            rules_check: cookies.get('rules_check')==='true',
        };
        const {user_id} = this.state;
        if (user_id) {
            this.props.router.navigate('about');
        }
    }

    onChangeUserId(event) {
        this.setState({user_id: event.target.value});
    }

    onChangeName(event) {
        this.setState({name: event.target.value});
    }

    onAuth(event) {
        console.log("-098uygbjiopd")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"userID": this.state.user_id,'fio':this.state.name});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://127.0.0.1:3000/auth", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.error){}

                    this.setState({
                        parent_id: result.data.parentid,
                        rules_check: result.data.rules_check,
                        name: result.data.fio
                    });

                    const {cookies} = this.props;
                    const {user_id, name, parent_id, rules_check} = this.state;
                    cookies.set('user_id', user_id);
                    cookies.set('user_name', name);
                    cookies.set('parent_id', parent_id);
                    cookies.set('rules_check', rules_check);
                    this.props.router.navigate('personal');

                },

                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {

                }
            ).catch(e => console.log(e));

    }

    render() {
        //TODO переделать на получение из БД


        return (
            <Panel id={this.props.id}>
                <PanelHeader>
                    Авторизация
                </PanelHeader>
                <FormLayout>
                    <FormLayoutGroup top="id vk" bottom="может содержать только  цифры.">
                        <Input type="number" name="id_vk" placeholder="Введите id" value={this.state.user_id}
                               onChange={this.onChangeUserId.bind(this)}/>
                    </FormLayoutGroup>
                    <FormLayoutGroup top="ФИО">
                        <Input type="text" name="fio" placeholder="Введите ФИО" value={this.state.name}
                               onChange={this.onChangeName.bind(this)}/>
                    </FormLayoutGroup>
                    <Button className="button" level="3" component="a" onClick={this.onAuth.bind(this)}>Войти</Button>
                </FormLayout>
                <Footer router={this.props.router}/>
            </Panel>
        );
    }

    openRating() {
        this.props.router.navigate('rating');
    }
}

export default withCookies(Auth);
