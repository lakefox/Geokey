const app = require("express")();
const http = require("http").Server(app);
const base32 = require('base32');

// /geokey/lat,long
// /geokey/?lat=38.518093&lng=-93.529903
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

http.listen(8080, ()=>{
  console.log('listening on http://localhost:8080');
});
