# wpr-weather-app

WPR381 submission

After cloning run `npm install`
remember to make a `.env` file containing
`OPENWEATHERMAP_APIKEY=
NODE_PORT=`
Then run `npm start` to start the server
Or run `node server-compiled.js`

Opening route '/' takes you to the demo page
opening route /search lets you use the addZipcode component to redirect you to a page with just one weather card

## Known bugs:

weather cards use the dt property to get the time however despite openweathermap stating that it's a unix time integer js fails to properly convert it. Because of this all weather day cards show tuesday 1970...!?

the /search route fails because react router is being difficult.
Since the homepage displays all the functionality necessary for the project im willing to let the react router code speak for itself rather than a completely working product
