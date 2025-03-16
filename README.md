
# Kitra

Kitra is a game where users can collect treasures based on given latitude and longitude coordinates.

This mini project was built using Node.js and Express as part of a technical exam for my application as a Backend Developer at Serino Systems Inc.


## Getting Started

### Cloning the Repository

To get started, clone the project repository:

```git clone https://github.com/jcilalim/Kitra.git```

This project requires Node.js to be installed on your local machine.

## Installing Dependencies
Navigate to the project directory and install the required dependencies:

```npm install```


Once the installation is complete, you can start the server by running:

```npm start```

### Dependencies Used

For reference this project utilizes the following libraries/packages:

```
"@colors/colors": "^1.6.0",
"dotenv": "^16.4.7",
"express": "^4.21.2",
"geolib": "^3.3.4",
"mysql2": "^3.13.0",
"nodemon": "^3.1.9",
"sequelize": "^6.37.6"
```
## Database Configuration

For convenience, this project uses a free online MySQL database provided by freesqldatabase.com. This eliminates the need for setting up a local database.

***Note: The database credentials are stored in the .env file included in the repository for testing purposes. However, it is highly discouraged to expose credentials in production projects due to security risks.***

## Seeding the Database
To seed the database with sample data, run:

```npm run seeder_import```

If you need to delete the seeded data, run:

```npm run seeder_delete```

## API Endpoints

You can test the API endpoints using Postman or any preferred API testing tool.

### Retrieve Nearby Treasures

This is the required endpoint for this technical exam.

```GET /api/v1/treasures```



Query Parameters:
|  Parameter  | Type| Required | Description 
|----------|----------|----------|----------|
| Latitude   | Float  | Yes  | Latitude of the given coordinate |
| Longitude  | Float  | Yes   | Longitude of the given coordinate |
| Distance  | Integer   | Yes   | Search radius in kilometers (Accepted values: 1, 10) |
| prize_value   | Integer   | No   | Minimum prize value (Between 10 and 30) |


#### Sample Request: ####

```http://localhost:3000/api/v1/treasures?Latitude=14.552036595352455&Longitude=121.01696118771324&Distance=1&prize_value=15```


#### Sample Response: ####
Status Code: 200

JSON:
```
{
    "success": true,
    "count": 2,
    "data": [
        {
            "Id": 100,
            "Latitude": 14.5438,
            "Longitude": 121.02,
            "Name": "T1",
            "createdAt": "2025-03-15T12:36:51.000Z",
            "updatedAt": "2025-03-15T12:36:51.000Z",
            "MoneyValues": [
                {
                    "id": 1,
                    "treasure_id": 100,
                    "amt": 15,
                    "createdAt": "2025-03-15T12:36:51.000Z",
                    "updatedAt": "2025-03-15T12:36:51.000Z"
                }
            ]
        },
        {
            "Id": 102,
            "Latitude": 14.5446,
            "Longitude": 121.02,
            "Name": "T3",
            "createdAt": "2025-03-15T12:36:51.000Z",
            "updatedAt": "2025-03-15T12:36:51.000Z",
            "MoneyValues": [
                {
                    "id": 3,
                    "treasure_id": 102,
                    "amt": 15,
                    "createdAt": "2025-03-15T12:36:51.000Z",
                    "updatedAt": "2025-03-15T12:36:51.000Z"
                }
            ]
        }
    ]
}
```
### Create Treasure with associated money value

For the bonus endpoint, I created this to demonstrate data insertion with its associated relationships.

```POST /api/v1/treasures```

Request Body (JSON):
| Parameter  | Type| Required | Description 
|----------|----------|----------|----------|
| Latitude   | Float  | Yes  | Latitude coordinate of the treasure|
| Longitude  | Float  | Yes   | Longitude coordinate of the treasure |
| Name  | String   | Yes   | Name of the treasure |
| amt   | Integer   | Yes   | Prize value (Between 10 and 30) |


Note: Please set your Headers before testing.
```
Key: Content-Type
Value: application/json
```
### Sample Request:

```http://localhost:3000/api/v1/treasures```

Raw JSON Body:

```
{
    "Latitude": 14.47720761,
    "Longitude": 120.9867921,
    "Name": "T20",
    "amt": 10
}
```

### Sample Response:
Status Code: 201

JSON:
```
{
    "success": true,
    "message": "Treasure and Money Value created successfully",
    "treasure": {
        "Id": 119,
        "Latitude": 14.47720761,
        "Longitude": 120.9867921,
        "Name": "T20",
        "updatedAt": "2025-03-15T14:47:38.540Z",
        "createdAt": "2025-03-15T14:47:38.540Z"
    },
    "moneyValue": {
        "id": 27,
        "treasure_id": 119,
        "amt": 10,
        "updatedAt": "2025-03-15T14:47:38.947Z",
        "createdAt": "2025-03-15T14:47:38.947Z"
    }
}
```
