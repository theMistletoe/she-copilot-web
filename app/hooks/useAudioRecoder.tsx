import { useState, useEffect } from 'react';

type UseRecorderResult = {
  startRecording: () => void;
  stopRecording: () => void;
  recordedChunks: Blob[];
};

const useRecorder = (): UseRecorderResult => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);

        newMediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => prev.concat(event.data));
          }
        };
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return { startRecording, stopRecording, recordedChunks };
};

export default useRecorder;