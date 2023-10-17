'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import lockFull from '../public/lock-full-centered.png';
import lockFace from '../public/lock-face-centered.png';

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
    setLastPosition({ x: event.clientX, y: event.clientY });
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
      <h1>LOCK LEARNER</h1>
      <h2>Parkway Academy</h2>
      <div className={styles.lock} id={styles.lockContainer}>
        <Image src={lockFull} height={300} alt="Lock" />
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
        <Image src={lockFace} height={300} alt="Lock" />
      </div>
    </main>
  );
}