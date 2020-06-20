import React, { Component } from 'react';
import { RichCell, Panel, Header, PanelHeader, PanelHeaderBack, Div, IOS, platform, Group } from '@vkontakte/vkui';
import Footer from './Footer'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

class Rating extends Component {
  render() {
      //TODO переделать на получение из БД
      const topUsers = [
                        {name: "Иванов Иван", value: 999},
                        {name: "Петров Василий", value: 756},
                        {name: "Шестаков Семен", value: 425},
                        {name: "Громов Сергей", value: 416},
                        {name: "Шувалов Максим", value: 251}];
      
      const osname = platform();
    return (
        <Panel id={this.props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={this.navigationBack.bind(this)}>{osname === IOS ?
                    <Icon28ChevronBack/> : <Icon24Back/>}</PanelHeaderBack>}
            >
                Рейтинг
            </PanelHeader>
            <Group>
            {topUsers.map(topUser => <RichCell
                          after={topUser.value}>
                              {topUser.name}
            </RichCell>)}
   
            </Group>
                   <Footer router={this.props.router}/>
        </Panel>
    );
  }
        
        navigationBack() {
            this.props.router.navigate('personal')
        }
}

export default Rating;
