import React, { Component } from 'react';
import { SimpleCell, InfoRow, Button, Panel, Header, Switch, PanelHeader, Cell, Group } from '@vkontakte/vkui';
import Footer from './Footer'

class Personal extends Component {
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

export default Personal;
