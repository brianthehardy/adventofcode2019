var fs = require("fs");
rawText = fs.readFileSync( 'day3.txt' ).toString().split('\n');

// console.log( rawText )

// Keeps track of coordinates
let wireOne = [];
let wireTwo = [];

// Variables for each wire's instructions
let first = rawText[0].split(',');
let second = rawText[1].split(',');

/*
Function that builds an array of all the coordinates a wire will run through
*/
function buildCoordinates( wireCommands ){
	let coordinates = [];
	let x = 0;
	let y = 0;

	// Iterates over each command
	for( let ii = 0; ii < wireCommands.length; ii++ ){
		let nextCommand = wireCommands[ii];
		let direction = nextCommand[0];
		let amount = parseInt( nextCommand.slice(1) );
		// console.log( nextCommand, direction, amount );

		// Adds these coordinates to the wire's array
		for( let jj = 0; jj < amount; jj++ ){
			coordinates.push([x, y])
			if( direction == "R" ) x++;
			if( direction == "L" ) x--;
			if( direction == "U" ) y--;
			if( direction == "D" ) y++;
		}
	}
	return coordinates;
}

console.log("Building One" )
wireOne = buildCoordinates(first);
console.log("Building Two" )
wireTwo = buildCoordinates(second);

// Finds which coordinates match and returns them
// Additionally finds the fewest steps
function findIntersections( firstArray, secondArray ){
	let matchingCoordinates = [];
	let fewestX = Infinity;
	let fewestY = Infinity;
	for( let ii = 0; ii < firstArray.length; ii++ ){
		for( let jj = 0; jj < secondArray.length; jj++ ){
			if( firstArray[ii][0] == secondArray[jj][0] && firstArray[ii][1] == secondArray[jj][1] ){
				matchingCoordinates.push( firstArray[ii] );
				if( ii + jj < fewestX + fewestY && ii + jj > 0 ){
					fewestX = ii;
					fewestY = jj;
				}
			}
		}
	}
	console.log( "fewestSteps=", fewestX+fewestY );
	return matchingCoordinates;
}

console.log("Finding Intersections of arrays sized", wireOne.length, "and", wireTwo.length )
let intersections = findIntersections( wireOne, wireTwo );

// Function for returning Manhattan Distance
// Returns Infinity for the origin
function calcManDist( coordinate ){
	if( coordinate[0] == 0 && coordinate[1] == 0 ) return Infinity;
	return ( Math.abs(coordinate[0]) + Math.abs(coordinate[1]) );
}

// console.log( wireOne );
// console.log( wireTwo );
// console.log( intersections );

console.log("Finding Distance" )
// Finds the lowest manhattan distance
leastDist = Infinity;
for( let ii = 0; ii < intersections.length; ii++ ){
	if( calcManDist( intersections[ii] ) < leastDist ){
		leastDist = calcManDist(intersections[ii])
	}
}

console.log( leastDist );


// Part 2:  Finding seconds to each intersection
