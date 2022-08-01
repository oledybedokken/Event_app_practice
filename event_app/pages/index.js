import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Favspot | Home</title>
        <link rel="icon" href="/favspot.ico" />
      </Head>
      <main className={styles.main}>
        
        <h1>
          Welcome
        </h1>
        <h2>
          Gather all your friends with on click!
        </h2>
      </main>
    </div>
  )

}
