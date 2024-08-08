import styles from './WrongWay.module.css'

export default function WrongWay({ setStep }) {


  return (
    <div className='infoCard'>
      <h2>WRONG WAY!</h2>
      <p>{`You turned the lock the wrong direction! Remember, even a little bit and you have to start over. Click below to try again.`}</p>
      <button className='redButton' onClick={() => setStep(1)}>TRY AGAIN</button>
    </div>
  )
}