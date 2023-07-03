import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
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
  const { name, email, html } = await request.json()

  const q = query(collection(db, 'users'), where('email', '==', email))

  const querySnapshot = await getDocs(q)
  let hasEmail = false

  querySnapshot.forEach((doc: any) => {
    if (doc.data().email === email) {
      hasEmail = true
    }
  })

  if (!hasEmail) {
    try {
      const docRef = await addDoc(collection(db, 'users'), {
        name,
        email,
        emailVerification: false,
      })

      console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      console.error('Error adding document: ', e)
    }

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
        refreshToken: process.env.CLIENT_REFRESH_TOKEN,
        accessToken,
      },
    } as any)

    try {
      // Definir informações do e-mail
      const mailOptions = {
        from: 'reactzeiro@gmail.com',
        to: email,
        subject: 'Sua pequena dose diaria de DEUS',
        text: 'Conteúdo do e-mail',
        html, // html body
      }

      // Enviar o e-mail
      const info = await transporter.sendMail(mailOptions)
      return NextResponse.json({ content: info.response, success: true })
    } catch (error) {
      return NextResponse.json({ error, success: false })
    }
  }

  return NextResponse.json({
    success: false,
    message: 'email is already registred!',
  })
}
