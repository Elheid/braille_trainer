import { useEffect } from 'react';

const usePreloadSounds = () => {
    useEffect(() => {

        const soundModules = import.meta.glob('/public/sounds/**/*.{mp3,wav}');


        const soundUrls = Object.keys(soundModules);

        const preloadSounds = () => {
            soundUrls.forEach(url => {
                const audio = new Audio(url);
                audio.preload = "auto";
            });
        };

        if ('requestIdleCallback' in window) {

            (window).requestIdleCallback(preloadSounds);
        } else {

            setTimeout(preloadSounds, 1000);
        }
    }, []);
};

export default usePreloadSounds;
