# U-Commerce Front End Using ReactJS
This directory includes the client-side React component generation and asynchronous communication with the backend API.

## Project structure:
```text
client/
├── public/     # public assets (ex. favicon)
└── src/        # source files for dist
    ├── __tests_/       # unit tests
    ├── api/            # backe end api calls
    ├── assets/         # local images
    ├── Components/     # commonly used React components + styling
        └── __tests__ /     # component tests
    ├── contexts/       # define React context providers
    ├── Pages/          # React components + styling for each page
    └── test/           # jest test setup
```

## Pages
Navbar is present at the top of all pages.

### Main: /
Landing page with the website introduction and purpose.

### Login: /login
Default is a "login" screen for returning users, alternatively a "register" page is shown to new users. Central button redirects to the auth0 site. Site is only accessible for users who are not logged in.

### Listings: /listings
Displays all of the listings available, along with a search bar, category filters, and sorting by price/rating. Listing detail page can be viewed by clicking on "View Listing" under a listing, and listings can be created by clicking "Create Listing".

### Listing Detail: /listings/:id
Show the details associated with a listing. View and create comments and ratings of a listing.

### Listing Form: /listings/:id/new, /listings/:id/edit
Create a listing or modify an existing listing

## Auth0 context provider
```useAuth()``` provides methods for authentication redirects (to auth0 site for user to enter credentials), access tokens after authentication, and a logout() which ends authenticated session.

Refresh tokens are configured, allowing for login sessions to persist between browser refreshes.

## User context provider
```useProfile()``` provides states ```profile``` which gives components access to user's data after authentication, and ```profileReady``` which is set to ```true``` once a session is active and user data has been successfully retrieved from the database.