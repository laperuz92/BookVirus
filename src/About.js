import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Panel, PanelHeader, PanelHeaderBack, Group, Div, IOS, platform, Button} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import '@vkontakte/vkui/dist/vkui.css';
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types'

class About extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const {cookies} = props;
        this.state = {
            user_id: cookies.get('user_id') || null,
            name: cookies.get('user_name') || '',
            parent_id: cookies.get('parent_id') || null,
            rules_check: cookies.get('rules_check')==='true',
        };
        const {user_id, rules_check} = this.state;
        if (typeof(user_id) == 'undefined' || user_id == null ) {
            this.props.router.navigate('auth');
        }
        if (rules_check) {
            this.props.router.navigate('personal');
        }
    }

    onCheck(event) {
        console.log("-098uygbjiopd")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"userID": this.state.user_id});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("http://127.0.0.1:3000/check_rules", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.status == 'OK') {
                        const {cookies} = this.props;
                        cookies.set('rules_check', true);
                        this.props.router.navigate('personal');
                    }

                },

                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {

                }
            ).catch(e => console.log(e));

    }

    render() {


        const osname = platform();
        return (<Panel id={this.props.id}>
                <PanelHeader
                    left={<PanelHeaderBack onClick={this.navigationBack.bind(this)}>{osname === IOS ?
                        <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderBack>}
                >
                    Правила игры
                </PanelHeader>
                <Group>
                    <Div>
                        <p>Привет!</p>
                        <p><strong>&nbsp;Книжный вирус</strong> &ndash; это приложение, в котором добро возвращается к
                            тебе десятикратно.</p>
                        <p>&nbsp;Мы дадим тебе адрес человека, который хочет получить книгу, которая интересна тебе. Да,
                            он ждёт твою любимую книгу!</p>
                        <p>&nbsp;Ты отправишь ему эту книгу, а через какое-то время добро вернётся к тебе. Ты можешь
                            получить десять, двадцать, пятьдесят книг от других людей!</p>
                        <p><strong>Как это работает?</strong></p>
                        <ol>
                            <li>Ты указываешь адрес доставки, по которому ты бы хотел получать книги.</li>
                            <li>Ты выбираешь книгу и отправляешь (или заказываешь доставку) другому человеку. Одну книгу
                                за всё время твоего участия в книжной эпидемии.
                            </li>
                            <li>Ты приглашаешь своих друзей и знакомых в приложение, они переходят по твоей ссылке. В
                                будущем они тоже пригласят своих друзей и знакомых.
                            </li>
                            <li>На указанный тобой адрес начинают приходить книги. Книг будет много. Это продолжается до
                                тех пор, пока ты сам не отключишь получение книг. А интенсивность потока зависит только
                                от числа людей, которые по твоей ссылки заразились Книжным &laquo;вирусом&raquo;.
                            </li>
                            <li>Помимо самих книг тебе начисляются баллы за каждое подтверждённое тобой получение книги.
                                Ты можешь потратить их на скидку до <span>70</span>% в популярных книжных
                                интернет-магазинах!
                            </li>
                        </ol>
                    </Div>
                    <Button className="button" level="3" component="a"
                            onClick={this.onCheck.bind(this)}>Согласен</Button>
                </Group>

            </Panel>
        )
    };

    navigationBack() {
        this.props.router.navigate('personal')
    }
}

function mapStateToProps(state) {
    return {};
}

export default withCookies(About);
