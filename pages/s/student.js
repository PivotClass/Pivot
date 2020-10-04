import React, { useEffect, useState } from "react";
import { RoomService } from "@roomservice/browser";
import Cards from "../components/Cards";

const studentID = '' + Math.random() + '' + Math.random() + '' + Math.random() + '' + Math.random();

// Student feed.
export default function StudentClient(props) {
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


    console.log("studentID: " + studentID);


    return (
        <Cards 
        studentID={studentID} 
        teacherView={false} 
        roomName={props.roomName} 
        listName = "cards" 
        cardList={(cardList ? cardList.toArray().reverse() : null)} />
    );
}
