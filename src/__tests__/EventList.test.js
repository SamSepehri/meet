import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import App from '../App';
import CitySearch from '../CitySearch'

describe('<EventList /> component', () => {

    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />);
        expect(EventListWrapper.find(Event)).toHaveLength(4);
    });

    test('render CitySearch', () => {
        const AppWrapper = shallow(<App />);
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
});