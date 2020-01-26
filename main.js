var running = false;

//PART 1 : BIKE MOVING
const bike = document.getElementById("bike-character");
const mainContent = document.getElementById("main-content");

const player = {
  x: 0,
  y: 0,
  direction: "right"
};

window.onkeydown = movePlayer;

function movePlayer(e) {
  if (e.keyCode == "37") {
    changeDirection("right")
  };
  if (e.keyCode == "39") {
    changeDirection("left")
  };
}

function changeDirection(direction) {
  if (direction == "right") {
    player.x += 70;
    player.direction = 180;
  } else {
    player.x -= 70;
    player.direction = 0;
  }
}

function updateCharacter(bike, player) {
  bike.style.transform = `rotateY(${player.direction}deg) translate(${
      player.direction === 0 ? -player.x : player.x
    }px,${-player.y}px)`;
}

//PART 2 : FALLING OBJECTS

const pedestrian = document.querySelectorAll(".pedestrian");
const car = document.querySelectorAll(".car");
const scooter = document.querySelectorAll(".scooter");
const start_btn = document.getElementById("play");


function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// checker si ce nb aleatoire est deja dans les x
// array de x 
// si ce x est contenu dans l'array, regenere un new x

// var previous;

// function generateXvalue(max, min, previous) {
//   var newX = Math.round(Math.random() * (max - min) + min);
//   if (newX === previous) {  
//     return Math.round(Math.random() * (max - min) + min)
//   } 
//   return newX;
// }

// var xArray = [2,3];
// ​
// function getRandomArbitrary(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }
// ​
// function getNewCoordinates() {
//   var newX
//   do {
//     newX = getRandomArbitrary(5,0)
//   } while (xArray.includes(newX))
//   xArray.push(newX);
// }

  // do {
  // var newX = Number(Math.round(Math.random() * (max - min) + min));
  // console.log("la:",newX);
  // previousX = newX
  // // console.log("ici:",newX);
  // }
  // while (previousX !== newX);
// }

// generateXvalue(5, 0, 0);
// generateXvalue(5,0,generateXvalue(5, 0, 0))


class Obstacles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  movedownwards() {
    this.y += 3;

  }
}

class Cars extends Obstacles {
  constructor(x, y) {
    super(x, y);
    // console.log("x, y");
    // console.log(x, y);

    this.element = document.createElement("div");
    this.element.className = "car";
    this.element.style.transform = `translate(${this.x}px,${this.y}px)`;
    mainContent.appendChild(this.element);
    // console.log(this.element);
  }

  update() {
    if (this.y < 700) {
      this.movedownwards();
      this.element.style.transform = `translateY(${this.y}px`;
    } else {
      this.y = -100;
      // this.element.classList.add("hidden")
    }
  }
  movedownwards() {
    this.y += 3.5;
  }
}

class Pedestrians extends Obstacles {
  constructor(x, y) {
    super(x, y);

    this.element = document.createElement("div");
    this.element.className = "pedestrian";
    this.element.style.transform = `translateX(${this.x}px)`;
    this.element.style.transform = `translateY(${this.y}px)`;
    mainContent.appendChild(this.element);
    // console.log(this.element);
  }

  update() {
    if (this.y < 650) {
      this.movedownwards();
      this.element.style.transform = `translateY(${this.y}px`;
    } else {
      this.y = -100;
      // this.element.classList.add("hidden")
    }
  }
  movedownwards() {
    this.y += 1;
  }
}

class Scooters extends Obstacles {
  constructor(x, y) {
    super(x, y);
    // console.log("x, y");
    // console.log(x, y);
    this.element = document.createElement("div");
    this.element.className = "scooter";
    this.element.style.transform = `translateX(${this.x}px)`;
    this.element.style.transform = `translateY(${this.y}px)`;
    mainContent.appendChild(this.element);
    // console.log(this.element);
  }
  update() {
    if (this.y < 650) {
      this.movedownwards();
      this.element.style.transform = `translateY(${this.y}px`;
    } else {
      this.y = -100;
      // this.element.classList.add("hidden")
    }
  }
  movedownwards() {
    this.y += 2.5;
  }
}

var CarsList = [];
for (let i = 0; i < 3; i++) {
  CarsList.push(new Cars(random(10, 100), 0));
}

var PedestriansList = [];
for (let i = 0; i < 3; i++) {
  PedestriansList.push(new Pedestrians(random(10, 100), 0));
}

var ScootersList = [];
for (let i = 0; i < 3; i++) {
  ScootersList.push(new Scooters(random(10, 100), 0));
}

var fullList = [];
fullList = CarsList.concat(PedestriansList, ScootersList);
// console.log(fullList);


function getrandomcharacters() {
  var result = [];
  for (let i = 0; i < fullList.length; i++) {
    result.push(fullList[Math.floor(Math.random() * fullList.length)]);
  }
  return result;
}

// PART 3 COLLISION

function collisionDetection() {
  const rect1 = bike.getBoundingClientRect();

  for (let i = 0; i < fullList.length; i++) {
    // const currentObstacleMetrics = fullList[i].element.getBoundingClientRect();
    const rect2 = fullList[i].element.getBoundingClientRect();
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y) {
      alert("YOU GOT HIT BY TRAFFIC!! TRY AGAIN");
      document.location.reload();
      clearInterval(interval);
    }
  }
}

// PART 4 TIMER
var currentTime;
const time = document.getElementById("timer");

var timeLeft = 31;
function startTimer() {
  if (timeLeft > 0) {
  timeLeft -= 1;
  time.innerHTML = `<h1>Timer : ${timeLeft}</h1>`;
  }
  else {
    // time.textContent = "Yay you survived!";
    var winning = document.createElement("div");
    winning.className = "winning";
    mainContent.appendChild(winning);
    winning.innerHTML = `<h2>"Yay you survived a massive attack!"</h1>`;
    // stop game
  }
}

// PART 5 LAUNCH OF GAME

// start_btn.onclick = function start() {
// }

const draw = () => {

  updateCharacter(bike, player);

  var randomArray = getrandomcharacters()
  randomArray.forEach(char => {
    if (char.element.className == "car") {
      char.update();
    };
    if (char.element.className == "pedestrian") {
      char.update();
    };
    if (char.element.className == "scooter") {
      char.update();
    }
  })
  collisionDetection();
  requestAnimationFrame(draw);
}

start_btn.onclick = function() {
  if(running) { return }
  running = true;

  currentTime = setInterval(startTimer, 1000);

  requestAnimationFrame(draw);
};

// function setBG(){
//   if (Math.round(Math.random())){
//     return pedestrian;
//   } else {
//     return car;
//   }
// }

//   function dropObjects(){
//     var length = random(100, ($("#main-content").width() - 100));
//     var velocity = random(850, 10000);
//     var thisObject = $("<div/>", {
//       class: "obstacle",
//       style : transform " +velocity+ "ms linear;"
//     });


// PART 6  RULES

const rules = document.getElementById("rules");
const about = document.getElementById("about");

rules.onclick = makeRulesAppear;
about.onclick = makeAboutAppear;


function makeRulesAppear() {
  var rulebox = document.createElement("div");
  rulebox.style.backgroundColor = "purple";
  rulebox.style.width = "300px";
  rulebox.style.height = "180px";
  rulebox.style.position = "absolute";
  rulebox.style.left = "530px";
  rulebox.style.top = "300px";
  rulebox.style.padding = "10px";
  rulebox.style.zIndex = 2;
  mainContent.appendChild(rulebox);
  rulebox.innerHTML = `<h3>Simple rule</h3><br><p>Escape the cars, scooters and pedestrians by clicking on left and right arrows. You have 45 sec to survive!!</p><i class="far fa-window-close"></i>`;
  document.querySelector(".fa-window-close").onclick = function() {
    rulebox.remove();
  }
}

function makeAboutAppear() {
  var aboutBox = document.createElement("div");
  aboutBox.style.backgroundColor = "purple";
  aboutBox.style.width = "300px";
  aboutBox.style.height = "180px";
  aboutBox.style.position = "absolute";
  aboutBox.style.left = "530px";
  aboutBox.style.top = "300px";
  aboutBox.style.padding = "10px";
  aboutBox.style.zIndex = 2;
  mainContent.appendChild(aboutBox);
  aboutBox.innerHTML = `<h3>About</h3><br><p>This game was created by Coline Velard.</p><br><p>Please be lenient as this is my first project in web development.</p><br><p>Credit for the song("Flying") goes to The City of Prague Philharmonic Orchestra.</p><i class="far fa-window-close"></i>`;
  document.querySelector(".fa-window-close").onclick = function() {
    aboutBox.remove();
  }
}