import styles from './Instructions.module.css'
import Image from 'next/image';
export default function Intructions({ setStep }) {



  return (
    <div className='infoCard'>
      <h2>Instructions</h2>
      <p>{`There are three steps. In each step you'll spin your lock either left(counterclockwise) or right(clockwise).
      Once you begin each step, you CANNOT spin the opposite direction - not even a little bit.
      If you do, you'll have to start all the way at the beginning again just like you would with a real lock.`}</p>
      <button onClick={() => setStep(prevStep => prevStep + 1 )} className='redButton'>START</button>
    </div>
  );
}