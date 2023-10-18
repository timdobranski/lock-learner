'use client';

import styles from './Num1.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Num1({ setStep, combo, setCombo, currentNum }) {
  const [resetComplete, setResetComplete] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState(0);

  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;

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





  return (
    <div id={styles.resetContainer}>
      <h2>Step 1: Reset & 1st Number</h2>
      <p>{`Once
      you begin spinning, you CANNOT spin the opposite direction - not even a little bit. If you do, you'll have to start all the way at
      the beginning again.`}</p>

      {/* <p>{`First, you'll need to reset your lock. Spin it to the right (clockwise) all the way around at least one full spin, then
      stop on your first number:`}</p> */}
      {/* <p className={styles.comboNumberLabel}>{`${combo[0]}`}</p> */}
      <div id={styles.stepsContainer}>
        <p>{`1. Spin all the way around to the right at least once`}</p>
        <p>{`2. Stop on ${combo[0]}`}</p>
      </div>
      <p>{`Completed: ${stepsCompleted} / 2 `}</p>
    </div>
  )
}