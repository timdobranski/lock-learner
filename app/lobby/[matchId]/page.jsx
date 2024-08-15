'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import io from 'socket.io-client';
import styles from './page.module.css'
import ManageUsername from '../../../components/ManageUsername/ManageUsername'



export default function Lobby({ params }) {
  const [allPlayersReady, setAllPlayersReady] = useState(false); // how to know when to render the START button
  const [players, setPlayers] = useState([]); // when a new player joins, update this list
  const [host, setHost] = useState(null);

  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const matchId = params?.matchId;
  const matchLink = `${process.env.NEXT_PUBLIC_SITE_URL}/lobby/${matchId}`;

  const router = useRouter();
  const socketRef = useRef(null);


  // determine what message to render based on the number of players
  function getPlayersMessage(players) {
    if (players) {
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
  }
  const playersMessage = getPlayersMessage(players);

  useEffect(() => {
    console.log('players list changed: ', players);
  }, [players])

  useEffect(() => {
  }, [players])

  useEffect(() => {
    // console.log('inside matchId useEffect')
    if (matchId) {
      // console.log('...matchId is defined')
      socketRef.current = io('http://localhost:3005');

      // Automatically join the match when the page loads
      socketRef.current.emit('join_match', { matchId, username: savedUsername });

      socketRef.current.on('match_ready', () => {
        console.log('Match is ready, start the game!');
        // Start the game here
      });

      socketRef.current.on('match_full', () => {
        alert('The match is full!');
      });

      socketRef.current.on('match_not_found', () => {
        alert('Match not found!');
        router.push('/');
      });

      socketRef.current.on('player_joined', (matchData) => {
        console.log('match data: ', matchData);
        setPlayers(matchData.players);  // Update players list

        setHost(matchData.host === socketRef.current.id);  // Update host information
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
    // console.log('...but no match Id');
  }, [matchId]);

  useEffect(() => {
    // When savedUsername is updated and socket is connected, update the username on the server
    if (socketRef.current && savedUsername) {
      socketRef.current.emit('update_username', { matchId, newUsername: savedUsername });
    }
  }, [savedUsername, socketRef.current, matchId]);


  // connect to the match in a pending state until both players are ready
  useEffect(() => {
    if (matchId) {
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

  }, [matchId]);




  const startMatch = async () => {
  }


  const copyToClipboard = () => {
    navigator.clipboard.writeText(matchLink)
      .then(() => {
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };


  return (
    <div className='infoCard'>
      <h1>Match Lobby</h1>
      <ManageUsername username={username} setUsername={setUsername} savedUsername={savedUsername} setSavedUsername={setSavedUsername} />

      <h3>Players Joined</h3>
      <div className={styles.playerList}>
        {/* <div className={styles.playerWrapper}>
          <p className={styles.playerNumberLabel}>{`Player 1`}</p>
          <p className={styles.playerName}>{savedUsername}</p>
          <p className={`${isReady ? styles.playerReady : styles.playerNotReady}`}>{isReady ? 'READY' : 'NOT READY'}</p>
        </div> */}

        {players && players.map((player, index) => {
          return (
            <div className={styles.playerWrapper} key={index}>
              <p className={styles.playerNumberLabel}>{`Player ${index + 1}`}</p>
              <p className={styles.playerName}>{player.username}</p>
              {/* <p className={`${player.ready ? styles.playerReady : styles.playerNotReady}`}>{player.ready ? 'READY' : 'NOT READY'}</p> */}
            </div>
          )
        })}
      </div>

      <div className={styles.optionsWrapper}>
        {/* <p>{`When you're ready to begin, select the button below. When all players are ready, you can start the match.`}</p> */}
        <button className={'blueButton'} onClick={copyToClipboard} >INVITE PLAYERS</button>
        <div className={`${styles.linkCopyConfirm} ${showConfirmation ? styles.show : ''}`}>
          Link Copied
        </div>
        { host ?
          players.length >= 2 && <button className={'greenButton'} onClick={startMatch}>START</button>
          :
          <p>Waiting for the host to start the match</p>
        }
      </div>

    </div>
  )
}

