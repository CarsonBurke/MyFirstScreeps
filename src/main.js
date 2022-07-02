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

    
    //for every name in array of creeps
    for (var name in Game.creeps) {
        //declare a variable creep with value of the current creeps name
        var creep = Game.creeps[name];

        //if the creeps role is harvester 
        if (creep.memory.role == 'harvester') {
            //Run harvester logic
            roleHarvester.run(creep);
        }
        //if the creeps role is upgrader
        if (creep.memory.role == 'upgrader') {
            //Run upgrader logic
            roleUpgrader.run(creep);
        }
        //if the creeps role is builder
        if (creep.memory.role == 'builder') {
            //Run builder logic
            roleBuilder.run(creep);
        }
    }
    if (memory.visuals) {
        displayVisuals();
    }
}