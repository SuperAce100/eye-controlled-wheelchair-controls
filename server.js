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

var servo;
var startPosition = 120;
var min = 85;
var max = 155;
var timer = 400;


board.on("ready", function() {
  
  
  servo = new five.Servo({
    pin: 10,
    range: [min,max],
    center: true,
  });

  turnMotor = new five.Servo({
    pin: 9,
    range: [min,max],
    center: true,
  });
})




app.get('/direction/:direction', (req, res) => {
  
  direction = req.params.direction;

  console.log(direction);

  

  if (direction == 'forward') {
    // console.log("Servo to max");
    servo.to(min,timer/2);
    servo.to(min+1,timer*2);
    servo.to(startPosition,timer*9);
  } if (direction == 'backward') {
    // console.log("Servo to min");
    servo.to(max,timer/2);
    servo.to(max-1,timer*2);

    servo.to(startPosition,timer*9);
  } if (direction == 'right') {
    // console.log("Servo to max");
    turnMotor.to(min,timer/2);
    turnMotor.to(min+1,timer*2);
    turnMotor.to(startPosition,timer*9);
  } if (direction == 'left') {
    // console.log("Servo to min");
    turnMotor.to(max,timer/2);
    turnMotor.to(max-1,timer*2);
    turnMotor.to(startPosition,timer*9);
  }
  else {
    servo.to(startPosition,timer/2);
    turnMotor.to(startPosition,timer/2);

  }
  
  
  




  
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

