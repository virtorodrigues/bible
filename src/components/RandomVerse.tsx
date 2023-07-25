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

  return (
    <>
      <section
        id="random-verse"
        className="z-[9] flex flex-col items-center justify-center bg-[url('../assets/religious-1.jpg')] py-10"
      >
        <div className="w-full md:w-[1200px]">
          <h1 className="mb-5 text-center text-2xl">Palavra do dia</h1>
        </div>

        {isLoading || !verse ? (
          <div className="flex h-20 items-center">
            <span className="text-center">carregando...</span>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center justify-center px-5 pt-5 text-center md:w-[400px]">
            <span className="first-letter:uppercase">{verse?.text}</span>
            <div className="flex flex-col gap-2 pt-8">
              <span>
                {verse?.book?.name} {verse?.chapter}:{verse?.number}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
