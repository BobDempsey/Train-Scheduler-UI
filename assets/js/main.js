 // Initialize Firebase to train time API
 var config = {
  apiKey: "AIzaSyBlxdxtdkbmc-wgLjt6jpToI89OuXzpD0E",
  authDomain: "train-time-4b822.firebaseapp.com",
  databaseURL: "https://train-time-4b822.firebaseio.com",
  storageBucket: "train-time-4b822.appspot.com",
  messagingSenderId: "57024002649"
};

firebase.initializeApp(config);

   // Create a variable to reference the database
   var database = firebase.database();
  
  // Create a variable to log current time
  var time = new Date();
  console.log("Current Time:" + " " + time.getHours() + ":" + time.getMinutes());

// At the initial load, get a snapshot of the current data.
// using.html to avoid duplicate table row entries
database.ref().on("value", function(snapshot){

// logs train 1

console.log(snapshot.val().autoTrain);
console.log(snapshot.val().autoTrain.Name);
console.log(snapshot.val().autoTrain.Destination);
console.log(snapshot.val().autoTrain.Frequency);
console.log(snapshot.val().autoTrain.nextArrival);
console.log(snapshot.val().autoTrain.minutesAway);

// posts train 1 to schedule panel

$('#1tn').html(snapshot.val().autoTrain.Name);
$('#1dest').html(snapshot.val().autoTrain.Destination);
$('#1freq').html(snapshot.val().autoTrain.Frequency);
$('#1arrival').html(snapshot.val().autoTrain.nextArrival);
$('#1mins').html(snapshot.val().autoTrain.minutesAway);

// logs train 2

console.log(snapshot.val().capitolCorridor);
console.log(snapshot.val().capitolCorridor.Name);
console.log(snapshot.val().capitolCorridor.Destination);
console.log(snapshot.val().capitolCorridor.Frequency);
console.log(snapshot.val().capitolCorridor.nextArrival);
console.log(snapshot.val().capitolCorridor.minutesAway);

// posts train 2 to schedule panel

$('#2tn').html(snapshot.val().capitolCorridor.Name);
$('#2dest').html(snapshot.val().capitolCorridor.Destination);
$('#2freq').html(snapshot.val().capitolCorridor.Frequency);
$('#2arrival').html(snapshot.val().capitolCorridor.nextArrival);
$('#2mins').html(snapshot.val().capitolCorridor.minutesAway);

// logs train 3

console.log(snapshot.val().coaststarlight);
console.log(snapshot.val().coaststarlight.Name);
console.log(snapshot.val().coaststarlight.Destination);
console.log(snapshot.val().coaststarlight.Frequency);
console.log(snapshot.val().coaststarlight.nextArrival);
console.log(snapshot.val().coaststarlight.minutesAway);

// posts train 3 to schedule panel

$('#3tn').html(snapshot.val().coaststarlight.Name);
$('#3dest').html(snapshot.val().coaststarlight.Destination);
$('#3freq').html(snapshot.val().coaststarlight.Frequency);
$('#3arrival').html(snapshot.val().coaststarlight.nextArrival);
$('#3mins').html(snapshot.val().coaststarlight.minutesAway);

// logs train 4

console.log(snapshot.val().empireService);
console.log(snapshot.val().empireService.Name);
console.log(snapshot.val().empireService.Destination);
console.log(snapshot.val().empireService.Frequency);
console.log(snapshot.val().empireService.nextArrival);
console.log(snapshot.val().empireService.minutesAway);

// posts train 4 to schedule panel

$('#4tn').html(snapshot.val().empireService.Name);
$('#4dest').html(snapshot.val().empireService.Destination);
$('#4freq').html(snapshot.val().empireService.Frequency);
$('#4arrival').html(snapshot.val().empireService.nextArrival);
$('#4mins').html(snapshot.val().empireService.minutesAway);

// logs train 5

console.log(snapshot.val().acelaExpress);
console.log(snapshot.val().acelaExpress.Name);
console.log(snapshot.val().acelaExpress.Destination);
console.log(snapshot.val().acelaExpress.Frequency);
console.log(snapshot.val().acelaExpress.nextArrival);
console.log(snapshot.val().acelaExpress.minutesAway);

// posts train 5 to schedule panel

$('#5tn').html(snapshot.val().acelaExpress.Name);
$('#5dest').html(snapshot.val().acelaExpress.Destination);
$('#5freq').html(snapshot.val().acelaExpress.Frequency);
$('#5arrival').html(snapshot.val().acelaExpress.nextArrival);
$('#5mins').html(snapshot.val().acelaExpress.minutesAway);

// }); // /snapshot function

// --------------------------------------------------------------

// Whenever a user clicks the submit button to add new train
$("#submitTrain").click(function(){

  // Get the input values from form

  var trainName = $('#trainName').val().trim();
  var destination = $('#destination').val().trim();
  var firstTrainTime = parseInt($('#first-train-time').val().trim());
  var frequency = parseInt($('#frequency').val().trim());
  var userName = $('#user-name').val().trim();

  // Log all the new train information

  console.log("New train name:" + " " + trainName);
  console.log("New train destination:" + " " + destination);
  console.log("New train time:" + " " + firstTrainTime);
  console.log("New train frequency:" + " " + frequency);
  console.log("New user name:" + " " + userName);

// Save the new train in Firebase

database.ref().push({
  newTrain: trainName,
  destination: destination,
  newTrainTime: firstTrainTime,
  frequency: frequency,
  userName: userName,
});

// Creates new table row to hold new train information table cells

var newCell = $('<tr>');


// gathers input form data and appends to new td's

newCell.append("<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + firstTrainTime + "</td>" + "<td>" + frequency + "</td>");
// newCell.append(destination);
// newCell.append(firstTrainTime);
// newCell.append(frequency);

// appends entire newCell to train schedule table

$("#schedule-table").append(newCell);

// doesn't refresh to keep new data in table

return false;

});

// real time arrival updates using moment.js

// autoTrain ***************************************************************************

var tFrequency = 3;
    var firstTime = "03:35"; // Time is 3:30 AM

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))




// autoTrain ***************************************************************************




});
