'use client'

import { db } from "@/configFirebase"
import { useEffect, useState } from "react"
import { collection, addDoc } from "firebase/firestore";

interface DataInterface {
  book: {
    name: string
  }
  chapter: string
  number: number
  text: string
}

export function Subscription() {
  const [verse, setVerse] = useState<DataInterface | null>({} as DataInterface)
  const [isLoading, setIsLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')


  async function registerUser() {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name,
        email,
      });

      console.log("Document written with ID: ", docRef.id);
      setName('')
      setEmail('')
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="w-96 flex flex-col gap-3 mb-10">
      <div className="flex flex-col gap-1">
        <span>Nome</span>
        <input type="text" className="text-black px-3 py-1" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="flex flex-col gap-1">
        <span>E-mail</span>
        <input type="text" className="text-black py-1 px-3" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button className="bg-gray-600 w-fit px-3 py-1 rounded hover:bg-gray-600/90" onClick={registerUser}>Cadastrar</button>
    </div>
  )
}
