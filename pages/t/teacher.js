import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";
import Typography from "@material-ui/core/Typography";


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
        type: "studentQuestion"    
    },
    {
        type: "tooltip",
        title: "Derivative",
        content: "A derivative is the infinitesimal rate of change in a function with respect to one of its parameters.",
    },
    {
        type: "tooltipCreator",
    },
    {
        type: "teacherPoll",
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
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "48px",
    },
    roomID: {
        margin: "0 auto",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        fontFamily: "Roboto, sans-serif",
        fontSize: "36px",
    },
}




// Student feed.
export default function TeacherClient(props) {
    function useList(roomName, listName) {
        const [list, setList] = useState();
        useEffect(() => {
            let isMounted = true;
          async function load() {
            const client = new RoomService({
              auth: "/api/roomservice",
            });
            const room = await client.room(roomName);
            const l = await room.list(listName);
            if (isMounted) setList(l);
      
            room.subscribe(l, (li) => {
              console.log(li);
              if (isMounted) setList(li);
            });
          }
          load();
          return () => {isMounted=false};
        }, []);
      
        return [list, setList];
    }
    
    const [cardList, setCardList] = useList(props.roomName, "cards");
    
    function initialize() {
        for (let i = 0; i < exampleCardList.length; i++) {
            exampleCardList[i]["cardID"] = JSON.stringify(exampleCardList[i]) + Math.random();
            setCardList(cardList.push(exampleCardList[i]));
            console.log(cardList.toArray());
        }
    }
    
    
    if (cardList && cardList.toArray().length == 0) {
        initialize();   
    }

    function clearCardList() {
        if (!cardList) return;
        while (cardList.toArray().length > 0) {
            setCardList(cardList.delete(0));
        }
    }

    return (
        <div>
            <div>
                <Typography variant="h2" gutterBottom style={styles.welcome}>Welcome, Teacher!
                    <br/>
                    <p style={styles.roomID}>Your room ID is: {props.roomName}</p></Typography>
            </div>
            <div>
                <Cards 
                teacherView={true} 
                roomName={props.roomName} 
                listName = {"cards"}
                cardList={(cardList ? cardList.toArray().reverse() : null)}
                />            
            </div>
        </div>
    );
}
