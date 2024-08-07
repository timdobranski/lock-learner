import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './ComboBanner.module.css';
import React from 'react';

export default function ComboBanner({combo, step, setStep}) {

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
}