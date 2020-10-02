import Link from 'next/link'
import Poll from './src/poll'
import { useRouter } from 'next/router'

// Student screen *with* ID component, loads into room corresponding to ID.
const Student = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div />;
  } else {
    return <Poll roomName={id} />;
  }
}

export default Student
