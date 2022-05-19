module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        
        if(creep.room.name == 'W52N15'){
            var exit = creep.room.findExitTo('W51N15');
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        
        if(creep.room.name == 'W51N15'){
            
            var exit = creep.room.findExitTo('W51N16');
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        
        if(creep.room.name == 'W51N16'){
            
            var exit = creep.room.findExitTo('W52N16');
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        
        if(creep.room.name == 'W52N16'){
            // if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            //     // move towards the controller
            //     creep.moveTo(creep.room.controller);
            // } // if target is defined and creep is not in target room
        creep.memory.role = 'builder';
            
        if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit));
            // return the function to not do anything else
            return;
        }

        // if creep is trying to complete a constructionSite but has no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            // switch state
            creep.memory.working = false;
        }
        // if creep is harvesting energy but is full
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            // switch state
            creep.memory.working = true;
        }

        // if creep is supposed to complete a constructionSite
        if (creep.memory.working == true) {
            // find closest constructionSite
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if one is found
            if (constructionSite != undefined) {
                // try to build, if the constructionSite is not in range
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards the constructionSite
                    creep.say('More work?');
                    creep.moveTo(constructionSite, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            // if no constructionSite is found
            else {
                // go upgrading the controller
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to get energy
        else {
            creep.say('Refueling');
            creep.getEnergy(true, true);
        }
        }
        
    }
};