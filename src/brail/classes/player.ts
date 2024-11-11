import { Howl } from 'howler';




//import succsesSound from "../../../public/sounds/success.mp3"//"../../assets/sounds/success.mp3"
import succsesSound from "../../../public/sounds/Positive.mp3"
//import errorSound from  "../../../public/sounds/error.mp3"
import errorSound from  "../../../public/sounds/Decline.mp3"
//import touchSound from  "../../../public/sounds/touch.mp3"
import touchSound from  "../../../public/sounds/Dot.mp3"

import doubleTouchSound from  "../../../public/sounds/Pull_to_refresh_1.mp3"

import longTouchSound from  "../../../public/sounds/Pin_Success.mp3"


import nextNumSound from "../../../public/sounds/Next_num.wav"


import { SayCustomMessages } from './SayCustomMessages';


import numberOneMP3 from  "../../../public/sounds/numbers/number_1.wav"
import numberTwoMP3 from  "../../../public/sounds/numbers/number_2.wav"
import numberThreeMP3 from  "../../../public/sounds/numbers/number_3.wav"

import numberFourMP3 from  "../../../public/sounds/numbers/number_4.wav"
import numberFiveMP3 from  "../../../public/sounds/numbers/number_5.wav"
import numberSixMP3 from  "../../../public/sounds/numbers/number_6.wav"

import numberSevenMP3 from  "../../../public/sounds/numbers/number_7.wav"
import numberEightMP3 from  "../../../public/sounds/numbers/number_8.wav"
import numberNineMP3 from  "../../../public/sounds/numbers/number_9.wav"

import numberZeroMP3 from  "../../../public/sounds/numbers/number_0.wav"

import succsesMessage from  "../../../public/sounds/Exellent.wav"
import { TouchHandlerType } from '../../types/TouchHandlerType';



const numbersToSay: { [key: number]: string } = {
  1: numberOneMP3,
  2: numberTwoMP3,
  3:numberThreeMP3,

  4: numberFourMP3,
  5: numberFiveMP3,
  6:numberSixMP3,

  7: numberSevenMP3,
  8: numberEightMP3,
  9:numberNineMP3,

  0:numberZeroMP3,
};

export class Player {
  private _speechEnabled: boolean;
  private touch?: Howl;

  

  private customMessagePlayer: SayCustomMessages;
  typeOfTouchHandler:TouchHandlerType;

  private _synth: SpeechSynthesis;
  private voice?: SpeechSynthesisVoice;
  private lang: string;


  public isDoubleTaped = false;
  public isLongTaped = false;



  constructor(speechEnabled: boolean, customMessagesPlayer:SayCustomMessages, typeOfTouchHandler:TouchHandlerType) {
    this._speechEnabled = speechEnabled;
    this.customMessagePlayer = customMessagesPlayer//new SayCustomMessages();

    this._synth = window.speechSynthesis;
    this.lang = 'ru-RU';
    this._synth.onvoiceschanged = () => this._setVoice();

    this.typeOfTouchHandler = typeOfTouchHandler;
  }

  public PlayTouch(): void {
    this.touch = new Howl({
      src: [touchSound],
    });
    this.touch.play();
    console.log('touch');
  }

  public SayDigit(digit: number):void{
    if (numbersToSay[digit]){
      this.SayCustomMessage(numbersToSay[digit])
    }

  }
  
  public PlayLongTouch():void{
    this.SayCustomMessage(longTouchSound, ()=>this.stopMessages())
  }
  public PlayDoubleTouch():void{
    this.SayCustomMessage(doubleTouchSound, ()=>this.stopMessages())
  }

  private async playSuccessSounds(digit: number):Promise<void>{
    if (this.typeOfTouchHandler === TouchHandlerType.LEARNING){
      await this.SayCustomMessage(succsesSound)
      await this.SayDigit(digit);
      //await this.SayCustomMessage(succsesSound)
      await this.SayCustomMessage(succsesMessage,()=>this.stopMessages())
    }
    else{
      await this.SayCustomMessage(succsesSound, ()=>this.stopMessages())
      await this.SayDigit(digit);

    }
  }

  public PlaySuccess(digit?: number): void {
    if (digit !== undefined){
      if (this._speechEnabled) {
        this.playSuccessSounds(digit);
      }

    }
  }

  public PlayError(): void {
    //this.SayCustomMessage(errorSound,()=>this.stopMessages())
    this.SayCustomMessage(errorSound,()=>this.stopMessages())
    //this.error.play();
  }

  public PlayOnAttemptsZero(): void {
    //this.SayCustomMessage(errorSound,()=>this.stopMessages())
    this.SayCustomMessage(nextNumSound)
    //this.error.play();
  }


    public SayCustomMessage(messageSrc: string, callBack?:()=>void): void {
      if (this._speechEnabled)
        this.customMessagePlayer.sayMessage(messageSrc, callBack);
    }

  public stopMessages(): void {
      this.customMessagePlayer.stopMessages();
  }



  private _setVoice(): void {
    const voices = this._synth.getVoices();
    this.voice = voices.find((v) => v.lang.startsWith('ru'));
    console.log(`Number of voices: ${voices.length}`);
    if (this.voice) {
      console.log(`Selected voice: ${this.voice.name}`);
    } else {
      console.log(`Voice for language ${this.lang} not found`);
    }
  }
}
