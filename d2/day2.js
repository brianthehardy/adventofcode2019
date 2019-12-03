var fs = require("fs");
rawText = fs.readFileSync( 'day2.txt' ).toString().split(',');

// console.log( rawText )

inputCommands = [];
rawText.forEach( function(x){
	inputCommands.push( parseInt(x) );
})

// console.log(inputCommands)
let originalInput = inputCommands.slice();

// Replace position 1 with 12, and position 2 with 2
inputCommands[1] = 12;
inputCommands[2] = 2;

// Run the program
function programRunner( input ){
	let ii = 0;
	let running = true;

	while( running ){
		// Add
		if( input[ii] == 1 ){
			
			let jj = input[ii + 3];
			let x = input[ii+1];
			let y = input[ii+2];
			// console.log("Command: ", input[ii], input[x], input[y], jj );
			input[jj] = input[x] + input[y];
			ii+=4
			// console.log("Result: ", input[jj] );
		}

		// Multiply
		 else if( input[ii] == 2 ){
		 	
		 	let jj = input[ii + 3]
			let x = input[ii+1];
			let y = input[ii+2];
			// console.log("Command: ", input[ii], input[x], input[y], jj );
		 	input[jj] = input[x] * input[y]
		 	ii+=4
			// console.log("Result: ", input[jj] );
		}

		// Error
		else if( input[ii] == 99 ) {
			// console.log( "Exiting at command ", ii );
			running = false;
		}

		else {
			// console.log( "something went wrong!" );
			running = false;
		}

	}

	return input;

}

let finalOutput = programRunner ( inputCommands );

console.log( finalOutput[0] );

// Part 2
console.log( "Staring noun, verb" );
for( let noun = 0; noun < 100; noun++ ){
	for( let verb = 0; verb < 100; verb ++ ){

		inputCommands = originalInput.slice();
		inputCommands[1] = noun;
		inputCommands[2] = verb;
		// console.log( inputCommands[0] );
		programRunner( inputCommands );
		// console.log( inputCommands[0] );
		if( inputCommands[0] == 19690720 ){
			console.log( "noun = ", noun, "verb = ", verb );
			console.log( "Soln = ", 100 * noun + verb );
		}

	}
}













/*




*/