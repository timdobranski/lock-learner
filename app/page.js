'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import lockBar from '../public/lock-open.png';
import lockFull from '../public/lock-full-centered-open.png';
import lockFace from '../public/lock-face-centered.png';
import logo from '../public/titledLogo.png'
import Welcome from '../components/Welcome/Welcome';
import Instructions from '../components/Instructions/Instructions';
import Num1 from '../components/Num1/Num1';
import Num2 from '../components/Num2/Num2';
import Num3 from '../components/Num3/Num3';
import WrongWay from '../components/WrongWay/WrongWay';
import PassedNum from '../components/PassedNum/PassedNum';
import Success from '../components/Success/Success';
import Confetti from 'react-confetti';

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  const lockFaceRef = useRef(null);
  const [currentLockNum, setCurrentLockNum] = useState(0);

  const [step, setStep] = useState(0);
  const [combo, setCombo] = useState(['', '', '']);

  const lockReset = () => {
    setRotation(0);
  }

  useEffect(() => {
    // Normalize the rotation to be between 0 and 360
    const effectiveRotation = (rotation - 4.5) % 360;

    // If the effectiveRotation is negative (due to the modulo operation), add 360 to normalize
    const normalizedRotation = effectiveRotation < 0 ? effectiveRotation + 360 : effectiveRotation;

    const reversedRotation = 360 - normalizedRotation;
    const newSectionNumber = Math.floor(reversedRotation / 9) % 40; // Using % 40 to ensure it wraps around to 0 when it hits 40
    setCurrentLockNum(newSectionNumber);
}, [rotation]);

  useEffect (() => {
    console.log('step: ', step);
  }, [step])

  useEffect(() => {
    console.log('currentLockNum: ', currentLockNum);
  }, [currentLockNum])

  useEffect(() => {
    console.log('combo: ', combo);
  }, [combo])

  useEffect(() => {
    const lockFaceElem = lockFaceRef.current;

    const touchStartListener = (event) => handleTouchStart(event);
    const touchMoveListener = (event) => handleTouchMove(event);

    // Attach the listeners
    lockFaceElem.addEventListener('touchstart', touchStartListener, { passive: false });
    lockFaceElem.addEventListener('touchmove', touchMoveListener, { passive: false });

    // Cleanup
    return () => {
        lockFaceElem.removeEventListener('touchstart', touchStartListener);
        lockFaceElem.removeEventListener('touchmove', touchMoveListener);
    };
}, []);

  const offsetX = 0;
  const offsetY = 0;

  const computeAngle = (event) => {
    const rect = lockFaceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + offsetX;
    const centerY = rect.top + rect.height / 2 + offsetY;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const handleMouseDown = (event) => {
    if (event.type === 'mousedown') {
      event.preventDefault();
  }
    const rect = lockFaceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + offsetX;
    const centerY = rect.top + rect.height / 2 + offsetY;

    const distanceToCenter = Math.sqrt(
      Math.pow(event.clientX - centerX, 2) +
      Math.pow(event.clientY - centerY, 2)
    );

    const maxAcceptableDistance = rect.width / 4.5; // 1/3 of half the width

    if (distanceToCenter <= maxAcceptableDistance) {

      setLastPosition({ x: event.clientX, y: event.clientY });
    }
  };
  const handleTouchStart = (event) => {
    event.preventDefault();
    const touch = event.touches[0]; // Get the first touch
    handleMouseDown(touch); // Reuse the mouse down logic
  };

  const handleMouseMove = (event) => {
    if (event.type === 'mousemove') {
      event.preventDefault();
  }

    if (lastPosition) {
      const initialAngle = computeAngle({ clientX: lastPosition.x, clientY: lastPosition.y });
      const currentAngle = computeAngle(event);
      const angleDelta = currentAngle - initialAngle;
      setRotation(prev => (prev + angleDelta + 360) % 360);
            setLastPosition({ x: event.clientX, y: event.clientY });
    }
  };
  const handleTouchMove = () => {
    // event.preventDefault();
    const touch = event.touches[0]; // Get the first touch
    handleMouseMove(touch); // Reuse the mouse move logic
  };

  const handleMouseUp = () => {
    setLastPosition(null);
  };
  const handleTouchEnd = () => {
  handleMouseUp(); // Reuse the mouse up logic
  };

  return (
    <main className={styles.main}>
      {step > 0 ?
      <div id={styles.comboContainer} onClick={() => {setCombo(['', '', '']); setStep(0)}}>
        <h2>YOUR COMBO</h2>
        <p>{`${combo[0]} -  ${combo[1]} -  ${combo[2]}`}</p>
      </div>
        : null
        }

      {step === 0 ? <Welcome combo={combo} setCombo={setCombo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 1 ? <Instructions setStep={setStep} /> : null}
      {step === 2 ? <Num1 combo={combo} setStep={setStep} currentNum={currentLockNum}/> : null}
      {step === 3 ? <Num2 combo={combo} currentNum={currentLockNum} setStep={setStep} /> : null}
      {step === 4 ? <Num3 combo={combo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 5 ? <><Success setStep={setStep}/>  <Confetti /> </> : null}
      {step === 6 ? <WrongWay setStep={setStep}/> : null}
      {step === 7 ? <PassedNum setStep={setStep} /> : null}



      <div className={`${styles.lock} ${step === 0 ? styles.hidden : ''}`} id={step === 5 ? styles.lockBarOpen : null}>
    <Image src={lockBar} height={600} alt="Lock" />
</div>
<div className={`${styles.lock} ${step === 0 ? styles.hidden : ''}`} id={styles.lockContainer}>
    <Image src={lockFull} height={600} alt="Lock" />
</div>
<div
    className={`${styles.lock} ${step === 0 ? styles.hidden : ''}`}
    id={styles.lockFaceContainer}
    ref={lockFaceRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
    style={{ transform: `rotate(${rotation}deg)` }}
>
    <Image src={lockFace} height={600} alt="Lock" />
</div>
    </main>
  );
}