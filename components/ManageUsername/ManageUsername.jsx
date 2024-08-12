'use client'

import styles from './ManageUsername.module.css';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';


export default function ManageUsername({ username, setUsername, savedUsername, setSavedUsername }) {

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const safeUsername = DOMPurify.sanitize(username);
    localStorage.setItem('username', safeUsername);
    setSavedUsername(safeUsername);
  }

  const resetUsername = () => {
    localStorage.removeItem('username');
    setSavedUsername('');
  }

  useEffect(() => {
    // Retrieve username from localStorage if it exists
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setSavedUsername(DOMPurify.sanitize(storedUsername));
    }
  }, [])

  return (
    savedUsername ?
      <div className={styles.usernameWrapper}>
        {/* <p>Playing As:</p> */}
        <div className={styles.usernameContainer}>
          <p className={styles.username}>{savedUsername}</p>
          <button onClick={resetUsername} className={styles.changeUsernameButton}>
            <FontAwesomeIcon icon={faPen} className={styles.editUsernameIcon}/>
          </button>
        </div>


      </div>
      :
      <form onSubmit={handleSubmit} className={styles.usernameInputWrapper}>
        <label className={styles.usernameLabel} htmlFor='usernameInput'>Choose A Username:</label>
        <input type="text" id='usernameInput' value={username} onChange={handleChange} className={styles.usernameInput}/>
        <button type="submit" className='redButton'>SAVE</button>
      </form>

  )


}