import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/configFirebase'

const OAuth2_client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({ refresh_token: process.env.CLIENT_REFRESH_TOKEN })

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const { html } = await request.json()


  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  const emails = [] as any

  querySnapshot.forEach((doc: any) => {
    const data = doc.data()

    if (data.emailVerification) {
      emails.push(doc.data().email)
    }
  })

  if (emails.length > 0) {

      const accessToken = OAuth2_client.getAccessToken()

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.CLIENT_USER_EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.CLIENT_REFRESH_TOKEN,
          accessToken
        }
      } as any);

      try {
        // Definir informações do e-mail
        const mailOptions = {
          from: "reactzeiro@gmail.com",
          to: emails,
          subject: "Sua pequena dose diaria de DEUS",
          text: "Conteúdo do e-mail",
          html: html, // html body
        };

        // Enviar o e-mail
        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ content: info.response, success: true })

      } catch (error) {
        console.error(error);
        return NextResponse.json({ error, success: false })
      }
  }
  return NextResponse.json({ success: false })
}
