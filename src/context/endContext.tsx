import  { createContext, useState, useContext, ReactNode } from "react";

interface ReportContextProps {
    isEnd : boolean,
    setIsEnd : any
}

const EndContext = createContext<ReportContextProps | undefined>(
    undefined
);

export const EndProvider = ({ children }: { children: ReactNode }) => {

    const [isEnd, setIsEnd] = useState(false);
    return (
        <EndContext.Provider
            value={{
               isEnd,
                setIsEnd
            }}
        >
            {children}
        </EndContext.Provider>
    );
};

export const useEnd = () => {
    const context = useContext(EndContext);
    if (!context) {
        throw new Error("useReport must be used within a ReportProvider");
    }
    return context;
};
