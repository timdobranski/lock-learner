'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';



export default function Home() {
  const router = useRouter();



  return (
    <div className={styles.pageWrapper}>
      <div className='infoCard'>
        <p>Welcome to Lock Learner. Here you can practice opening your combination lock.</p>
        <p>Coming soon: challenge friends to a lock race to test your skills!</p>
      </div>

      <button className={styles.navButton} onClick={() => router.push('/practice')}>PRACTICE</button>
      <button className={styles.navButton} onClick={() => alert('Challenge mode coming soon. Invite a friend and race them with a random combination!')}>CHALLENGE</button>
      {/* <FontAwesomeIcon icon={faGear} className={styles.settingsIcon} onClick={() => router.push('/settings')} /> */}
    </div>
  )
}

