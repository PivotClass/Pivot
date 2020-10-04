import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";


// Example card list that is loaded on components/student.
const exampleCardList = [
    {
        type: "poll",
        mcq: true,
        question: "Chicago is a...",
        choices: ["City", "Country", "State", "Town", "Continent"],
        answers: ["City", "Country", "State", "Town", "Town", "Town"],
    },
    {
        type: "poll",
        mcq: false,
        question: "Fill in what Chicago is!",
        answers: ["idk", "something", "big", "no u"],
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
            setList(l);
      
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
            console.log(exampleCardList[i]["cardID"]);
        }
    }
    
    
    if (cardList && cardList.toArray().length == 0) {
        initialize();   
    }



    cardList && console.log(cardList.toArray());

    function clearCardList() {
        if (!cardList) return;
        while (cardList.toArray().length > 0) {
            setCardList(cardList.delete(0));
        }
    }

    const digitize = (integer, numDigits=8) => {
        var str = '' + integer;
        while (str.length < numDigits) {
            str = '0' + str;
        }
        return str;
    }




    return (
        <Cards teacherView={true} 
               roomName={props.roomName} 
               listName = "cards" 
               cardList={(cardList ? cardList.toArray().reverse() : null)}
        />
    );
}
