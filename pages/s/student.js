import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";
import SplitPane from "react-split-pane";
import Filler from "../static-components/Filler";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TranscriptViewer from "../TranscriptViewer";

const studentID = '' + Math.random() + '' + Math.random() + '' + Math.random() + '' + Math.random();

const styles = {
    welcome: {
        margin: "0 auto",
        padding: "10px 10px 10px 10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "30px",
    },
    roomID: {
        margin: "0 auto",
        padding: "15px 15px 0px 15px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "20px",
    },
}

// Feed.
export default function StudentClient(props) {
    return (
        <SplitPane
            split="horizontal"
            defaultSize={200}
            primary="second"
        >
            <div>
                <SplitPane
                    split="vertical"
                    defaultSize={400}
                    primary="second"
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            left: "0",
                            right: "0",
                        }}
                    >
                        <Filler/>
                    </div>
                    <div>
                        <Paper
                            variant="outlined"
                            square
                            style={{
                                position: "absolute",
                                top: "0",
                                bottom: "0",
                                left: "0",
                                right: "0",
                                overflow: "scroll",
                            }}
                        >
                            <Typography variant="h2" gutterBottom style={styles.welcome}>
                                <p style={styles.roomID}>You're in Room: <code>{props.roomName}</code></p></Typography>
                            <Cards
                                studentID={studentID}
                                teacherView={false}
                                roomName={props.roomName}
                                listName = "cards"
                            />
                        </Paper>
                    </div>
                </SplitPane>
            </div>
            <TranscriptViewer/>
            {/*<div/>*/}
        </SplitPane>
    );
}
