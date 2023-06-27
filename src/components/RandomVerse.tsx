'use client'

import { useEffect, useState } from "react"
import { Subscription } from "./Subscription"

interface DataInterface {
  book: {
    name: string
  }
  chapter: string
  number: number
  text: string
}

export function RandomVerse() {
  const [verse, setVerse] = useState<DataInterface | null>({} as DataInterface)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    generateRamdonVerse()
  }, [])

  async function generateRamdonVerse() {

    const TOKEN = process.env.NEXT_PUBLIC_TOKEN_BIBLE

    setIsLoading(true)
    setVerse(null)

    const bible = await fetch('https://www.abibliadigital.com.br/api/verses/nvi/random', {
      headers:{
        Authorization: `Bearer ${TOKEN}`
      }
    })

    setIsLoading(false)

    const data = await bible.json()
   // console.log(data)

    // const informationsRequests = await fetch('https://www.abibliadigital.com.br/api/requests/amount/day', {
    //   headers:{
    //     Authorization: `Bearer ${TOKEN}`
    //   }
    // })
    // const informationsRequestsData = await informationsRequests.json()
    // console.log(informationsRequestsData)

    setVerse(data)
  }

  async function sendEmail() {
    const informationsRequests = await fetch(`${process.env.NEXT_PUBLIC_URL}api/email/send`,{
      method: 'POST',
      body: JSON.stringify({
        html: getHTMLToEmail(),
      })
    })
    const informationsRequestsData = await informationsRequests.json()
    console.log(informationsRequestsData)
  }

  function getHTMLToEmail() {
    return `<div>
      <h3>
        ${verse?.book?.name}
      </h3>
      <h3>
        capítulo: ${verse?.chapter}
      </h3>
      <h3>
        versículo: ${verse?.number}
      </h3>
      <h2 className='mt-5 first-letter:uppercase'>${verse?.text}</h2>
    </div>`
  }

  return (
    <>
      <Subscription />

      {isLoading || !verse ? (
        <span>carregando...</span>
      ) : (
          <div className="flex justify-center flex-col items-center bg-[url('../assets/religious-1.jpg')] py-10">
            <div className="w-full md:w-[1200px]">
              <h1 className="text-center text-xl mb-5">Palavra do dia</h1>
            </div>
            <div className="pt-5 flex justify-center items-center w-[400px] flex-col px-5 text-center">
              <span className='first-letter:uppercase'>{verse?.text}</span>
              <div className='gap-2 flex flex-col pt-8'>
                <span>{verse?.book?.name} {verse?.chapter}:{verse?.number}</span>
              </div>
            </div>
          </div>
        )
      }

      {/* <button disabled={isLoading || !verse} onClick={generateRamdonVerse} className='w-fit mt-10 bg-gray-600 px-3 py-1 rounded hover:bg-gray-700'>Gerar nova</button>
      <button onClick={sendEmail} className='w-fit mt-10 bg-gray-600 px-3 py-1 rounded hover:bg-gray-700'>Enviar email</button> */}

    </>
  )
}


/*

    /*const createUser = await fetch('https://www.abibliadigital.com.br/api/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": "vitor",
      "email": "santos_vitao@hotmail.com",
      "password": "123123123", // minimum size 6 digits
      "notifications": true // receive update emails from www.abibliadigital.com.br
    })
  })
  const createUSerData = await createUser.json()
  console.log(createUSerData)
  */
  /*const token = await fetch('https://www.abibliadigital.com.br/api/users/token', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      "email": "santos_vitao@hotmail.com",
      "password": "123123123",
    })
  })
  const tokenData = await token.json()
  console.log(tokenData.token)
*/

/* const userByEmail = await fetch('https://www.abibliadigital.com.br/api/users/santos_vitao@hotmail.com', {
    headers:{
      Authorization: `Bearer ${TOKEN}`
    }
  })
  const data = await userByEmail.json()
  console.log(data)
*/