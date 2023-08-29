class World {


    character = new Character()
    canvas;
    ctx;
    keyboard;
    camera_x = 0
    statusBar = new StatusBar()
    coinBar = new Coinbar()
    bottlesBar = new BottlesBar()

    bottles = []
    level = level1

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas
        this.keyboard = keyboard
        this.draw()
        this.setWorld()
        this.run()
    }

    setWorld() {
        this.character.world = this
    }
    run() {
        setInterval(() => {
            this.checkCollisions()
            this.checThrowObjects()
        }, 200);

    }

    checThrowObjects(){
        if (this.keyboard.throw) {
            let bottle = new ThrowableObject(this.character.x+100,this.character.y+100)
            this.bottles.push(bottle)
            
        }
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit()
                // console.log('collision with character', enemy, 'Energy:', this.character.energy)
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, canvas.height)
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.backgroundObjects)
        this.addObjectsToMap(this.level.clouds)
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(this.statusBar)
        this.addToMap(this.coinBar)
        this.addToMap(this.bottlesBar)
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.enemies)
        this.addToMap(this.character)
        this.addObjectsToMap(this.bottles)


        this.ctx.translate(-this.camera_x, 0)

        //Draw wird immer wieder aufgerufen
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        })

    }
    addObjectsToMap(obc) {
        obc.forEach(o => {
            this.addToMap(o);
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }

        mo.draw(this.ctx)
        mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    flipImage(mo) {

        this.ctx.save();
        this.ctx.translate(mo.width, 0)
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore()
    }


}
