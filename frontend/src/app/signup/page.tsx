'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';
import Link from 'next/link';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('http://localhost:8000/account/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    })

    if (res.ok) {
      router.push('/home');
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong')
    }
  }

  return (
    <div className={styles.signupPage}>
      <img src="/img/appLogo.svg" alt="Flavor758" className={styles.appLogo}/>
      <h2 className={styles.flavorText}>Sign Up to Flavor758</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.username}
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br/>
        <input
          className={styles.password}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/>
        <button className={styles.submitButton} type="submit">Register</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <Link href='/login'>Already have Account</Link>
    </div>
  )
}