import React from 'react' ;
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

const end_message = {action: 'stop'};

class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audios: [],
            ibm_creds: {
                "apikey": "toVMBr2R8hJWaKFsps3WAr72AJrWJf6zQq4qZPO48UBG",
                "iam_apikey_description": "Auto-generated for key 204f6bfd-1516-4618-b1e7-a4a2708ad99e",
                "iam_apikey_name": "Prof_Audio",
                "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
                "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/cac442f496ab409588522707a014b666::serviceid:ServiceId-96c103b5-7f5d-412d-9447-90060fe7cbca",
                "url": "wss://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/2ace51cc-2a4e-4e79-abbf-577bcbfedd94/"
            },
            auth_token: "badtoken",
            count: 0,
            transcript_output: "",
        };
    };

    getWebSocket() {
        const wsURI = this.state.ibm_creds.url + '/v1/recognize' + '?access_token=' + this.state.auth_token;
        console.log("this is the URL  " + wsURI);
        this.websocket = new WebSocket(wsURI);
        return wsURI
    } ;

    async componentDidMount() {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});
        this.mediaRecorder = new MediaRecorder(stream);
        this.chunks = [];
        console.log("token now : " + this.state.auth_token);
        this.getToken();
        this.mediaRecorder.ondataavailable = (e) => {
            this.handleData(e);
        };
    }

    handleData(e) {
        if (e.data && e.data.size > 0) {
            // console.log("sending "+ e.data) ;
            this.websocket.send(e.data);
        }
    }

    startRecording(e) {
        console.log("recording started");
        e.preventDefault();

        // wipe old data chunks
        this.chunks = [];
        // start recorder with 5s buffer
        this.mediaRecorder.start(5000);
        // say that we're recording
        this.setState({recording: true});
    }


    closeConnection() {
        this.websocket.close();
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

    /*
      saveAudio() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, {type: audioType});
        // generate video url from blob
        const audioURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        const audios = this.state.audios.concat([audioURL]);
        this.setState({audios});
      }

     */

    getToken() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const response = fetch(proxyurl + "https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=toVMBr2R8hJWaKFsps3WAr72AJrWJf6zQq4qZPO48UBG", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            mode: 'cors'
        }).then(response => response.json())
            .then(response => {

                console.log(response);
                this.setState({"auth_token": response.access_token});
                console.log("new token " + this.state.auth_token);
                this.getWebSocket();

            }).then(res => {
                this.websocket.onopen = (ev => (this.onOpen(ev)));
                this.websocket.onmessage = (ev => (this.onMessage(ev)));
                this.websocket.onclose = (ev => (this.onClose(ev)));
                this.websocket.onerror = (ev => (this.onError(ev)));
            })

    } ;

    traverse(jsonObj) {
        if (jsonObj !== null && typeof jsonObj == "object") {
            Object.entries(jsonObj).forEach(([key, value]) => {
                // key is either an array index or object key
                if (key === "transcript") {
                    return value;
                } else {
                    // eslint-disable-next-line no-undef
                    this.traverse(value);
                }
            });
        } else {
            return " test ";
        }
    }

    onMessage(evt) {
        console.log("YEEET!!");
        // console.log(evt.data) ;
        // console.log(typeof evt.data) ;

        let transcript_json = JSON.parse(evt.data);
        console.log(transcript_json);
        if (transcript_json.hasOwnProperty('results')) {
            let lop = transcript_json.results[0].alternatives[0].transcript;
            //console.log(l);
            this.setState({transcript_output: this.state.transcript_output + " " + lop});
            this.setState({current_output: lop});
        }

    }

    onOpen(evt) {
        var message = {
            "action": 'start',
            "content-type": 'audio/webm;codecs=opus',
            "interim_results": true
        };
        this.websocket.send(JSON.stringify(message));
    }

    onClose(ev) {
        console.log("CLOSED")
    }

    onError(ev) {
        console.log("ERROR!!!!")
    }

    getOutput() {
        console.log("Text Output " + this.state.transcript_output);
        return this.state.transcript_output;
    }

    render() {
        // const {recording, audios} = this.state;
        return (
            <div className="transcript_audio_recording">
                <audio
                    style={{width: 400}}
                    ref={a => {
                        this.audio = a;
                    }}>
                    <p>Audio stream not available. </p>
                </audio>
                <Fab variant="extended"
                     onClick={(e) => {
                         this.state.recording ? this.stopRecording(e) : this.startRecording(e);
                     }}
                     color={this.state.recording ? "secondary" : "primary"}
                     style={{
                         position: "absolute",
                         left: "20px",
                         bottom: "20px",
                     }}
                >
                    {this.state.recording ?
                        <MicOffIcon style={{marginRight: "8px",}}/> :
                        <MicIcon style={{marginRight: "8px",}}/>}
                    {this.state.recording ? "Listening..." : "Start Transcription"}
                </Fab>
                <Typography
                    variant="h4"
                    style={{
                        position: "absolute",
                        left: "70px",
                        right: "70px",
                        top: "70px",
                        bottom: "70px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    gutterBottom>
                    {this.state.current_output ? this.state.current_output : "(Transcription hasn't started yet)"}
                </Typography>
            </div>
        )
    }
}

export default Transcript;