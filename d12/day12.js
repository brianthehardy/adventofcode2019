

// Class for the planets
class Planet {
    constructor( startingCoordinates ) {
        this.coords = startingCoordinates;
        this.vel = [0, 0, 0];
    }

    // Takes a planet, and depending on the planet's position, updates the velocity
    updateVelocity( planet, dim ){

      // If not dimension specified
      if( dim == undefined ){
        for( let ii in this.coords ){
          if( this.coords[ii] < planet.coords[ii] ){
            this.vel[ii]++;
          } else if( this.coords[ii] > planet.coords[ii] ) {
            this.vel[ii]--;
          }
        }
        return;
      }

      // If a dimension is specified
      else{
        if( this.coords[dim] < planet.coords[dim] ) this.vel[dim]++;
        else if( this.coords[dim] > planet.coords[dim] ) this.vel[dim]--;
      }

    }

    updatePosition(){
      for( let ii in this.coords ){
        this.coords[ii] += this.vel[ii];
      }
    }

    getEnergy(){
      let pot = 0;
      let kin = 0;
      for( let ii in this.coords ){
        pot += Math.abs( this.coords[ii] );
        kin += Math.abs( this.vel[ii] );
      }
      return pot * kin;
    }

    toString(){
      return "<" + this.coords[0] + ", " + this.coords[1] + ", " + this.coords[2] + 
        ">| " + this.vel[0] + "," + this.vel[1] + "," + this.vel[2];
    }

    equals( planet ){
      for( let ii in this.coords ){
        if( this.coords[ii] != planet.coords[ii] || this.vel[ii] != planet.vel[ii] ) return false;
      }

      return true;
    }

}


// Part 1
let inputPositions;


// My input
// inputPositions = [
//   [4, 12, 13],
//   [-9, 14, -3],
//   [-7, -1, 2],
//   [-11, 17, -1]
// ];


// Example input
inputPositions = [
  [-1, 0, 2],
  [2, -10, -7],
  [4, -8, 8],
  [3, 5, -1]
]

// Second example input
// inputPositions = [
//   [-8, -10, 0],
//   [5, 5, 10],
//   [2, -7, 3],
//   [9, -8, -3]
// ]

// Creates the new planets
let planets = [];
for( let ii in inputPositions ){
  planets.push( new Planet( inputPositions[ii] ) );
}

// Updates 1000 times
for( let updates = 0; updates < 1000; updates++ ){

  // Updates all the velocities
  for( let ii in planets ){
    for( let jj in planets ){
      planets[ii].updateVelocity( planets[jj] );
    }
  }

  // Updates all the positions after velocities
  for( let ii in planets ){
    planets[ii].updatePosition();
  }
  
}


let totalEnergy = 0;
for( let ii in planets ){
  totalEnergy += planets[ii].getEnergy();
}
console.log(totalEnergy)



// Part 2:  Returning to previous state


// My input
inputPositions = [
  [4, 12, 13],
  [-9, 14, -3],
  [-7, -1, 2],
  [-11, 17, -1]
];


// Example input
// inputPositions = [
//   [-1, 0, 2],
//   [2, -10, -7],
//   [4, -8, 8],
//   [3, 5, -1]
// ]

// Second example input
// inputPositions = [
//   [-8, -10, 0],
//   [5, 5, 10],
//   [2, -7, 3],
//   [9, -8, -3]
// ]

// Refreshes planets
planets = [];
for( let ii in inputPositions ){
  planets.push( new Planet(inputPositions[ii]) );
}

let initState = planets.toString();
console.log( planets.toString() );

let states = new Set();
states.add(planets.toString() );


// Methodology:  Run this 3 times, once for axis = 0, 1, and 2
// Find the least-common multiple of those three numbers
// Theory:  The place where three rotating bodies will all sync up again
// is the location where they all started
let axis = 0;
let ii = 0;
while( true ){
  // Updates the velocities in x
  for( let ii in planets ){
    for( let jj in planets ){
      planets[ii].updateVelocity( planets[jj], axis);
    }
  }

  // Updates all the positions after velocities
  for( let ii in planets ){
    planets[ii].updatePosition();
  }
  

  ii++;
  
  // if( states.has( planets.toString() ) ){
  if( initState == planets.toString() ){
    console.log( ii );
    console.log( planets.toString() );
    break;
  } else {
    states.add(planets.toString());
  }


  if( ii % 100000 == 0 ) console.log(ii);

}

// console.log( planets );



/*
// Brute force didn't work
let ii = 0;
while( true ){

  // Updates all the velocities
  for( let ii in planets ){
    for( let jj in planets ){
      planets[ii].updateVelocity( planets[jj] );
    }
  }

  // Updates all the positions after velocities
  for( let ii in planets ){
    planets[ii].updatePosition();
  }
  

  ii++;
  
  if( states.has( planets.toString() ) ){
    console.log( ii );
    break;
  } else {
    states.add(planets.toString());
  }


  if( ii % 100000 == 0 ) console.log(ii);

}
*/















