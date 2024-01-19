import { Noto_Sans_KR } from "next/font/google";
import './globals.css'
import Script from 'next/script'
const noto = Noto_Sans_KR({
  weight: ["400", "500", "700"],
  preload: false,
});

export const metadata = {
  title: '플러스끄투',
  keywords: [
    '끄투',
    'kkutu',
    '플러스끄투',
    '두근두근',
    '끝말잇기',
    '앞말잇기',
    '십자말풀이',
    '웹',
    '쿵쿵따',
    '영어끝말잇기',
    '영어쿵쿵따',
    '끝말잇기사이트',
    '자음퀴즈',
    '초성퀴즈',
    '그림퀴즈',
    '십자말풀이',
    '가로세로',
    '타자',
    '타자연습',
    '앞말잇기',
  ],
  description: '플러스끄투에서 끝말잇기, 쿵쿵따와 같은 온라인 단어 게임을 즐겨보세요.',
  publisher: 'Gaming+',
  openGraph: {
    title: '두근두근 플러스끄투',
    description: '플러스끄투에서 끝말잇기, 쿵쿵따와 같은 온라인 단어 게임을 즐겨보세요.',
    url: 'https://kkutu.cc',
    siteName: '플러스끄투',
    images: [
      {
        url: 'https://kkutu.cc/img/kkutu/og.png',
        width: 1200,
        height: 630,
        alt: '플러스끄투 텍스트가 적혀있는 파란 배경의 이미지',
      },
    ],
    locale: 'ko-KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'kkutu.cc',
    title: '두근두근 플러스끄투',
    description: '플러스끄투에서 끝말잇기, 쿵쿵따와 같은 온라인 단어 게임을 즐겨보세요.',
    image: 'https://kkutu.cc/img/kkutu/og.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      
    <Script src="https://partner.talk.naver.com/banners/script"/>
      <body className={noto.className}>{children}</body>
    </html>
  )
}
