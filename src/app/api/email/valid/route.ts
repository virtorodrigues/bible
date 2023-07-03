import { NextRequest, NextResponse } from 'next/server'
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from 'firebase/firestore'
import { db } from '@/configFirebase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email') as string

  const q = query(collection(db, 'users'), where('email', '==', email))

  const querySnapshot = await getDocs(q)
  let hasEmail = false
  let queryId = ''

  querySnapshot.forEach((doc: any) => {
    if (!doc.data().emailVerification && doc.data().email === email) {
      hasEmail = true
      queryId = doc.id
    }
  })

  if (hasEmail) {
    const docRef = doc(db, 'users', queryId)

    try {
      await updateDoc(docRef, { emailVerification: true })
    } catch (e) {
      console.error('Error adding document: ', e)
    }
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/valid-email/${email}`,
    )
  }

  return NextResponse.json({ user: {} })
}
