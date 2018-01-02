const app = require("express")();
const http = require("http").Server(app);
const base32 = require('base32');

// /geokey/lat,long
// /geokey/?lat=38.518093&lng=-93.529903
app.get("/geokey/*", (req,res) => {
  var lat = parseInt(req.query.lat);
  var lng = parseInt(req.query.lng);
  var latKey = (Math.floor((lat+90)*7200)).toString(16).toUpperCase();
  var rawLng = Math.floor(Math.abs(lng)*7200);
  var lngKey = rawLng.toString(16).toUpperCase();
  if (lng < 0) {
    lngKey = lngKey.toLowerCase();
  }
  res.end(latKey+":"+lngKey)
});

http.listen(8080, ()=>{
  console.log('listening on http://localhost:8080');
});
