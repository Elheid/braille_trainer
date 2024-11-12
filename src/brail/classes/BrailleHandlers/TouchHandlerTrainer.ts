import { BaseTouchHandler } from '../BrailleTouch/BaseTouchHandler';
import { BrailleDigitRecognizer } from '../BrailleTouch/brailleDigetRecognizer';
import { Player } from '../player';



export class TouchHandlerTrainer extends BaseTouchHandler {
    private _errorMessage: string;

    constructor(player: Player, resultElement: HTMLElement, digitRecognizer:BrailleDigitRecognizer) {
        super(player, resultElement, digitRecognizer); // Инициализация базового класса
        this._errorMessage = 'Ошибка! Не удалось распознать комбинацию точек.';
    }

    // Метод convertPoints переопределяется для реализации распознавания
    protected convertPoints(): void {
        super.convertPoints();

        if (this.player.isDoubleTaped || this.player.isLongTaped) {
            console.log("base touch handler return");
            if (this.player.isDoubleTaped ) this.showResult("Удаление цифры");
            if (this.player.isLongTaped ) this.showResult("Ввод пин-кода");
            //this._points = [];
            //return;
        }

        const digit = this.digitRecognizer.recognizeDigit(this._points);

        const resDigit = this.ProcessNumAndGest(digit);

        if (resDigit === -1 || digit === undefined/*|| digit < 0*/) {
            this.player.PlayError();
            this.showResult(this._errorMessage);
        } else {
            this.player.PlaySuccess(resDigit);
            if (resDigit >= 0)
            this.showResult(resDigit.toString());
        }

        this._points = [];
    }
}