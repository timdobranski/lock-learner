'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import styles from './page.module.css'
import ManageUsername from '../../../components/ManageUsername/ManageUsername'



export default function Lobby({ params }) {
  const [isReady, setIsReady] = useState(false);
  const [allPlayersReady, setAllPlayersReady] = useState(false); // how to know when to render the START button
  const [players, setPlayers] = useState([]); // when a new player joins, update this list

  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  // const [matchId, setMatchId] = useState('');

  const matchId = params?.matchId;
  const matchLink = `${process.env.NEXT_PUBLIC_SITE_URL}/lobby/${matchId}`;

  const router = useRouter();

  // determine what message to render based on the number of players
  function getPlayersMessage(players) {

    switch (true) {
    case players.length === 0:
      return 'Waiting for other players to join.';
    case players.length === 1:
    case players.length === 2:
      return 'Waiting for more players. Invite more or start the match.';
    case players.length >= 3:
      return 'All players have joined. Start the match?';
    default:
      return 'Invalid number of players.';
    }
  }
  const playersMessage = getPlayersMessage(players);


  useEffect(() => {

  }, [players])


  // connect to the match in a pending state until both players are ready
  useEffect(() => {
    if (isReady && matchId) {
      const socket = io();

      socket.emit('join_match', matchId);

      socket.on('match_ready', () => {
        console.log('Match is ready, start the game!');
        // Start the game here
      });

      socket.on('match_full', () => {
        alert('The match is full!');
      });

      socket.on('match_not_found', () => {
        alert('Match not found!');
        router.push('/');
      });

      return () => {
        socket.disconnect();
      };
    }

  }, [isReady, matchId]);

  const startMatch = async () => {
  }

  const handlePlayerReady = async () => {
    setIsReady(true);
  }



  return (
    <div className='infoCard'>
      <h1>Match Lobby</h1>
      <ManageUsername username={username} setUsername={setUsername} savedUsername={savedUsername} setSavedUsername={setSavedUsername} />

      <h3>Players Joined</h3>
      <div className={styles.playerList}>
        <div className={styles.playerWrapper}>
          <p className={styles.playerNumberLabel}>{`Player 1`}</p>
          <p className={styles.playerName}>{savedUsername}</p>
          <p className={`${isReady ? styles.playerReady : styles.playerNotReady}`}>{isReady ? 'READY' : 'NOT READY'}</p>
        </div>

        {players.map((player, index) => {
          return (
            <div className={styles.playerWrapper} key={index}>
              <p className={styles.playerNumberLabel}>{`Player ${index + 2}`}</p>
              <p className={styles.playerName}>{player}</p>
              <p className={`${player.ready ? styles.playerReady : styles.playerNotReady}`}>{player.ready ? 'READY' : 'NOT RAEDY'}</p>
            </div>
          )
        })}
      </div>
      {isReady ?
        <>
          <p>{playersMessage}</p>
          <button className={'greenButton'} onClick={startMatch} >START</button>
        </>
        :
        <>
          <p>{`When you're ready to begin, select the button below. When all players are ready, the match will begin.`}</p>
          <button className={'redButton'} onClick={handlePlayerReady} >READY</button>
        </>
      }
    </div>
  )
}

