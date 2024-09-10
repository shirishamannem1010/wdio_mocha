const { expect } = require('chai');
const { TokenGenerationPage } = require('../pages/api_pages/token_generation_page');
require('dotenv').config();
const { FakerDataPage } = require('../pages/api_pages/faker_data');
const { CreateBookingPage } = require('../pages/api_pages/createbookingpage');
const { BookingById } = require('../pages/api_pages/bookingby_id');
const { UpdateBookingPage } = require('../pages/api_pages/update_bookingpage');
const { PartialUpdateBooking } = require('../pages/api_pages/partial_update_booking');
const { DeleteBooking } = require('../pages/api_pages/deletebooking');
const logger = require('../tests/utils/logger');

let authToken;
let booking_id;

describe('API Testing with WDIO', () => {
    before('Token Generation', async () => {
        const tokengeneration = new TokenGenerationPage();
        authToken = await tokengeneration.tokenGeneration(process.env.api_base_url + "auth");
        expect(authToken).to.not.be.undefined;
        logger.info('Token generated successfully:', authToken);
    });

    before('Create New Booking', async () => {
        const createBooking = new CreateBookingPage();
        const fakerDataPage = new FakerDataPage();
        const fakeData = fakerDataPage.fakerData();
        const postResponse = await createBooking.createBooking(authToken, fakeData, process.env.api_base_url + "booking");
        expect(postResponse.status).to.equal(200);
        const postResponseBody = await postResponse.json();
        expect(postResponseBody.bookingid).to.not.be.null;
        booking_id = postResponseBody.bookingid;
        logger.info('New booking created successfully, Booking ID:', booking_id);
    });

    it('GET Booking IDs', async () => {
        const bookingIds = new BookingById();
        const getResponse = await bookingIds.getBookingIds(process.env.api_base_url + "booking");
        expect(getResponse.status).to.equal(200);
        const getResponseBody = await getResponse.json();
        expect(getResponseBody.length).to.be.greaterThanOrEqual(1);
        logger.info('Booking IDs response body:', getResponseBody);
    });

    it('GET Booking Data by ID', async () => {
        const bookingsById = new BookingById();
        const getOneResponse = await bookingsById.getBookingsById(process.env.api_base_url + "booking/" + booking_id);
        expect(getOneResponse.status).to.equal(200);
        logger.info('Booking data fetched successfully for Booking ID:', booking_id, 'Status Code:', getOneResponse.status);
    });

    it('PUT Update Booking Data', async () => {
        const updateBooking = new UpdateBookingPage();
        const fakeDataPage = new FakerDataPage();
        const fakeData = fakeDataPage.fakerData();
        const putResponse = await updateBooking.updateTheBooking(authToken, fakeData, process.env.api_base_url + "booking/" + booking_id);
        expect(putResponse.status).to.equal(200);
        logger.info('Booking data updated successfully for Booking ID:', booking_id, 'Status Code:', putResponse.status);
    });

    it('PATCH Partial Update Booking Data', async () => {
        const partialUpdateBooking = new PartialUpdateBooking();
        const fakeDataPage = new FakerDataPage();
        const fakeData = fakeDataPage.fakerData();
        const updateResponse = await partialUpdateBooking.partialUpdateTheBooking(authToken, fakeData, process.env.api_base_url + "booking/" + booking_id);
        expect(updateResponse.status).to.equal(200);
        logger.info('Booking data partially updated successfully for Booking ID:', booking_id, 'Status Code:', updateResponse.status);
    });

    it('DELETE Booking', async () => {
        const deleteBooking = new DeleteBooking();
        const deleteResponse = await deleteBooking.deleteBookingById(authToken, process.env.api_base_url)
        console.log(deleteResponse);
    });
});
1