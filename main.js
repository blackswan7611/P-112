//https://teachablemachine.withgoogle.com/models/YsPPAuuU0/
Webcam.set
({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YsPPAuuU0/model.json", modelLoaded);

function modelLoaded()
{
    console.log( "Model Loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = "This hand gesture is of " +prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) 
    {
        console.log(error);
    }

    else
    {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();

        if (results[0].label == "Victory")
        {
            document.getElementById("update_meaning").innerHTML = "Victory!!";
        }
        else if(results[0].label == "Good luck")
        {
            document.getElementById("update_meaning").innerHTML = "You can do this!";
        }
        else 
        {
            document.getElementById("update_meaning").innerHTML =  "A huge round of applause!";
        }

    }
}

