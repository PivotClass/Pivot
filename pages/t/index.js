import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";


// Generates a random string of length with chars.
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// Student screen *without* ID component, loads into room corresponding to randomly generated ID.
const UnlinkedTeacher = () => {
    const router = useRouter()
    const [roomString, setRoomString] = useState(undefined);

    function standardizeLink(name) {
        const {id} = router.query;
        console.log("Current link: " + id);
        console.log("Room name: " + name);
        if (id != name) {
            console.log("Redirecting: " + name);
            router.replace("/t/" + name);
        }
    }

    useEffect(() => {
        setRoomString(randomString(6, '0123456789abcdefghjklmnpqrstuvwxyz'));
    }, []);

    if (!roomString) {
        return <div/>;
    } else {
        // Redirects to room-ID'ed link, waits for [id].js to load it.
        standardizeLink(roomString);
        return <div/>;
    }
}

export default UnlinkedTeacher
