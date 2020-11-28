const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static("express"));
var five = require("johnny-five");


// default URL for website
app.use('/web/', function(req,res){
  res.sendFile(path.join(__dirname+'/express/index.html'));
  //__dirname : It will resolve to your project folder.
});
var board = new five.Board();
app.get('/direction/:direction', (req, res) => {
  
  var pin = 0;
  const forwardpin = 4;
  const backwardpin = 8;
  const leftpin = 7;
  const rightpin = 12;


  direction = req.params.direction;

  console.log(direction);

  switch (direction) {
    case ('forward') : pin = forwardpin; break;
    case ('backward') : pin = backwardpin; break;
    case ('left') : pin = leftpin; break;
    case ('right') : pin = rightpin; break;
    default :
      console.log("not forward");
    
  }

  console.log("pin", pin)

  var chosenpin = new five.Pin(pin);
  
  chosenpin.query(function(state) {
    console.log(state.value);
    if (state.value == 0){
      chosenpin.high();
    }
    else {
      chosenpin.low();
    }
  });
  




  
  // board.on("ready", function() {
  //   console.log("board is ready");
        
  // });

  return res.send(
    {"done":`GET HTTP method on user/${req.params.direction} resource`}
  );
});

const server = http.createServer(app);
const port = 8080;
server.listen(port);
console.debug('Server listening on port ' + port);

