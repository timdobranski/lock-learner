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
import ComboBanner from '../components/ComboBanner/ComboBanner';

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



  return (
    <main className={styles.main}>


      {step > 0 ?
        <ComboBanner combo={combo} step={step} setStep={setStep} />
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

