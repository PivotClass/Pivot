import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "./components/Cards";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import SplitPane, { Pane } from 'react-split-pane'

// Example card list that is loaded on components/student.
const exampleCardList = [
    {
        type: "poll",
        mcq: true,
        question: "Chicago is a...",
        choices: ["City", "Country", "State", "Town", "Continent"],
        answers: {
            "idA": 2,
            "idB": 0,
            "idC": 1,
            "idD": 3,
            "idE": 0
        },
        responsesPublic: false
    },
    {
        type: "poll",
        mcq: false,
        question: "Fill in what Chicago is!",
        answers: {
            "idA": "idk",
            "idB": "do u know",
            "idC": "sure",
            "idD": "i'm tired",
            "idE": "who is a derivative"
        },
        responsesPublic: false
    },
    {
        type: "tooltip",
        title: "Derivative",
        content: "A derivative is the infinitesimal rate of change in a function with respect to one of its parameters.",
    },
    {
        type: "publicQuestion",
        title: "Who is a derivative?",
        answered: false,
        studentID: "73"
    }
].reverse();

const styles = {
    welcome: {
        margin: "0 auto",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "30px",
    },
    roomID: {
        margin: "0 auto",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "20px",
    },
}


// Student feed.
export default function TestingPage(props) {
    return (
        <Cards
            teacherView={false}
            // roomName={props.roomName}
            roomName={"testingroom"}
            listName={"sharedCardList"}
        />
    );
}
