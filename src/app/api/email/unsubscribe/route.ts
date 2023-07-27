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

export async function POST(request: NextRequest, response: NextResponse) {
  // const { searchParams } = new URL(request.url)
  const { email } = await request.json()

  const q = query(collection(db, 'users'), where('email', '==', email))

  const querySnapshot = await getDocs(q)
  let hasEmail = false
  let queryId = ''

  querySnapshot.forEach((doc: any) => {
    if (!doc.data().unsubscribe && doc.data().email === email) {
      hasEmail = true
      queryId = doc.id
    }
  })

  if (hasEmail) {
    const docRef = doc(db, 'users', queryId)

    try {
      await updateDoc(docRef, { unsubscribe: true })
      return NextResponse.json({ success: true })
    } catch (e) {
      return NextResponse.json({ success: false })
    }
  }

  return NextResponse.json({ success: false })
}
