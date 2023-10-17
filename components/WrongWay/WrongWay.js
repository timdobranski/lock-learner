import styles from './WrongWay.module.css'

export default function WrongWay({ setStep }) {


  return (
    <div id={styles.wrongWayContainer}>
      <h2>Wrong Way!</h2>
      <p>{`You turned the lock the wrong direction! Remember, even a little bit and you have to start over. Click below to try again.`}</p>
      <button onClick={() => setStep(1)}>Try Again</button>
    </div>
  )
}