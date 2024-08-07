import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.logoWrapper}>
      <img src='/parkway.webp'  className={styles.shield} alt="Parkway Logo" />
      <h1 className={styles.title}>LOCK LEARNER</h1>
    </div>
  )
}