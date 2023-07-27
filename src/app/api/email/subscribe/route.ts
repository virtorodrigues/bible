import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@/configFirebase'

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
)
OAuth2Client.setCredentials({
  refresh_token: process.env.CLIENT_REFRESH_TOKEN,
})

export async function POST(request: NextRequest) {
  // const { searchParams } = new URL(request.url)
  const { email, html } = await request.json()

  const q = query(collection(db, 'users'), where('email', '==', email))

  const querySnapshot = await getDocs(q)
  let isAbleToSubscribe = true
  let isAbleToUpdateSubscribe = false
  let queryId = ''

  querySnapshot.forEach((doc: any) => {
    if (doc.data().email === email) {
      isAbleToSubscribe = false

      if (doc.data().unsubscribe) {
        isAbleToUpdateSubscribe = true
        queryId = doc.id
      }
    }
  })

  if (isAbleToSubscribe) {
    try {
      await addDoc(collection(db, 'users'), {
        unsubscribe: false,
        email,
        emailVerification: false,
      })
    } catch (e) {
      return NextResponse.json({ success: false })
    }
  }

  if (isAbleToUpdateSubscribe) {
    const docRef = doc(db, 'users', queryId)

    try {
      await updateDoc(docRef, { unsubscribe: false })
      return NextResponse.json({ success: true })
    } catch (e) {
      return NextResponse.json({ success: false })
    }
  }

  if (isAbleToSubscribe) {
    // const id = searchParams.get('id')
    const accessToken = OAuth2Client.getAccessToken()

    // Configurar o transporte de e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.CLIENT_USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken,
        refreshToken: process.env.CLIENT_REFRESH_TOKEN,
        expires: 1484314697598,
      },
    } as any)

    try {
      const mailOptions = {
        from: 'reactzeiro@gmail.com',
        to: email,
        subject: 'Confirmação do e-mail',
        text: 'Conteúdo do e-mail',
        html,
      }

      await transporter.sendMail(mailOptions)
      return NextResponse.json({ success: true })
    } catch (error) {
      if (isAbleToUpdateSubscribe) {
        const docRef = doc(db, 'users', queryId)

        try {
          await updateDoc(docRef, { unsubscribe: true })
          return NextResponse.json({ success: true })
        } catch (e) {
          return NextResponse.json({ success: false })
        }
      }

      if (isAbleToSubscribe) {
        const docRef = doc(db, 'users', queryId)

        try {
          await deleteDoc(docRef)
          return NextResponse.json({ success: true })
        } catch (e) {
          return NextResponse.json({ success: false })
        }
      }

      return NextResponse.json({ success: false })
    }
  }

  return NextResponse.json({
    success: false,
    message: 'Erro! E-mail já cadastrado!',
  })
}
