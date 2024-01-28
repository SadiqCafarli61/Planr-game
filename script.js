
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas")
    const ctx = canvas.getContext("2d")


    let aircraftX = canvas.width / 2
    let aircraftY = canvas.height - 50
let AircraftImage = new Image()
AircraftImage.src = "./plane.png"
     let speed = 4
    let aircraftWidth = 60
    let aircraftHeight = 60

  
    AircraftImage.onload = function(){
        draw()
    }


    function drawAirCraft(){
        ctx.lineWidth = 4
       ctx.drawImage(AircraftImage, aircraftX, aircraftY, aircraftWidth, aircraftHeight)
       
    }

   let blocks = []
    let blockWidth = 25
    let blockHeight = 25
    let blockSpeed = 1.5


    function drawBlock(){
      for(let i = 0; i<blocks.length; i++){
        ctx.fillStyle=  'red'
        ctx.fillRect(blocks[i].x,blocks[i].y, blockWidth, blockHeight)
      }
    }
    function clearCanvas(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
    }
    function draw(){
        clearCanvas()
        drawAirCraft()
        drawBlock()
        checkCollision()
    }
    function checkCollision(){
       for(let i = 0; i<blocks.length; i++){
        if(aircraftX < blocks[i].x + blockWidth &&
            aircraftX + aircraftWidth > blocks[i].x &&
            aircraftY < blocks[i].y + blockHeight &&
            aircraftY + aircraftHeight  > blocks[i].y
            ){
               alert("game over")
               window.location.reload()
            }
       }
    }

    function moveBlocks(){
        for(let i = 0; i<blocks.length; i++){
            blocks[i].x -= blockSpeed
if(blocks[i].x + blockWidth < 0){
    blocks[i].x  =canvas.width + Math.random() * 500
    blocks[i].y = Math.random() * (canvas.height - blockHeight)
}
        }
    }

    function createBlocks(){
        let block = {
            x: canvas.width + Math.random() * 500,
            y: Math.random() * (canvas.height - blockHeight)
        }
        blocks.push(block)
    }
    setInterval(createBlocks, 1000)

    setInterval(() => {
        moveBlocks()
        draw()
    }, 1000/60)
    document.addEventListener("keydown", (e) => {
        switch(e.key){
case "ArrowLeft" :
    if(aircraftX > 0){
        aircraftX -= 10
        draw()
    }
    break
    case "ArrowRight" :
        
    if(aircraftX <canvas.width-aircraftWidth){
        aircraftX += 10
        draw()
    }
       
      break
      case "ArrowUp" :
        if(aircraftY > 0){
            aircraftY -= 10
            draw()
        }
        break
        case "ArrowDown" : 
        if(aircraftY <canvas.height - aircraftHeight){
            aircraftY+=10
            draw()
            speed +=1
        }
        break
        }

      
     
    })


   
})