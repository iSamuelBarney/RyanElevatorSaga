{
    init: function(elevators, floors) {
        
        elevators.map(elevator=>{
            let floorsQ = []
            elevator.on("floor_button_pressed", function(floorNum) { 
                floorsQ.push(floorNum)
                
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
