var listOfRoles = ['harvester', 'lorry', 'claimer', 'upgrader', 'repairer', 'builder', 'wallRepairer', 'Dumbass', 'miner', 'linkMiner'];

// create a new function for StructureSpawn
StructureSpawn.prototype.spawnCreepsIfNecessary =
    function () {
        /** @type {Room} */
        let room = this.room;
        // find all creeps in room
        /** @type {Array.<Creep>} */
        let creepsInRoom = room.find(FIND_MY_CREEPS);
        
        // count the number of creeps alive for each role in this room
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a specific role
        /** @type {Object.<string, number>} */
        let numberOfCreeps = {};
        for (let role of listOfRoles) {
            numberOfCreeps[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
        }
        let maxEnergy = room.energyCapacityAvailable;
        let name = undefined;

        // if no harvesters are left AND either no miners or no lorries are left
        //  create a backup creep
        
        if (numberOfCreeps['harvester'] == 0 && numberOfCreeps['lorry'] == 0) {
            // if there are still miners or enough energy in Storage left
            if (numberOfCreeps['miner'] > 0 ||
                (room.storage != undefined && room.storage.store[RESOURCE_ENERGY] >= 150 + 550)) {
                
                // create a lorry TODO: This is a dirt hack. Should only create a 150 as its emergency lorry, Amend somehow so it can call the logic below.
                
                // if(room.energyAvailable > 900 && room.energyCapacityAvailable > 900){
                //     name = this.createLorry(750);
                // }else{
                    name = this.createLorry(150);
                //}
                
            }
            // if there is no miner and not enough energy in Storage left
            else {
                // create a harvester because it can work on its own
                name = this.createCustomCreep(room.energyAvailable, 'harvester');
                console.log("Made a backup creep");
            }
        }
        // if no backup creep is required
        else {
            if(maxEnergy > 500){
                // check if all sources have miners
                let sources = room.find(FIND_SOURCES);
                // iterate over all sources
                for (let source of sources) {
                    // if the source has no miner
                    //if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                    if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                        // check whether or not the source has a container
                        /** @type {Array.StructureContainer} */
                        //TODO: Filter looking for links within 2 of source.
                        let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        });
                        // if there is a container next to the source
                        if (containers.length > 0) {
                            // spawn a miner
                            name = this.createMiner(source.id);
                            break;
                        }
                        //TODO: If link within 2 of source is found spawn a new type of miner with carry to transfer it to link. Also make new linkminer role
                    }
                }
            }
        }
        
        // if none of the above caused a spawn command check for other roles
        if (name == undefined) {
            for (let role of listOfRoles) {
                // check for claim order
                if (role == 'claimer' && this.memory.claimRoom != undefined && numberOfCreeps[role] < this.memory.maxCreeps[role]) {
                    // try to spawn a claimer
                    name = this.createClaimer(this.memory.claimRoom); 
                    
                    
                    //name = "this.spawnCreep([CLAIM, MOVE], 'claimer_' + Game.time, {memory: { role: 'claimer', target: W52N16 }})"
                    // if that worked THIS CURRENTLY DIDNT DELETE
                    if (name != undefined && _.isString(name)) {
                        // delete the claim order         
                        delete this.memory.claimRoom;
                    }
                }
                
                // if no claim order was found, check other roles
                
                // else if (this.memory.hasOwnProperty(this.memory.minCreeps) && this.memory.hasOwnProperty(this.memory.minCreeps[role])
                //          && numberOfCreeps[role] < this.memory.minCreeps[role]) {
                else if (numberOfCreeps[role] < this.memory.minCreeps[role]) {
                    if (role == 'lorry') {
                        
                        //multiples of the 150 base
                        
                        if(room.energyAvailable > 600 && room.energyCapacityAvailable > 600){
                            name = this.createLorry(600);
                            //console.log('spawning lorry the wrong way1');
                            break;
                        }else{
                            name = this.createLorry(150);
                            //console.log('spawning lorry the wrong way2');
                            break;
                        }
                        
                    }
                    else {
                        name = this.createCustomCreep(maxEnergy, role);
                    }
                    break;
                }
            }
        }
        // for(let creepy of numberOfCreeps){
        //     console.log(creepy);
        // }
        // if none of the above caused a spawn command check for LongDistanceHarvesters
        /** @type {Object.<string, number>} */
        let numberOfLongDistanceHarvesters = {};
        if (name == undefined) {
            // count the number of long distance harvesters globally
            for (let roomName in this.memory.minLongDistanceHarvesters) {
                numberOfLongDistanceHarvesters[roomName] = _.sum(Game.creeps, (c) =>
                    c.memory.role == 'longDistanceHarvester' && c.memory.target == roomName)
                //TODO: Refactor this to work for multiple rooms
                if (numberOfLongDistanceHarvesters[roomName] < this.memory.minLongDistanceHarvesters[roomName]) {
                    name = this.createLongDistanceHarvester(maxEnergy, 2, room.name, roomName, 0, "longDistanceHarvester");
                }
            }
        }
        
        // print name to console if spawning was a success
        //if (name != undefined && _.isString(name)) {
        if (name != undefined && name != -6) {
            // console.log(this.name + " spawned new creep: " + name + " (" + Game.creeps[name].memory.role + ")");
            console.log(room.name + " spawned new creep: " );
            // console.log(Game.creeps[name].memory.role);
            console.log('============================================');
            for (let role of listOfRoles) {
                console.log(role + ": " + numberOfCreeps[role]);
            }
            console.log('============================================');
            
            //pretty sure this isnt how you access an object like this probably needs some ${object} action going on.
            // for (let roomName in this.memory.numberOfLongDistanceHarvesters) {
            for (let roomName in numberOfLongDistanceHarvesters) {
                console.log("LongDistanceHarvester" + roomName + ": " + numberOfLongDistanceHarvesters[roomName]);
            }
            console.log('============================================');
        }else{
            //console.log('No need to spawn anything right now');
            //console.log('Waiting....');
            if(name == -6){
            //console.log(room.name + ' Not Enough energy');
            }
        }
        
        // if(!(name < 0)){
        //             //print the current population
        // console.log("==============================================");
        // console.log(this.room);
        // console.log("Current Population");
        // console.log("Harvesters     :" + numberOfCreeps['harvester'] + "/" + (this.memory.maxCreeps['harvester'] - 1));
        // console.log("Builders       :" + numberOfCreeps['builder'] + "/" + this.memory.minCreeps['builder']);
        // console.log("Repairers      :" + numberOfCreeps['repairer'] + "/" + this.memory.minCreeps['repairer']);
        // console.log("Wall Repairers :" + numberOfCreeps['wallRepairer'] + "/" + this.memory.minCreeps['wallRepairer']);
        // console.log("Miners         :" + numberOfCreeps['miner'] + "/" + this.memory.maxCreeps['miner']);
        // console.log("Lorries        :" + numberOfCreeps['lorry'] + "/" + this.memory.minCreeps['lorry']);
        // console.log("Upgraders      :" + numberOfCreeps['upgrader'] + "/" + this.memory.minCreeps['upgrader']);
        // console.log("Claimers       :" + numberOfCreeps['claimer'] + "/" + (this.memory.maxCreeps['claimer'] - 1));
        // console.log("==============================================");
        // }
        
    };

// create a new function for StructureSpawn
StructureSpawn.prototype.createCustomCreep =
    function (energy, roleName) {
        // create a balanced body as big as possible with the given energy
        var numberOfParts = Math.floor(energy / 200);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the given role
        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: { role: roleName, working: false }});
    };

// create a new function for StructureSpawn
StructureSpawn.prototype.createLongDistanceHarvester =
    function (energy, numberOfWorkParts, home, target, sourceIndex, roleName) {
        // create a body with the specified number of WORK parts and one MOVE part per non-MOVE part
        var body = [];
        for (let i = 0; i < numberOfWorkParts; i++) {
            body.push(WORK);
        }

        // 150 = 100 (cost of WORK) + 50 (cost of MOVE)
        energy -= 150 * numberOfWorkParts;

        var numberOfParts = Math.floor(energy / 100);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor((50 - numberOfWorkParts * 2) / 2));
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts + numberOfWorkParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body
        return this.spawnCreep(body, roleName + '_' + Game.time, { memory: {
            role: 'longDistanceHarvester',
            home: home,
            target: target,
            sourceIndex: sourceIndex,
            working: false
        }});
        

    };

// create a new function for StructureSpawn
StructureSpawn.prototype.createClaimer =
    function (target) {
        return this.spawnCreep([CLAIM, MOVE], 'claimer_' + Game.time, {memory: { role: 'claimer', target: target }});
    };
    
    //To call this function from console:  Game.spawns.Home.memory.claimRoom = 'W52n16';
    

// create a new function for StructureSpawn
StructureSpawn.prototype.createMiner =
    function (sourceId) {
        return this.spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], 'miner_' + Game.time,
                                {memory: { role: 'miner', sourceId: sourceId }});
    };

// create a new function for StructureSpawn
StructureSpawn.prototype.createLorry =
    function (energy) {
        // create a body with twice as many CARRY as MOVE parts
        var numberOfParts = Math.floor(energy / 150);
        // make sure the creep is not too big (more than 50 parts)
        numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
        var body = [];
        for (let i = 0; i < numberOfParts * 2; i++) {
            body.push(CARRY);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }

        // create creep with the created body and the role 'lorry'
        return this.spawnCreep(body, 'lorry_' + Game.time, {memory: { role: 'lorry', working: false }});
        
        
    };