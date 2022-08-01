import Head from 'next/head'
import Loader from '../components/Loader'
import toast from 'react-hot-toast';
export default function Home() {
  return (
    <div>
      <Head>
        <title>Eventy | Home</title>
      </Head>
      <main>
        <button onClick={() => toast.success("Hello Ole!")}>
          Click me
        </button>
        {/* <Loader show/> */}
      </main>
    </div>
  )
}
