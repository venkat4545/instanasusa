import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import  Header  from '../components/Header'
import Feed from '../components/Feed'



const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>INSTAGRAM NASUSA</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      
      
       
          <Header />
        
    

  
    <Feed />

      
    </div>
  )
}

export default Home
