let brushImage;

function preload() {
  // Load the image to use as the brush
  brushImage = loadImage('image1.svg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 250);
}

function draw() {
  // Draw the image at the mouse position when the mouse is pressed
  if (mouseIsPressed) {
    let brushWidth = brushImage.width * 0.2;  // Scale the image width down to 20%
    let brushHeight = brushImage.height * 0.2; // Scale the image height down to 20%
    image(brushImage, mouseX - brushWidth / 2, mouseY - brushHeight / 2, brushWidth, brushHeight);
  }
}
