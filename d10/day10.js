/*
5x5
.#..#
.....
#####
....#
...##

.#..#.....#####....#...##
*/

var fs = require("fs");
rawText = fs.readFileSync( 'day10.txt' ).toString().split('\n');


let dimensions = rawText.length;
// console.log(rawText);

// Creates a 2-d array with the input information
let viewField = rawText.slice();

// console.log( viewField );


// Creates array of coordinates of all asteroids
let aCoords = [];
for( let ii = 0; ii < viewField.length; ii++){
  for( let jj = 0; jj < viewField.length; jj++){
    if( isAsteroid( ii, jj, viewField ) ) {
      aCoords.push( [ii, jj] );
    }
  }
}


function findBlindspots( x, y, aField ){

  // Determines if two coordinates are on the same LOB from the observation station
  function sameLob( coords1, coords2 ){
    let x1 = coords1[0];
    let y1 = coords1[1];
    let lx1 = x1-x;
    let ly1 = y1-y;
    let h1 = Math.sqrt( Math.pow(lx1, 2) + Math.pow( ly1, 2));
   
    let x2 = coords2[0];
    let y2 = coords2[1];
    let lx2 = x2-x;
    let ly2 = y2-y;
    let h2 = Math.sqrt( Math.pow(lx2, 2) + Math.pow( ly2, 2) );
   
    // Need to do some checking because we cannot calculate the sin/cos of x / 0
    // If both coordinates are directly above/below of the obs. station
    // console.log( lx1, lx2, ly1, ly2);
    if( lx1 == 0 && lx2 == 0) {
      if( (ly1>0 && ly2>0) || (ly1<0 && ly2<0)){
        return true;
      }
      return false;
    }

    // If they're both directly left/right the station
    if( ly1 == 0 && ly2 == 0 ){
      if( (lx1>0 && lx2>0) || (lx1<0 && lx2<0)){
        return true;
      }
      return false;
    }

    // If the Sine and Cosine of the two points are the same, they are on the same LOB
    // console.log(Math.sin( ly1/h1 ), Math.sin( ly2/h2), Math.cos( lx1/h1), Math.cos( lx2/h2 )  );
    if( sameFloat(Math.sin( ly1/h1 ), Math.sin( ly2/h2)) 
      && sameFloat(Math.cos( lx1/h1), Math.cos( lx2/h2 ) ) 
      && sameFloat(Math.tan( ly1/lx1), Math.tan( ly2/lx2)) ){
      return true;
    } else {
      return false;
    }

    // helper function for compairing JavaScript's float values
    // Returns true if values are within 0.000001 of each other

    // 
    function sameFloat( a, b ){
      // console.log( Math.abs( a-b) )
      return ( Math.abs( a-b) < 0.0000000000001)
    }
  }

  // Function for returning Manhattan Distance
  function calcManDist( coordinate ){
    return ( Math.abs(coordinate[0] - x) + Math.abs(coordinate[1] - y) );
  }

  // Determines if the first set of coordinates will block the second set
  function blocked( coords1, coords2 ){

    // Can only be blocked if they're on the same LOB
    if( sameLob( coords1, coords2 ) ){

      // Can only be blocked if the first set is closer to the origin than the second set
      return calcManDist( coords1 ) < calcManDist( coords2 );

    }

    // Otherwise, return false
    return false;
  }

  // Using the above functions, determines which asteroids are visible from the origin station
  visibleAsteroids = [];

  // Checks each asteroid to see if it can be seen or not
  for( let jj in aField){
    // console.log( "Inspecting ", aField[jj] );

    let blockedView = false;

    // Don't inspect the asteroid the station is on
    if( x == aField[jj][0] && y == aField[jj][1] ) continue;

    // Checks against all current asteroids
    // Is it slow?  Yes.  Does it work?  Maybe...
    for( let ii in visibleAsteroids ){

      // console.log( "...against ", visibleAsteroids[ii] );

      // If this asteroid is blocked, then it will not be added
      if( blocked( visibleAsteroids[ii], aField[jj] ) ){
        blockedView = true;
      }

      // If the new asteroid blocks one in visibleAsteroids, replace that asteroid
      else if( blocked( aField[jj], visibleAsteroids[ii] ) ){
        // console.log("Replacing", visibleAsteroids[ii], "with", aField[jj])
        visibleAsteroids[ii] = aField[jj];
        blockedView = true;
        continue;
      }
    }

    // If the newly inspected asteroid is not blocked by any of the asteroids, add it
    if( !blockedView ){
      visibleAsteroids.push( aField[jj] );
      // console.log("Adding", aField[jj]);
    }

  };

  // console.log( visibleAsteroids.length) ;
  return visibleAsteroids;
}

// Checks if those coordinates contain an asteroid
function isAsteroid( x, y, field ){
  return field[x][y] == '#';
}


// console.log(findBlindspots( 3, 6, aCoords));



let numVis = [];
let bestView = [];
let bestx;
let besty;

/*
let max = 0;
for( let ii = 0; ii < dimensions; ii++ ){
  numVis.push( [] );
  for( let jj = 0; jj < dimensions; jj++ ){

    if ( isAsteroid( ii, jj, viewField ) ){
      let count = findBlindspots( ii, jj, aCoords).length;
      if( count > max ){
        max = count;
        bestView = findBlindspots(ii, jj, aCoords);
        bestx = ii;
        besty = jj;
      }
      numVis[ii].push( count );
    } else {
      numVis[ii].push(".");
    }
    
  }
}
console.log( "Max: ", max );
console.log( "Best x: ", bestx);
console.log( "Best y: ", besty);
*/


// Vaporization for Part 2:
// Vaporize in order of decreasing tangent values


// From part 1 calculations
bestx = 25;
besty = 37;

// example problem
// bestx = 13;
// besty = 11;

bestView = findBlindspots(bestx, besty, aCoords);
// console.log( bestx, besty );


// Orders all asteroids by destruction order
// where the "least" asteroid is destroyed first
bestView.sort( function( asteroid1, asteroid2 ){

  let x1 = asteroid1[0];
  let y1 = asteroid1[1];
  let lx1 = x1-bestx;
  let ly1 = y1-besty;

  let x2 = asteroid2[0];
  let y2 = asteroid2[1];
  let lx2 = x2-bestx;
  let ly2 = y2-besty;

  // Asteroids straight up will be destroyed first
  // if( lx1 == 0 && ly1 > 0){
  //   return 1;
  // } else if ( lx2 == 0 && ly2 > 0){
  //   return -1;
  // }

  return calcDegrees( lx1, ly1 ) - calcDegrees( lx2, ly2 ) ;

  // Helper function for calculating how many degrees from vertical
  // the coordinates are
  function calcDegrees( x, y ){

    // In the undefined regions
    if( x == 0 && y > 0 ) return 0;
    if( x == 0 && y < 0 ) return Math.PI;

    // Otherwise
    return Math.PI/2 - Math.atan2(y, x);

  }

});


bestView.forEach( function(a){
  console.log( a[1], a[0] )
})


let answers = [1, 2, 3, 10, 20, 50, 100, 199, 200, 201];
answers.forEach( function(x){
  console.log("Answers: " );
  console.log( bestView[x-1][1], bestView[x-1][0]);
})

console.log( bestView[200-1][1]*100 + bestView[200-1][0]);

/*

// Shows how many asteroids in each quadrant
let tot = 0;
for( let ii in dest ){
  console.log( ii, dest[ii].length);
  tot+= dest[ii].length;
}

// From above, the 200th asteroid is in quadrant 3
// Sort them in destruction order
// For this quadrant, that is in order of decreasing ratio of y/x
let q = dest[2];


let q1 = dest[0].length;
let q2 = dest[1].length;
let q3 = dest[2].length



for( let ii = 0; ii < 200 - q1 - q2; ii++ ){
  console.log( "The", ii+q1+q2+1, "at", q[ii], "(", q[ii][0]-bestx, ",", q[ii][1] - besty,
    "is", q[ii][0]*100 + q[ii][1]);

}
*/



// 158 too low
// 604X
// 1012X
// 1210X

//1901X

// 1418 too high
// 1814 too high


