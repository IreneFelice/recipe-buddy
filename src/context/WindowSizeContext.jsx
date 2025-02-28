import {useEffect, useState, createContext} from 'react';

export const WindowSizeContext = createContext({});

function WindowSizeContextProvider ({children}) {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowSizeContext.Provider value={{isMobile: isMobile}}>
            {children}
        </WindowSizeContext.Provider>
    );
}

export default WindowSizeContextProvider;