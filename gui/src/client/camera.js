import React from 'react';

class Camera  extends React.Component {

    width = 0
    height = 0

    video= null
    context= null
    canvas= null

    constructor(props) {
        super(props);

        this.refCanvas = React.createRef();
        this.refVideo = React.createRef();
        
        // this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.video = this.refVideo.current;
        this.canvas = this.refCanvas.current;
        this.context = this.canvas.getContext('2d');

        this.startCamera()
    }


    startCamera(w = 680, h = 480) {
        if (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia) {
            this.width = w;
            this.height = h;


            (function (video) {
                window.navigator.mediaDevices.getUserMedia({
                    video: true,
                    facingMode: {
                      exact: 'environment'
                    }
                }).then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                });
            })(this.video)

        }
    }


    takeSnapshot() {
        this.context.drawImage(this.video, 0, 0, this.width, this.height);
    }

    render(){
        return(<div>
            <video className="camera-video" ref={this.refVideo} autoPlay>camera</video>
            <canvas className="camera-canvas" ref={this.refCanvas}></canvas>
        </div>)
    }  

}

export default Camera;