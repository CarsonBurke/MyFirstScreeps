var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

// Main Game loop
module.exports.loop = function () {

    //defines tower with tower ID 'e7d61f885ec8e114c8522bb5'
    var tower = Game.getObjectById('e7d61f885ec8e114c8522bb5'); //TODO: Make a tower manager, do nto hard code the tower ID's
    

    //if tower exists
    if (tower) {

        //Declares a variable closestDamagedStructure with value finding closest damamged structure
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        //if it finds a damamged structure
        if (closestDamagedStructure) {
            //repair the structure
            tower.repair(closestDamagedStructure);
        }

        //declaires a variable closestHostile with value of closest hostile creep
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        //if hostile found
        if (closestHostile) {
            //attack hostile
            tower.attack(closestHostile);
        }
    }

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