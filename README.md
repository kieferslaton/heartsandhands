HEARTS AND HANDS README
=======================

Attention!
----------

Please note that while the site should fully load when you clone this repo, you will not have calendar or donation functionality until you add your own API keys and URLs.

For Google Calendar API:

You need a calendar ID for the calendar you want to reference (GATSBY_CALENDAR_ID) and an API key (GATSBY_CALENDAR_API). Please reference [the API documentation](https://developers.google.com/calendar/overview) for more info.

For Stripe API:

You need an API key to access Stripe (GATSBY_STRIPE_API). In addition, each button is linked to a price url. For example, hitting "$5" and setting the toggle to "Monthly" will tell the state to reference the private price url GATSBY_FIVE_RECURRING_URL. Check out donate.js for price url naming convention. For more info on generating the API key and generating price urls, check out [the Stripe API docs](https://stripe.com/docs/api).
