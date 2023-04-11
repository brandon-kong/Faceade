import { Albert_Sans, Inter, Noto_Sans_JP } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const albert_sans = Albert_Sans({ subsets: ['latin'] })
const noto_sans_jp = Noto_Sans_JP({ subsets: ['latin'], weight: '400' } )

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
    return (
        <div className={noto_sans_jp.className}>
             <Component {...pageProps} />
        </div>
       
    )
}
