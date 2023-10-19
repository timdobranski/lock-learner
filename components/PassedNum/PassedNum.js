import styles from './PassedNum.module.css'

export default function WrongWay({ setStep }) {


  return (
    <div id={styles.wrongWayContainer}>
      <h2>You passed your number!</h2>
      <p>{`Try going slower. Click below to try again.`}</p>
      <button id={styles.tryAgainButton} onClick={() => setStep(1)}>Try Again</button>
    </div>
  )
}