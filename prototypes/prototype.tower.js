// create a new function for StructureTower
StructureTower.prototype.defend =
    function () {
        // find closes hostile creep
        var target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            this.attack(target);
            // console.log("Tower is healing Creeps in" + this.room);
        }
        
        if(target == undefined){
            //....first heal any damaged creeps
            for (let name in Game.creeps) {
                // get the creep object
                var creep = Game.creeps[name];
                if (creep.hits < creep.hitsMax) {
                    this.heal(creep);
                    //console.log("Tower is healing Creeps.");
                }
            }        
            //...repair Buildings! :) But ONLY until HALF the energy of the tower is gone.
            //Because we don't want to be exposed if something shows up at our door :)
            if(this.energy > (this.energyCapacity / 2)){
                //Find the closest damaged Structure
                var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {filter: (s) => s.hits < s.hitsMax 
                                                        && s.structureType != STRUCTURE_WALL });
                
	            if(closestDamagedStructure) {
	 	            this.repair(closestDamagedStructure);
	 	            //console.log(closestDamagedStructure);
	 	            //console.log(this.pos + " Is repairing buildings.");
                }
            }else{
                //console.log(this.pos + ' Is waiting for energy');
            }
            
        }
        
        //console.log(this.pos + ' Doing nothing for some reason');
        //
        
    };