verbose = 1;
programInput = 5;

var fs = require("fs");
var readline = require('readline');
rawText = fs.readFileSync( 'day5.txt' ).toString().split(',');

// outputLog( rawText )


inputCommands = [];
rawText.forEach( function(x){
	inputCommands.push( parseInt(x) );
})

// outputLog(inputCommands)
let originalInput = inputCommands.slice();	// Duplicates the input commands


// Run the program
function programRunner( input ){
	let ii = 0;
	let running = true;

	while( running ){
		
		// Variable for the instruction and parameters
		let instruction = 0;
		let p1 = 0;
		let p2 = 0;
		let p3 = 0;

		// Parses the instruction
		let commandString = input[ii].toString();
		if( commandString.length > 1 ){
			// Prepends 0's
			if( commandString.length == 5 ){
				console.log("\nCommand of length 5\n");
			}
			while( commandString.length < 5 ){
				commandString = "0" + commandString;
			}

			instruction = parseInt( commandString.slice(3) );
			p1 = parseInt(commandString[2]);
			p2 = parseInt(commandString[1]);
			p3 = parseInt(commandString[0]);

			
		}

		// Else, all commands are immediate
		else{
			instruction = input[ii];
		}

		// Turns all references-mode parameters into immediate-mode parameters
		if( p1 == 0 ){
			p1 = input[input[ ii+1 ]];
		} else {
			p1 = input[ii+1];
		}

		if( p2 == 0 ){
			p2 = input[input[ ii+2 ]];
		} else {
			p2 = input[ii+2];
		}

		if (p3 == 0){
			p3 = input[ ii+3 ];
		} else {
			p3 = input[ii+3];
		}



		outputLog( "Executing instruction", ii, ":", instruction, p1, p2, p3, "(", input[ii], ")" );

		// OPCODE 1:  Add
		if( instruction == 1 ){
			
			let jj = input[ii + 3];
			let x = input[ii+1];
			let y = input[ii+2];
			// outputLog("Command: ", input[ii], input[x], input[y], jj );
			input[ p3 ] = p2 + p1;
			outputLog(p1, "+", p2, "in location", p3 );
			ii+=4
			// outputLog("Result: ", input[jj] );
		}

		// OPCODE 2:  Multiply
		 else if( instruction == 2 ){
		 	
		 	let jj = input[ii + 3]
			let x = input[ii+1];
			let y = input[ii+2];
			// outputLog("Command: ", input[ii], input[x], input[y], jj );
		 	// input[jj] = input[x] * input[y]
			input[ p3 ] = p1 * p2;
			outputLog(p1, "*", p2, "in location", p3 );
		 	ii+=4
			// outputLog("Result: ", input[jj] );
		}

		// OPCODE 3:  Takes a single integer as input, and stores it at the given address
		else if( instruction == 3 ){
			outputLog( "Please input a number: ");
			consoleInput = programInput; // for now
			let destination = input[ii+1];
			outputLog( "Storing", consoleInput, "in", destination);
			input[destination] = consoleInput;
			ii+=2;
		}

		// OPCODE 4:  Prints the output at the given address
		else if( instruction == 4 ){
			console.log( "Output: ", p1 );
			ii+=2;
		}

		// OPCODE 5:  JUMP IF TRUE
		// If the first parameter is non-zero, it sets the instruction pointer to the 
		// value from the second parameter. Otherwise, it does nothing.
		else if( instruction == 5 ){
			if( p1 != 0){
				ii = p2;
			} else {
				ii+=3;
			}
		}

		// OPCODE 6:  JUMP IF FALSE
		// if the first parameter is zero, it sets the instruction pointer to the value from the 
		// second parameter. Otherwise, it does nothing.
		else if( instruction == 6 ){
			if( p1 == 0 ){
				ii = p2;
			} else {
				ii+=3;
			}
		}

		// Opcode 7:  Less Than
		// if the first parameter is less than the second parameter, 
		// it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
		else if( instruction == 7 ){
			if( p1 < p2 ){
				input[p3] = 1;
			} else {
				input[p3] = 0;
			}
			ii+=4;
		}

		// Opcode 8: Equal To
		// If p1 == p2, store 1 in p3
		// Otherwise, store 0
		else if( instruction == 8 ){
			if( p1 == p2 ){
				input[p3] = 1;
			} else {
				input[p3] = 0;
			}
			ii+=4;
		}

		// Error
		else if( input[ii] == 99 ) {
			outputLog( "Exit code 99 at command ", ii );
			running = false;
		}

		else {
			outputLog( "Something went wrong!" );
			running = false;
		}

	}

	return input;
}

let finalOutput = programRunner ( inputCommands );


function outputLog( inputString ){
	outputString = "";
	if(verbose){
		for( let ii in arguments ){
			outputString += arguments[ii] += " ";
		}
		console.log(outputString);
	}
}
2369720
// 2697644 too high
