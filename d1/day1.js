var fs = require("fs");
rawText = fs.readFileSync( 'day1.txt' ).toString().split('\n');

// console.log( rawText )

function getFuel( m ){
	let f = Math.floor( parseInt(m)/3 ) - 2 ;
	if( f > 0 ) return f;
	return 0;
}

let extraFuelMass = 0;
fuelMass = rawText.forEach( function (m) {
	sectionMass = getFuel(m);
	extraFuelMass += sectionMass;

	return sectionMass;
});

console.log( extraFuelMass );



// Part 2
function calculateTotalFuel( moduleMass ){

	if( getFuel( moduleMass ) <= 0 ) return 0;
	else {
		return getFuel(moduleMass) + calculateTotalFuel( getFuel( moduleMass) );
	}

}

finalFuelMass = 0;
rawText.forEach( function(m) {
	finalFuelMass += calculateTotalFuel( parseInt(m) );
});


console.log( calculateTotalFuel( 1969 ) );  // 966
console.log( calculateTotalFuel (100756) );  // 50346
console.log( finalFuelMass );








/*
Part 1:  3210097

1605005 too low
1605006 x

4812287

4815101 x
4815103/2 too high
*/