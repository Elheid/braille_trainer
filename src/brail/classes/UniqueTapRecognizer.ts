import { Component } from 'react';

type TapEvent = {
    type: 'doubleTap' | 'longTap' | 'tap';
    position: { x: number; y: number };
};

type TapRecognizerProps = {
    onTap: (event: TapEvent) => void;
    doubleTapThreshold?: number;
    longTapThreshold?: number;
    doubleTapDistanceThreshold?: number;
};

class UniqueTapRecognizer extends Component<TapRecognizerProps> {
    private lastTapTime: number | null = null;
    private lastTapPosition: { x: number; y: number } | null = null;
    private longTapTimer: ReturnType<typeof setTimeout> | null = null;
    private lastTapType: 'doubleTap' | 'longTap' | 'tap' | null = null;

    static defaultProps = {
        doubleTapThreshold: 300,
        longTapThreshold: 500,
        doubleTapDistanceThreshold: 30
    };

    calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    handleTouchStart = (event: TouchEvent) => {
        const { clientX, clientY } = event.touches[0];
        const now = Date.now();
        const { onTap, doubleTapThreshold, doubleTapDistanceThreshold, longTapThreshold } = this.props;

        if (this.lastTapTime && now - this.lastTapTime <= doubleTapThreshold!) {
            // Проверка на близость двух тапов
            if (
                this.lastTapPosition &&
                this.calculateDistance(this.lastTapPosition.x, this.lastTapPosition.y, clientX, clientY) <= doubleTapDistanceThreshold!
            ) {
                // Двойной тап
                this.lastTapType = 'doubleTap';
                onTap({ type: 'doubleTap', position: { x: clientX, y: clientY } });
            }
        } else {
            // Просто одиночный тап, отслеживаем долгий тап
            this.lastTapType = 'tap'; // Сразу помечаем как одиночный тап
            this.longTapTimer = setTimeout(() => {
                this.lastTapType = 'longTap';
                onTap({ type: 'longTap', position: { x: clientX, y: clientY } });
            }, longTapThreshold!);
        }

        this.lastTapTime = now;
        this.lastTapPosition = { x: clientX, y: clientY };
    };

    handleTouchEnd = () => {
        if (this.longTapTimer) {
            clearTimeout(this.longTapTimer); // Очищаем таймер долгого тапа
            this.longTapTimer = null;
        }
    };

    handleTouchCancel = () => {
        if (this.longTapTimer) {
            clearTimeout(this.longTapTimer);
            this.longTapTimer = null;
        }
    };

    componentDidMount() {
        // Добавляем события нажатия
        window.addEventListener('touchstart', this.handleTouchStart);
        window.addEventListener('touchend', this.handleTouchEnd);
        window.addEventListener('touchcancel', this.handleTouchCancel);
    }

    componentWillUnmount() {
        // Убираем события нажатия
        window.removeEventListener('touchstart', this.handleTouchStart);
        window.removeEventListener('touchend', this.handleTouchEnd);
        window.removeEventListener('touchcancel', this.handleTouchCancel);
    }

    // Метод для получения типа последнего тапа
    getLastTapType(): 'doubleTap' | 'longTap' | 'tap' | null {
        return this.lastTapType;
    }

    render() {
        return null; // Класс не рендерит компонент
    }
}

export default UniqueTapRecognizer;
