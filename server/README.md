# ExpressJS Server Notes

## API Endpoints

### Users
Users are authenticated through Auth0, and the authorization token returned via user.sub is used as the access token/key in a request to identify and select a particular user from the database.

A given user's data is selected with "/api/users"