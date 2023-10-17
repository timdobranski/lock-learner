import Image from 'next/image'
import styles from './page.module.css'
import lockFull from '../public/lock-full.png';
import lockFace from '../public/lock-face.png';

export default function Home() {
  const lockStyle = {

  }

  return (
    <main className={styles.main}>
        <h1>LOCK LEARNER</h1>
        <h2>Parkway Academy</h2>
        <div className={styles.lock} id={styles.lockContainer}>
          <Image src={lockFull} height={300}alt="Lock" style={lockStyle}/>
        </div>
        <div className={styles.lock} id={styles.lockFaceContainer}>
          <Image src={lockFace} height={300}alt="Lock" />
        </div>
    </main>
  )
}
