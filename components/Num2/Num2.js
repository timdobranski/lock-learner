'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Num2.module.css'


export default function Num2({ setStep, combo, setCombo, currentNum }) {
  const [ timesHitNumber, setTimesHitNumber ] = useState(0);
  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;
    console.log('currentNum: ', currentNum);
    console.log('previous num: ', prevNum)
    // if (prevNum !== undefined && currentNum < prevNum &&  !(prevNum === 39 && currentNum === 0)) {
      if (currentNum < prevNum &&  !(prevNum === 39 && currentNum === 0)) {
      // Trigger the WrongWay component
      setStep(5)
    }


    if (currentNum === parseInt(combo[1])) {
      setTimesHitNumber(prevNum => prevNum + 1)
    }
    prevNumRef.current = currentNum;
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
      <div id={styles.stepsContainer}>
        <p>{`1. Turn left to ${combo[1]} twice`}</p>
      </div>
        <p>{`Times Completed: ${timesHitNumber} / 2`}</p>
    </div>
  )
}

