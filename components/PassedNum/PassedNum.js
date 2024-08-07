import styles from './PassedNum.module.css'

export default function WrongWay({ setStep }) {


  return (
    <div className='infoCard'>
      <h2>You passed your number!</h2>
      <p>{`Try going slower. Click below to try again.`}</p>
      <button className='redButton' onClick={() => setStep(1)}>TRY AGAIN</button>
    </div>
  )
}