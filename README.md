##How do I?

* Install all dependencies ```make bootstrap```
* Run the application ```make start```
* Deploy ```make deploy```


##HTTP Endpoints

* ``GET /rooms``: List of rooms
* ``GET /rooms/:room/messages``: Messages in a room
* ``POST /rooms/:room/messages``: Post message to a room
* ``POST /rooms/:room/members/:email``: Join a room
* ``DELETE /rooms/:room/members/:email`` Loave a room

###Server events

* ``message``: A message has been sent
* ``room:left``: A user has left a room
* ``room:joined``: A user has joined a room
* ``room:created``: A new room has been created

###Message schema

```
{
  text: "Hello world",
  email: "foo@bar.com",
  timestamp: "2014-09-05T21:29:01.000Z"
}
```