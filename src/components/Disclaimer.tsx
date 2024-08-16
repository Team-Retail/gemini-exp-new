
import cn from "../utils/cn";
import close from "../assets/magic-eraser/navigationCTAs.svg"
import arrow from "../assets/magic-eraser/arrow_forward.svg";
import {useEnd} from "../context/endContext.tsx";
import {useEffect, useState} from "react";
import TextTransition, { presets } from 'react-text-transition';
interface DisclaimerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isGreater: boolean;

}

export default function Disclaimer({ open, setOpen, isGreater }: DisclaimerProps) {
    const [isTaskOne, setIsTaskOne] = useState(true);
    const {isEnd} = useEnd();
    const TEXTS = ['Next Feature', 'Circle to Search'];
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            2500, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isTaskOne) {
                // Task 1
                console.log("Task 1 is running");
            } else {
                // Task 2
                console.log("Task 2 is running");
            }
            setIsTaskOne(prevIsTaskOne => !prevIsTaskOne);
        }, 2000); // Adjust the interval time as needed

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [isTaskOne]);
    return (
        <div className="w-full px-2 rounded-b-[24px]">
            {/*<div className="mt-[4vh] mb-[1vh]  flex items-center  justify-center">*/}
            {/*    <div className="flex-grow h-[0.28vh]  bg-[#3C4043]    mr-2"></div>*/}
            {/*    <div className="flex-grow  h-[0.28vh]  bg-[#3C4043]   mr-2"></div>*/}
            {/*    <div className="flex-grow h-[0.28vh]  bg-[#3C4043]  mr-2"></div>*/}
            {/*    <div className="flex-grow  h-[0.28vh]  bg-[#3C4043]  mr-2"></div>*/}
            {/*    <div className="flex-grow  h-[0.28vh]  bg-[#3C4043]  mr-2"></div>*/}
            {/*    <div className="flex-grow   h-[0.28vh]  bg-[#3C4043] mr-2"></div>*/}
            {/*</div>*/}
            {isEnd ? <div className="mb-[4vh] flex items-center justify-around font-google-sans-regular">
                <div
                    className="text-white  border border-white text-[0.7rem] rounded-full px-3 cursor-pointer py-2">
                    Learn More
                </div>
                <div className="bg-[#0138F4]  rounded-full px-3 cursor-pointer py-2 text-white flex items-center">
                    <TextTransition springConfig={presets.wobbly} className="text-[0.7rem]">{TEXTS[index % TEXTS.length]}</TextTransition>
                    <img src={arrow} alt="arrow" className="h-2 w-2 ml-[0.5vw] inline"/>
                </div>

            </div> : <></>}


            <div className="flex justify-between">
                <div
                    className="text-left font-google-sans-regular border-b border-[#DADCE0]   text-[#DADCE0] tex cursor-pointer text-[11px] inline text-xs"
                    onClick={() => {
                        setOpen((prev) => !prev);
                    }}>
                    Disclaimer
                </div>

            </div>

            {/*<div className={cn("flex w-full justify-between text-xs text-white", isGreater && "text-[2vw]")}>*/}
            {/*    <span className="">Screen images simulated.</span>*/}
            {/*    <button className={"underline "} onClick={() => setOpen(prev => !prev)}>Disclaimer</button>*/}
            {/*</div>*/}
            <div onClick={() => setOpen(false)}
                 className={`absolute bg-slate-500/30 inset-0 ${!open && "hidden"} `}></div>
            <div
                className={`absolute z-10 left-0 bottom-0 w-full bg-[#2B2E30] p-4 text-white rounded-t-2xl  shadow-lg transition-transform duration-300 ${open ? 'translate-y-0' : 'translate-y-full'} ${isGreater && "p-10"}`}>
                <div className="flex justify-between items-center">
                    <h2 className={cn("font-google-sans ", isGreater && "text-[3.5vw]")}>Disclaimer</h2>
                    <button onClick={() => setOpen(false)} className="text-black font-bold">
                       <img src={close} alt="closeButton" className={cn("w-7 h-7 hover:text-slate-700 text-slate-900", isGreater && "scale-150")} />
                    </button>
                </div>
                <div className={cn("mt-3 mb-2 text-xs text-white font-google-sans-regular", isGreater && "text-[2vw]")}>
                    <sup className="text-white">1</sup>
                    1 Gemini mobile app available on select devices, languages, and countries. Internet connection required. Check responses for accuracy.
                    2 Results for illustrative purposes. Check responses for accuracy. Available in select countries and languages.
                </div>
            </div>
        </div>
    );
}
