verbose = 1;
programInput = 5;

var fs = require("fs");
var readline = require('readline');
rawText = fs.readFileSync( 'day7.txt' ).toString().split(',');

// outputLog( rawText )


inputCommands = [];
rawText.forEach( function(x){
	inputCommands.push( parseInt(x) );
})

// outputLog(inputCommands)
let originalInput = inputCommands.slice();	// Duplicates the input commands


// Run the program
function programRunner( input, userInputs, ii ){
	// let ii = intructionCounter;
	let inputCounter = 0;
	let running = true;
	let output = [];

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
			consoleInput = parseInt(userInputs[inputCounter]);
			outputLog( "You input: ", consoleInput, "using input counter", inputCounter, "from", userInputs);
			console.log( userInputs.length );
			if( inputCounter >= userInputs.length - 1 ){
				inputCount = userInputs.length - 1;
			} else {
				inputCounter++;
			}

			let destination = input[ii+1];
			outputLog( "Storing", consoleInput, "in", destination);
			input[destination] = consoleInput;
			ii+=2;
		}

		// OPCODE 4:  Prints the output at the given address
		else if( instruction == 4 ){
			console.log( "Output: ", p1 );
			output.push(p1);
			ii+=2;
			return[ input, p1, ii] // Only for this day
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
			return[ input, false] // Only for this day
		}

		else {
			outputLog( "Something went wrong!" );
			running = false;
		}

	}

	return [input, output];
}

// Generates all permutations of 0, 1, 2, 3, 4
let potentialInputs = [];
let ampInputs = ["0", "1", "2", "3", "4"];
potentialInputs = generatePermutations(ampInputs);


// Runs the program 5 times, refreshed before each run, with a new input
// First input is 0, then all the rest are determined from the amplifier permutations
let highestOutput = 0;
let winningCommand = "";
let finalOutput;

// potentialInputs = ["20143", "01234", "43210"];

/*
potentialInputs.forEach( function( x ){
	let ampInput = 0;
	// x is the list of phase settings, used as the first input

	// Run program once for each amp input
	for( let ii = 0; ii < 5; ii++ ){

		// Phase Setting, Amp Input
		let userInputs = [ x[ii], ampInput ];
		console.log( "user inputs:", userInputs)
		// Runs the program
		let output = programRunner( inputCommands, userInputs );

		// Uses the output of this amp for the next amp
		ampInput = output[1][0];
		finalOutput = ampInput;

		console.log( "Intermediate output: ", output[1] );

		// Refreshes the input commands
		inputCommands = originalInput.slice();
	}

	console.log("Final output: ", finalOutput );
	
	// Finally, checks if this was the highest output overall
	if( finalOutput > highestOutput ){
		console.log( finalOutput );
		highestOutput = finalOutput;
		winningCommand = x;
	}
	
});
console.log( highestOutput, winningCommand )
*/



// Part two:  using 5 through 9

// Generates all permutations of 5, 6, 7, 8, 9
ampInputs = ["5", "6", "7", "8", "9"];
potentialInputs = generatePermutations(ampInputs);

// Runs the program unlimited times, commands NOT refreshed before each run
// First input is 0, then all the rest are determined from the amplifier permutations
// State is maintained between runs, however
highestOutput = 0;
winningCommand = "";
finalOutput = 0;

// potentialInputs = ["98765", "56789", "97856"];


// Run each potential input to conclusion
potentialInputs.forEach( function( x ){
	let ampInput = 0;
	// x is the list of phase settings, used as the first input

	// Stores instruction state from one run to the next
	// Also stores the instruction pointer
	let instructionStates = [];
	for( let ii = 0; ii < 5; ii++ ){
		instructionStates.push( [originalInput.slice(), 0] );
	}



	// Run program
	let programRunning = true;
	for( let ii = 0; ii < 50; ii++ ){
		console.log( "\nRunning machine", (ii)%5, "at instruction", instructionStates[ii%5][1] );
		// Provides the phase setting once
		// Only the output of the last amp otherwise
		let userInputs;
		if( ii < 5 ){
			// Phase Setting, Amp Input
			userInputs = [ x[ii], ampInput ];
		} else {
			userInputs = [ampInput];
		}

		inputCommands = instructionStates[ii%5][0];
		programCounter = instructionStates[ii%5][1];

		// Runs the program
		let output = programRunner( inputCommands, userInputs, programCounter );

		// Checks that the program is still running
		programRunning = programRunning && output[1];

		if( programRunning ){
			// Uses the output of this amp for the next amp
			ampInput = output[1];
			finalOutput = ampInput;
			instructionStates[ii%5][0] = output[0];
			instructionStates[ii%5][1] = output[2];
		}

	}

	console.log("Final output: ", finalOutput );
	
	// Finally, checks if this was the highest output overall
	if( finalOutput > highestOutput ){
		// console.log( finalOutput );
		highestOutput = finalOutput;
		winningCommand = x;
	}

	
});

console.log( highestOutput, winningCommand )




function generatePermutations( allInputs ){
	let returnArray = [];
	if( allInputs.length == 1 ) return allInputs[0];

	let heldOut = allInputs[0];
	let smallerInputs = generatePermutations( allInputs.slice(1) );

	for( let ii in smallerInputs ){
		for( let jj in smallerInputs[ii]+1 ){
			returnArray.push( smallerInputs[ii].slice(0, jj) + heldOut + smallerInputs[ii].slice(jj) );
		}
	}


	return returnArray;
}


function outputLog( inputString ){
	outputString = "";
	if(verbose){
		for( let ii in arguments ){
			outputString += arguments[ii] += " ";
		}
		console.log(outputString);
	}
}



