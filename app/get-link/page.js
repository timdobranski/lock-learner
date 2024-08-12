'use client';

import styles from './page.module.css';
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import ManageUsername from '../../components/ManageUsername/ManageUsername';


export default function GetLinkPage() {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [matchId, setMatchId] = useState('');
  const [matchLink, setMatchLink] = useState('');
  const router = useRouter();


  useEffect(() => {
    // Retrieve username from localStorage if it exists
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setSavedUsername(DOMPurify.sanitize(storedUsername));
    }

  }, []);

  useEffect(() => {
    if (matchId) {}
  }, [savedUsername])


  const generateLink = async () => {
    if (!savedUsername) {
      alert('Please enter your username');
      return;
    }

    try {
      // Use the environment variable for the server's URL
      const serverUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/create-match`;
      console.log('serverUrl:', serverUrl);
      // Send POST request to the server to create a match
      const response = await fetch(`${serverUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: savedUsername }), // Send the username to the server
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        const link = `${process.env.NEXT_PUBLIC_SITE_URL}/lobby/${data.matchId}`

        setMatchId(data.matchId);
        setMatchLink(link);

        // Copy the link to the clipboard
        await navigator.clipboard.writeText(link);
        alert('Match link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Failed to create match. Please try again.');
    }
  };


  return (
    <div className={styles.lobbyContainer}>
      <div className='infoCard'>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.backIcon} onClick={() => router.push('/')} />
        <h1>LOBBY</h1>

        <ManageUsername username={username} setUsername={setUsername} savedUsername={savedUsername} setSavedUsername={setSavedUsername} />



        <p>Create a match link below and share it with a friend to play against each other. Up to 4 players per match.</p>
        <p>{`At the end of the countdown, you'll both be given the same combo, and you can race to see who opens their lock first. `}</p>
        <button className='redButton' onClick={generateLink} >GENERATE LINK</button>
        <p>{matchLink}</p>
      </div>

    </div>
  )
}