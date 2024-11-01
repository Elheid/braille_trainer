// BaseTouchHandler.ts
import { Player } from './player';

interface Point {
    x: number;
    y: number;
}


export class BaseTouchHandler {
    protected resultElement: HTMLElement;

    protected player: Player;
    protected _points: Point[] = [];
    protected _timerId: ReturnType<typeof setTimeout> | null = null;
    protected _period = 1000; // время в миллисекундах

    constructor(player: Player,  resultElement: HTMLElement) {
        this.player = player;

        this.resultElement = resultElement;

        this.Handle = this.Handle.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        
    }

    public Handle(event: TouchEvent): void {
        event.preventDefault();
        this.resetTimer();
        this.player.PlayTouch();

        const point: Point = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };

        this._points.push(point);
        this._timerId = this.startTimer();
    }

    protected startTimer = (): ReturnType<typeof setTimeout> =>
        setTimeout(() => this.convertPoints(), this._period);

    protected resetTimer = (): void => {
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
    };

    protected convertPoints(): void {
        // Обработка точки для распознавания цифр
        console.log("Конвертация точек для распознавания");
    }


    // Метод для отображения результата
    protected showResult(message: string): void {
        if (this.resultElement)
            this.resultElement.textContent = message;
        else 
            console.log("result el not found")
    }

}
