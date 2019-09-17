# Reviews Module

> Project description
> - A reviews component that allows the user to perform CRUD operations.

## Related Projects

> - https://github.com/dataFULLY/reviews-proxy

## Getting Started

> Run the following scripts
> 1. npm install
> 2. npm run build
> 3. npm run create-db
> 4. npm run seeder
> 5. npm start

## API Endpoints/CRUD Operations

### POST / Create

> Route: /api/listings/:id/reviews

> Request Body:
> - listing_id
> - user_id
> - date
> - comment
> - accuracy
> - communication
> - cleanliness
> - location
> - checkin
> - value

> Response: created review_id

> Status Code: 201

### GET / Read

> Route: /api/listings/:id/reviews

> Example Response:
```
[
  {
    "id": 7,
    "listings_id": 11,
    "users_id": 8,
    "date": "June 2019",
    "comment": "Maiores sit aut itaque nemo",
    "accuracy": 5,
    "communication": 5,
    "cleanliness": 5,
    "location": 5,
    "checkin": 4,
    "value": 4,
    "responses_id": null
  }
]
```
> Status Code: 200

### PUT / Update

> Route: /api/reviews/:review_id

> Request Body:
> - review_id

**and**

> At least one of the following:
> - listing_id
> - user_id
> - date
> - comment
> - accuracy
> - communication
> - cleanliness
> - location
> - checkin
> - value

> Response: review_id of updated review

> Status Code: 200

### DELETE / Delete

> Route: /api/reviews/:review_id

> Response: review_id of deleted review

> Status Code: 200
