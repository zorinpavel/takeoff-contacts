# What is it?

It's playground web app to show my skills

See working example at [heroku](https://takeoff-contacts.herokuapp.com)


## What's inside?
- Node.js + Express
- MongoDB
- Firebase authorization with google provider
- Third party API integration  to get random contacts list
- React.js + Redux

## Authors

- **Pavel Zorin**




# Takeoff contacts API

### Register new API user
POST /users
```JSON
{
    "name": "Zorin Pavel",
    "email": "zorin.pavel@gmail.com",
    "password": "zorinPass"
}
```
Then authenticate with Bearer *authToken*


### Login
POST /users/login
```JSON
{
    "email": "apiuser@apiuser.com",
    "password": "apiUserPassword"
}
```


### Update user
PATCH /users/me
```JSON
{
    "password": "newUserPassword"
}
```


### Delete user
DELETE /users/me


### Create contact
POST /contacts
```JSON
{
  "name": "John Doe",
  "email": "doe.john@gmail.com",
  "phone": "+7 904 892 3499",
  "position": "Manager",
}
```


### Get contacts list
GET /contacts


### Update contact
PATCH /contacts/&lt;_id&gt;
```JSON
{
  "phone": "+7 904 892 3494",
}
```


### Get contact by id
GET /contacts/&lt;_id&gt;


### Delete contact by id
DELETE /contacts/&lt;_id&gt;
