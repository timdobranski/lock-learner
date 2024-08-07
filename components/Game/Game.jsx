'use client';

import React, { useState, useEffect } from 'react';
import Welcome from '../Welcome/Welcome';
import Instructions from '../Instructions/Instructions';
import Num1 from '../Num1/Num1';
import Num2 from '../Num2/Num2';
import Num3 from '../Num3/Num3';
import WrongWay from '../WrongWay/WrongWay';
import PassedNum from '../PassedNum/PassedNum';
import Success from '../Success/Success';
import Confetti from 'react-confetti';
import Lock from '../Lock/Lock';
import ComboBanner from '../ComboBanner/ComboBanner';

export default function Game() {
  const [currentLockNum, setCurrentLockNum] = useState(0);

  const [step, setStep] = useState(0);
  const [combo, setCombo] = useState(['', '', '']);
  // const [currentNum, setCurrentNum] = useState(null);

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
    <>
      {/* if there's a combo set, render the banner */}
      {step > 0 ? <ComboBanner combo={combo} step={step} setStep={setStep} /> : null}

      {/* each steps renders a different component and the logic to move to the next step */}
      {step === 0 ? <Welcome combo={combo} setCombo={setCombo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 1 ? <Instructions setStep={setStep} /> : null}
      {step === 2 ? <Num1 combo={combo} setStep={setStep} currentNum={currentLockNum}/> : null}
      {step === 3 ? <Num2 combo={combo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 4 ? <Num3 combo={combo} setStep={setStep} currentNum={currentLockNum} /> : null}
      {step === 5 ? <><Success setStep={setStep}/>  <Confetti /> </> : null}
      {step === 6 ? <WrongWay setStep={setStep}/> : null}
      {step === 7 ? <PassedNum setStep={setStep} /> : null}

      {/* the lock component */}
      <Lock
        combo={combo}
        setCombo={setCombo}
        step={step}
        setStep={setStep}
        currentLockNum={currentLockNum}
        setCurrentLockNum={setCurrentLockNum}
      />
    </>

  );
}
