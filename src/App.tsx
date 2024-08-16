import { useEffect, useRef, useState } from "react";
import VideoComponent2 from "./components/VideoComponent2";

// import LoadingScreen from "./components/LoadingScreen";
// import cn from "./utils/cn";
import axios from "axios";
import { TRIGGER_TYPE } from "./utils/trigger";
import { v4 as uuidv4 } from "uuid";
// import backArrow from "./assets/backArrow.svg";
import { EndProvider } from "./context/endContext.tsx";
import "./index.css";
import video1 from "./assets/gemini/vid_1.mp4";
import video2 from "./assets/gemini/vid_2.mp4";
import video3 from "./assets/gemini/vid_3.mp4";

const assets = [video1, video2, video3];
type AssetType = {
  [key: number]: string;
};

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  //const [open, setOpen] = useState<boolean>(false);
  //const [isGreater, setIsGreater] = useState(false);
  const [loadedAssets, setLoadedAssets] = useState<AssetType>({});
  const isGreaterRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  // const buttonRef = useRef<HTMLButtonElement>(null);
  const googleRef = useRef<HTMLImageElement>(null);
  const timeSpentRef = useRef<number | null>(null);
  const uuidRef = useRef<string>(uuidv4());

  const handleAnalytics = (type: string) => {
    const newTimestamp = Date.now();
    let timeSpent = null;
    if (timeSpentRef.current !== null) {
      timeSpent = (newTimestamp - timeSpentRef.current) / 1000; // time spent in seconds
    }
    timeSpentRef.current = newTimestamp;
    axios.post("https://c2sanalytics-ahvbc6mj5q-uc.a.run.app/api/log", {
      type,
      timeSpent,
      session: uuidRef.current,
      feature: "CircleToSearch",
    });
  };

  useEffect(() => {
    handleAnalytics(TRIGGER_TYPE.ENTER);

    const loadAsset = async (src: string): Promise<string> => {
      const response = await fetch(src);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return objectURL;
    };

    const loadAssets = async () => {
      for (const [index, asset] of assets.entries()) {
        const src = await loadAsset(asset);
        setLoadedAssets((prev) => ({
          ...prev,
          [index]: src,
        }));
      }
    };

    loadAssets().then((res) => {
      console.log(res);
    });

    const handleResize = () => {
      const maxRetries = 10;
      let retryCount = 0;

      if (
        containerRef.current &&
        canvasRef.current &&
        // buttonRef.current &&
        googleRef.current
      ) {
        if (
          canvasRef.current.clientHeight * 0.5625 >
          containerRef.current.clientWidth
        ) {
          canvasRef.current.style.height = `${canvasRef.current.offsetWidth / 0.5625
            }px`;
        } else {
          canvasRef.current.style.height = `${window.innerHeight * 0.8}px`;
          canvasRef.current.style.width = `${window.innerHeight * 0.45}px`;
          if (window.innerHeight < 800) {
            googleRef.current.style.width = `300px`;
            containerRef.current.style.gap = "20px";
          }
          if (window.innerHeight < 800) {
            // buttonRef.current.style.paddingTop = `4px`;
            // buttonRef.current.style.paddingBottom = `4px`;
            // buttonRef.current.style.paddingLeft = `8px`;
            // buttonRef.current.style.paddingRight = `8px`;
            // googleRef.current.style.width = `600px`;
            // containerRef.current.style.gap = "20px";
          }
        }

        if (canvasRef.current.offsetWidth > 800 && !isGreaterRef.current) {
          //setIsGreater(true);
          isGreaterRef.current = true;
        }
        if (canvasRef.current.offsetWidth < 800 && isGreaterRef.current) {
          //setIsGreater(false);
          isGreaterRef.current = false;
        }
      } else if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(handleResize, 1);
      }
    };

    handleResize(); // Initialize canvas height
    window.addEventListener("resize", handleResize);

    const handleBeforeUnload = () => {
      const url = "https://c2sanalytics-ahvbc6mj5q-uc.a.run.app/api/log";
      let timeSpent = null;
      const newTimestamp = Date.now();

      if (timeSpentRef.current !== null) {
        timeSpent = (newTimestamp - timeSpentRef.current) / 1000; // time spent in seconds
      }
      timeSpentRef.current = newTimestamp;

      const data = JSON.stringify({
        type: TRIGGER_TYPE.EXIT,
        timeSpent,
        session: uuidRef.current,
        feature: "CircleToSearch",
      });

      navigator.sendBeacon(url, data);
    };

    window.addEventListener("unload", handleBeforeUnload, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("unload", handleBeforeUnload, true);
    };
  }, []);

  const len = Object.keys(loadedAssets).length;
  const loaded = len / assets.length === 1;
  // const progress = len / assets.length;

  return (
    <EndProvider>
      <div className="unity-canvas">
        {loaded ? (
          <div
            ref={containerRef}
            className="unity-canvas font-google-sans-regular w-screen h-screen px-5 box-border flex flex-col justify-center items-center gap-7  py-5"
          >
            <div
              className=" unity-canvas box-border relative max-w-full flex justify-center items-center overflow-hidden mx-auto aspect-ratio-16/9 h-[80vh] w-[36vh]"
              ref={canvasRef}
            >


              {/*{<LoadingScreen progress={progress * 100}/>}*/}
              <div className=" relative w-full font-google-sans-regular unity-canvas bg-black h-full justify-between flex flex-col items-center  transition-opacity ease-in-out duration-500">
                <div className="unity-canvas w-full h-full z-10 absolute text-white top-0 bottom-0 ">
                  <VideoComponent2 src={loadedAssets} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </EndProvider>
  );
}

export default App;
