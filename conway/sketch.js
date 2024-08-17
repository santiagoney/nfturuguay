let cells;
let generation;
let cellSize = 10;
let ruleset = [0, 1, 1, 1, 1, 0, 0, 0]; // Rule 30
let colors;

let grid;
let rows, cols;

function setup() {
  createCanvas(600, 600);
  cells = Array(floor(width / cellSize)).fill(0);
  cells[floor(cells.length / 2)] = 1; // Start with a single cell in the middle
  generation = 0;
  frameRate(10); // Control the speed of the animation
  noStroke();

  // Create a color palette
  colors = [
    color(255, 0, 0),   // Red
    color(0, 255, 0),   // Green
    color(0, 0, 255),   // Blue
    color(255, 255, 0), // Yellow
    color(0, 255, 255), // Cyan
    color(255, 0, 255), // Magenta
    color(255, 165, 0), // Orange
    color(255, 255, 255) // White
  ];

  // Set up Conway's Game of Life
  cols = width / cellSize;
  rows = height / cellSize / 2;
  grid = make2DArray(cols, rows);
  initGrid();
}

function draw() {
  background(0);
  displayAutomaton();
  generateNextAutomaton();
  displayLife();
  generateNextLife();
  generation++;
  
  // Reset Rule 30 automaton if it reaches the bottom of the top half
  if (generation * cellSize >= height / 2) {
    resetAutomaton();
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function initGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2)); // Randomly initialize cells to 0 or 1
    }
  }
}

function displayAutomaton() {
  for (let i = 0; i < cells.length; i++) {
    let x = i * cellSize;
    let y = generation * cellSize;

    // Choose a random color for the cells with value 1
    if (cells[i] == 1) {
      fill(random(colors));
    } else {
      fill(0);
    }
    rect(x, y, cellSize, cellSize);
  }
}

function generateNextAutomaton() {
  let nextGen = Array(cells.length).fill(0);

  for (let i = 1; i < cells.length - 1; i++) {
    let left = cells[i - 1];
    let me = cells[i];
    let right = cells[i + 1];
    nextGen[i] = rules(left, me, right);
  }
  
  cells = nextGen;
}

function rules(a, b, c) {
  let s = "" + a + b + c;
  let index = parseInt(s, 2);
  return ruleset[index];
}

function resetAutomaton() {
  // Reset the automaton by reinitializing the cells and resetting the generation counter
  cells = Array(floor(width / cellSize)).fill(0);
  cells[floor(cells.length / cellSize)] = 1;
  generation = 0;
}

function displayLife() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * cellSize;
      let y = j * cellSize + height / 2;

      if (grid[i][j] == 1) {
        fill(random(colors));
      } else {
        fill(0);
      }
      rect(x, y, cellSize, cellSize);
    }
  }
}

function generateNextLife() {
  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1; // Birth
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0; // Death
      } else {
        next[i][j] = state; // Stasis
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
