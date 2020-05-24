const video = document.getElementById('video')

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceExpressionNet.loadFromUri('./models'),

]).then(function () {
    console.log('Loaded Models')
    startVideo()
})

function startVideo() {
    navigator.getUserMedia({ video: {} },
        stream => video.srcObject = stream,
        error => console.log(error)
    )
}


video.addEventListener('play', function () {
    setInterval(async function () {
        const detections = await faceapi.detectAllFaces(video,
            new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
        console.log(detections)
    }, 100)
})