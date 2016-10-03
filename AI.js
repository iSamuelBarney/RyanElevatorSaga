{



    init: function(elevators, floors) {

        const handleButton = (direction,floor) => {

            elevators.map(elevator=>{
                
                if(elevator.loadFactor < 0.8) elevator.goToFloor(floor)
                
            })
            
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

                let stopping = false

                if(floors[floorNum].buttonStates.up || floors[floorNum].buttonStates.down == 'activated') stopping = true // floor has passengers waiting

                if(stopping && elevator.loadFactor() > 0.8) stopping = false

                if(stopping) elevator.goToFloor(floorNum,true) // if we are stopping, let's stop right now

                })


            elevator.on('stopped_at_floor', (floorNum)=>{
                //console.log('stopping at:',floorNum)
            })



            elevator.on("floor_button_pressed", (floorNum)=>{ 
                elevator.goToFloor(floorNum)
            } )



            // Whenever the elevator is idle (has no more queued destinations) ...
            elevator.on("idle", ()=>{
                elevator.goToFloor(0)
            })

        })

    },

        update: function(dt, elevators, floors) {



            // We normally don't need to do anything here



        }



}
