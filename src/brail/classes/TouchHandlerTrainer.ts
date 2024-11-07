import { BaseTouchHandler } from './BaseTouchHandler';
import { BrailleDigitRecognizer } from './brailleDigetRecognizer';
import { Player } from './player';



export class TouchHandlerTrainer extends BaseTouchHandler {
    private _errorMessage: string;

    constructor(player: Player, resultElement: HTMLElement, digitRecognizer:BrailleDigitRecognizer,) {
        super(player, resultElement, digitRecognizer); // Инициализация базового класса
        this._errorMessage = 'Ошибка! Не удалось распознать комбинацию точек.';
    }

    // Метод convertPoints переопределяется для реализации распознавания
    protected convertPoints(): void {
        super.convertPoints();
        const digit = this.digitRecognizer.recognizeDigit(this._points);
       /* if (this.digitRecognizer.isGestureHandled && digit === undefined){
            this._points = [];
            return
        }*/

        if (digit === undefined || digit < 0) {
            this.player.PlayError();
            this.showResult(this._errorMessage);
        } else {
            this.player.PlaySuccess(digit);
            this.showResult(digit.toString());
        }

        this._points = [];
    }
}