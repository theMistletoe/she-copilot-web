"use client";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState<string | undefined>(undefined);

    const {
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition();

    const handleStart = () => {
        SpeechRecognition.startListening({
        continuous: true,
        language: 'ja-JP',
        });
    };

    const handleSend = async () => {
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
            .then((data) => console.log(data));
        } catch (err: any) {
            console.error(err);
            alert("エラーが発生しました。もう一度やり直してください。");
        } finally {
            setIsLoading(false);
        };
    };

    return (
        <main className='m-8'>
            <h1>ラバーダッキング</h1>
            <div className='flex'>
                <Image
                    src="/rubberduck.png"
                    alt="rubberduck"
                    width={400}
                    height={400}
                />
                <div className='my-auto'>
                    <h2>あなたのモヤモヤ悩んでいることを話してみて！</h2>
                    <p>※5分くらい思っていることをとにかく声に出してみよう。</p>
                    <button
                        className='bg-yellow-400 text-slate-50 font-bold p-4 rounded-lg mx-auto'
                        onClick={handleStart}
                    >
                        話してみる
                    </button>
                </div>
                {listening && (
                    <div className='my-auto bg-gray-100'>
                        <h2>あなたのモヤモヤ悩んでいることを話してみて！</h2>
                        {transcript ? (
                            <p className='my-4'>{transcript}</p>
                        ) : (
                            <p className='my-4 text-gray-400'>あなたが話し始めるのを待っています…</p>
                        )}
                        {transcript && (
                            <button
                                className='bg-yellow-400 text-slate-50 font-bold p-4 rounded-lg mx-auto'
                                onClick={handleSend}
                            >
                                話すのをやめる
                            </button>
                        )}
                    </div>
                )}
            </div>
            {/* <div>Microphone: {listening ? 'on' : 'off'}</div>
            <button onClick={handleSend}>sendGET</button>
            <button onClick={handleStart}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <div>{transcript}</div> */}
        </main>
    )
}
