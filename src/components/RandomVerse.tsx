'use client'

import { useEffect, useState } from 'react'

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

    const bible = await fetch(
      'https://www.abibliadigital.com.br/api/verses/nvi/random',
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    )

    setIsLoading(false)

    const data = await bible.json()

    setVerse(data)
  }

  async function sendEmail() {
    const informationsRequests = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/email/send`,
      {
        method: 'GET',
      },
    )
    const informationsRequestsData = await informationsRequests.json()
    console.log(informationsRequestsData)
  }

  return (
    <>
      {isLoading || !verse ? (
        <span>carregando...</span>
      ) : (
        <section
          id="random-verse"
          className="z-[9] flex flex-col items-center justify-center bg-[url('../assets/religious-1.jpg')] py-10"
        >
          <div className="w-full md:w-[1200px]">
            <h1 className="mb-5 text-center text-2xl">Palavra do dia</h1>
          </div>
          <div className="flex w-full flex-col items-center justify-center px-5 pt-5 text-center md:w-[400px]">
            <span className="first-letter:uppercase">{verse?.text}</span>
            <div className="flex flex-col gap-2 pt-8">
              <span>
                {verse?.book?.name} {verse?.chapter}:{verse?.number}
              </span>
            </div>
          </div>
        </section>
      )}

      <button
        disabled={isLoading || !verse}
        onClick={generateRamdonVerse}
        className="mt-10 w-fit rounded bg-gray-600 px-3 py-1 hover:bg-gray-700"
      >
        Gerar nova
      </button>
      <button
        onClick={sendEmail}
        className="mt-10 w-fit rounded bg-gray-600 px-3 py-1 hover:bg-gray-700"
      >
        Enviar email
      </button>
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
/* const token = await fetch('https://www.abibliadigital.com.br/api/users/token', {
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
