// BaseTouchHandler.ts
import { BrailleDigitRecognizer } from './brailleDigetRecognizer';
import { Player } from '../player';

interface Point {
    x: number;
    y: number;
}

export class BaseTouchHandler {
    protected resultElement: HTMLElement;

    protected player: Player;
    protected _points: Point[] = [];
    protected _timerId: ReturnType<typeof setTimeout> | null = null;
    protected _period = 1510; // время в миллисекундах

    protected digitRecognizer:BrailleDigitRecognizer;// = new BrailleDigitRecognizer();


    constructor(player: Player,  resultElement: HTMLElement, digitRecognizer:BrailleDigitRecognizer) {
        this.player = player;

        this.resultElement = resultElement;

        this.digitRecognizer = digitRecognizer

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
    }

    public ProcessNumAndGest(digit:number | undefined):number{
        //console.log(digit)
        if (digit || digit === 0){
            if(digit !== -1){
                let uniqueDigit:number = -1; // -2 double tap, -3 long tap
                if (this.player.isDoubleTaped || this.player.isLongTaped) {
                    //console.log("base touch handler return");
                    if (this.player.isDoubleTaped ) uniqueDigit = -2
                    if (this.player.isLongTaped ) uniqueDigit = -3
                    //this._points = [];
                    
                }
        
                return  uniqueDigit !== -1 ? uniqueDigit : digit;
            }
            return digit;
        }
        return -1;
    }


    public addMessageInRef(ref:HTMLElement, message:string){
        const existingContent = ref.textContent;
        if (existingContent){
            const index = existingContent.indexOf(' ');

            if (index !== -1) {
            // Если '-' уже есть, заменяем подстроку после него
            ref.textContent = existingContent.substring(0, index + 1)  + message;
            } else {
            // Если '-' нет, добавляем в конец
            ref.textContent = existingContent + " " + message;
            }
        }
    }

    // Метод для отображения результата
    protected showResult(message: string): void {
        if (this.resultElement){

           // this.resultElement.textContent = message;
            this.addMessageInRef(this.resultElement, message)
        }
        else 
            console.log("result el not found")
    }
}
