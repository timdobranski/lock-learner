'use client';

import styles from './Num1.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Num1({ setStep, combo, setCombo, currentNum }) {
  const [ resetComplete, setResetComplete ] = useState(false);

  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;

    // Check if currentNum has decreased
    if (prevNum !== undefined && currentNum > prevNum &&  !(prevNum === 0 && currentNum === 39)) {
      // Do something if currentNum has decreased
      console.log('inside true condition')
      setStep(5)
    }

    // If num reached & reset true
    if (resetComplete && currentNum === parseInt(combo[0])) {
      setStep(prevStep => prevStep + 1);
    }

    // Update the previous value
    prevNumRef.current = currentNum;
  }, [currentNum]);







  return (
    <div id={styles.resetContainer}>
      <h2>Step 1: Reset & 1st Number</h2>
      <p>{`To open your lock, you'll turn it to the left (counterclockwise) and the right (clockwise) at different times. Once
      you begin spinning, you CANNOT spin the opposite direction - not even a little bit. If you do, you'll have to start all the way at
      the beginning again.`}</p>

      <p>{`First, you'll need to reset your lock. Spin it to the right (clockwise) for about 5 seconds, then stop.`}</p>
    </div>
  )
}