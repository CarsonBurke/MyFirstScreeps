var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        //if memory.working is true AND the creep has 0 energy in its store
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            //set memory.working to false and get creep to say what it's doing
            creep.memory.working = false;
            creep.say('?? harvest');
        }

        //if memory.working is false AND the creep's free capacity is 0
        if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            //set memory.working to true and creep says what it's doing
            creep.memory.working = true;
            creep.say('? upgrade');
        }

        //if memory.working is true
        if (creep.memory.working) {
            //if controller is not in range to upgrade
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //move to it
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        //else if memory.working is false
        else {
            //save array of sources to 'sources'
            var sources = creep.room.find(FIND_SOURCES);
            //if first source in array is not in range to harvest
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                //move to it
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};

module.exports = roleUpgrader;