# Food Now - Food Order Pick-up WebApp

Food Now is an web application for a singular restaurant wher a user can order for pick-up. 
The app stores the user choices on its cart using local storage. Guaranteeing the item will stay on cart even if the browser is closed.

The user can edit each item individually (increase/decrease quantity, and delete) and all changes are reflect on total price amount.

The web app use Twilio API to communicate with the restaurant (SMS text) about a new order placed. The restaurant can reply with the amount of time needed for the order to be ready. This time will be then sent to the final user via SMS

## Getting Started

1. Install dependencies: `npm i`
2. Run the server: `npm run local`
3. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body Parser
- EJS
- Express
- Knex
- Postgre SQL
- Twilio (API)

## Database Update

- On your terminal type: npm run knex migrate:latest
- Press enter
- After, type: npm run knex seed:run
- Now you should have the most up to date db

## Screenshots

![Main page where user can select mutiple items. Item are rendered based on database entries](https://github.com/adrianaj24/foodnow/blob/master/docs/foodnow_main_page.png)

![Summary page where the user can edit (increase/decrease quantity or delete) items, go back to main page or move to checkout page](https://github.com/adrianaj24/foodnow/blob/master/docs/foodnow_summary_page.png)

![Checkout page with thank you message. At this point the restaurant and the user will be notified via SMS text message](https://github.com/adrianaj24/foodnow/blob/master/docs/foodnow_checkout_page.png)