import { useEffect, useRef, useState } from "react";
import "../index.css";

import Disclaimer from "./Disclaimer.tsx";
// @ts-ignore
const VideoComponent2 = ({ src }) => {
  const [firstOverlay, setFirstOverlay] = useState(true);
  const [secondOverlay, setSecondOverlay] = useState(false);
  const [thirdOverlay, setThirdOverlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isVideoEnded2, setIsVideoEnded2] = useState(false);
  const [disclaimerShown, setDisclaimerShown] = useState(false);

  //const [isVideoEnded3, setIsVideoEnded3] = useState(false);


  useEffect(() => {
    const handleVideoEnd = () => {
      setTimeout(() => {
        setIsVideoEnded(true);
      }, 500);
    };

    const videoElement = videoRef.current;

    // Add event listener when the component mounts
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup event listener when the component unmounts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  useEffect(() => {
    if (secondOverlay && videoRef2.current) {
      videoRef2.current.play();
    }
    const handleVideoEnd = () => {
      setIsVideoEnded2(true);
    };

    const videoElement = videoRef2.current;

    // Add event listener when the component mounts
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup event listener when the component unmounts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [secondOverlay]);
  useEffect(() => {
    if (thirdOverlay && videoRef3.current) {
      videoRef3.current.play();
    }
    const handleVideoEnd = () => {
      //setIsVideoEnded3(true);
      //   setThirdOverlay(false);
      //   setFourthOverlay(true);
    };

    const videoElement = videoRef3.current;

    // Add event listener when the component mounts
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Cleanup event listener when the component unmounts
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [thirdOverlay]);

  const handleDisclaimer = () => {
    setDisclaimerShown(!disclaimerShown);
  }

  return (
    <>

      <div
        className={`${firstOverlay ? "opacity-100" : "opacity-0 hidden"
          } unity-canvas h-full w-full relative`}
      >
        <div className="w-full h-full  text-white  z-20 relative">
          <video
            muted
            autoPlay
            ref={videoRef}
            controls={false}
            className={` h-full  rounded-xl z-20 `}
          >
            <source src={src[0]} type="video/mp4" />
          </video>
          <div className="absolute bottom-0">
            <div className={` w-72 h-5`} onClick={handleDisclaimer}>
              {
                disclaimerShown ? <div>
                  <Disclaimer open={true} setOpen={function (): void {
                    throw new Error("Function not implemented.");
                  }} isGreater={false} />
                </div> : <div></div>
              }
            </div>
          </div>
        </div>
        {isVideoEnded && (
          <button
            className="absolute bottom-[116px] left-[108px] bg-[#0138F4] text-white  rounded-full text-xs font-medium mx-auto p-3.5  z-20 opacity-0"
            onClick={() => {
              //   console.log("clicked");
              setSecondOverlay(true);
              setFirstOverlay(false);
            }}
          >
            Ask Gemini
          </button>
        )}
      </div>
      <div
        className={`${secondOverlay ? "opacity-100" : "opacity-0 hidden"
          } unity-canvas h-full w-full relative`}
      >
        <div className="w-full h-full  text-white  z-20 relative">
          <video
            muted
            ref={videoRef2}
            controls={false}
            className={` h-full  rounded-xl z-20 ${isVideoEnded ? "opacity-100" : "opacity-0 hidden"
              } ease-out duration-300 `}
          >
            <source src={src[1]} type="video/mp4" />
          </video>
          <div className="absolute bottom-0">
            <div className={` w-72 h-5`} onClick={handleDisclaimer}>
              {
                disclaimerShown ? <div>
                  <Disclaimer open={true} setOpen={function (): void {
                    throw new Error("Function not implemented.");
                  }} isGreater={false} />
                </div> : <div></div>
              }
            </div>
          </div>
          {isVideoEnded2 && (
            <div
              className="absolute bottom-[112px] right-[35px] z-20"
              onClick={() => {
                setThirdOverlay(true);
                setSecondOverlay(false);
              }}
            >
              <button className="text-black rounded-full  text-xs bg-[#A3C2FF] w-9 h-9 z-20 opacity-0"></button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${thirdOverlay ? "opacity-100" : "opacity-0 hidden"
          } unity-canvas h-full w-full relative`}
      >
        <div className="w-full h-full  text-white relative z-20">
          <video
            muted
            ref={videoRef3}
            controls={false}
            className={` h-full  rounded-xl z-20 `}
          >
            <source src={src[2]} type="video/mp4" />
          </video>
          <div className="absolute bottom-0">
            <div className={` w-72 h-5`} onClick={handleDisclaimer}>
              {
                disclaimerShown ? <div>
                  <Disclaimer open={true} setOpen={function (): void {
                    throw new Error("Function not implemented.");
                  }} isGreater={false} />
                </div> : <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoComponent2;
