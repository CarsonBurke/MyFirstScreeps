// import modules
require('./prototypes/prototype.creep');
require('./prototypes/prototype.tower');
require('./prototypes/prototype.spawn');
require('./prototypes/prototype.link');

//Main Loop
module.exports.loop = function() {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }
    
    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }
    
    // for each creeps
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole();
    }

    // for each spawn
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName].spawnCreepsIfNecessary();
    }
    
    //for each link
    for(let links in Game.STRUCTURE_LINK){
        //run link logic
        link.sendEnergy();
    }
    

    
    //NOTES:
    //BODY: 
    //      WORK            = 100 Energy
    //      CARRY           = 50  Energy
    //      MOVE            = 50  Energy
    //      ATTACK          = 80  Energy
    //      CLAIM           = 600 Energy
    //      RANGED_ATTACK   = 150 Energy
    //      HEAL            = 250 Energy
    //      TOUGH           = 10  Energy
    
    //spawn a dude
    //Game.spawns.Home.spawnCreep([WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], 'upgrader_' + Game.time, {memory:{ role: 'upgrader', working: false}});
    
    //Game.spawns.Extension1.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'builder_' + Game.time, {memory:{ role: 'builder', working: false}});

    //spawn a claimer
    //Game.spawns.Home.memory.claimRoom = 'W52n16';
    
    //Game.spawns.Home.spawnCreep([CLAIM, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], 'DumbClaim_' + Game.time, {memory:{ role: 'Dumbass', target: target, working: false}});
};