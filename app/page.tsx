"use client";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import Head from 'next/head'

import Header from './components/header'
import Text from './components/text'
import PrimaryButton from './components/primary-button'
import TextArea from './components/text-area'
import Image from 'next/image';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<string | undefined>(`# カスタマージャーニーの物語

  1. **顧客の存在**： あるところに顧客がいました。  
  2. **既存の代替品選択**： 特定のジョブをする時には、顧客は既存の代替品を選択していました。
  3. **スイッチングトリガーによる破壊**： ある日、既存の代替品がスイッチングトリガーによって破壊されてしまいました。 
  4. **既存代替品の課題認識**： 既存の代替品には課題があるため、顧客は既存の代替品がジョブの最良の選択肢でないことに気づきました。 
  5. **他のソリューションの探求**： 顧客は他のソリューションを探しました。他の代替品を検討するようになりました。
  6. **最良の選択肢の発見**： 最終的には、顧客は正しい代替品を見つけました。
  7. **カスタマージャーニーの可視化**： この物語はカスタマージャーニーとして可視化できます。
  `);
  const [mode, setMode] = useState<'start' | 'talking' | 'thinking' | 'result'>('result');

  const {
      transcript,
      listening,
      resetTranscript,
  } = useSpeechRecognition();

  const handleStart = () => {
      setMode('talking');
      SpeechRecognition.startListening({
        continuous: true,
        language: 'ja-JP',
      });
  };

  const handleSend = async () => {
      setMode('thinking');
      try {
          SpeechRecognition.stopListening();
          setIsLoading(true);

          const body = JSON.stringify({
              talk_text: transcript,
          })

          fetch('/api', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body,
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            
            setResponseData(data.reply);
            setMode('result');
          });
      } catch (err: any) {
          console.error(err);
          alert("エラーが発生しました。もう一度やり直してください。");
      } finally {
          setIsLoading(false);
      };
  };

  return (
    <>
      <div className="home-container">
        <Head>
          <title>ゴムのアヒルちゃん</title>
          <meta property="og:title" content="ゴムのアヒルちゃん" />
        </Head>
        <div className="home-container1">
          <div className="home-header">
            <Header />
          </div>
          <div className="home-main">
            <img
              alt="image"
              src="/rubberduck.png"
              className="home-image"
            />
            <div className="home-container2">
              {mode === 'start' && (
                <div className="home-start-talking">
                  <Text
                    text="あなたのモヤモヤ悩んでいることを話してみて！"
                    rootClassName="text-root-class-name"
                    ></Text>
                  <PrimaryButton
                    button="話してみる"
                    rootClassName="primary-button-root-class-name"
                    onClick={handleStart}
                    ></PrimaryButton>
                </div>
              )}
              {mode === 'talking' && (
                <div className="home-talking">
                  <Text
                    text="あなたのモヤモヤ悩んでいることを話してみて！"
                    rootClassName="text-root-class-name2"
                  ></Text>
                  {/* <TextArea rootClassName="text-area-root-class-name" value={transcript}></TextArea> */}
                  {transcript ? (
                    <span className='home-text'>{transcript}</span>
                  ) : (
                    <span className='home-text' style={{textAlign: "center", color: "gray"}}>あなたが話し始めるのを待っています...</span>
                  )}
                  <PrimaryButton
                    button="話をおわる"
                    rootClassName="primary-button-root-class-name1"
                    onClick={handleSend}
                  ></PrimaryButton>
                </div>
              )}
              { mode === 'thinking' && (
                <div className="home-thinking">
                  <Text
                    text="うーん…ちょっとまってね…"
                    rootClassName="text-root-class-name3"
                    ></Text>
                  <Image
                    alt="image"
                    width={100}
                    height={103}
                    src="/circles-menu-3-200h.gif"
                    className="home-image1"
                    />
                </div>
              )}
              { mode === 'result' && (
                <div className="home-result">
                  <Text
                    text="あなたの考えを整理してみたよ！"
                    rootClassName="text-root-class-name4"
                    ></Text>
                  <span
                    className="home-text"
                  >
                    {responseData && <ReactMarkdown className='markdown' children={responseData} remarkPlugins={[remarkGfm]} />}
                    {/* <span>{responseData}</span> */}
                    <br></br>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .home-container1 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .home-header {
            top: 0px;
            flex: 0 0 auto;
            left: 0px;
            position: fixed;
            width: 100%;
            height: auto;
            display: flex;
            align-self: flex-start;
            align-items: center;
            justify-content: center;
          }
          .home-main {
            padding-top: 50px;
            flex: 0 0 auto;
            width: 100%;
            max-width: 1000px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: auto;
          }
          .home-image {
            width: 200px;
            height: 200px;
            object-fit: cover;
          }
          .home-container2 {
            flex: 0 0 auto;
            width: auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .home-start-talking {
            flex: 0 0 auto;
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-talking {
            width: 100%;
            max-width: 600px;
            height: 302px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-thinking {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-image1 {
            width: 100px;
            height: 103px;
            margin-top: var(--dl-space-space-halfunit);
            object-fit: cover;
          }
          .home-result {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-text {
            width: 100%;
            max-width: 600px;
            padding: var(--dl-space-space-halfunit);
            align-self: center;
            margin-top: var(--dl-space-space-halfunit);
            font-family: Noto Sans;
          }
          @media (max-width: 767px) {
            .home-main {
              flex-direction: column;
            }
          }
          @media (max-width: 479px) {
            .home-main {
              flex-direction: column;
            }
          }
        `}
      </style>
    </>
  )
}

export default Home
