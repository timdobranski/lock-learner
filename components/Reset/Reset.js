import styles from './Reset.module.css'

export default function Reset({ setStep, combo, setCombo }) {


  return (
    <div id={styles.resetContainer}>
      <h2>Step 1: Reset</h2>
      <p>{`To open your lock, you'll turn it to the left (counterclockwise) and the right (clockwise) at different times. Once
      you begin spinning, you CANNOT spin the opposite direction - not even a little bit. If you do, you'll have to start all the way at
      the beginning again.`}</p>

      <p>{`First, you'll need to reset your lock. Spin it to the right (clockwise) for about 5 seconds, then stop.`}</p>
    </div>
  )
}