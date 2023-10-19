'use client';

import styles from './Num1.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Num1({ setStep, combo, setCombo, currentNum }) {
  const [resetComplete, setResetComplete] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState(0);

  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;
    console.log('previous number: ', prevNum)

    // Check if currentNum has decreased
    if (prevNum !== undefined && currentNum > prevNum &&  !(prevNum === 0 && currentNum === 39)) {
      // Trigger the WrongWay component
      setStep(5)
    }
    // Check if lock has been reset
    if (currentNum === 1) {
      setResetComplete(true);
    }

    // If num reached & reset true
    if (currentNum === parseInt(combo[0]) && resetComplete) {
      setResetComplete(false);
      setStepsCompleted(0);
      setStep(prevStep => prevStep + 1);
    }

    // Update the previous value
    prevNumRef.current = currentNum;
  }, [currentNum]);

  useEffect (() => {
    if (resetComplete) {
      setStepsCompleted(prevSteps => prevSteps + 1);
    }
  }, [resetComplete])

  useEffect(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(200); // Vibrate for 200 milliseconds
    } else {
      console.log('Vibration API not supported');
    }

  }, [stepsCompleted])



  return (
    <div id={styles.resetContainer}>
      <h2>Step 1</h2>
      <h3>Reset & 1st Number</h3>
      <p>{`Once
      you begin spinning, you CANNOT spin the opposite direction - not even a little bit. If you do, you'll have to start all the way at
      the beginning again.`}</p>

      <div id={styles.stepsContainer}>
        <p>{`1. Spin all the way around to the right at least one full spin`}</p>
        <p>{`2. Stop on your first number: ${combo[0]}`}</p>
      </div>
      <p className={stepsCompleted === 1 ? styles.successAnimation : null}>{`Steps Completed: ${stepsCompleted} / 2 `}</p>
    </div>
  )
}