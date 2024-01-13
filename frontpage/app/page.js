import Image from 'next/image'


export default function Home() {
  return (
    <>
    
    <header className="border-b backdrop-blur-lg bg-white/70 sticky top-0 md:shadow-md w-full z-50">
  <nav className="flex items-center justify-between px-4 lg:px-8 lg:py-0" aria-label="Global">
    <div className="flex lg:flex-1">
    <button className="-m-1.5 p-1.5 md:flex"><span className="sr-only">플러스끄투</span><img className="h-8" src="https://kkutu.pcor.me/img/logo.png" alt=""/>&nbsp;<span className="text-xs md:text-xl">OPEN BETA</span></button>
    </div>

    <div className="flex flex-1 justify-end">
                    <div className="py-3 pr-4">
                    <a href="/login"
                          className="flex rounded-xl py-2 px-2 transform ease-in duration-100 active:scale-95 hover:bg-gray-100">
                              로그인
                              </a>
                              </div>
                    <div>
                    <a
  href="/game?server=0"
  className="flex items-center justify-center text-white text-lg lg:text-2xl h-full px-2 lg:py-4 lg:px-12 transform ease-in duration-100 active:scale-95 bg-gradient-to-b md:bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 lg:hover:text-3xl"
  style={{ transform: `skew(-10deg)` }}
>
  <span className="font-bold tracking-wide">게임 시작</span>
</a>

                              </div>
        
    </div>
  </nav>
</header>

<section className="relative w-full h-96 bg-slate-200">
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl tracking-wide font-semibold text-black">두근두근, 매 판이 설레는<br/>
          <span className="font-bold text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-500 to-purple-500 inline-block text-transparent bg-clip-text">플러스끄투</span></h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-[700px] mx-auto">
            플러스끄투에서 단어의 제왕이 되어보세요!
          </p>
          <a
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white text-center m-auto py-2 px-2 rounded-xl transform ease-in duration-100 active:scale-95 hover:bg-purple-600"
            href="/game?server=0"
          >
           OBT 참여하기
          </a>
        </div>
      </div>
    </section>
<div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-purple-500">크로스 플랫폼 게임 플레이</h2>
              <p className="mt-2 text-4xl font-bold text-gray-900 sm:text-5xl">언제 어디서나<br/>즐기는 끝말잇기!</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discord를 포함한 Plus ID를 지원하는 모든 SNS를 통해 로그인 하여 언제 어디서나 게임을 즐길 수 있습니다.
              </p>
            </div>
          </div>
          <img
            src="/screely-1703772701230.png"
            alt="인게임 화면"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>

    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          게임 소식 가장 먼저 받기
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-1 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-1 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-1">
          <a href="https://cafe.naver.com/pluskkutu">
          <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="/navercafe.webp"
            alt="NaverCafe"
            width={48}
            height={48}
  /></a>
        </div>
      </div>
    </div>
<footer className="bg-gray-50 dark:bg-gray-900">
    <div className="mx-auto max-w-screen-xl p-4 py-6 lg:py-8">
    <a href="https://pcor.me" className="flex items-center justify-center">
        <img src="https://pcor.me/Plus.svg" className="h-8 mr-3" alt="Plus Logo"/>
      <span className="font-semibold self-center text-2xl text-gray-500 whitespace-nowrap dark:text-white">Plus</span>
      </a><br/>
      <a href="https://www.grac.or.kr/Statistics/Popup/Pop_StatisticsDetails.aspx?850c3e6034aa5ae3efd1751a7b1bfabaa6c813a6a053e8e5ec12581d53453bb0" target="_blank" class="flex items-center justify-center"><img src="/grac.png" class="h-12" alt="Rating"/></a>
      <br/>
      <div className="w-full sm:flex">
      
          <p className="text-xs text-center w-full text-gray-500 dark:text-gray-400">
            <span>© 2021~ Plus (moremi@pcor.me) All Rights Reserved.<br/>
            WordNet 3.0 Copyright 2006 by Princeton University. All rights reserved.<br/>
            NXDict Copyright 2024 by Plus Platforms. All rights reserved.<br/><br/>

            이 프로그램은 제품에 대한 어떠한 형태의 보증도 제공되지 않습니다.<br/>
이 프로그램은 자유 소프트웨어이며 배포 규정을 만족시키는 조건 아래 자유롭게 재배포할 수 있습니다.<br/>
이에 대한 자세한 사항은 본 프로그램의 구현을 담은 다음 레포지토리에서 확인하십시오: https://github.com/Plus-Platforms/KKuTu
            </span><br/><br/>
            <span className="font-bold">사전 정보 제공: WordNet
<br/></span>
          </p>
      </div>

      <div className='mx-auto'>
      <div class="talk_banner_div" data-id="141611" ></div>
      </div>
    </div>
</footer>
    </>
  )
}
