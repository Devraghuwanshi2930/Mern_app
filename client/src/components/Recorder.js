import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Recording() {
  const [popup, setpopup] = useState(false);
  const videoRecorder = useReactMediaRecorder({ video: true, audio: true });
  const screenRecorder = useReactMediaRecorder({ screen: true });
  
  
  const [Mediaurl, setMediaurl] = useState("");

  const [choice, setchoice] = useState("");


  
  
  const recordscreen = () => {
    setchoice("screen");
    screenRecorder.startRecording();
  };
  const recordvideo = () => {
    setchoice("video");
    videoRecorder.startRecording();
  };

  const stopRecording = () => {
    if (choice === "video") {
      videoRecorder.stopRecording();
      setMediaurl(videoRecorder.mediaBlobUrl);
    } else if (choice === "screen") {
      screenRecorder.stopRecording();
      setMediaurl(screenRecorder.mediaBlobUrl);
    }
    setpopup(true);
  };

  const status =
    choice === "video"
      ? videoRecorder.status
      : choice === "screen"
        ? screenRecorder.status
        : "idle";

  const closePopup = () => {
    setpopup(false);
  };


  return (
    <div className="btn-record-division">
      {status === "idle" || status === "stopped" ? (
        <>
          <button className="recording-btn" onClick={recordvideo}>
            <span>Start Video Recording</span>

          </button>

          <button className="recording-btn" onClick={recordscreen}>
            <span>Start Screen Recording</span>

          </button>
        </>
      ) : (
        <>
          <button className="recording-btn" onClick={stopRecording}>
            <span>Stop Recording</span>

          </button>
        </>
      )}

      {popup && (
        <Popup
          open={popup}
          onClose={closePopup}
          modal
          closeOnDocumentClick
          margin={"10px"}
        >
          <div className="modal-content">
            <a className="download-href" href={Mediaurl} download="video.mp4">
              <button className="popup-btn">
                Download File

              </button>
            </a>
            <button className="popup-btn btn-close" onClick={closePopup}>
              <span>Back</span>

            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}

export default Recording;