"use client";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Home() {
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
    };
  };

  return (
    <>
        <div>Microphone: {listening ? 'on' : 'off'}</div>
        <button onClick={handleSend}>sendGET</button>
        <button onClick={handleStart}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <div>{transcript}</div>
    </>
  )
}
