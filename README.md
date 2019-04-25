# Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub
7. Final step
8. Did it change?


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above


## PLAN

### Database

- Menu Item
- Split by class (food, drink, dessert)
- Name, description (food and dessert), price

DISHES TABLE
ID | NAME     | DESC   |  PRICE
1  | option A | desc A | 99
2  | option B | desc B | 9
3  | option C | desc C | 65
4  | option D | desc D | 44

ORDERS TABLE
ID | NAME     | PHONE #
1  | Mike     | 111-111-111
2  | Adriana  | 222-222-222
3  | Mariana  | 333-333-333

DISHES_ORDER TABLE
ORDER_ID | DISHES ID
   1     |    1
   1     |    2
   1     |    2
   2     |    1
   2     |    4
   2     |    4
   2     |    3


### Routes

- Navbar
* Login (self)

- Menu
- Cart
- Checkout

### Main Page

- Basic layout
- Nav Bar
* Restaurant info
* Login button
- Dishes
* food (name, description, price)
* dessert (name, description, price)
* drinks (name, price)

- Cart
* Dishes info
* total (sum of dishes price)
* checkout + phone number area

### Summary Page

- Order Time Countdown 
- Purchase order summary

### API

# Twilio

Free Phone #: 647 799 3850

