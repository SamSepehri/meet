import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
    let browser;
    let page;
    jest.setTimeout(50000);
    beforeAll(async () => {
        // browser = await puppeteer.launch();

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".event");
    });

    afterAll(() => {
        browser.close();
    });

    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$(".event .event__moreDetails");
        expect(eventDetails).toBeNull();
    });

    test("User can expand an event to see its details", async () => {
        await page.click(".event .event__detailsButton");
        const eventDetails = await page.$(".event .event__moreDetails");
        expect(eventDetails).toBeDefined();
    });

    test("User can collapse an event to hide its details", async () => {
        await page.click(".event .event__detailsButton");
        const eventDetails = await page.$(".event .event__moreDetails");
        expect(eventDetails).toBeNull();
    });
});

describe("Filter events by city.", () => {
    let browser;
    let page;
    jest.setTimeout(50000);
    beforeAll(async () => {
        // browser = await puppeteer.launch();

        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250, // slow down by 250ms
            ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
        });
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".event");
    });

    afterAll(() => {
        browser.close();
    });

    test("When user hasn’t searched for a city, show upcoming events from all cities", async () => {
        const countEvents = await page.$$eval(".event", (element) => element.length);
        expect(countEvents).toBe(2);
    });

    test("User should see a list of suggestions when they search for a city", async () => {
        await page.type(".city", "Berlin", { delay: 100 }); //type slower than user
        const countCities = await page.$$eval(".suggestions li", (element) => element.length);
        expect(countCities).toBe(2);
    });

    test("User can select a city from the suggested list", async () => {
        await page.reload();
        await page.type(".city", "Berlin", { delay: 100 }); //type slower than user
        await page.click(".suggestions li");
        const countEvents = await page.$$eval(".event", (element) => element.length);
        expect(countEvents).toBe(1);
    });
});