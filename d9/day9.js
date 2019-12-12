
var fs = require("fs");
rawText = fs.readFileSync( 'day9.txt' ).toString().split(',');

verbose = 0;
programInput = 5;

// outputLog( rawText )


inputCommands = [];
rawText.forEach( function(x){
  inputCommands.push( parseInt(x) );
});

// outputLog(inputCommands)
let originalInput = inputCommands.slice(); // Duplicates the input commands

console.log("\nWelcome to Windows");
programRunner( inputCommands, [2] );


// Run the program
function programRunner( instructions, userInputs, ip ){

  // Initializes some memory
  let memorySize = 1000;
  for( let ii = 0; ii < memorySize; ii++ ){
    instructions.push(0);
  }

  // If no instruction pointer is given, intializes it at the beginning
  if( ip == undefined ){
    ip = 0;
  }

  let inputCounter = 0;
  let running = true;
  let output = [];
  let relativeBase = 0;


// Function for accessing a location in memory
// Mode 0:  By index
// Mode 1:  Immediate
// Mode 2:  Relative
// If no value is specified, it is a read command.  If a value is specified, it's a write command
  function memoryAccess( mode, loc, val ){
    // console.log(instructions);
    // console.log( "Mode: ", mode, "|Loc: ", loc, "|Val: ", val );
    // Checks if read or write command
    let write = false;
    if( val != undefined ){
      write = true;
    }
     
     // Mode 0:  Absolute
    if( mode == 0 ){
     
      // Read commands
      if( !write ){
        return instructions[loc];
   
      // Write commands
      } else {
        instructions[loc] = val;
        return;
      }
    }
   
    // Mode 1:  Immediate
    else if (mode == 1){
      return loc;
    }
   
   
    // Mode 2:  relativeBase mode
    else if( mode == 2){
      // Read command
      if( !write ){
        return instructions[ relativeBase + loc ];
      }

      // Write command
      else {
        instructions[loc + relativeBase] = val;
        return;
      }
    }


    console.log( "Something went wrong with memory access", mode, loc, val );
    throw new Error("Memory machine broke")
  }

  while( running ){
      
    // Variable for the instruction and parameters
    let instruction = 0;
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    let mode1 = 0;
    let mode2 = 0;
    let mode3 = 0;

    // Parses the instruction
    let commandString = instructions[ip].toString();
    if( commandString.length > 1 ){
      // Prepends 0's
      while( commandString.length < 5 ){
        commandString = "0" + commandString;
      }

      instruction = parseInt( commandString.slice(3) );
      mode1 = parseInt(commandString[2]);
      mode2 = parseInt(commandString[1]);
      mode3 = parseInt(commandString[0]);
    }

    // Else, all commands are immediate
    else{
      instruction = instructions[ip];
    }

    // Grabs the next 3 instructions
    // Could be parameters, or not.
    p1 = instructions[ip+1];
    p2 = instructions[ip+2];
    p3 = instructions[ip+3];
    // if( p1 == 0 ){
    //   p1 = instructions[instructions[ ip+1 ]];
    // } else {
    //   p1 = instructions[ip+1];
    // }

    // if( p2 == 0 ){
    //   p2 = instructions[instructions[ ip+2 ]];
    // } else {
    //   p2 = instructions[ip+2];
    // }

    // if (p3 == 0){
    //   p3 = instructions[ ip+3 ];
    // } else {
    //   p3 = instructions[ip+3];
    // }

    outputLog( "Executing instruction", ip,
    "(", relativeBase, ")", ":", instruction, p1, p2, p3, "(", instructions[ip], ")" );

    // OPCODE 1:  Add
    if( instruction == 1 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      memoryAccess( mode3, p3, x+y );
      outputLog(x, "+", y, "in location", p3 );
      ip+=4;
    }

    // OPCODE 2:  Multiply
     else if( instruction == 2 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      memoryAccess( mode3, p3, x*y );
      outputLog(x, "*", y, "in location", p3 );
      ip+=4;
    }

    // OPCODE 3:  Takes a single integer as input, and stores it at the given address
    else if( instruction == 3 ){
      outputLog( "Please input a number: ");
      consoleInput = parseInt(userInputs[inputCounter]);
      outputLog( "You input: ", consoleInput, "using input counter", inputCounter, "from", userInputs);
      
      // If asking for more inputs, this continues using the last input
      if( inputCounter >= userInputs.length - 1 ){
        inputCount = userInputs.length - 1;
      } else {
        inputCounter++;
      }

      outputLog( "Storing", consoleInput, "in", p1, ", mode", mode1);
      memoryAccess( mode1, p1, consoleInput );
      ip+=2;
    }

    // OPCODE 4:  Prints the output at the given address
    else if( instruction == 4 ){
      let x = memoryAccess( mode1, p1 );
      console.log( "Output: ", x );
      output.push(x);
      ip+=2;

      //return[ instructions, x, ip] // Used in day 7 to break program after each output statement
    }

    // OPCODE 5:  JUMP IF TRUE
    // If the first parameter is non-zero, it sets the instruction pointer to the 
    // value from the second parameter. Otherwise, it does nothing.
    else if( instruction == 5 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      if( x != 0){
        ip = y;
      } else {
        ip+=3;
      }
    }

    // OPCODE 6:  JUMP IF FALSE
    // if the first parameter is zero, it sets the instruction pointer to the value from the 
    // second parameter. Otherwise, it does nothing.
    else if( instruction == 6 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      if( x == 0 ){
        ip = y;
      } else {
        ip+=3;
      }
    }

    // Opcode 7:  Less Than
    // if the first parameter is less than the second parameter, 
    // it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
    else if( instruction == 7 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      if( x < y ){
        memoryAccess( mode3, p3, 1 );
        // instructions[p3] = 1;
      } else {
        memoryAccess( mode3, p3, 0);
        // instructions[p3] = 0;
      }
      ip+=4;
    }

    // Opcode 8: Equal To
    // If p1 == p2, store 1 in p3
    // Otherwise, store 0
    else if( instruction == 8 ){
      let x = memoryAccess( mode1, p1 );
      let y = memoryAccess( mode2, p2 );
      let z = memoryAccess( mode3, p3 );
      if( x == y ){
        memoryAccess( mode3, p3, 1);
        // instructions[p3] = 1;
      } else {
        memoryAccess( mode3, p3, 0);
        // instructions[p3] = 0;
      }
      ip+=4;
    }

    // Opcode 9:  Adjust relative base counter
    else if( instruction == 9 ){
      relativeBase += memoryAccess( mode1, p1 );
      ip+=2;
    }

    // Error
    else if( instructions[ip] == 99 ) {
      outputLog( "Exit code 99 at command ", ip );
      running = false;
      return[ instructions, false] // Only for this day
    }

    else {
      outputLog( "Something went wrong!" );
      running = false;
    }

  }

  return [instructions, output];
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











