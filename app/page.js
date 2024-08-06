'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import lockBar from '../public/lock-open.png';
import lockFull from '../public/lock-full-centered-open.png';
import lockFace from '../public/lock-face-centered.png';
import lockFaceIndicator from '../public/lock-face-centered-indicator.png';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  const lockFaceRef = useRef(null);
  const [currentLockNum, setCurrentLockNum] = useState(0);

  const [step, setStep] = useState(0);
  const [combo, setCombo] = useState(['', '', '']);
  const [currentNum, setCurrentNum] = useState(null);

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
    // check if the combo is valid whenever we move to step 1 (directions)
    if (step === 1) {
        // Check for adjacent duplicates, ignoring empty strings
    const hasAdjacentDuplicates = combo.some((value, index, arr) => {

      if (index > 0 && value === arr[index - 1] && value !== '') {
        return true;
      }
      return false;
    });
    if (hasAdjacentDuplicates) {
      console.log('Invalid combo, setting step back to 0');
      alert('This is an invalid combo. No combo will ever have two adjacent numbers the same. Please choose another combo.');
      // Set combo to some default value if needed
      setCombo(['', '', '']);
    }
    const hasMissingDigits = combo.some((value, index, arr) => {

      if (value === '') {
        return true;
      }
      return false;
    });
    if (hasMissingDigits) {
      console.log('Invalid combo, setting step back to 0');
      alert('This is an invalid combo. Please fill in all the numbers.');
      // Set combo to some default value if needed
      setCombo(['', '', '']);
    }
    // combo is valid, move to next step
    setRotation(0);
    setLastPosition(null);
    }
    if (step === 2) {
      setCurrentNum(0);
    } else if (step === 3) {
      setCurrentNum(1);
    } else if (step === 4) {
      setCurrentNum(2);
    } else {
      setCurrentNum(null);
    }

  }, [step])

  useEffect(() => {
    // console.log('currentLockNum: ', currentLockNum);
  }, [currentLockNum])

  useEffect(() => {
    console.log('combo: ', combo);
    if (!combo[0] && !combo[1] && !combo[2]) {
      setStep(0);
    }

  }, [combo]);

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

  const handleBackButtonClick = () => {
    // if we're in the middle of the game, or we won or lost, back sends us to step 1 (num 1)
    if (step === 3 || step === 4 || step === 5 || step === 6 || step === 7) {
      setStep(1);
      // step 1 and 2 back just goes back 1 step; button won't render on step 0
    } else {
      setStep(prevStep => prevStep - 1);
    }
  }


  return (
    <main className={styles.main}>
      <div className={styles.logoWrapper}>
          <img src='/parkway.webp'  className={styles.shield} alt="Parkway Logo" />
        <h1 className={styles.title}>LOCK LEARNER</h1>
      </div>

      {step > 0 ?
      <div className={styles.comboContainer} >
        {/* <h2>YOUR COMBO</h2> */}
       <div className={styles.comboDisplayWrapper}>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} onClick={handleBackButtonClick} />
        <div>
        <div>
      <p className={styles.combo}>
        {/* {`COMBO: `} */}
        {combo.map((num, index) => (
          <React.Fragment key={index}>
            <span className={index === currentNum ? styles.activeComboNum : styles.inactiveComboNum}>
              {num}
            </span>
            {index < combo.length - 1 && ' - '}
          </React.Fragment>
        ))}
      </p>
    </div>
    </div>
        </div>
      </div>
        : null
        }

      {step === 0 ? <Welcome combo={combo} setCombo={setCombo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 1 ? <Instructions setStep={setStep} /> : null}
      {step === 2 ? <Num1 combo={combo} setStep={setStep} currentNum={currentLockNum}/> : null}
      {step === 3 ? <Num2 combo={combo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 4 ? <Num3 combo={combo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 5 ? <><Success setStep={setStep}/>  <Confetti /> </> : null}
      {step === 6 ? <WrongWay setStep={setStep}/> : null}
      {step === 7 ? <PassedNum setStep={setStep} /> : null}


        {/* lock top bar, open */}
      <div className={`${styles.lock} ${step < 2 ? styles.hidden : ''}`} id={step === 5 ? styles.lockBarOpen : null}>
        <Image src={lockBar} height={600} alt="Lock" />
      </div>
      {/* main lock */}
      <div className={`${styles.lock} ${styles.lockContainer} ${step < 2 ? styles.hidden : ''}`}>
          <Image src={lockFull} height={600} alt="Lock" />
          { (step === 2 || step === 3 || step === 4) && <div className={`${step === 2 || step === 4 ? styles.arrowIndicatorRight : styles.arrowIndicatorLeft}`}>
            <img src='/rotationArrow.png' alt="Arrow"  className={styles.arrowImage}/>
          </div>}
      </div>
      {/* lock face */}
      <div
        className={`${styles.lock} ${step < 2 ? styles.hidden : ''}`}
        id={styles.lockFaceContainer}
        ref={lockFaceRef}
        onMouseDown={step !== 5 ? handleMouseDown : null}
        onMouseMove={step !== 5 ? handleMouseMove : null}
        onMouseUp={step !== 5 ? handleMouseUp : null}
        onMouseLeave={step !== 5 ? handleMouseUp : null}
        onTouchStart={step !== 5 ? handleTouchStart : null}
        onTouchMove={step !== 5 ? handleTouchMove : null}
        onTouchEnd={step !== 5 ? handleTouchEnd : null}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image src={lockFace} height={600} alt="Lock" className={styles.lockFace}/>
      </div>
      {/* current combo number indicator */}
      {step < 5 &&
      <div
        className={`${styles.lock} ${styles.lockIndicatorWrapper} ${step < 2 ? styles.hidden : ''}`}>
      <Image
        src={lockFaceIndicator}
        height={600}
        alt="Lock"
        className={`${styles.lockFaceIndicator}`}
        style={{ transform: `rotate(${rotation + (combo[step - 2] * 9)}deg)` }}/>
      </div>
      }

    </main>
  );
}