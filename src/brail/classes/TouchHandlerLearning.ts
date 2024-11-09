// TrainingLevelHandler.ts
import { BaseTouchHandler } from './BaseTouchHandler';
import { BrailleDigitRecognizer } from './brailleDigetRecognizer';
import { Player } from './player';


import endLearningMessage from "../../../public/sounds/Obuch_end.wav"//"../../assets/sounds/Obuch_end.wav"
type LevelCondition = {levelInstruct: string, levelExpect:number, mp3?:string}

export class TouchHandlerLearning extends BaseTouchHandler {
    private level: number;
    private attempts: number;
    private maxAttempts: number;
    private levelInstructions: LevelCondition[];

    private necessaryRef: HTMLElement;

    constructor(player: Player,digitRecognizer:BrailleDigitRecognizer, resultElement: HTMLElement, necessaryRef: HTMLElement , levelInstructions: LevelCondition[], maxAttempts = 4) {
        super(player, resultElement, digitRecognizer);
        this.necessaryRef = necessaryRef
        this.level = 1;
        this.attempts = 0;
        this.maxAttempts = maxAttempts;
        this.levelInstructions = levelInstructions;
    }

    protected showNecessaryNumber(message: string): void {
        if (this.necessaryRef)
            this.necessaryRef.textContent = message;
        else 
            console.log("result el not found")
    }

    public getMaxAttempts(): number {
        return this.maxAttempts;
    }

    public getCurrentttempts(): number {
        return this.maxAttempts;
    }

    public startLevel(): void {
        const levelCondition = this.getLevelCondition();
        let expectNumStr = levelCondition.levelExpect.toString();
        if (levelCondition.levelExpect ===-2 || levelCondition.levelExpect === -3 ){
            if (levelCondition.levelExpect === -2  ) expectNumStr = ("Удаление цифры");
            if (levelCondition.levelExpect === -3) expectNumStr = ("Ввод пин-кода");
        }
        this.showNecessaryNumber(expectNumStr)
        if (levelCondition.mp3)
            this.player.SayCustomMessage(levelCondition.mp3)
        else{
           // this.player.SayMessage(this.getInstruction());
            // Выполняем callback после задержки
        }
    }

    protected convertPoints(): void {
        const digit = this.digitRecognizer.recognizeDigit(this._points);
        super.convertPoints();
        this.attempts++;

        let uniqueDigit:number = -1; // -2 double tap, -3 long tap
        if (this.player.isDoubleTaped || this.player.isLongTaped) {
            console.log("base touch handler return");
            if (this.player.isDoubleTaped ) uniqueDigit = -2
            if (this.player.isLongTaped ) uniqueDigit = -3
            this._points = [];
            
        }

        const resDigit = uniqueDigit !== -1 ? uniqueDigit : digit;
        if (this.isLevelCompleted(resDigit)) {
            this.nextLevel();
        } else if (this.attempts === 2) {
            //this.player.SayMessage("Попробуйте еще раз, вот дополнительная инструкция...");
            console.log("Попробуйте еще раз, вот дополнительная инструкция...");
        } else if (this.attempts >= this.maxAttempts) {
            console.log("Попытки исчерпаны. Переходим к следующему уровню.");
            //this.player.SayMessage("Попытки исчерпаны. Переходим к следующему уровню.");
            this.player.PlayOnAttemptsZero()
            this.nextLevel();
        }
        this._points = [];
    }

   /* private getInstruction(): string {
        return this.levelInstructions[this.level - 1].levelInstruct;
    }*/

    private getExpectedNumber(): number {
        return this.levelInstructions[this.level - 1].levelExpect;
    }

    private getLevelCondition(): LevelCondition {
        return this.levelInstructions[this.level - 1];
    }

    private isLevelCompleted(digit:number | undefined): boolean {
        // Логика завершения уровня
        //return true; // Временное значение
        const expectedNumber = this.getExpectedNumber();
        if (digit){
            if (digit !== -2 && digit !== -3) this.showResult(digit.toString());
            else {
                if (this.player.isDoubleTaped ) this.showResult("Удаление цифры");
                if (this.player.isLongTaped ) this.showResult("Ввод пин-кода");
            }
        }
        if (expectedNumber === digit){
            this.player.PlaySuccess(digit);
            //this.player.stopMessages();
            return true;
        }
        this.player.PlayError();
        if (digit !== undefined && digit > 0){
            this.player.SayDigit(digit)
        }
        return false;
    }

    private nextLevel(): void {
        this.level++;
        this.attempts = 0;
        if (this.level <= this.levelInstructions.length) {
            this.startLevel();
        } else {
            this.player.SayCustomMessage(endLearningMessage);
        }
    }
}
