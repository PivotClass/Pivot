import Link from 'next/link'
import TeacherClient from './teacher'
import { useRouter } from 'next/router'

// Student screen *with* ID component, loads into room corresponding to ID.
const LinkedTeacher = () => {
    const router = useRouter();
    const {id} = router.query;

    if (!id) {
        return <div/>;
    } else {
        return <TeacherClient roomName={id}/>;
    }
}

export default LinkedTeacher
