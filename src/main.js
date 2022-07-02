var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


// Main Game loop
module.exports.loop = function () {

    //Test visual
    new RoomVisual().text("Home", 25, 25, { color: 'blue', font: 0.8 });
    
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
}