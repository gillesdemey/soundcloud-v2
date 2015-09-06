# SoundCloud v2 API

Client for SoundCloud's API v2

## Usage

Create a new SoundCloud client.

```javascript
var client = new SoundCloud({
  access_token: 'oauth-token',
  client_id: 'client-id',
  app_version: 'v1.0.0' // optional
})
```

Call the libraries API, followed by an HTTP method. Supported methods are `get`, `post`, `put` and `delete`.

You can chain multiple functions if they're nested resources.

After calling an HTTP method, you are returned a Promise object.

```javascript
client
  .tracks({ id: 222053868 })
  .related({ limit: 1 })
  .get()
  // working with a Promise object here
  .then(function (res) {
    console.log(res.body.collection[0].title)
  })
  .catch(function (err) {
    console.error(err)
  })
```

### API

#### Me
```javascript
client
  .me()
```

#### Activities
```javascript
client
  .activities()
```

#### Stream
```javascript
client
  .stream({ limit: 5 })
```

#### Tracks

```javascript
client
  .tracks({ id: 222053868 })
```

##### Related
```javascript
client
  .tracks({ id: 222053868 })
  .related({ limit: 1 })
```
