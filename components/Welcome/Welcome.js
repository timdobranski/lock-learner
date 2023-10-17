import styles from './Welcome.module.css'

export default function Welcome({ setStep, combo, setCombo }) {

  const handleInputChange = (index, value) => {
    // Create a new combo array based on the existing combo
    const newCombo = [...combo];
    newCombo[index] = value;
    setCombo(newCombo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No need to set combo again here, as it's directly updated by handleInputChange.
    // However, if you want to perform any validation or additional operations on combo, you can do so here.
    setStep(prevStep => prevStep + 1);
  };

  return (
    <div className={styles.container}>
      <h2>Welcome!</h2>
      <p>To practice opening your lock, enter your 3 digit combination:</p>

      <form onSubmit={handleSubmit} id={styles.formContainer}>
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
        <button type="submit" id={styles.comboSubmitButton}>SET COMBO</button>
      </form>
    </div>
  );
}