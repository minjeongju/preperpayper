let images = [];
let objects = [];
let bgImg;

function preload() {
    images.push(loadImage("01.png"));
    images.push(loadImage("02.png"));
    images.push(loadImage("03.png"));
    images.push(loadImage("04.png"));
    images.push(loadImage("05.png"));
    
    bgImg = loadImage("https://media.discordapp.net/attachments/1214236586968092793/1352270700525781033/sacsc.png?ex=67dd67ba&is=67dc163a&hm=0f5afb3414d530d1e47b49cb95333cbc38a02f4c3901e7836f58247e63299feb&=&format=webp&quality=lossless&width=1100&height=600");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(bgImg);
    
    for (let obj of objects) {
        obj.update();
        obj.display();
    }
}

function keyPressed() {
    let img = random(images);
    let xPos;
    
    let leftKeys = ['Q', 'A', 'Z', 'W', 'S', 'X', 'E', 'D', 'C'];
    let rightKeys = ['P', 'L', 'M', 'O', 'K', 'N', 'I', 'J', 'B'];
    let centerKeys = ['U', 'H', 'Y', 'B', 'G', 'V', 'T', 'F', 'R'];
    
    if (leftKeys.includes(key.toUpperCase())) {
        xPos = width * 0.2;
    } else if (rightKeys.includes(key.toUpperCase())) {
        xPos = width * 0.8;
    } else if (centerKeys.includes(key.toUpperCase())) {
        xPos = width * 0.5;
    } else {
        xPos = random(width * 0.3, width * 0.7);
    }
    
    let newObj = new BouncingObject(img, xPos, height + 50);
    objects.push(newObj);
}

class BouncingObject {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.vx = random(-5, 5);
        this.vy = random(-50, -50);
        this.gravity = 1.5;
    }

    update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;

        if (this.y > height + 50) {
            let index = objects.indexOf(this);
            objects.splice(index, 1);
        }
    }

    display() {
        image(this.img, this.x, this.y, this.img.width / 10, this.img.height / 10);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
