// Angle Calculations & Drawings Functions :
function drawCircle(canvasCtx, poseLandmarks, landmarkIds, options) {
    const canvasWidth = canvasCtx.canvas.width;
    const canvasHeight = canvasCtx.canvas.height;

    landmarkIds.forEach(id => {
        const landmark = poseLandmarks[id];
        if (landmark && (!landmark.hasOwnProperty('visibility') || landmark.visibility >= options.visibilityMin)) {
            const x = landmark.x * canvasWidth;
            const y = landmark.y * canvasHeight;

            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 4, 0, 2 * Math.PI, false);
            canvasCtx.fillStyle = options.fillColor;
            canvasCtx.fill();
            canvasCtx.lineWidth = 3;
            canvasCtx.strokeStyle = options.color;
            canvasCtx.stroke();
        }
    });
}
function calculateAngle(A, B, C) {
    const pt1X = A.x 
    const pt1Y = A.y 
    const pt2X = B.x 
    const pt2Y = B.y 
    const pt3X = C.x 
    const pt3Y = C.y 

    const BAx = pt1X - pt2X;
    const BAy = pt1Y - pt2Y;
    const BCx = pt3X - pt2X;
    const BCy = pt3Y - pt2Y;

    const dotProduct = BAx * BCx + BAy * BCy;
    const magnitudeBA = Math.sqrt(BAx * BAx + BAy * BAy);
    const magnitudeBC = Math.sqrt(BCx * BCx + BCy * BCy);

    // Calculer l'angle en radians
    const angleInRadians = Math.acos(dotProduct / (magnitudeBA * magnitudeBC));

    // Convertir en degrés
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees;
}
function capture(canvasCtx,Pose,results,drawingUtils) {
        pose.reset();
        results = null; // Destroy the results object
        drawingUtils.reset(); // Restore any canvas context transformations
        drawingUtils = null; // Destroy the drawingUtils object
        Pose= null;
        var canvas = document.getElementById("output_canvas");
        var video = document.getElementById("input_video");
        canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);

        var video = document.getElementById("input_video");
        video.pause();
        var img = canvas.toDataURL("image/png");
        
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
        var container = document.createElement("div");
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.alignItems = "center";
        container.style.height = "100vh";
        container.style.backgroundImage = "url('" + img + "')";
        container.style.backgroundSize = "contain";
        container.style.backgroundRepeat = "no-repeat";
        container.style.backgroundPosition = "center";

        // Create the image element
        var image = document.createElement("img");
        image.src = img;
        image.style.maxWidth = "100%";
        image.style.maxHeight = "100%";
     
        // Append the image to the container
        container.appendChild(image);
        
        // Replace the document body with the container


        document.body.appendChild(container);

}
// GUI Body Functions : 

function validleftarm(canvasCtx,mpPose,results,drawingUtils)
{
        drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_SHOULDER ,mpPose.POSE_LANDMARKS.LEFT_ELBOW ,mpPose.POSE_LANDMARKS.LEFT_WRIST ], { visibilityMin: 0.65, color: "#1CE496" ,fillColor: "#1CE496"});
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[10],mpPose.POSE_CONNECTIONS[11]], { visibilityMin: 0.65, color: "#1CE496" });
}
function unvalidleftarm(canvasCtx,mpPose,results,drawingUtils,feedback)
{
        drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_SHOULDER ,mpPose.POSE_LANDMARKS.LEFT_ELBOW ,mpPose.POSE_LANDMARKS.LEFT_WRIST ], { visibilityMin: 0.65, color: "#FF3D00" ,fillColor: "#FF3D00"});
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[10],mpPose.POSE_CONNECTIONS[11]], { visibilityMin: 0.65, color: "#FF3D00" });
        feedback.innerHTML = "Lever le bras Gauche";
}
function validarms(canvasCtx,mpPose,results,drawingUtils){
        validleftarm(canvasCtx,mpPose,results,drawingUtils);
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[9]], { visibilityMin: 0.65, color: "#1CE496" });
}
function unvalidarms(canvasCtx,mpPose,results,drawingUtils,feedback)
{
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[9]], { visibilityMin: 0.65, color: "#FF3D00" });
    feedback.innerHTML = "Lever et écarter les deux bras";
}
function validleftleg(canvasCtx,mpPose,results,drawingUtils)
{
        drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_HIP ,mpPose.POSE_LANDMARKS.LEFT_KNEE ,mpPose.POSE_LANDMARKS.LEFT_ANKLE ], { visibilityMin: 0.65, color: "#1CE496" ,fillColor: "#1CE496"});
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[25],mpPose.POSE_CONNECTIONS[27]], { visibilityMin: 0.65, color: "#1CE496" });
}
function unvalidleftleg(canvasCtx,mpPose,results,drawingUtils,feedback)
{
        drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_HIP ,mpPose.POSE_LANDMARKS.LEFT_KNEE ,mpPose.POSE_LANDMARKS.LEFT_ANKLE ], { visibilityMin: 0.65, color: "#FF3D00",fillColor: "#FF3D00" });
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[25],mpPose.POSE_CONNECTIONS[27]], { visibilityMin: 0.65, color: "#FF3D00" });
        feedback.innerHTML = "Ecarter la jambe Gauche";
}
function validrightleg(canvasCtx,mpPose,results,drawingUtils)
{
        drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.RIGHT_HIP ,mpPose.POSE_LANDMARKS.RIGHT_KNEE ,mpPose.POSE_LANDMARKS.RIGHT_ANKLE ], { visibilityMin: 0.65, color: "#1CE496" ,fillColor: "#1CE496"});
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[26],mpPose.POSE_CONNECTIONS[28]], { visibilityMin: 0.65, color: "#1CE496" });
}
function unvalidrightleg(canvasCtx,mpPose,results,drawingUtils,feedback)
{drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.RIGHT_HIP ,mpPose.POSE_LANDMARKS.RIGHT_KNEE ,mpPose.POSE_LANDMARKS.RIGHT_ANKLE ], { visibilityMin: 0.65, color: "#FF3D00" ,fillColor: "#FF3D00"});
        drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[26],mpPose.POSE_CONNECTIONS[28]], { visibilityMin: 0.65, color: "#FF3D00" });
        feedback.innerHTML = "Ecarter la jambe Droite";
}
function validlegs(canvasCtx,mpPose,results,drawingUtils)
{   drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[24]], { visibilityMin: 0.65, color: "#1CE496" });
    validrightleg(canvasCtx,mpPose,results,drawingUtils);
    validleftleg(canvasCtx,mpPose,results,drawingUtils);
}
function unvalidlegs(canvasCtx,mpPose,results,drawingUtils,feedback)
{
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[24]], { visibilityMin: 0.65, color: "#FF3D00" });
    feedback.innerHTML = "Ecarter les deux jambes";
}
function validbody(canvasCtx, mpPose, results, drawingUtils, feedback) {
    // drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[12], mpPose.POSE_CONNECTIONS[13]], { visibilityMin: 0.65, color: "#1CE496" });
    // drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[22], mpPose.POSE_CONNECTIONS[23]], { visibilityMin: 0.65, color: "#1CE496" });
    validarms(canvasCtx, mpPose, results, drawingUtils);
    validlegs(canvasCtx, mpPose, results, drawingUtils);
    feedback.innerHTML = "Parfait ! Plus un geste!";
    pose.reset();
    drawingUtils = null; // Destroy the drawingUtils object
    capture(canvasCtx, mpPose, results, drawingUtils);
}
function unvalidbody(canvasCtx,mpPose,results,drawingUtils)
{
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[22],mpPose.POSE_CONNECTIONS[23]], { visibilityMin: 0.65, color: "#FF3D00" });
}
function unvisiblebody(canvasCtx,mpPose,results,drawingUtils)
{   drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[9]], { visibilityMin: 0.65, color: "#FF3D00" });
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[24]], { visibilityMin: 0.65, color: "#FF3D00" });
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[22],mpPose.POSE_CONNECTIONS[23]], { visibilityMin: 0.65, color: "#FF3D00" });
    drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_SHOULDER ,mpPose.POSE_LANDMARKS.LEFT_ELBOW ,mpPose.POSE_LANDMARKS.LEFT_WRIST ], { visibilityMin: 0.65, color: "#FF3D00" ,fillColor: "#FF3D00"});
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[10],mpPose.POSE_CONNECTIONS[11]], { visibilityMin: 0.65, color: "#FF3D00" });
    drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.RIGHT_HIP ,mpPose.POSE_LANDMARKS.RIGHT_KNEE ,mpPose.POSE_LANDMARKS.RIGHT_ANKLE ], { visibilityMin: 0.65, color: "#FF3D00" ,fillColor: "#FF3D00"});
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[26],mpPose.POSE_CONNECTIONS[28]], { visibilityMin: 0.65, color: "#FF3D00" });
    drawCircle(canvasCtx, results.poseLandmarks, [mpPose.POSE_LANDMARKS.LEFT_HIP ,mpPose.POSE_LANDMARKS.LEFT_KNEE ,mpPose.POSE_LANDMARKS.LEFT_ANKLE ], { visibilityMin: 0.65, color: "#FF3D00",fillColor: "#FF3D00" });
    drawingUtils.drawConnectors(canvasCtx, results.poseLandmarks, [mpPose.POSE_CONNECTIONS[25],mpPose.POSE_CONNECTIONS[27]], { visibilityMin: 0.65, color: "#FF3D00" });
    
    feedback.innerHTML = "Votre corps doit être entièrement visible ! ";
}

function unvisibleleftarm(canvasCtx,mpPose,results,drawingUtils,feedback)
{
    feedback.innerHTML = "Votre bras gauche doit être entièrement visible !";
}
function unvisiblerightleg(canvasCtx,mpPose,results,drawingUtils,feedback)
{
    feedback.innerHTML = "Votre jambe droite doit être entièrement visible !";
}
function unvisibleleftleg(canvasCtx,mpPose,results,drawingUtils,feedback)
{
    feedback.innerHTML = "Votre jambe gauche doit être entièrement visible !";
}

const controls = window;
const LandmarkGrid = window.LandmarkGrid;
const drawingUtils = window;
const mpPose = window;
const options = {
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}/${file}`;
    }
};

const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const controlsElement = document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

const fpsControl = new controls.FPS();
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};
const landmarkContainer = document.getElementsByClassName('landmark-grid-container')[0];
const grid = new LandmarkGrid(landmarkContainer, {
    connectionColor: 0xCCCCCC,
    definedColors: [{ name: 'LEFT', value: 0xffa500 }, { name: 'RIGHT', value: 0x00ffff }],
    range: 2,
    fitToGrid: true,
    labelSuffix: 'm',
    landmarkSize: 2,
    numCellsPerAxis: 4,
    showHidden: false,
    centered: true,
});
let activeEffect = 'mask';

function onResults(results) {
    document.body.classList.add('loaded');
    let angleRightArm = 0;
    let angleLeftArm = 0;
    let angleLeftLeg = 0;
    let angleRightLeg = 0;
    let angleLeftWrist = 0;
    let angleRightWrist = 0;
    let angleLeftAnkle = 0;
    let angleRightAnkle = 0;

    let okLeftArm = false;
    let okRightArm = false;
    let okLeftLeg = false;
    let okRightLeg = false;
    let okLeftWrist = false;
    let okRightWrist = false;
    let okLeftAnkle = false;
    let okRightAnkle = false;

    let visibleleftleg = false;
    let visiblerightleg = false;
    let visibleleftarm = false;
    let visiblerightarm = false;
    let visiblebody = false;

    fpsControl.tick();
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    if (results.segmentationMask) {
        canvasCtx.drawImage(results.segmentationMask, 0, 0, canvasElement.width, canvasElement.height);
        if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
            canvasCtx.fillStyle = '#00FF007F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        } else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = '#0000FF7F';
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);
        }
        canvasCtx.globalCompositeOperation = 'destination-atop';
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.globalCompositeOperation = 'source-over';
    } else {
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);}

    //Fonctionnalité de Détection de la posture :
    if (results.poseLandmarks) {
        const A = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_SHOULDER];
        const B = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_SHOULDER];
        const C = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_ELBOW];
        const D = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_ELBOW];
        const E = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_WRIST];
        const F = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_WRIST];
        const AL = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_HIP];
        const BL = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_HIP];
        const CL = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_KNEE];
        const DL = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_KNEE];
        const EL = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_ANKLE];
        const FL = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_ANKLE];
        const G = results.poseLandmarks[mpPose.POSE_LANDMARKS.RIGHT_HEEL];
        const H = results.poseLandmarks[mpPose.POSE_LANDMARKS.LEFT_HEEL];

        //Calculs des Angles et tests de visibilité :
        if (A && B && C && D && E && F && AL && BL && CL && DL && EL && FL) {
        visibleleftleg=(AL.visibility > 0.9 && BL.visibility > 0.9 && CL.visibility > 0.9 && DL.visibility > 0.9 && EL.visibility > 0.9 && FL.visibility > 0.9 && G.visibility > 0.5 && H.visibility > 0.5);
        visiblerightleg=( AL.visibility > 0.9 && BL.visibility > 0.9 && CL.visibility > 0.9 && DL.visibility > 0.9 && EL.visibility > 0.9 && FL.visibility > 0.9 && G.visibility > 0.5 && H.visibility > 0.5);
        visibleleftarm=(A.visibility > 0.9 && B.visibility > 0.9 && C.visibility > 0.9 && D.visibility > 0.9 && E.visibility > 0.9 && F.visibility > 0.9);
        visiblerightarm=( A.visibility > 0.9 && B.visibility > 0.9 && C.visibility > 0.9 && D.visibility > 0.9 && E.visibility > 0.9 && F.visibility > 0.9);
        visiblebody= visibleleftarm  && visibleleftleg && visiblerightleg;

        //Arm is in a straight line
        angleLeftArm=calculateAngle(B, A, C)-90
        if (angleLeftArm < 5 && (visibleleftarm)) { okLeftArm = true;}

        //Legs in a straight line
        angleLeftLeg=calculateAngle(DL, BL, CL)-90;
        if (Math.abs(angleLeftLeg) >87 ) { okLeftLeg = true;}
        angleRightLeg=calculateAngle(CL, AL, DL)-90;
        if (Math.abs(angleRightLeg)>87 ) { okRightLeg = true;}


        }
    } canvasCtx.restore();
    
    
    // Feedback utilisateur :
    if (results.poseWorldLandmarks) {
        var feedback = document.getElementById("feedback");
        feedback.innerHTML = "Regardez directement l'appareil photo ! ";

        if (!visiblebody) {
            feedback.innerHTML = "Votre corps doit être entièrement visible ! ";
        }

        if (okLeftArm && okRightLeg && okLeftLeg) {
            validbody(canvasCtx,mpPose,results,drawingUtils,feedback);
        } else {
            unvalidbody(canvasCtx,mpPose,results,drawingUtils);
            if (okLeftArm) {
                validarms(canvasCtx,mpPose,results,drawingUtils);
            } else {
                unvalidarms(canvasCtx,mpPose,results,drawingUtils,feedback);

                if(okLeftArm){
                    validleftarm(canvasCtx,mpPose,results,drawingUtils);
                }
                else{
                    unvalidleftarm(canvasCtx,mpPose,results,drawingUtils,feedback);
                }
            }
            if (okRightLeg && okLeftLeg) {
                validlegs(canvasCtx,mpPose,results,drawingUtils);
            } else {
                unvalidlegs(canvasCtx,mpPose,results,drawingUtils,feedback);
                if(okRightLeg){
                    validrightleg(canvasCtx,mpPose,results,drawingUtils);
                }
                else{
                    unvalidrightleg(canvasCtx,mpPose,results,drawingUtils,feedback);
                }
                if(okLeftLeg){
                    validleftleg(canvasCtx,mpPose,results,drawingUtils);
                }
                else{
                    unvalidleftleg(canvasCtx,mpPose,results,drawingUtils,feedback);
                }
            }
        }}
    }

// Grille documentation :
const pose = new mpPose.Pose(options);
pose.onResults(onResults);
new controls
    .ControlPanel(controlsElement, {
        selfieMode: true,
        modelComplexity: 1,
        smoothLandmarks: false,
        enableSegmentation: false,
        smoothSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        effect: 'background',
    })
    .add([
        new controls.StaticText({ title: 'MediaPipe Pose' }),
        fpsControl,
        new controls.Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
        new controls.SourcePicker({
            onSourceChanged: () => {
                pose.reset();
            },
            onFrame: async (input, size) => {
                const aspect = size.height / size.width;
                let width, height;
                if (window.innerWidth > window.innerHeight) {
                    height = window.innerHeight;
                    width = height / aspect;
                } else {
                    width = window.innerWidth;
                    height = width * aspect;
                }
                canvasElement.width = width;
                canvasElement.height = height;
                await pose.send({ image: input });
            },
        }),
        new controls.Slider({
            title: 'Model Complexity',
            field: 'modelComplexity',
            discrete: ['Lite', 'Full', 'Heavy'],
        }),
        new controls.Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
        }),
        new controls.Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01
        }),
        new controls.Slider({
            title: 'Effect',
            field: 'effect',
            discrete: { 'background': 'Background', 'mask': 'Foreground' },
        }),

    ])
    .on(x => {
        const options = x;
        videoElement.classList.toggle('selfie', options.selfieMode);
        activeEffect = x['effect'];
        pose.setOptions(options);
    });

