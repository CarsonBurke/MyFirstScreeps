Creep.prototype.runRole = function () {
    roles[this.memory.role].run(this);
};

Creep.prototype.harvestEnergy = function () {
    //Find all sources
    var sources = creep.room.find(FIND_SOURCES);

    //if the first source in the array is not in range
    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //move to the source (with a visual path added)
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
    }
};

Creep.prototype.energizeStructure = function () {
    //If creeps free space is 0 i.e. is full, look for structures filtered by type which have space greater than 0
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN ||
                structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });

    //If a target requires energy
    if (targets.length > 0) {
        //if not in range 
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //Move to within range
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
};