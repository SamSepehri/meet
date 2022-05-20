// src/__tests__/App.test.js

import React from "react";
import { shallow, mount } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

// start component testing
describe("<App /> component", () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    test("render list of events", () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test("render CitySearch", () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test("render NumberOfEvents", () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

// start integration testing
describe("<App /> integration", () => {
    test('App passes "events" state as a prop to EventList', () => {
        let AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state("events");
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        let AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state("locations");
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test("get list of events matching the city selected by the user", async () => {
        let AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state("suggestions");
        const selectedIndex = Math.floor(Math.random() * suggestions.length);
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter((event) => event.location === selectedCity);
        expect(AppWrapper.state("events")).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        let AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
        await suggestionItems.at(suggestionItems.length - 1).simulate("click");
        const allEvents = await getEvents();
        expect(AppWrapper.state("events")).toEqual(allEvents);
        AppWrapper.unmount();
    });

    // Integration test for number of events
    test("the default value of number of events shall be 32", () => {
        let AppWrapper = mount(<App />);
        expect(AppWrapper.state("numberOfEvents")).toBe(32);
        AppWrapper.unmount();
    });

    test("the state of number of events shall be updated, when the number input changes", () => {
        let AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const eventObject = { target: { value: 16 } };
        NumberOfEventsWrapper.find(".numberOfEvents__input").at(0).simulate("change", eventObject);
        expect(AppWrapper.state("numberOfEvents")).toBe(16);
        AppWrapper.unmount();
    });

    test("when number of events set by user is HIGHER than the number of available events, show all available events", async () => {
        let AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const eventObject = { target: { value: 5 } };
        NumberOfEventsWrapper.find(".numberOfEvents__input").at(0).simulate("change", eventObject);
        await getEvents();
        AppWrapper.update();
        const EventListWrapper = AppWrapper.find(EventList);
        expect(AppWrapper.state("events")).toHaveLength(2);
        expect(EventListWrapper.props().events).toHaveLength(2);
        AppWrapper.unmount();
    });

    test("when number of events set by user is LOWER than the number of available events, show all available events", async () => {
        let AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const eventObject = { target: { value: 1 } };
        NumberOfEventsWrapper.find(".numberOfEvents__input").simulate("change", eventObject);
        await getEvents();
        AppWrapper.update();
        const EventListWrapper = AppWrapper.find(EventList);
        expect(AppWrapper.state("events")).toHaveLength(1);
        expect(EventListWrapper.props().events).toHaveLength(1);
        AppWrapper.unmount();
    });
});