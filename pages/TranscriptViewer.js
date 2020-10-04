import React from 'react' ;
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';


export default function TranscriptViewer(props) {

    return (
        <div
            className="transcript_view"
            style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
            }}
        >
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
                {/*TODO: change this.state.current_output to transcript from teacher.*/}
                {/*{this.state.current_output ? this.state.current_output : "(Transcription hasn't started yet)"}*/}
                (Transcription hasn't started yet)
                {/*TODO: Keywords from teacher */}
            </Typography>
        </div>
    )
}