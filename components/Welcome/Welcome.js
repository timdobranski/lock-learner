import styles from './Welcome.module.css'
import Image from 'next/image';
import shield from '../../public/parkway.webp'
import title from '../../public/titledLogoNoShield.webp'
import { useRouter } from 'next/navigation';


export default function Welcome({ setStep, combo, setCombo }) {
  const router = useRouter();

  const isValidComboValue = (value) => {
    if (value === "") {
      alert(`It looks like you haven't finished setting your combo`);
      return false;
    }
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 39;
  };

  const handleInputChange = (index, value) => {
    if (value === "" || (value.length <= 2 && isValidComboValue(value))) {
      const newCombo = [...combo];
      newCombo[index] = value;
      setCombo(newCombo);
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    if (combo.every(value => isValidComboValue(value))) {
      setStep(prevStep => prevStep + 1);
    }
  };

  return (
    <div className={styles.welcomeWrapper}>
      {/* <div className={styles.logoWrapper}>
          <img src='/parkway.webp'  className={styles.shield} alt="Parkway Logo" />
        <h1 className={styles.title}>LOCK LEARNER</h1>
      </div> */}


      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.inputContainer}>
            <div>
              <input
                type="number"
                id="digit1"
                value={combo[0] || ''}
                onChange={(e) => handleInputChange(0, e.target.value)}
                maxLength="1"
                max='39'
                className={styles.comboInput}
              />
            </div>
            <div>
              <input
                type="number"
                id="digit2"
                value={combo[1] || ''}
                onChange={(e) => handleInputChange(1, e.target.value)}
                maxLength="1"
                className={styles.comboInput}
              />
            </div>
            <div>
              <input
                type="number"
                id="digit3"
                value={combo[2] || ''}
                onChange={(e) => handleInputChange(2, e.target.value)}
                maxLength="1"
                className={styles.comboInput}
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit" className='redButton'>SET COMBO</button>
            <button onClick={(e) => {e.preventDefault(); router.push('/')}} className='redButton'>QUIT</button>
          </div>
        </form>
        <div className='infoCard'>
          {/* <h2 className={styles.welcomeHeader}>BEGIN</h2> */}
          <p>To practice opening your lock, enter your 3 digit combination above</p>
        </div>
      </div>
    </div>
  );
}