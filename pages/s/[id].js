import Link from 'next/link'
import Student from './student'
import { useRouter } from 'next/router'

// Student screen *with* ID component, loads into room corresponding to ID.
const LinkedStudent = () => {
    const router = useRouter();
    const {id} = router.query;

    if (!id) {
        return <div/>;
    } else {
        return <Student roomName={id}/>;
    }
}

export default LinkedStudent
