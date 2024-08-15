'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';



export default function Home() {
  const router = useRouter();

  const generateLink = async () => {

    try {
      // Use the environment variable for the server's URL
      const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/create-match`;
      console.log('serverUrl:', serverUrl);
      // Send POST request to the server to create a match
      const response = await fetch(`${serverUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        router.push(`/lobby/${data.matchId}`)
      }
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Multiplayer is coming soon!');
    }
  };


  return (
    <div className={styles.pageWrapper}>
      <div className='infoCard'>
        <p>Welcome to Lock Learner. Here you can practice opening your combination lock.</p>
        <p>Coming soon: challenge friends to a lock race to test your skills!</p>
      </div>

      <button className={styles.navButton} onClick={() => router.push('/practice')}>PRACTICE</button>
      <button className={styles.navButton} onClick={generateLink}>CHALLENGE</button>

      {/* <FontAwesomeIcon icon={faGear} className={styles.settingsIcon} onClick={() => router.push('/settings')} /> */}
    </div>
  )
}

