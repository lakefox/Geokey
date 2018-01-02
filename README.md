
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
