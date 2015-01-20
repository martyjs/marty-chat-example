##How do I?

* Install all dependencies ```make bootstrap```
* Run the application ```make start```
* Deploy ```make deploy```


##HTTP Endpoints

* ``GET /rooms``: List of rooms
* ``GET /rooms/:roomId``: Get room
* ``GET /rooms/:roomId/messages``: Messages in a room
* ``POST /rooms/:roomId/messages``: Post message to a room

###Server events

* ``message``: A message has been sent
* ``room:created``: A new room has been created

###Message schema

```
{
  text: "Hello world",
  timestamp: "2014-09-05T21:29:01.000Z",
  roomId: "8a720550-a09f-11e4-b472-c7ff2cae8c5f"
}
```