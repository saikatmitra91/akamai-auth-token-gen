import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import AkamaiAuthToken from 'akamai-auth-token/lib/Akamai'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [authToken, setAuthToken] = useState('')
  const generateAuthToken = (e: any) => {
    console.log(e)
    const { target } = e
    const key = target[0].value
    const duration = target[1].value
    const algorithm = target[2].value
    const currentTime = new Date().getTime()
    const authConfig = {
      algorithm,
      window: duration,
      acl: '/*',
      key,
      encoding: false,
      time: currentTime
    }
    const akamaiInstance = new AkamaiAuthToken(authConfig)
    const token = akamaiInstance.generateToken()
    setAuthToken(token)
    e.preventDefault()
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Akamai Auth Token</title>
        <meta name="description" content="Akamai auth token generator"/>
      </Head>

      <main className={styles.main}>
        <p className={styles.description}>
          Akamai Auth Token Generation
        </p>
        <form onSubmit={generateAuthToken} >
          <label>Secret Key</label>
          <input required name="key" type="text"/>
          <br/>
          <br/>
          <label>Duration (in ms)</label>
          <input required name="duration" type="number" defaultValue="6000" />
          <br/>
          <br/>
          <label>Algorithm</label>
          <input required name="algorithm" type="text" defaultValue="SHA256"/>
          <br/>
          <br/>
          <button type="submit">Generate</button>
          { authToken && <p>{authToken}</p>}
        </form>
      </main>
    </div>
  )
}

export default Home
