import { Howl } from 'howler';


import succsesSound from "../../../public/sounds/success.mp3"//"../../assets/sounds/success.mp3"
import errorSound from  "../../../public/sounds/error.mp3"
import touchSound from  "../../../public/sounds/touch.mp3"
import { SayCustomMessages } from './SayCustomMessages';

import numberOneMP3 from  "../../../public/sounds/numbers/1.wav"
import numberTwoMP3 from  "../../../public/sounds/numbers/2.wav"
import numberThreeMP3 from  "../../../public/sounds/numbers/3.wav"



import succsesMessage from  "../../../public/sounds/Exellent.wav"


const numbersToSay: { [key: number]: string } = {
  1: numberOneMP3,
  2: numberTwoMP3,
  3:numberThreeMP3,
};

export class Player {
  private _speechEnabled: boolean;
  private touch?: Howl;

  

  private customMessagePlayer: SayCustomMessages;

  private _synth: SpeechSynthesis;
  private voice?: SpeechSynthesisVoice;
  private lang: string;

  constructor(speechEnabled: boolean, customMessagesPlayer:SayCustomMessages) {
    this._speechEnabled = speechEnabled;
    this.customMessagePlayer = customMessagesPlayer//new SayCustomMessages();

    this._synth = window.speechSynthesis;
    this.lang = 'ru-RU';
    this._synth.onvoiceschanged = () => this._setVoice();
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
    else
      this.SayMessage(digit.toString());
  }

  private async playSuccessSounds(digit: number):Promise<void>{
      await this.SayCustomMessage(succsesSound)
      await this.SayDigit(digit);
      //await this.SayCustomMessage(succsesSound)
      await this.SayCustomMessage(succsesMessage,()=>this.stopMessages())
  }

  public PlaySuccess(digit?: number): void {
    if (digit !== undefined){
      if (this._speechEnabled) {
        this.playSuccessSounds(digit);
      }
      else{
        this.SayCustomMessage(succsesMessage)
        this.SayCustomMessage(succsesSound, ()=>this.stopMessages())
      }
      //this.success.play();

      //this.stopMessages();
    }
  }

  public PlayError(): void {
    this.SayCustomMessage(errorSound,()=>this.stopMessages())
    //this.error.play();
  }
/*
  public SayCustomMessage(messageSrc: string): void {
    this.customMessage = new Howl({
      src: [messageSrc],
    });
    if (this._speechEnabled)
      this.customMessage.play();
  }*/


    public SayCustomMessage(messageSrc: string, callBack?:()=>void): void {
      if (this._speechEnabled)
        this.customMessagePlayer.sayMessage(messageSrc, callBack);
  }

  public stopMessages(): void {
      this.customMessagePlayer.stopMessages();
  }



  public SayMessage(message: string): void {
    if (!this._speechEnabled) return;

    const utter = new SpeechSynthesisUtterance(message);
    if (this.voice) {
      utter.voice = this.voice;
    }
    utter.lang = this.lang;
    this._synth.speak(utter);
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
