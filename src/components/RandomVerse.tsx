'use client'

import { data } from "autoprefixer"
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
    const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlNhdCBKdW4gMjQgMjAyMyAxOTo0MDozMiBHTVQrMDAwMC42NDk3NDMwOTcyN2FlOTAwMjA0MDg4YTYiLCJpYXQiOjE2ODc2MzU2MzJ9.0hEiCwoBQHvhglSTxLPWSFIMRaTYhz4lWHEzeaO3BcI'

    setIsLoading(true)
    setVerse(null)

    const bible = await fetch('https://www.abibliadigital.com.br/api/verses/nvi/random', {
      headers:{
        Authorization: `Bearer ${TOKEN}`
      }
    })

    setIsLoading(false)

    const data = await bible.json()

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
    const informationsRequests = await fetch('http://localhost:3000/api/send-email',{
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
          <>
            <div className='gap-2 flex'>
              <span>{verse?.book?.name}</span>
              <span>capítulo: {verse?.chapter}</span>
              <span>versículo: {verse?.number}</span>
            </div>
            <span className='mt-5 first-letter:uppercase'>{verse?.text}</span>
          </>

        )
      }

      <button disabled={isLoading || !verse} onClick={generateRamdonVerse} className='w-fit mt-10 bg-gray-600 px-3 py-1 rounded hover:bg-gray-700'>Gerar nova</button>
      <button onClick={sendEmail} className='w-fit mt-10 bg-gray-600 px-3 py-1 rounded hover:bg-gray-700'>Enviar email</button>

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