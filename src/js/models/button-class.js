class Button extends DrawableObject {


    constructor() {
        super();
    }

    updatePosition(characterX, characterY) {
        this.x = characterX + offsetFromCharacterX;
        this.y = characterY + offsetFromCharacterY;
    }

    isClicked(mouseX, mouseY) {
        mouseX += (this.x - this.width - 50)
        return mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height;
    }
}







