'use client';

import styles from './Num3.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Num3({ setStep, combo, setCombo, currentNum }) {
  const [ resetComplete, setResetComplete ] = useState(false);

  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;

    // Check if student passed Num1
    if (currentNum > prevNum &&  !(prevNum === 0 && currentNum === 39) && prevNum === parseInt(combo[1])) {
      // Trigger the PassedNum component
      setStep(7)
    }
    // Check if student has turned the wrong way
      if (currentNum > prevNum &&  !(prevNum === 0 && currentNum === 39) && prevNum !== parseInt(combo[1])) {
      // Trigger the WrongWay component
      setStep(6)
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
      <h2>Step 3</h2>
      <h3>3rd Number</h3>
      <p>{`Almost done! Now, turn right again straight to your 3rd number: ${combo[2]}`}</p>
    </div>
  )
}