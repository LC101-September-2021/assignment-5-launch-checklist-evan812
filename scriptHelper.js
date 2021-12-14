// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  document.getElementById("missionTarget").innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `;
}

function validateInput(testInput) {
    console.log(testInput)
   if (!testInput){
       return "Empty"
   } else if (isNaN(Number(testInput)))  {
        return "Not a Number"
   } else {
       return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let form = document.querySelector('[data-testid="testForm"]');
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel");
        let cargoMassInput = document.querySelector("input[name=cargoMass");
        console.log("===================Evan")
        let fuelReady = false;
        let massReady = false;
        let validated = false;


        if(validateInput(pilotNameInput.value) === 'Empty' || 
        validateInput(copilotNameInput.value) === 'Empty' || 
        validateInput(fuelLevelInput.value) === 'Empty' || 
        validateInput(cargoMassInput.value) === 'Empty' ){
            alert ("All fields required");
            event.preventDefault();
        } else if (validateInput(fuelLevelInput.value) === "Not a Number" || validateInput(cargoMassInput.value) === "Not a Number") {
            alert ("Cargo mass and fuel level must be a number")
            event.preventDefault();  
        } else {
            validated = true;
        }
        
        if (validated){
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput.value} Ready`;
            document.getElementById("copilotStatus").innerText = `Co-Pilot ${copilotNameInput.value} Ready`;
        } else {
            document.getElementById("pilotStatus").innerText = `Pilot ${pilotNameInput.value} Not ready`;
            document.getElementById("copilotStatus").innerText = `Co-Pilot ${copilotNameInput.value} Not ready`;
        }

        if (Number (fuelLevelInput.value) < 10000 && validated){
            document.getElementById("fuelStatus").innerText = `There is not enough fuel for the journey!\n ${fuelLevelInput.value}L = current fuel level. 10,000L = Minimum required.`
            document.getElementById("launchStatus").innerText = 'Shuttle not ready for launch!';
            document.getElementById("launchStatus").style.color = "red";
            fuelReady = false;
        } else {
            fuelReady = true;
            document.getElementById("fuelStatus").innerText = 'Fuel level sufficient for launch!';
        }
        if (Number (cargoMassInput.value) > 10000 && validated){
            document.getElementById("cargoStatus").innerText = `There is to much mass for takeoff!\n ${cargoMassInput.value}Kg = current mass. 10,000Kg = Maximum mass.`
            document.getElementById("launchStatus").innerText = 'Shuttle not ready for launch!';
            document.getElementById("launchStatus").style.color = "red";
            massReady = false;
        } else {
            massReady = true;
            document.getElementById("cargoStatus").innerText = 'Cargo mass at sufficient weight!'
        }
        if (fuelReady && massReady && validated) {
            document.getElementById("launchStatus").innerText = 'Shuttle ready for launch!';
            document.getElementById("launchStatus").style.color = "Green"; 
        }
        event.preventDefault();
    });
   
}

async function myFetch() {
    let planetsReturned;
    
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        return response.json()
    });

    return planetsReturned; 
}

function pickPlanet(planets) {
   return Math.round(Math.random()* planets.length);
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
