song="";
leftwristx = 0
leftwristy = 0
rightwristx = 0
rightwristy = 0
scoreleftwrist = 0
scorerightwrist = 0
volume=0
function preload(){
    song=loadSound("music.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}
function modelLoaded(){
    console.log("model loaded!")
}
function gotPoses(results){
    if (results.length > 0){
        console.log (results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftwrist = " + scoreleftwrist + "scorerightwrist = " + scorerightwrist);
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("left wrist x =" + leftwristx + " " + "left wrist y =" + leftwristy);
        console.log("right wrist x =" + rightwristx + " " + "right wrist y =" + rightwristy);
    }
}
function draw(){
    image(video, 0, 0, 600, 500);
    fill('ff0000');
    stroke('ff0000');
    if (scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,20);
        if (rightwristy > 0 && rightwristy <= 100){
            document.getElementById("speed").innerHTML = "Speed = 0.5";
            song.rate(0.5);
        }
        else if (rightwristy > 100 && rightwristy <= 200){
            document.getElementById("speed").innerHTML = "Speed = 1";
            song.rate(1);
        }
        else if (rightwristy > 200 && rightwristy <= 300){
            document.getElementById("speed").innerHTML = "Speed = 1.5";
            song.rate(1.5);
        }
        else if (rightwristy > 300 && rightwristy <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2";
            song.rate(2);
        }
        else if (rightwristy > 400 && rightwristy <= 500){
            document.getElementById("speed").innerHTML = "Speed = 2.5";
            song.rate(2.5);
        }
    }
    if (scoreleftwrist >0.2){
        circle(leftwristx, leftwristy, 20);
        inNumleftwristy=Number(leftwristy);
        removeYdecimals= floor(inNumleftwristy);
        volume = removeYdecimals/500;
        document.getElementById("vol").innerHTML ="Volume =" + volume;
        song.setVolume(volume);
    }
    
}

