song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scorerightWrist = 0;
song_played = "";

function setup(){
    canvas  = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);
}

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#9ACD32");
    stroke("#9ACD32");

    song1.isPlaying();
    console.log(song1);

    if(scoreLeftWrist > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1 == false){
            song1.play();
        }
        else{
            document.getElementById("song_name").innerHTML = "Song Name: Song 1";
        }
    }
}

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("Score LeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

