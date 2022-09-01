## Anonymous Message API

Project ini merupakan REST API untuk pesan rahasia. Pengguna harus terlebih dahulu login untuk dapat mengirim pesan rahasia ke pengguna lain. Pengguna lain dapat melihat pesan yang dikirim kepadanya namun tidak dapat melihat siapa pengirimnya. Jika ingin melihat pengirim pesan tersebut, pengguna harus membayar.

### Technologies

- PostgreSQL
- ExpressJS

### API Spec

#### User Registration

- Request: POST
- Endpoint : `/api/users/register`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "username": "String",
  "email": "String",
  "password": "String"
}
```

Response:

```json
{
  "code": "Number",
  "message": "String",
  "data": {
    "id": "UUID",
    "username": "String",
    "email": "String"
  }
}
```

#### User Login

- Request: POST
- Endpoint : `/api/users/login`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "username": "String",
  "password": "String"
}
```

Response:

```json
{
  "token": "JWT"
}
```

#### Send Message

- Request: POST
- Endpoint : `/api/messages/send?message_to=<UUID>`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "message": "String"
}
```

Response:

```json
{
  "code": "Number",
  "message": "String",
  "data": {
    "id": "UUID",
    "to": "UUID",
    "from": "UUID",
    "message": "String",
    "date": "Date",
    "time": "Time",
    "conversationsId": "UUID"
  }
}
```

#### Reply Message

- Request: POST
- Endpoint : `/api/messages/reply?reply_to=<UUID>`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "message": "String"
}
```

Response:

```json
{
  "code": "Number",
  "message": "String",
  "data": {
    "id": "UUID",
    "to": "UUID",
    "from": "UUID",
    "message": "String",
    "date": "Date",
    "time": "Time",
    "conversationsId": "UUID"
  }
}
```

#### Get Conversation (As Sender)

- Request: GET
- Endpoint : `localhost:8000/api/conversations/send`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Response:

```json
{
  "code": "Number",
  "message": "String",
  "data": {
    "to": "String",
    "messages": [
      [
        {
          "id": "UUID",
          "to": "String",
          "message": "String",
          "date": "Date",
          "time": "Time",
          "conversationsId": "UUID"
        }
      ]
    ]
  }
}
```

#### Get Conversation (As Reciever)

- Request: GET
- Endpoint : `localhost:8000/api/conversations/recieve`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Response:

```json
{
    "code": "Number",
    "message": "String",
    "data": [
        [
            {
                "id": "UUID",

                "from": "Anonymous <count>", <----> jika tidak membayar

                "from": {
                    "username": "String",
                    "email": "String"
                }, <-------> jika sudah membayar

                "message": "String",
                "date": "Date",
                "time": "Time",
                "conversationsId": "UUID"
            }
        ]
    ]
}
```

#### Purchase Conversations

- Request: POST
- Endpoint : `/api/conversations/purchase`
- Header :
  - Content-Type: application/json
  - Accept: application/json
- Body :

```json
{
  "id": "UUID"
}
```

Response:

```json
{
    "code": "Number",
    "message": "String",
    "data": {
        "id": "UUID",
        "sender": "UUID",
        "reciever": "UUID",
        "status": true
    }
}
```
