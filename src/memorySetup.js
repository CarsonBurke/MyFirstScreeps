//Memory.visuals = false;

//method: run(){

//	//this is where we set up all the memory stuff on a fresh install of the bot

//	//by default visuals off
//	memory.visuals = false;

//	//Example
//	//memory.maxHaulers = 5;
//}



var memorySetup = {

    run: function () {

        Memory.minHarvesters = 2;
        Memory.minBuilders = 2;
        Memory.minUpgraders = 1;

    }
}