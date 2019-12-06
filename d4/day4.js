// 246540-787419:  Puzzle input

// Checks if a single password is valid
// Input is assumed to be 6 digits
function checkPassword( inputInt ){
	input = inputInt.toString();

	let adjacentDigits = false;

	for( let ii = 0; ii < input.length - 1; ii++ ){
		// Checks for adjacent duplicated digits
		if( input[ii] == input[ii+1] ) adjacentDigits = true;

		// Checks that digits increase
		if( input[ii] > input[ii+1] ) return false;
		
	}
	return adjacentDigits;
}

// Iterates through valid passwords and adds them to a list
validPasswords = [];
for( let ii = 246540; ii <= 787419; ii++ ){
	if( checkPassword(ii) ){
		validPasswords.push(ii);
	}
}
console.log( validPasswords.length );



// Part two:  No larger groups
// Done recursively
function checkPartTwo( xInt ){
	let x = xInt.toString();

	let lengths = [];


	let ii = 0;
	let counter = 1;
	while( ii < x.length ){
		if( x[ii] == x[ii+1] ){
			ii++;
			counter++;
		} else {
			if( counter == 2 ) return true;
			counter = 1;
			ii++;
		}
	}
	return false;
}

let totalCount = 0;
validPasswords.forEach( function(x){
	if( checkPartTwo(x) ) totalCount++;
});
console.log( totalCount );
