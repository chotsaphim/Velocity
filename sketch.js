let massInput, velocityInput, massUnitSelect, velocityUnitSelect, calculateButton, resetButton, resultP;

function setup() {
  createCanvas(400, 300);
  
  // Create input fields for mass and velocity with added styles
  massInput = createInput('');
  massInput.position(150, 20);
  massInput.style('padding', '5px');
  
  velocityInput = createInput('');
  velocityInput.position(150, 60);
  velocityInput.style('padding', '5px');
  
  // Create dropdown menus for unit selection with added styles
  massUnitSelect = createSelect();
  massUnitSelect.position(300, 20);
  massUnitSelect.option('lb');
  massUnitSelect.option('kg');
  massUnitSelect.option('gram');
  massUnitSelect.option('grain');
  massUnitSelect.style('padding', '5px');
  
  velocityUnitSelect = createSelect();
  velocityUnitSelect.position(300, 60);
  velocityUnitSelect.option('ft/s');
  velocityUnitSelect.option('m/s');
  velocityUnitSelect.style('padding', '5px');
  
  // Create labels
  createP('Mass:').position(20, 20);
  createP('Velocity:').position(20, 60);
  
  // Create buttons to trigger the calculation and reset the inputs with added styles
  calculateButton = createButton('Calculate Energy');
  calculateButton.position(150, 100);
  calculateButton.mousePressed(calculateEnergy);
  calculateButton.style('padding', '5px');
  calculateButton.style('background-color', '#4CAF50');
  
  resetButton = createButton('Reset');
  resetButton.position(300, 100);
  resetButton.mousePressed(resetInputs);
  resetButton.style('padding', '5px');
  resetButton.style('background-color', '#f44336');
  
  // Create a paragraph element to display the result with added styles
  resultP = createP('');
  resultP.position(20, 140);
  resultP.style('font-size', '16px');
  resultP.style('font-weight', 'bold');
}

function calculateEnergy() {
  // Get the mass and velocity values from the input fields
  let mass = parseFloat(massInput.value());
  let velocity = parseFloat(velocityInput.value());
  
  // Get the selected units
  let massUnit = massUnitSelect.value();
  let velocityUnit = velocityUnitSelect.value();
  
  // Check if the inputs are valid numbers and greater than zero
  if (!isNaN(mass) && mass > 0 && !isNaN(velocity) && velocity > 0) {
    // Convert mass and velocity to a consistent unit system (slugs and feet per second)
    if (massUnit === 'kg') {
      mass = mass * 2.20462;  // Convert mass from kg to lb
    } else if (massUnit === 'gram') {
      mass = mass / 453.59237;  // Convert mass from grams to lb
    } else if (massUnit === 'grain') {
      mass = mass / 7000;  // Convert mass from grains to lb
    }
    mass = mass * 0.031081;  // Convert mass from lb to slugs
    
    if (velocityUnit === 'm/s') {
      velocity = velocity * 3.28084;  // Convert velocity from m/s to ft/s
    }
    
    // Calculate the energy using the formula
    let energyFtLb = 0.5 * mass * velocity * velocity;  // Energy in foot-pounds
    let energyJoules = energyFtLb * 1.35582;  // Convert energy to joules
    
    // Display the result in the paragraph element
    resultP.html(`Energy: ${energyFtLb.toFixed(2)} foot-pounds / ${energyJoules.toFixed(2)} joules`);
  } else {
    resultP.html('Please enter valid numbers greater than zero for mass and velocity');
  }
}

function resetInputs() {
  // Reset the input fields and result paragraph
  massInput.value('');
  velocityInput.value('');
  resultP.html('');
}

function draw() {
  background(220);
}
