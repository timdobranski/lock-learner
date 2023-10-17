'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import lockFull from '../public/lock-full-centered.png';
import lockFace from '../public/lock-face-centered.png';
import logo from '../public/parkway.png'

export default function Home() {
  const [rotation, setRotation] = useState(0);
  const [lastPosition, setLastPosition] = useState(null);
  const lockFaceRef = useRef(null);

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
    event.preventDefault();
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

  const handleMouseMove = (event) => {
    if (lastPosition) {
      const initialAngle = computeAngle({ clientX: lastPosition.x, clientY: lastPosition.y });
      const currentAngle = computeAngle(event);
      const angleDelta = currentAngle - initialAngle;
      setRotation((prev) => prev + angleDelta);
      setLastPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setLastPosition(null);
  };

  return (
    <main className={styles.main}>
      <Image src={logo} height={100} alt="Parkway Logo" />
      <h1 className={styles.title}>LOCK LEARNER</h1>
      <h2 className={styles.schoolTitle}>Parkway Academy</h2>


      <div className={styles.lock} id={styles.feedbackRing}></div>
      <div className={styles.lock} id={styles.lockContainer}>
        <Image src={lockFull} height={600} alt="Lock" />
      </div>
      <div
        className={styles.lock}
        id={styles.lockFaceContainer}
        ref={lockFaceRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <Image src={lockFace} height={600} alt="Lock" />
      </div>
    </main>
  );
}