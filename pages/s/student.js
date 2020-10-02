import { RoomService } from "@roomservice/browser";
import { useEffect, useState } from "react";

export default function Student(props) {

    // CSS styling
    const styles = {
        container: {
            margin: "0 auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
        },
        input: {
            backgroundColor: "#22cfef",
            padding: "30px 30px",
            borderRadius: "200px",
            border: "1px solid black",
            display: "flex",
            fontSize: "2em",
            outline: "none",
            transition: "all 0.10s",
            marginBottom: "30px",
        }
    };

    // calls useList to create a room and list object (and initialize function to set list)
    const [list, setList] = useList(props.roomName, "polls");

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

    function updateListByID() {
        [list, setList] = useList(props.roomName, "polls");
    }

    const [text, setText] = useState("");

    // called when poll item is clicked
    function onCheckOff(i) {
        if (!list) return;
        console.log("delete", list);
        setList(list.delete(i));
    }

    // called when poll item is entered
    function onEnterPress() {
        if (!list) return;
        setList(list.push(text));
        setText("");
    }

    // slightly edited from the roomservice example template -- we will definitely change layout later
    return (
        <div style={styles.container}>
            <h1>Room ID: <code>{props.roomName}</code></h1>

            <h2>Poll Responses</h2>
            <p>(Professor: "how did Abraham Lincoln die?")</p>
            {/* textbox component */}
            <input
                style={styles.input}
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onEnterPress();
                    }
                }}
            />
            {list &&
            list.toArray().map((l, i) => (
                <p
                    key={JSON.stringify(l) + "-" + i}
                    onClick={() => onCheckOff(i)}
                >
                    {l.object || l}
                    {"-"}
                    {i}
                </p>
            ))}
        </div>
    );
}
