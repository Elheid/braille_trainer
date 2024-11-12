import { NavigateFunction } from "react-router-dom";

export const navigateHandleClick = (withBaseUrl: boolean, destination: string, navigate: NavigateFunction, fromStart?: boolean) => {
    // Перенаправляем пользователя на страницу с использованием categoryId
    const basePath = fromStart ? location.pathname : "" //+ '?';
    //const baseSearchPath = location.pathname + location.search;
    const currentPath = withBaseUrl ? basePath : "";
    const newPath = `${currentPath}${destination}`;
    navigate(newPath);
    // Здесь можно добавить дополнительную логику, если требуется
};

export const myFunctionWithDelay = (callback: () => void, delay: number) => {
    setTimeout(() => {
        callback(); // Выполняем callback после задержки
    }, delay);
}


export const sleep = (milliseconds: number) => {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


export const preloadSounds = (soundUrls: string[]) => {
    soundUrls.forEach(url => {
        const audio = new Audio(url);
        audio.preload = "auto";
    });
};
