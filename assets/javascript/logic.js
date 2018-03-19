var config = {
    apiKey: "AIzaSyDtQzuBdj-EGPQL3RG39AjSjNqm4mkgx1c",
    authDomain: "train-sched-lvf.firebaseapp.com",
    databaseURL: "https://train-sched-lvf.firebaseio.com",
    storageBucket: "train-sched-lvf.appspot.com",
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#Destination-input").val().trim();
      var trainTime = moment($("#firstTrain-input").val().trim(), "hh:mm").unix();
      var freq = $("#frequency-input").val().trim();
      console.log(trainTime);


    var newTrain ={
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: freq,

    }

    database.ref().push(newTrain);
    console.log(newTrain.name);
    console.log(newTrain.destination);

    alert("New train time added!");


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");

    return false;
  });

  database.ref().on("child_added", function(childSnapshot,prevChildKey){
      console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination= childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var freq = childSnapshot.val().frequency;


    // var currentTime = moment();
    // console.log ("current time:" + moment(currentTime).format("hh:mm"));

    var differentTime = moment().diff(moment.unix(trainTime), "minutes");
    var remaining = moment().diff(moment.unix(trainTime),"minutes") % freq;
    var minutes = (moment.unix(freq - trainTime));
    
    var arrival = moment().add(minutes, "m").format("hh:mm");
    console.log(arrival);
    console.log(minutes);

    $("#train-table >tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>" + arrival + "</td><td>" + minutes + "</td><td>");


  });