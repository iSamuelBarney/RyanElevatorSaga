{



    init: function(elevators, floors) {
        
        const getDistance = (a,b) => {
            return Math.abs(a-b)
        }

        const handleButton = (direction,floor) => {

            const elevator = elevators.filter(e=>e.loadFactor()<0.6).reduce((previous,current,index,array)=>{
                let currentFloor = false
                if(current && current.currentFloor()) currentFloor = current.currentFloor()
                let previousFloor = false
                if(previous) previousFloor = previous.currentFloor()
                
                if(currentFloor && previousFloor) {
                    if(getDistance(currentFloor,floor)>=getDistance(previousFloor,floor)) return current
                }
                
                if(previous) {
                    return previous
                }
                
                return current
            })
            
            elevator.goToFloor(floor)

            
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

                if(stopping && elevator.loadFactor() > 0.6) stopping = false

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
