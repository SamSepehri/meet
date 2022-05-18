import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import App from '../App';
import CitySearch from '../CitySearch'
import { mockData } from '../mock-data';


describe('<EventList /> component', () => {

    test('render correct number of events', () => {
        const EventListWrapper = shallow(<EventList events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });

    test('render CitySearch', () => {
        const AppWrapper = shallow(<App />);
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
});