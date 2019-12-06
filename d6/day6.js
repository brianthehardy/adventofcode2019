verbose = 1;

var fs = require("fs");
rawText = fs.readFileSync( 'day6.txt' ).toString().split('\n');

// lg( rawText )

let orbits = {
	"COM":  ""
};

// Adds all orbits to a hashmap
rawText.forEach( function( x ){

	let parent = x.split(')')[0];
	let child = x.split(')')[1];

	orbits[child] = parent;
});

for( key in orbits ){

}

// Calculates the distance from COM recursively
function calculateOrbits( planet ){
	if( planet == "COM" ) return 0;
	return 1 + calculateOrbits( orbits[planet] );
}

// Calculates number of orbits for each object and sums them
let totalCount = 0;
for( key in orbits ){
	totalCount += calculateOrbits(key);
}
console.log( totalCount );


// Part 2:  Finding SAN

// Both SAN and I will have a node in common, so we can trace our paths back to COM
// and where they intersect, we will have found the shortest (and only!) path

// Returns an array tracing the orbit back to COM
function buildPath( planet ){
	let returnPath = [];
	while( planet != "COM" ){
		returnPath.push( planet );
		planet = orbits[planet];
		console.log(planet)
	}
	return returnPath;
}

santaPath = buildPath("SAN");
selfPath = buildPath("YOU");

let minDistance = Infinity;
for( let ii = selfPath.length - 1; ii > 0; ii-- ){
	for( let jj = santaPath.length - 1; jj>0; jj-- ){
		if( selfPath[ii] == santaPath[jj] && ii + jj < minDistance ){
			minDisance = ii + jj - 2;
		}
	}
}
console.log(minDisance)



function lg( inputString ){
	outputString = "";
	if(verbose){
		for( let ii in arguments ){
			outputString += arguments[ii] += " ";
		}
		console.log(outputString);
	}
}
