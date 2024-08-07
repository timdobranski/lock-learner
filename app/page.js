'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
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
import Lock from '../components/Lock/Lock';

export default function Home() {
  const [currentLockNum, setCurrentLockNum] = useState(0);

  const [step, setStep] = useState(0);
  const [combo, setCombo] = useState(['', '', '']);
  const [currentNum, setCurrentNum] = useState(null);

  const lockReset = () => {
    setRotation(0);
  }


  useEffect(() => {
    console.log('combo: ', combo);
    if (!combo[0] && !combo[1] && !combo[2]) {
      setStep(0);
    }
  }, [combo]);


  const handleBackButtonClick = () => {
    // if we're in the middle of the game, or we won or lost, back sends us to step 1 (num 1)
    if (step === 3 || step === 4 || step === 5 || step === 6 || step === 7) {
      setStep(1);
      // step 1 and 2 back just goes back 1 step; button won't render on step 0
    } else {
      setStep(prevStep => prevStep - 1);
    }
  }
  const comboStatusHeader = (
    <div className={styles.comboContainer} >
      <div className={styles.comboDisplayWrapper}>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} onClick={handleBackButtonClick} />
        <div>
          <div>
            <p className={styles.combo}>
              {combo.map((num, index) => (
                <React.Fragment key={index}>
                  <span className={index === (step - 2) ? styles.activeComboNum : styles.inactiveComboNum}>
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
  )

  return (
    <main className={styles.main}>


      {step > 0 ?
        comboStatusHeader
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



      {/* <div className={`${styles.lock} ${step < 2 ? styles.hidden : ''}`} id={step === 5 ? styles.lockBarOpen : null}>
        <Image src={lockBar} height={600} alt="Lock" />
      </div>
      <div className={`${styles.lock} ${styles.lockContainer} ${step < 2 ? styles.hidden : ''}`}>
          <Image src={lockFull} height={600} alt="Lock" />
          { (step === 2 || step === 3 || step === 4) && <div className={`${step === 2 || step === 4 ? styles.arrowIndicatorRight : styles.arrowIndicatorLeft}`}>
            <img src='/rotationArrow.png' alt="Arrow"  className={styles.arrowImage}/>
          </div>}
      </div>
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
      } */}
      <Lock
        combo={combo}
        step={step}
        setStep={setStep}
        currentLockNum={currentLockNum}
        setCurrentLockNum={setCurrentLockNum}
      />

    </main>
  );
}

