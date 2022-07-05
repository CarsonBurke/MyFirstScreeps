var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var memorySetup = require('memorySetup');


// Main Game loop
module.exports.loop = function () {

    if (!Memory.Setup) {
        memorySetup.run();
    }

    const points = [];

    for (let x = 1; x < 49; x++) {
        for (let y = 1; y < 49; y++) {
            //points.push(new RoomPosition(x,y,'sim'))
            new RoomVisual('W1N1').rect(x - 0.5, y - 0.5, 1, 1, { fill: 'transparent', stroke: '#f00' });
        }
    }

    //Test visual
    //new RoomVisual('sim').poly(points, { fill: 'aqua'});
    //new RoomVisual('W1N1').rect(points, 9, 9, {fill: 'transparent', stroke: '#f00'});
    //new RoomVisual('W1N1').rect(0, 0.5, 1, 1, {fill: 'transparent', stroke: '#f00'}); 

    const roleManagers = {
        harvester: roleHarvester,
        upgrader: roleUpgrader,
        builder: roleBuilder
    }
    
    let creep
    
    //for every name in array of creeps
    for (const name in Game.creeps) {
        //declare a variable creep with value of the current creeps name
        creep = Game.creeps[name];
        
        roleManager[creep.memory.role](creep)
    }
    if (memory.visuals) {
        displayVisuals();
    }
}
