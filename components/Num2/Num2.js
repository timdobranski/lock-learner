'use client';

import { useEffect, useState } from 'react';
import styles from './Num2.module.css'

export default function Num2({ setStep, combo, setCombo, currentNum }) {
  const [ timesHitNumber, setTimesHitNumber ] = useState(0);

  useEffect(() => {
    console.log('currentNum: ', currentNum)
    console.log('combo[1]: ', combo[1])

    if (currentNum === parseInt(combo[1])) {
      setTimesHitNumber(prevNum => prevNum + 1)
    }
  }, [currentNum, combo])

  useEffect(() => {
    console.log('new timeshitnumber: ', timesHitNumber);
    if (timesHitNumber === 2) {
      setStep(prevStep => prevStep + 1)
    }
  }, [timesHitNumber, setStep])

  return (
    <div id={styles.resetContainer}>
      <h2>Step 2: 2nd Number</h2>
      <p>{`Now you'll turn the other way, BUT...there's a catch. You'll need to pass your 2nd number and come to it again.
      So turn the lock to the left until you reach ${combo[1]}`}</p>

      <p>{`Turn left to ${combo[1]} twice`}</p>
      <p>{`Completed: ${timesHitNumber} / 2 times`}</p>
    </div>
  )
}