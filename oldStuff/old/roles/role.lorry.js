module.exports = {
    // a function to run the logic for this role
    /** @param {Creep} creep */
    run: function(creep) {
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            //creep.say('ZOOM!');
            creep.memory.working = true;
        }
        

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest spawn, extension, tower or storage which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_STORAGE
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });

            if (structure == undefined) {
                structure = creep.room.storage;
            }

            // if we found one
            if (structure != undefined) {
                // try to transfer energy
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // if it is not in range move towards it
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                    
                }
            }
        }
        // if creep is supposed to get energy
        else {
            // find closest container TODO: Code this to find the one with most energy inside it incase there are 2 in same room
            
            //Put a check in here for dropped resources and get those first! FIND_DROPPED_RESOURCES
            
            
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1000
            });
            
            if (container == undefined) {
                container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0})
            }
            
            if (container == undefined) {
                container = creep.room.storage;
            }
            
            
            
            //Checking for Dropped Resources before taking from storages
            // let targets = creep.room.find(FIND_DROPPED_RESOURCES);
            // if(targets.length){
            //     creep.moveTo(targets[0]);
            //     creep.pickup(targets[0]);
            // }
            
            // if one was found
            if (container != undefined) {
                
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
    }
};