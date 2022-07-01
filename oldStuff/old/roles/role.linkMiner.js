module.exports = {
    // a function to run the logic for this role
    run: function (creep) {
        // get source
        let source = Game.getObjectById(creep.memory.sourceId);
        // find link next to source ( within 2 tiles)
        let link = source.pos.findInRange(FIND_STRUCTURES, 2, {
            filter: s => s.structureType == STRUCTURE_LINK
        })[0];
        
        // if creep is bringing energy to a structure but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }
        
        // if creep is supposed to transfer energy to a structure
        if (creep.memory.working == true) {
            // find closest link
            var structure = creep.pos.findClosestByPath(STRUCTURE_LINK);
        }
        // if we found one
        if (structure != undefined) {
            // try to transfer energy, if it is not in range
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
                creep.moveTo(structure);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            creep.getEnergy(false, true);
        }
    }
};