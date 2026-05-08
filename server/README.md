# U-Commerce API

This directory contains the ExpressJS backend for U-Commerce. It leverages Supabase for database management and MailerSend for transactional email notifications.

## Configuration

Ensure your `.env` file in this directory includes the following keys:
- `SUPABASE_URL`: Your project's Supabase URL.
- `SUPABASE_ANON_KEY`: Your Supabase API key.
- `MAILERSEND_API_KEY`: API key for sending email notifications.

## API Endpoints

### Listings
The core resource of the marketplace.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/listings` | Get all active listings. Supports filtering via query params (`category`, `listing_type`, `min_price`, `max_price`). |
| **GET** | `/api/listings/:id` | Get detailed information for a single listing (includes user and category data). |
| **GET** | `/api/listings/user/:user_id` | Retrieve all listings posted by a specific user. |
| **POST** | `/api/listings` | Create a new listing. |
| **PUT** | `/api/listings/:id` | Update listing details. *Triggers notifications to favoritors.* |
| **DELETE** | `/api/listings/:id` | Remove a listing. *Triggers notifications to favoritors.* |

### Comments & Reviews
Interactions on specific listings.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/comments/:id` | Get all comments for a specific listing (ordered by newest). |
| **POST** | `/api/comments` | Post a new comment and rating. *Triggers notifications to favoritors.* |
| **PUT** | `/api/comments/:id` | Edit an existing comment/rating. |
| **DELETE** | `/api/comments/:id` | Remove a comment. |

### Favorites
User-specific wishlists.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/favorites/:id` | Get all listings favorited by a specific User ID. |
| **POST** | `/api/favorites` | Add a listing to a user's favorites. |
| **DELETE** | `/api/favorites/:id` | Remove a favorite entry. |

### Categories
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/categories` | Returns a list of all available listing categories. |


## Notification System

The server includes a `notificationController` that integrates with **MailerSend**. Automated emails are dispatched to users when a listing they have "favorited" undergoes specific events:

*   **COMMENT_ADDED**: Notifies favoritors when a new discussion starts.
*   **LISTING_MODIFIED**: Alerts potential buyers if the price or description changes.
*   **LISTING_DELETED**: Informs users when an item is no longer available.

## Project Structure

```text
server/
├── config/             # Database and Email client initializations
├── controllers/        # Business logic (Listings, Favorites, etc.)
├── __tests__/          # Unit Tests
├── routes/             # Express route definitions
└── index.js            # Entry point
```
