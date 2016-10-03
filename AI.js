{

    init: function(elevators, floors) {
        let floorsQ = [] // all floors that need a pickup

        const handleButton = (direction,floor) => {
            //console.log('floor',floor)
            floorsQ.push(floor)
            //console.log('floorsQ:',floorsQ)
        }


        floors.map(floor=>{
            floor.on("up_button_pressed", ()=>{
                handleButton('up',floor.level)
            } )
            floor.on("down_button_pressed", ()=>{
                handleButton('down',floor.level)
            })
        })


        elevators.map(elevator=>{

            elevator.on('passing_floor', (floorNum, direction)=>{
                console.log('passing:',floorNum)
                //console.log('floorsQ:',floorsQ)
                console.log('floor:',floors[floorNum])
                let stopping = false
                
                if(floors[floorNum].buttonStates.up || floors[floorNum].buttonStates.down == 'activated') stopping = true // floor has passengers waiting
                
                if(stopping && elevator.loadFactor() > 0.8) stopping = false
                
                if(stopping) elevator.goToFloor(floorNum,true) // if we are stopping, let's stop right now

                
                })

            elevator.on('stopped_at_floor', (floorNum)=>{
                //console.log('stopping at:',floorNum)
                const position = floorsQ.indexOf(floorNum)
                const removedFloor = floorsQ.splice(position, 1)
                //console.log(floorsQ)
                })

            elevator.on("floor_button_pressed", function(floorNum) { 





            } );



            // Whenever the elevator is idle (has no more queued destinations) ...

            elevator.on("idle", function() {



                floors.map(f=>{

                    elevator.goToFloor(f.level)

                })

            });

        })





    },

        update: function(dt, elevators, floors) {

            // We normally don't need to do anything here

        }

}
