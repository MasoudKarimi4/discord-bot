// Masoud's Processing JS Fish Tank Project

background(89, 216, 255);

var bodyLength = 118;
var bodyHeight = 74;
var bodyColor = color(162, 0, 255);

noStroke();

var bubbles = function(posX, posY)
{
    fill(78, 187, 204);
    ellipse(posX, posY, 30, 30);
};

// Repeating the bubbles every time
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));
bubbles(random(0,500),random(0,500));

// Fish Function
var fish = function(posX, posY, eyeSize){
    fill(bodyColor);
    // body
    ellipse(posX, posY, bodyLength, bodyHeight);
    // tail
    var tailWidth = bodyLength/4;
    var tailHeight = bodyHeight/2;
    triangle(posX-bodyLength/2, posY,
         posX-bodyLength/2-tailWidth, posY-tailHeight,
         posX-bodyLength/2-tailWidth, posY+tailHeight);
    // eye
    fill(random(0,255), random(0,255), random(0,255));
    ellipse(posX+bodyLength/4, posY, eyeSize, eyeSize);
};

// Every time you refresh the colour is random
fish(143, 256,random(1,30));
fish(302, 181,random(1,30));
fish(143, 110,random(1,30));
fish(300, 51,random(1,30));
