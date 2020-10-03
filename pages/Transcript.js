import React from 'react' ; 

class Transcript extends React.Component{
constructor(props){
    super(props);
    this.state = {
        recording: false,
        audios: [],
      };
};
async componentDidMount(){
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.mediaRecorder = new MediaRecorder(stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          this.chunks.push(e.data);
          console.log(e.data) ; 
        }
      };

}
startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({recording: true});
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({recording: false});
    // save the video to memory
    //this.saveAudio();
  }

  saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, {type: audioType});
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = this.state.audios.concat([audioURL]);
    this.setState({audios});
  }


    render(){
        const{recording,audios} = this.state ; 
        return(
            <div className="camera">
            <audio
    
    
              style={{width: 400}}
              ref={a => {
                this.audio = a;
              }}>
             <p>Audio stream not available. </p>
            </audio>
            <div>
              {!recording && <button onClick={e => this.startRecording(e)}>Record</button>}
              {recording && <button onClick={e => this.stopRecording(e)}>Stop</button>}
            </div>
          
          </div>
        )
    }
}
export default Transcript ; 