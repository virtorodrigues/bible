import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/configFirebase'

const OAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
)
OAuth2Client.setCredentials({
  refresh_token: process.env.CLIENT_REFRESH_TOKEN,
})

export async function POST(request: NextRequest) {
  // const { html } = await request.json()

  const q = query(collection(db, 'users'))

  const querySnapshot = await getDocs(q)
  const emails = [] as string[]

  querySnapshot.forEach((doc: any) => {
    const data = doc.data()

    if (data.emailVerification && !data.unsubscribe) {
      emails.push(doc.data().email)
    }
  })

  if (emails.length > 0) {
    const accessToken = OAuth2Client.getAccessToken()

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

    const html = await getHTMLToEmail()
    try {
      const mailOptions = {
        from: 'reactzeiro@gmail.com',
        to: emails,
        subject: 'Sua pequena dose diaria da Bíblia',
        text: 'Conteúdo do e-mail',
        html,
      }

      const info = await transporter.sendMail(mailOptions)
      return NextResponse.json({ content: info.response, success: true })
    } catch (error) {
      return NextResponse.json({ error, success: false })
    }
  }
  return NextResponse.json({ success: false })
}

async function generateRamdonVerse() {
  const TOKEN = process.env.NEXT_PUBLIC_TOKEN_BIBLE

  const bible = await fetch(
    'https://www.abibliadigital.com.br/api/verses/nvi/random',
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  )

  return await bible.json()
}

async function getHTMLToEmail() {
  const verse = (await generateRamdonVerse()) as any

  const unsubscribeLink = `${process.env.NEXT_PUBLIC_URL}/unsubscribe`

  return `
    <div>
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
      <p>Para cancelar sua inscrição clique <a href='${unsubscribeLink}'>aqui! </a></p>
    </div>`
}
