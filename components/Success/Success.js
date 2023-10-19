'use client';

import styles from './Success.module.css'
import { useEffect, useState, useRef } from 'react'

export default function Success({ setStep }) {





  return (
    <div id={styles.resetContainer}>
      <button className={styles.againButton} onClick={() => setStep(1)}>Practice Again</button>
      <h2>You did it!</h2>
      <p className={styles.successMessage}>{`Nice work. If you want some more practice, you can try again here or try with your real lock!`}</p>
    </div>
  )
}