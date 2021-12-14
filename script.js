// Write your JavaScript code here!

// const { addDestinationInfo } = require("./scriptHelper");



window.addEventListener("load", function() {
    
    formSubmission(document);
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch(); //response.json() 
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = listedPlanets[pickPlanet(listedPlanets)]; //Math.random
        
        addDestinationInfo(document, planet.name, planet.diameter, planet.moons, planet.star, planet.distance, planet.image); //meat and potatoes
   })
   
});