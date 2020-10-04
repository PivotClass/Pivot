import React from 'react' ;
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';


//NEED TO GET THESE TO PROPER LOCATIONS BELOW
const API_KEY = process.env.ROOMSERVICE_API_KEY;
const API_URL = process.env.IBM_API_URL;


const end_message = {action: 'stop'};
class Transcript extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            audios: [],
            ibm_creds: {
                    "apikey": "-elRc0A5ej9qNBTsEnN-lFw2bt51Is6NvktfSeDOyRGm",
                    "iam_apikey_description": "Auto-generated for key 04411748-dd84-4847-ba65-521dda9eb6bc",
                    "iam_apikey_name": "Prof_Audio",
                    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Writer",
                    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/692a6ff0ff234827881b481d07782700::serviceid:ServiceId-e2c15d13-d93a-4271-9f0b-26a795a5137a",
                    "url": "wss://api.us-east.speech-to-text.watson.cloud.ibm.com/instances/a765512d-79c9-4e9a-a219-e71e1c33e294"
                },
            auth_token: "badtoken",
            count: 0,
            transcript_output: "",
            keywords: "No keywords yet"
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
            this.setState({count: this.state.count + 1});
        }
        if (this.state.count > 2) {
            this.getKeywords();
            this.setState({count: 0});
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
        this.websocket.send(end_message);
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
        const response = fetch(proxyurl + "https://iam.cloud.ibm.com/identity/token?grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=-elRc0A5ej9qNBTsEnN-lFw2bt51Is6NvktfSeDOyRGm", {
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
        // console.log("YEEET!!");
        // console.log(evt.data) ;
        // console.log(typeof evt.data) ;

        let transcript_json = JSON.parse(evt.data);
        //console.log(transcript_json);
        if (transcript_json.hasOwnProperty('results')) {
            let lop = transcript_json.results[0].alternatives[0].transcript;
            //console.log(l);
            this.setState({transcript_output: this.state.transcript_output + " " + lop});
            this.setState({current_output: lop});
        }

    }
    tstFetch(){
        const proxyurl = "https://cors-anywhere.herokuapp.com/"

        fetch(proxyurl + "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/eb527962-7dee-4c6f-8625-a5edc0d0583a/v1/analyze?version=2019-07-12", {
            body: "{\n \"text\": \" " + this.state.transcript_output + ".\",\n\"features\": {\n    \"keywords\": {\n        \"limit\":3\n    }\n  }\n}",
            headers: {
                Authorization: "Basic YXBpa2V5OklVZ1RYdy1zSUhpc1B2aTlzb05QLWFLbTQtUVZZSVdlMjAybDYxd0FJc1RD",
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(e => e.json()
        ).then((e) => {
            console.log("REsponse : " + JSON.stringify(e)) ;
        })
    }

    onOpen(evt) {
        var message = {
            "action": 'start',
            "content-type": 'audio/webm;codecs=opus',
            "interim_results": true,
            "inactivity_timeout": -1
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

    getKeywords() {
        console.log("getting keywords")
        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        console.log("Trying to fetch keywords");
        const response = fetch(proxyurl + "https://api.us-east.natural-language-understanding.watson.cloud.ibm.com/instances/eb527962-7dee-4c6f-8625-a5edc0d0583a/v1/analyze?version=2019-07-12", {
            body: "{\n \"text\": \" " + this.state.transcript_output + ".\",\n\"features\": {\n    \"keywords\": {\n        \"limit\":3\n    }\n  }\n}",
            headers: {
                Authorization: "Basic YXBpa2V5OklVZ1RYdy1zSUhpc1B2aTlzb05QLWFLbTQtUVZZSVdlMjAybDYxd0FJc1RD",
                "Content-Type": "application/json"
            },
            method: "POST"
        }).then(e => e.json()
        ).then(e => {
            console.log(JSON.stringify(e)) ;
            let temp = "" ;
            if(e.hasOwnProperty('keywords')) {
                for (let i = 0; i < e.keywords.length ; i++) {
                    temp = temp + " " + e.keywords[i].text + " , "  ;
                }
                this.setState({keywords:temp}) ;
            }
        })
    }



    render() {
        // const {recording, audios} = this.state;
        return (
            <div
                className="transcript_audio_recording"
                style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                }}
            >
                <audio
                    style={{width: 400}}
                    ref={a => {
                        this.audio = a;
                    }}>
                    <p>Audio stream not available. </p>
                </audio>
                <Typography
                    variant="h4"
                    style={{
                        position: "absolute",
                        left: "40px",
                        right: "40px",
                        top: "40px",
                        bottom: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    gutterBottom>
                    {this.state.current_output ? this.state.current_output : "(Transcription hasn't started yet)"}
                </Typography>
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
                    variant="h5"
                    style={{
                        position: "absolute",
                        left: "40px",
                        right: "40px",
                        top: "120px",

                        display: "flex",
                        justifyContent: "center",
                        alignItems: "bottom",
                        textAlign: "center",
                        verticalAlign: "middle",
                    }}
                    >
                {this.state.keywords }
                </Typography>
            </div>
        )
    }
}


export default Transcript;