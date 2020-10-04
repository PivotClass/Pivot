import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";
import Transcript from "../Transcript";
import Filler from "../static-components/Filler";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import SplitPane, { Pane } from 'react-split-pane'

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
export default function TeacherClient(props) {
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
                                <p style={styles.roomID}>Let your students know the Room
                                    ID: <code>{props.roomName}</code></p></Typography>
                            <Cards teacherView={true}
                                   roomName={props.roomName}
                                   listName={"cards"}
                            />
                        </Paper>
                    </div>
                </SplitPane>
            </div>
            <Transcript/>
            {/*<div/>*/}
        </SplitPane>
    );
}
