'use client';

import styles from './Num3.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Num3({ setStep, combo, setCombo, currentNum }) {
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
    if (currentNum === parseInt(combo[2])) {
      setStep(prevStep => prevStep + 1);
    }

    // Update the previous value
    prevNumRef.current = currentNum;
  }, [currentNum]);







  return (
    <div id={styles.resetContainer}>
      <h2>Step 3: 3rd Number</h2>
      <p>{`Almost done! Now, turn right again straight to your 3rd number: ${combo[2]}`}</p>
    </div>
  )
}