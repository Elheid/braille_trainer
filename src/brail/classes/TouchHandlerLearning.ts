// TrainingLevelHandler.ts
import { BaseTouchHandler } from './BaseTouchHandler';
import { BrailleDigitRecognizer } from './brailleDigetRecognizer';
import { Player } from './player';


import endLearningMessage from "../../assets/sounds/Obuch_end.wav"

type LevelCondition = {levelInstruct: string, levelExpect:number, mp3?:string}


const levelInstructionsTest = [
    {levelInstruct:"Для первого уровня, распознайте цифру 1", levelExpect: 1},
    {levelInstruct:"Для второго уровня, распознайте цифру 2",  levelExpect: 2},
    // Добавьте инструкции для всех 10 уровней
]

export class TouchHandlerLearning extends BaseTouchHandler {
    private level: number;
    private attempts: number;
    private maxAttempts: number;
    private levelInstructions: LevelCondition[];

    constructor(player: Player, levelInstructions = levelInstructionsTest, maxAttempts = 4) {
        super(player);
        this.level = 1;
        this.attempts = 0;
        this.maxAttempts = maxAttempts;
        this.levelInstructions = levelInstructions;
    }

    public startLevel(): void {
        const levelCondition = this.getLevelCondition();
        if (!levelCondition.mp3)
            this.player.SayMessage(this.getInstruction());
        else
            this.player.SayCustomMessage(levelCondition.mp3)
    }

    protected convertPoints(): void {
        const digitRecognizer = new BrailleDigitRecognizer();
        const digit = digitRecognizer.recognizeDigit(this._points);

        //super.convertPoints();
        this.attempts++;

        
        if (this.isLevelCompleted(digit)) {
            this.nextLevel();
        } else if (this.attempts === 2) {
            this.player.SayMessage("Попробуйте еще раз, вот дополнительная инструкция... Пока нету lol");
        } else if (this.attempts >= this.maxAttempts) {
            this.player.SayMessage("Попытки исчерпаны. Переходим к следующему уровню.");
            this.nextLevel();
        }
        this._points = [];
    }

    private getInstruction(): string {
        return this.levelInstructions[this.level - 1].levelInstruct;
    }

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
