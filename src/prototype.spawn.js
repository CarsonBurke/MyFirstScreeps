var listRoles = ['harvester', 'builder', 'upgrader'];

//check what creeps are in the room, if any, and spawn required creeps to meet min requirements set in memorySetup
StructureSpawn.prototype.spawnNeededCreeps = function () {
    //count how many creeps are in the room
    //count how many creeps of each type/role of creep
    //if min num of role not met, spawn new creep



    //var creepsInRoom = this.room.find(FIND_MY_CREEPS);

    //var currentHarvesters = this.room.find(FIND_MY_CREEPS, { filter: "harvester" });
    //var currentBuilders = this.room.find(FIND_MY_CREEPS, { filter: "builder" });
    //var currentUpgraders = this.room.find(FIND_MY_CREEPS, { filter: "upgrader" });

    //if (currentHarvesters < this.memory.minHarvesters) {
    //    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], "Harvester" + )
    //}


    var thisSpawn = this.StructureSpawn;

    var currentHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var currentBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var currentUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if (currentHarvesters.length < Game.memory.minHarvesters) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new Harvester: ' + newName);
        Game.spawns[thisSpawn].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'harvester' } });
    }

    if (currentBuilders.length < Game.memory.minBuilders) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new Builder: ' + newName);
        Game.spawns[thisSpawn].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'builder' } });
    }

    if (currentUpgraders.length < Game.memory.minUpgraders) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new Upgrader: ' + newName);
        Game.spawns[thisSpawn].spawnCreep([WORK, CARRY, MOVE], newName, { memory: { role: 'upgrader' } });
    }


}