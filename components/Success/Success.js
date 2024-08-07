'use client';

import styles from './Success.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Success({ setStep }) {





  return (
    <div className='infoCard'>
      <button className='redButton' onClick={() => setStep(1)}>PRACTICE AGAIN</button>
      <h2>You did it!</h2>
      <p className={styles.successMessage}>{`Nice work. If you want some more practice, you can try again here or try with your real lock.`}</p>
    </div>
  )
}