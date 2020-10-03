import React from 'react' ; 

class Transcript extends React.Component{
constructor(props){
    super(props);
    this.state = {
        recording: false,
        audios: [], 
        ibm_creds : {
            "apikey": "toVMBr2R8hJWaKFsps3WAr72AJrWJf6zQq4qZPO48UBG",
            "iam_apikey_description": "Auto-generated for key 204f6bfd-1516-4618-b1e7-a4a2708ad99e",
            "iam_apikey_name": "Prof_Audio",
            "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
            "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/cac442f496ab409588522707a014b666::serviceid:ServiceId-96c103b5-7f5d-412d-9447-90060fe7cbca",
            "url": "wss://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/2ace51cc-2a4e-4e79-abbf-577bcbfedd94/"
          } ,
        token : ""
      };
};
async componentDidMount(){
    const stream = await navigator.mediaDevices.getUserMedia({audio: true});
    this.mediaRecorder = new MediaRecorder(stream);
    this.chunks = [];
    this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
            console.log(e.data) ; 
          }
    }; 

}

startRecording(e) {
    console.log("test test test") ;
    const token_response = this.getToken() ; 
    this.state.token = token_response.access_token ; 
    console.log(this.state.token) ; 

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

   async getToken(){
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
      const response = await fetch(proxyurl+"https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey="+this.state.ibm_creds.apikey, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        mode:'cors'
      }).catch(() => console.log("Token fetching error")) ; 
      return response.json() ; 
  } ;
  lol () {
    console.log(this.getToken()); 
    console.log("gello") ; 
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
             <button onClick={e => this.startRecording(e)}>Record</button>
             <button onClick={e => this.stopRecording(e)}>Stop</button>
            
            </div>
          
          </div>
        )
    }
}
export default Transcript ; 