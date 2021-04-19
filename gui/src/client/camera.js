import React from 'react';

class Camera  extends React.Component {

    width = 600
    height = 600

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

    componentWillUnmount(){
        this.stop()
    }


    startCamera() {
        if (window.navigator.mediaDevices && window.navigator.mediaDevices.getUserMedia) {

            window.navigator.mediaDevices.getUserMedia({
                video: true,
                facingMode: {
                  ideal: 'environment'
                },
                frameRate:{
                    ideal: 25,
                    min: 10,
                }
            }).then((stream)=> {
                this.video.srcObject = stream;
                this.video.play();

                this.stream = stream

            }).catch((err)=>{
                alert('camera' + err)
            });

        }
    }

    stop(){
        this.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }


    takeSnapshot() {

        this.width = this.video.videoWidth;
        this.height = this.video.videoHeight;

        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;


        this.context.drawImage(this.video, 0, 0, this.width, this.height);

        var dataUrl = this.refCanvas.current.toDataURL('image/png');
        if (this.props.onPhoto) {
            this.props.onPhoto(dataUrl);
        }
    }

    render(){
        return(<div>
            <video className="camera-video" ref={this.refVideo} autoPlay>camera</video>
            <canvas className="camera-canvas" ref={this.refCanvas}></canvas>
        </div>)
    }  

}

export default Camera;