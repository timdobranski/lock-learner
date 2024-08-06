'use client';

import styles from './Num1.module.css'
import { useEffect, useState, useRef } from 'react'
import '../../app/globals.css';

export default function Num1({ setStep, combo, setCombo, currentNum }) {
  const [timesHitNumber, setTimesHitNumber] = useState(0);
  const [animationClass, setAnimationClass] = useState('');



  const prevNumRef = useRef();

  useEffect(() => {
    const prevNum = prevNumRef.current;
    // Check if student goes the wrong direction, and start over
    if (prevNum !== undefined && currentNum > prevNum &&  !(prevNum === 0 && currentNum === 39)) {
      // Trigger the WrongWay component
      setTimesHitNumber(0);
      setStep(6)
    }

    if (currentNum === parseInt(combo[0])) {
      setTimesHitNumber(prevNum => prevNum + 1)
    }

    // Update the previous value
    prevNumRef.current = currentNum;
  }, [currentNum]);


  useEffect(() => {
    if (timesHitNumber === 1 || timesHitNumber === 2) {
      setAnimationClass(styles.successAnimation);

      // Trigger a reflow to restart the CSS animation
      requestAnimationFrame(() => {
        setAnimationClass('');
        requestAnimationFrame(() => {
          setAnimationClass(styles.successAnimation);
        });
      });
    } else {
      setAnimationClass('');
    }
    // Enable vibration on mobile devices if number hit
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    } else {
      console.log('Vibration API not supported');
    }
        // If all steps complete
        if (timesHitNumber === 3) {
          setTimesHitNumber(0);
          setStep(prevStep => prevStep + 1);
        }
        console.log('times hit number: ', timesHitNumber)
  }, [timesHitNumber])



  return (
    <div className='infoCard'>
      <h2>1st Number</h2>
        <p>{`Spin to the right until you reach your first number (${combo[0]}) three times`}</p>
      <p className={animationClass}>{`Spins completed:  ${timesHitNumber} / 3`}</p>
    </div>
  )
}