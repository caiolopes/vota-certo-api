# Requests and Responses

## /user

>### [POST] /user/auth
>
> **Fields**
> 
> `fb_token = TOKEN_HERE`
> 
> **Response**
> 
> ```json
> {
>   "id": 1,
>   "name": "Mauricio Giordano",
>   "email": "mauricio.c.giordano@gmail.com",
>   "picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/960132_804301702969474_4617645217961735820_n.jpg?oh=cfdbdad035a09e87305e2c4ef77e696a&> >oe=58438EBF",
>   "facebookId": "993917140674595",
>   "createdAt": "2016-09-03T18:18:57.000Z",
>   "updatedAt": "2016-09-03T18:18:57.000Z",
>   "accessToken": "------- TOKEN HERE ---------"
> }
> ```

>### [GET] /user/me
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Response**
>
>```json
>{
>  "id": 1,
>  "name": "Mauricio Giordano",
>  "email": "mauricio.c.giordano@gmail.com",
>  "picture": "https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/960132_804301702969474_4617645217961735820_n.jpg?oh=cfdbdad035a09e87305e2c4ef77e696a&>o>e=58438EBF",
>  "facebookId": "993917140674595",
>  "createdAt": "2016-09-03T18:18:57.000Z",
>  "updatedAt": "2016-09-03T18:18:57.000Z",
>  "accessToken": "------- TOKEN HERE ---------"
>}
>```

## /politician

>### [GET] /politician
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Response**
>
>```json
>[
>  {
>    "id": 1,
>    "name": "João Dória Júnior",
>    "picture": "https://cdn.eleicoes2016.com.br/foto/jo/ao/joao-doria-l.jpg",
>    "office": "Prefeito",
>    "createdAt": null,
>    "updatedAt": null,
>    "partyId": 1,
>    "party": {
>      "id": 1,
>      "name": "Partido da Social Democracia Brasileira",
>      "picture": "http://static.psdb.org.br/wp-content/uploads/2013/10/header-logo-psdb.png",
>      "initials": "PSDB",
>      "createdAt": "2015-07-08T04:25:05.000Z",
>      "updatedAt": "2015-07-08T04:25:05.000Z"
>    }
>  },
>  {
>    "id": 6,
>    "name": "Major Olímpio",
>    "picture": "https://cdn.eleicoes2016.com.br/foto/ma/jo/major-olimpio-l.jpg",
>    "office": "Prefeito",
>    "createdAt": null,
>    "updatedAt": null,
>    "partyId": 6,
>    "party": {
>      "id": 6,
>      "name": "Solidariedade",
>      "picture": "https://lh3.googleusercontent.com/-le1DKY7B8Mo/AAAAAAAAAAI/AAAAAAAAABI/6kYC9cHS9TY/s46-c-k-no/photo.jpg",
>      "initials": "SD",
>      "createdAt": "2015-07-08T04:25:05.000Z",
>      "updatedAt": "2015-07-08T04:25:05.000Z"
>    }
>  }
>]
>```

>### [GET] /politician/:id
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Params**
>
>`id = 1`
>
>**Response**
>
>```json
>{
>  "id": 1,
>  "name": "João Dória Júnior",
>  "picture": "https://cdn.eleicoes2016.com.br/foto/jo/ao/joao-doria-l.jpg",
>  "office": "Prefeito",
>  "createdAt": null,
>  "updatedAt": null,
>  "partyId": 1,
>  "party": {
>    "id": 1,
>    "name": "Partido da Social Democracia Brasileira",
>    "picture": "http://static.psdb.org.br/wp-content/uploads/2013/10/header-logo-psdb.png",
>    "initials": "PSDB",
>    "createdAt": "2015-07-08T04:25:05.000Z",
>    "updatedAt": "2015-07-08T04:25:05.000Z"
>  }
>}
>```

>### [GET] /politician/:id/tweet
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Params**
>
>`id = 1`
>
>**Response**
>
>```json
>[
>  {
>    "id": 1,
>    "name": "Mauricio Giordano",
>    "username": "mauriciogior",
>    "picture": "https://pbs.twimg.com/profile_images/378800000388596881/9f63214014e1185735743748d07a2093_bigger.jpeg",
>    "text": "As ruas estão tudo quebradas!!! EH MOLE?",
>    "createdAt": null,
>    "updatedAt": null,
>    "politicianId": 1
>  }
>]
>```

## /tweet

>### [GET] /tweet
>
>**Description**
>
>Gather random tweets about random politicians. Skips tweets you already analyzed.
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Response**
>
>```json
>[
>  {
>    "id": 1,
>    "name": "Mauricio Giordano",
>    "username": "mauriciogior",
>    "picture": "https://pbs.twimg.com/profile_images/378800000388596881/9f63214014e1185735743748d07a2093_bigger.jpeg",
>    "text": "As ruas estão tudo quebradas!!! EH MOLE?",
>    "createdAt": null,
>    "updatedAt": null,
>    "politicianId": 1
>  }
>]
>```

>### [GET] /tweet/seed
>
>**Description**
>
>Seeds the content from scup and twitter.
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Response**
>
>```json
>[
>  {
>    "id": 1,
>    "name": "Mauricio Giordano",
>    "username": "mauriciogior",
>    "picture": "https://pbs.twimg.com/profile_images/378800000388596881/9f63214014e1185735743748d07a2093_bigger.jpeg",
>    "text": "As ruas estão tudo quebradas!!! EH MOLE?",
>    "createdAt": null,
>    "updatedAt": null,
>    "politicianId": 1
>  }
>]
>```

## /analysis

>### [POST] /analysis
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Fields**
>
>`tweet_id = 1`
>`sentiment = positive`
>
>**Response**
>
>```json
>{
>  "id": 1,
>  "sentiment": "positive",
>  "createdAt": null,
>  "updatedAt": null,
>  "userId": 1,
>  "tweetId": 1,
>  "politicianId": 1,
>  "tweet": {
>    "id": 1,
>    "name": "Mauricio Giordano",
>    "username": "mauriciogior",
>    "picture": "https://pbs.twimg.com/profile_images/378800000388596881/9f63214014e1185735743748d07a2093_bigger.jpeg",
>    "text": "As ruas estão tudo quebradas!!! EH MOLE?",
>    "createdAt": null,
>    "updatedAt": null,
>    "politicianId": 1
>  },
>  "politician": {
>    "id": 1,
>    "name": "João Dória Júnior",
>    "picture": "https://cdn.eleicoes2016.com.br/foto/jo/ao/joao-doria-l.jpg",
>    "office": "Prefeito",
>    "createdAt": null,
>    "updatedAt": null,
>    "partyId": 1
>  }
>}
>```

>### [GET] /analysis
>
>**Query**
>
>`access_token = TOKEN_HERE`
>
>**Response**
>
>```json
>[
>  {
>    "id": 1,
>    "sentiment": "positive",
>    "createdAt": null,
>    "updatedAt": null,
>    "userId": 1,
>    "tweetId": 1,
>    "politicianId": 1,
>    "tweet": {
>      "id": 1,
>      "name": "Mauricio Giordano",
>      "username": "mauriciogior",
>      "picture": "https://pbs.twimg.com/profile_images/378800000388596881/9f63214014e1185735743748d07a2093_bigger.jpeg",
>      "text": "As ruas estão tudo quebradas!!! EH MOLE?",
>      "createdAt": null,
>      "updatedAt": null,
>      "politicianId": 1
>    },
>    "politician": {
>      "id": 1,
>      "name": "João Dória Júnior",
>      "picture": "https://cdn.eleicoes2016.com.br/foto/jo/ao/joao-doria-l.jpg",
>      "office": "Prefeito",
>      "createdAt": null,
>      "updatedAt": null,
>      "partyId": 1
>    }
>  }
>]
>```
