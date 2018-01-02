
# Geokey
This is the implementation of the [geo:key Algorithim](https://www.linkedin.com/pulse/geokey-new-open-memorable-geocoding-system-jaime-olivares) built by Mason Wright

Example usage

Encoding: 
```
curl "http://localhost:8080/geokey/?lat=41.8781&lng=87.6298"

Outputting
>>> E6460:98EE0
```
Decoding: 
```
curl "http://localhost:8080/geokey/?key=E7D12:9A096"

Outputting
>>> {"lat":41.87805555555556,"lng":87.62972222222223}
```

Running the server

Clone this repository then run
```
node app.js
```
or insert the express route in to your existing appliction
```
app.get("/geokey/*", (req,res) => {
  if (req.query.lat && req.query.lng) {
    var lat = parseFloat(req.query.lat);
    var lng = parseFloat(req.query.lng);
    var latKey = (Math.floor((lat+90)*7200)).toString(16).toUpperCase();
    var rawLng = Math.floor(Math.abs(lng)*7200);
    var lngKey = rawLng.toString(16).toUpperCase();
    if (lng < 0) {
      lngKey = lngKey.toLowerCase();
    }
    res.end(latKey+":"+lngKey);
  } else if (req.query.key) {
    var keys = req.query.key.split(":");
    var lat = (parseInt(keys[0], 16)/7200)-90;
    var n = 1;
    if (keys[1].toUpperCase() != keys[1]) {
      n = -1;
    }
    var lng = (parseInt(keys[1], 16)/7200)*n;
    res.end(JSON.stringify({"lat": lat, "lng": lng}));
  }
});
```

The only dependency Geokey has is express