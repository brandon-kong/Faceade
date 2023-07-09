import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

import {
    Box,
    Flex,
} from '@chakra-ui/react';

export default function Canvas ( props: any ) {

    const [modelIsLoaded, setModelIsLoaded] = useState(false);
    const [video, setVideo] = useState<any>(null);

    const videoRef = useRef(null);
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = useRef(null);
    const drawingCanvasRef = useRef(null);

    const [penUp, setPenUp] = useState(false);

    let hasMoved = false;
    let oldX = 0;
    let oldY = 0;

    function drawNoseOnCanvas(x: number, y: number) {
        //if (!penUp) return;
        const canvas = drawingCanvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(oldX, oldY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        oldX = x;
        oldY = y;
    }

    useEffect(() => {
        
        const loadModels = async () => {
            Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        ]).then(() => {
            setModelIsLoaded(true);
            handleVideoOnPlay();
        })
        }

        loadModels();
        
        try{
            setVideo(document.getElementById('video'));
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((stream) => {
                if (video === null) return;
                video.srcObject = stream;
                video.play();
                if (videoRef.current === null) return;


                //videoRef.current.srcObject = stream;
                //videoRef.current.play()
                    
            })
        }
        catch(err) {
            console.log(err)
        }
        
    });

    const handleVideoOnPlay = () => {
        
        if (canvasRef && canvasRef.current && video) {
            const canvas = faceapi.createCanvas(video);
            canvas.id = 'canvas';

            //document.querySelector("#faceCanvas")?.append(canvas);
            canvasRef.current.innerHTML = faceapi.createCanvas(video);
            const displaySize = {
              width: videoWidth,
              height: videoHeight
            }
            setInterval(async () => {
                //faceapi.matchDimensions(canvasRef.current, displaySize);
        
                if (!modelIsLoaded) return;
                const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()
        
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
                canvas.getContext('2d')?.clearRect(0, 0, videoWidth, videoHeight);
                //faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            
                if (detections.length === 0) {
                    hasMoved = false;
                    return;
                }
                const landmarks = detections[0].landmarks;
                const nose = landmarks.getNose()[5];

                if (!hasMoved) {
                    hasMoved = true;
                    oldX = nose.x;
                    oldY = nose.y;
                    hasMoved = true
                }
                
                if (nose.x !== oldX || nose.y !== oldY) {
                    drawNoseOnCanvas(nose.x, nose.y);
                }
                    
            }, 100)
        }
      }

    return (
        <>
            <Flex 
            justifyContent={'center'}
            w={'full'}
            h={'full'}
            bg={'white'}
            rounded={'md'}
            >
                <canvas id={'drawingCanvas'} ref={drawingCanvasRef} height={videoHeight} width={videoWidth} style={{ position: 'relative', transform: 'scaleX(-1)', width: '100%', height: '100%', aspectRatio: 640/480 }} />
                <canvas id={'faceCanvas'} ref={canvasRef} height={videoHeight} width={videoWidth} style={{ position: 'absolute', transform: 'scaleX(-1)' }} />
            </Flex>
            <video id={'video'}  ref={videoRef} style={{ display: 'none' }} width={videoWidth} height={videoHeight} onPlay={handleVideoOnPlay} />
        </>
        
    )
}