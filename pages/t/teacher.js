import { RoomService } from "@roomservice/browser";
import { useEffect, useState } from "react";

export default function Teacher(props) {

    // CSS styling
    const styles = {
        container: {
            backgroundColor: "#88ddff",
            padding: "10px"
        },
        input: {
            backgroundColor: "pink",
        }
    };

    // demonstrates roomservice list feature by creating a room and list object
    function useList(roomName, listName) {
        const [list, setList] = useState();

        useEffect(() => {
            async function load() {
                // calls roomservice client
                const client = new RoomService({
                    auth: "/api/roomservice",
                });

                // creates room from client and list from room
                console.log("Opening room: " + roomName);
                const room = await client.room(roomName);
                const l = await room.list(listName);
                setList(l);

                room.subscribe(l, (li) => {
                    console.log(li);
                    setList(li);
                });
            }

            load()
        }, []);
        return [list, setList];
    }

    // demonstrates roomservice map feature by creating a room and map object
    function useMap(roomName, mapName) {
        const [map, setMap] = useState();
        useEffect(() => {
            async function load() {
                // calls roomservice client
                const client = new RoomService({
                    auth: "/api/roomservice",
                });

                // creates room from client and map from room
                console.log("Opening room: " + roomName);
                const room = await client.room(roomName);
                const m = await room.map(mapName);
                setMap(m);

                room.subscribe(m, (mp) => {
                    console.log(mp);
                    setMap(mp);
                });
            }

            load()
        }, []);
        return [map, setMap];
    }


    function updateListByID() {
        [list, setList] = useList(props.roomName, "polls");
    }

    // two different text objects for two different textbooks
    const [questionText, setQuestionText] = useState("");
    const [quoteText, setQuoteText] = useState("");

    // initializes map object and setMap method
    const [dataMap, setMap] = useMap(props.roomName, "data");


    if (dataMap && !dataMap.get("pollResponses")) {
        setMap(dataMap.set("pollResponses", []));
        console.log("SETTING MAP HERE!");
    }

    // called when teacher data is inputted
    function onEnterPress(fieldName, text, setText) {
        if (!dataMap) return;

        setMap(dataMap.set(fieldName, text)); 
        setText("");
        
    }

    if (dataMap) {
        console.log(dataMap.get("pollQuestion"));
        console.log(dataMap.get("importantQuote"));
    }

    function responses() {
        if (dataMap && dataMap.get("pollResponses") && typeof dataMap.get("pollResponses") === "object") {
        console.log(dataMap.get("pollResponses"));
        return dataMap.get("pollResponses").map(str => {
            return (<li key={JSON.stringify(str) + "-" + Math.random()}> {str} </li>);
        });
        }  
    }

    return (
        <div style={styles.container}>
            <div> 
                (room id: {props.roomName})
                <br/>
                <br/>
                <b>Teacher View:</b>
            </div>
            <br/>
            <div>
                Enter a poll question:
                {" "}
                <input
                    style={styles.input}
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && questionText !== "") {
                            onEnterPress("pollQuestion", questionText, setQuestionText);
                        }
                    }}
                /> You entered: <b>"{(dataMap && dataMap.get("pollQuestion") ? dataMap.get("pollQuestion") : "")}"</b>

                <br/>
                
                <div> 
                    <ul>
                        {responses()}
                    </ul>
                </div>

                <br/>
                Enter an important quote:
                {' '}
                <input
                    style={styles.input}
                    type="text"
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && quoteText !== "") {
                            onEnterPress("importantQuote", quoteText, setQuoteText);
                        }
                    }}
                /> You entered: <b>"{(dataMap && dataMap.get("importantQuote") ? dataMap.get("importantQuote") : "")}"</b>
            </div>
        </div>
        
    );
}
