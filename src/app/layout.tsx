
import './globals.css';
import { ReactNode } from 'react';



export const metadata = {
  title: 'team-miro',
  description: 'Fast easy car renting'
}



export default function RootLayout({ children } : {children:  ReactNode}){
  return(
    <html lang="en">
      <body>{children}
      </body>
    </html>
  )
}