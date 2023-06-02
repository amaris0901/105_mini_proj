# Memoir

This repository contain backend and frontend

## To run the frontend
use
```
    npm run dev
```
## To run the backend
use
```
    node index.js
```
# Journaling App

### All of the responses will be wrapped with this data before sending
| Parameter | Type | Description |
|-----|:----:|:-----|
| success| boolean | the status of request|
| msg | string | message for each request |
| data | JSON | the actual data |

#### URL
`POST /login`

#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username
|password|String| password|

Example
```
   {
    "username": "Nan",
    "password":"nannan"
  }

```
#### Success
Response

###### Status Code
` 200`  Login credential is correct

| Parameter | Type | Description |
|----------|:-------------:|:------|
|email|String| user email
|username|String| username
|id|String| user id

Example
```
   {
    "success": true,
    "message": "Login credential is correct",
    "user": {
        "id": 14,
        "username": "Nan",
        "email": "nan@gmail.com",
        "password": "nannan",
        "hashed_password": "$2b$10$j.YCBp9xEWbXV6sRFvB.dOus4TZ70RO2AU0Dp.guyz/ib9AiluQ2S"
    }
}
```
**noted: If success, the Response will be sent with cookie named UserToken**

### Register

#### URL
`POST /register`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String|username |
|email| String | email |
|password|String| password|

Example
```
   {
    "email":"test1@gmail.com",
    "username":"testing",
    "password" : "1234"
   }


```
#### Success

###### Status Code
` 200`  User has been created

no response body

### get logged in user


#### URL
`GET /me`

#### Request Body 
No Request Body


#### Success

###### Status Code
` 200`  got data

| Parameter | Type | Description |
|----------|:-------------:|:------|
|username|String| username
|id|String| user id

Example
```
{
    "id":14,
    "username":"Nan"
    
}

```

### getAllPostsByUser
#### URL
`GET /postsByUsers`

#### Request Body 
No Request Body

#### Success

###### Status Code
` 200`  Posts of specific user fetched.

Response

| Parameter | Type | Description |
|----------|:-------------:|:------|
| no parameter | Array of note | all notes related to user |

#### note
the note object
| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of note |
| title | string | note title |
| description | string | note description |

Example
```
{
    "success": true,
    "data": [
        {
            "id": 4,
            "title": "jbbi",
            "description": "ojiihihu",
            "userId": 14
        },
        {
            "id": 5,
            "title": "Hi",
            "description": "kdjfslzkhdf",
            "userId": 14
        }
    ],
    "message": "Posts of specific user fetched."
}

```
### editNote

#### URL
`PATCH /post`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
| noteId | string | id of note |
| title | string | note title |
| description | string | note description |


#### Success
Response

###### Status Code
` 200`  success

| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of note |
| title | string | note title |
| description | string | note description |

Example
```
    {
    "success": true,
    "data": {
        "title": "hihi",
        "description": "edj",
        "id": 6,
        "userId": 14
    },
    "message": "Post Updated"
}

```

### Create Note


#### URL
`POST /post`

 
#### Request Body 
| Parameter | Type | Description |
|----------|:-------------:|:------|
| title | string | note title |
| description | string | note description |


#### Success
Response

###### Status Code
` 200`  success

| Parameter | Type | Description |
|----------|:-------------:|:------|
| id | string | id of note |
| title | string | note title |
| description | string | note description |

Example
```
    {
    "success": true,
    "data": {
        "title": "hihi",
        "description": "gjsdkfgj",
        "id": 6,
        "userId": 14
    },
    "message": "Post created"
}


```
### Delete Note

#### URL
`DELETE '/post/:postId'

### Parameter
| Parameter | Type | Description |
|----------|:-------------:|:------|
|noteId|String| id of note
 
#### Request Body 
No Request Body

#### Success
Response

###### Status Code
` 200`  delete success

no response body

