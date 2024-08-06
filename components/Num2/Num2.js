'use client';
import '../../app/globals.css';
import { useEffect, useState, useRef } from 'react';
import styles from './Num2.module.css';


export default function Num2({ setStep, combo, setCombo, currentNum }) {
  const [ timesHitNumber, setTimesHitNumber ] = useState(0);
  const prevNumRef = useRef(combo[0]);

  useEffect(() => {
    const prevNum = prevNumRef.current;

    // Check if student passed Num1
    if (currentNum < prevNum &&  !(prevNum === 39 && currentNum === 0) && prevNum === parseInt(combo[0])) {
      // Trigger the PassedNum component
      setStep(7)
    }
    // Check if student has turned the wrong way
      if (currentNum < prevNum &&  !(prevNum === 39 && currentNum === 0) && prevNum !== parseInt(combo[0])) {
      // Trigger the WrongWay component
      setStep(6)
    }


    if (currentNum === parseInt(combo[1])) {
      setTimesHitNumber(prevNum => prevNum + 1)
    }
    prevNumRef.current = currentNum;
  }, [currentNum, combo])

  useEffect(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200); // Vibrate for 200 milliseconds
    } else {
      console.log('Vibration API not supported');
    }
    console.log('new timeshitnumber: ', timesHitNumber);
    if (timesHitNumber === 2) {
      setTimesHitNumber(0);
      setStep(prevStep => prevStep + 1)
    }
  }, [timesHitNumber, setStep])

  return (
    <div className='infoCard'>
      <h2>2nd Number</h2>

      <p>{`Now turn your lock to the left until you reach your second number, ${combo[1]}, twice`}</p>

        <p className={timesHitNumber === 1 ? styles.successAnimation : null}>{`Spins Completed:`}</p>
        <p className={timesHitNumber === 1 ? styles.successAnimation : null}>{`${timesHitNumber} / 2`}</p>

    </div>
  )
}

