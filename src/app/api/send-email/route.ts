import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

const OAuth2_client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({ refresh_token: process.env.CLIENT_REFRESH_TOKEN })

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const asdas = request.body
  const {html} = await request.json()

  console.log(html)

  //const id = searchParams.get('id')
  const accessToken = OAuth2_client.getAccessToken()

  // Configurar o transporte de e-mail
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
      to: "santos.vitao1936@gmail.com",
      subject: "Sua pequena dose diaria de DEUS",
      text: "Conteúdo do e-mail",
      html: html, // html body
    };

    // Enviar o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log("E-mail enviado: " + info.response);
    return NextResponse.json({ content: info.response, success: true })

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, success: false })
  }

  return NextResponse.json({ seila: 'aff' })

}
