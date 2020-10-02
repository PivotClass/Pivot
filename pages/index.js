import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

function Home() {

    const [studentCode, setStudentCode] = useState("");

    // Goes to student page when enter is pressed
    function onEnterPress() {
        // Doesn't do anything so far
    }

    return (
        <ul>
            <li>
                <Link href="/t/">
                    <a>I'm a teacher</a>
                </Link>
            </li>
            <li>
                I'm a student, my code is:
                <input
                    type="text"
                    value={studentCode}
                    onChange={(e) => setStudentCode(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            onEnterPress();
                        }
                    }}
                />
                <br/>
                <Link href={"/s/" + studentCode} passHref><a>Bring me to my room! </a></Link>
            </li>
        </ul>
    )
}

export default Home