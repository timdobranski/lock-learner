'use client';

import styles from './Num2.module.css'

export default function Num2({ setStep, combo, setCombo, currentNum }) {
  useEffect(() => {
    if (currentNum === combo[0]) {
      setStep(prevStep => prevStep + 1)
    }
  })

  return (
    <div id={styles.resetContainer}>
      <h2>Step 2: 2nd Number</h2>
      <p>{`To open your lock, you'll turn it to the left (counterclockwise) and the right (clockwise) at different times. Once
      you begin spinning, you CANNOT spin the opposite direction - not even a little bit. If you do, you'll have to start all the way at
      the beginning again.`}</p>

      <p>{`First, you'll need to reset your lock. Spin it to the right (clockwise) for about 5 seconds, then stop.`}</p>
    </div>
  )
}