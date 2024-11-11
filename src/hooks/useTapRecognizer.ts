import { useState, useEffect, useCallback } from 'react';
import { Player } from '../brail/classes/player';

type TapEvent = {
    type: 'doubleTap' | 'longTap' | 'tap';
    position: { x: number; y: number };
};

export const useTapRecognizer = (
    isStarted:boolean,
    player:Player,
    onTap: (event: TapEvent) => void,
    doubleTapThreshold = 2000,
    longTapThreshold = 500,
    doubleTapDistanceThreshold = 30, // Максимальное расстояние для двойного тапа,
) => {
    const [lastTapTime, setLastTapTime] = useState<number | null>(null);
    const [lastTapPosition, setLastTapPosition] = useState<{ x: number; y: number } | null>(null);
    const [longTapTimer, setLongTapTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const [isFirstMessageSkipped, setFirstMessageSkipped] = useState<boolean>(false);

    const isSkipScreenreeder = ()=> setFirstMessageSkipped(true)
    window.addEventListener("skip-start-message", isSkipScreenreeder)
    const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const handleTouchStart = useCallback(
        (event: TouchEvent) => {
            if (isFirstMessageSkipped){
                const { clientX, clientY } = event.touches[0];
            const now = Date.now();


            player.isDoubleTaped = false;
            player.isLongTaped = false;

            if (lastTapTime && now - lastTapTime <= doubleTapThreshold) {
                // Проверка на близость двух тапов
                if (
                    lastTapPosition &&
                    calculateDistance(lastTapPosition.x, lastTapPosition.y, clientX, clientY) <= doubleTapDistanceThreshold
                ) {
                    // Двойной тап
                    onTap({ type: 'doubleTap', position: { x: clientX, y: clientY } });
                }
            } else {
                // Просто одиночный тап, отслеживаем долгий тап
                setLongTapTimer(
                    setTimeout(() => {
                        onTap({ type: 'longTap', position: { x: clientX, y: clientY } });
                    }, longTapThreshold)
                );
            }

            setLastTapTime(now);
            setLastTapPosition({ x: clientX, y: clientY });
            }
        },
        [lastTapTime, lastTapPosition, onTap, doubleTapThreshold, longTapThreshold, doubleTapDistanceThreshold]
    );

    const handleTouchEnd = useCallback(() => {
        if (longTapTimer) {
            clearTimeout(longTapTimer); // Очищаем таймер долгого тапа
            setLongTapTimer(null);
        }
    }, [longTapTimer]);

    // Сброс при уходе с элемента
    const handleTouchCancel = useCallback(() => {
        if (longTapTimer) {
            clearTimeout(longTapTimer);
            setLongTapTimer(null);
        }
    }, [longTapTimer]);

    useEffect(() => {
        if (isStarted){
        // Добавляем события нажатия
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('touchcancel', handleTouchCancel);
        }

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('touchcancel', handleTouchCancel);

            window.removeEventListener("skip-start-message", isSkipScreenreeder)

        };
    }, [handleTouchStart, handleTouchEnd, handleTouchCancel]);

    return null; // Хук не рендерит компонент
};
