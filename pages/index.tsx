import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import AkamaiAuthToken from 'akamai-auth-token/lib/Akamai'

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
    <div className="container">
      <Head>
        <title>Create Akamai Auth Token</title>
        <meta name="description" content="Akamai auth token generator"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"/>
      </Head>
      <main>
        <div className="row">
          <div className="column">
            <br/><br/>
            <h2>
              Akamai Auth Token Generation
            </h2>
          </div>
        </div>
        <form onSubmit={generateAuthToken} >
          <div className="row">
            <div className="column">
              <label>Secret Key</label>
              <input required name="key" type="text"/>
            </div>
            <div className="column">
              <label>Duration (in ms)</label>
              <input required name="duration" type="number" defaultValue="6000" />
            </div>
            <br/>
            <div className="column">
              <label>Algorithm</label>
              <input required name="algorithm" type="text" defaultValue="SHA256"/>
            </div>
            <br/>
          </div>
          <div className="row">
            <div className="column">
              <button type="submit">Generate</button>
            </div>
          </div>
          { authToken &&
            <div>
              <br/><br/>
              <div className="row">
                <div className="column"><b>Auth token generated successfully!!</b></div>
              </div>
              <div className="clearfix">
                <blockquote>
                  <p><em>{authToken}</em></p>
                </blockquote>
              </div>
            </div>
          }
        </form>
      </main>
    </div>
  )
}

export default Home
