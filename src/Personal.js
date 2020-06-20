import React, { Component } from 'react';
import { SimpleCell, InfoRow, Button, Panel, Header, Switch, PanelHeader, Cell, Group } from '@vkontakte/vkui';
import Footer from './Footer'
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types'


class Personal extends Component {
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
        const {user_id, rules_check} = this.state;

        console.log("plkj")
        console.log(user_id)
        if (typeof(user_id) == 'undefined' || user_id == null ) {
            this.props.router.navigate('auth');
        }
        console.log(";lkji")
        console.log( typeof rules_check)
        if (!rules_check) {
            this.props.router.navigate('about');
        }
    }

  render() {

      //TODO переделать на получение из БД
      const Books = ["Гарри поттер", "Властелин колец", "1984"];
      const BooksReceived = 19;
    return (
        <Panel id={this.props.id}>
            <PanelHeader>
                Книжный вирус
            </PanelHeader>
            <Group>
              <SimpleCell>
                <InfoRow header="Получено книг">
                  {BooksReceived}
                <Button className="button" level="3" component="a" onClick={this.openRating.bind(this)}>Рейтинг</Button>
                </InfoRow>
              </SimpleCell>
            </Group>
            <Group header={<Header mode="secondary">Отправленные мне</Header>}>
        {Books.map(Book => <Cell asideContent={<Switch/>}>{Book}</Cell>)}
            </Group>
                   <Footer router={this.props.router}/>
        </Panel>
    );
  }

        openRating() {
          this.props.router.navigate('rating');
        }
}
export default withCookies(Personal);
