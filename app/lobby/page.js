

export default function Lobby() {

  return (
    <div className='infoCard'>
      <h1>LOBBY</h1>
      <p>Here you can generate a match link and send it to another player.</p>
      <p>When they click the match link, a countdown will begin to start the match.</p>
      <p>{`At the end of the countdown, you'll both be given the same combo, and you can race to see who opens their lock first. `}</p>
    </div>
  )
}