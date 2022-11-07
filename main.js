
function preload(){
    doodle_net= ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw(){
    strokeWeight(7);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    doodle_net.classify(canvas,gotResults);
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        doodle_name = results[0].label;
        doodle_confi = Math.round(results[0].confidence *100)+"%";
        console.log("doodle name: "+doodle_name+" & doodle accuracy: "+doodle_confi);
        document.getElementById("sketch_name").innerHTML = doodle_name;
        document.getElementById("confi_label").innerHTML = doodle_confi;
        utter_this = new SpeechSynthesisUtterance(doodle_name); 
        synth.speak(utter_this);
    }
}

function clearCanvas(){
    background("white");
}