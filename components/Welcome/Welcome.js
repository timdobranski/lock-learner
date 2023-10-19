import styles from './Welcome.module.css'
import Image from 'next/image';
import logo from '../../public/titledLogo.png'

export default function Welcome({ setStep, combo, setCombo }) {

  const isValidComboValue = (value) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0 && num <= 39;
  };

  const handleInputChange = (index, value) => {
    if (isValidComboValue(value) || value === "") { // Allow empty value for backspacing
      // Create a new combo array based on the existing combo
      const newCombo = [...combo];
      newCombo[index] = value;
      setCombo(newCombo);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(prevStep => prevStep + 1);
  };

  return (
    <div >
      <div className={styles.logo}>
        <Image src={logo} fill='true' alt="Parkway Logo" />
      </div>
      <h1 className={styles.title}>LOCK LEARNER</h1>


    <div className={styles.container}>
      <form onSubmit={handleSubmit} id={styles.formContainer}>
      <div id={styles.inputContainer}>
        <div>
          <input
            type="number"
            id="digit1"
            value={combo[0] || ''}
            onChange={(e) => handleInputChange(0, e.target.value)}
            maxLength="1"
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
        <button type="submit" id={styles.comboSubmitButton}>SET COMBO</button>
      </form>
      <div id={styles.resetContainer}>
        <h2 id={styles.welcomeHeader}>Welcome, PE Students!</h2>
        <p>To practice opening your lock, enter your 3 digit combination above</p>
      </div>
    </div>
    </div>
  );
}