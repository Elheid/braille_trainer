
import { sleep } from "../../components/utill";

const uniquePartSrcOfSounds = {
    exellent:"Exellent",
    description:"v1",
    secondDescription:"v2",
    numbder:"number_",
    success:"Positive",//"success",
    error:"Decline",//"error",
    end_learning:"Obuch_end",
    longTouch:"Pin_Success",
    doubleTouch:"Pull_to_refresh_1"
}

interface MyHowl{
    howl:Howl;
    skippable:boolean;
}
export class SayCustomMessages {
    private customMessage: Howl | null = null;
    private messageQueue: string[] = [];
    private isPlaying: boolean = false;
    //private sounds: Howl[] = []; // Массив для хранения экземпляров Howl
    private sounds2:MyHowl[] = [];

    private sleepAfterMessage = 180;



    public sayMessage(messageSrc: string, callBack?: () => void): void {
        this.messageQueue.push(messageSrc); // Добавьте сообщение в очередь


        //console.log("after add")
        //console.log(this.messageQueue);
        if (callBack) {
            //callBack();
            this.stopMessagesButNoSuccses();
        }

        const url = window.location.href;
        if( url.includes("training") || url.includes("learning")){
            if (!this.isPlaying) {
                this.playNextMessage();
            }
        }
    }

    private playNextMessage(): void {
        if (this.messageQueue.length === 0) {
            this.isPlaying = false;
            return;
        }

        this.isPlaying = true;
        const messageSrc = this.messageQueue.shift() as string;

        this.customMessage = new Howl({
            src: [messageSrc],
            onend: () => {
                this.playNextMessage();
            },
            onstop: () => {
                this.isPlaying = false;
            }
        });


        /*if (this.lastMessageSrc === messageSrc) {
            console.log(`Сообщение "${messageSrc}" совпадает с предыдущим. Пропускаем.`);
            return; // Если совпадает, пропускаем воспроизведение
        }*/

        //this.sayMessage(messageSrc); // Воспроизводим его
        //this.lastMessageSrc = messageSrc; // Обновляем предыдущий источник
        //this.sounds.push(this.customMessage); // Сохраняем экземпляр Howl

        const isSkippable = this.isSkippable([messageSrc]).length > 0 ? false : true;
        this.sounds2.push({howl:this.customMessage, skippable:isSkippable });
        if ((this.isDescriptionSrc(messageSrc) || this.isSecondDescriptionSrc(messageSrc)  || this.isEndMessage(messageSrc)) && this.customMessage !== null){
            const message = this.customMessage;
            sleep(this.sleepAfterMessage);
            //myFunctionWithDelay(()=> message.play(), 150)
            message.play()
        }
        else
            this.customMessage.play();


    }

    /*
    public sayMessage(messageSrc: string): void {
        // Проверяем, если сообщение уже в очереди
        /*if (!this.messageQueue.includes(messageSrc)) {
            this.addNewMessage(messageSrc)
        }
        else
            console.log(`Сообщение "${messageSrc}" уже в очереди.`);
            this.customMessage = new Howl({
                src: [messageSrc],
                onend: () => {
                    // Удалите сообщение из очереди после завершения воспроизведения
                    this.messageQueue.shift();
                    this.isPlaying = false; // Обновите состояние
                    this.processQueue(); // Попробуйте воспроизвести следующее сообщение
                },
            });
        
            this.messageQueue.push(messageSrc); // Добавьте сообщение в очередь
            this.sounds.push(this.customMessage); // Сохраняем экземпляр Howl
            
        if (!this.isPlaying) {
            this.customMessage?.play();
            this.isPlaying = true;
        }
    }*/

    /*private addNewMessage(messageSrc: string){
        this.customMessage = new Howl({
            src: [messageSrc],
            onend: () => {
                // Удалите сообщение из очереди после завершения воспроизведения
                this.messageQueue.shift();
                this.isPlaying = false; // Обновите состояние
                this.processQueue(); // Попробуйте воспроизвести следующее сообщение
            },
        });
    
        this.messageQueue.push(messageSrc); // Добавьте сообщение в очередь
        this.sounds.push(this.customMessage); // Сохраняем экземпляр Howl
    }*/

    public stopMessages(): void {
        this.messageQueue = []; // Очистка очереди
        //this.sounds.forEach(sound => sound.stop()); // Остановка всех звуков
        //this.sounds = []; // Очистка массива экземпляров

        this.sounds2.forEach(sound => {
            if (sound.skippable)
                sound.howl.stop()
        });
        this.sounds2 = this.sounds2.filter(el => !el.skippable);

        this.isPlaying = false;
    }

    public stopAllMessages(): void {
        this.messageQueue = []; // Очистка очереди
        //this.sounds.forEach(sound => sound.stop()); // Остановка всех звуков
        //this.sounds = []; // Очистка массива экземпляров

        this.sounds2.forEach(sound => sound.howl.stop());
        this.sounds2 = [];

        this.isPlaying = false;
    }


    /*private getSuccessInQue(){
        return this.messageQueue.filter((sound) => {
            return (
                sound === '/src/assets/sounds/Exellent.wav' ||
                sound === '/src/assets/sounds/success.mp3' ||
                /\/src\/assets\/sounds\/numbers\/[0-9]\.wav$/.test(sound) ||
                /\/src\/assets\/sounds\/numberDescription\/[0-9]v1\.wav$/.test(sound)
            );
        })
        .sort((a, b) => {
            // Перемещаем `numberDescription` файлы в конец
            if (/\/src\/assets\/sounds\/numberDescription\/[0-9]v1\.wav$/.test(a)) return 1;
            if (/\/src\/assets\/sounds\/numberDescription\/[0-9]v1\.wav$/.test(b)) return -1;
            return 0;
        });
    }*/

        private isEndMessage(sound:string){
            return sound.includes(uniquePartSrcOfSounds.end_learning);
        }


        private isNumSrc(sound:string){
            return (sound.includes(uniquePartSrcOfSounds.numbder) && !sound.includes(uniquePartSrcOfSounds.description))
        }

        private isDescriptionSrc(sound:string){
            return (sound.includes('1') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('2') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('3') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('4') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('5') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('6') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('7') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('8') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('9') && sound.includes(uniquePartSrcOfSounds.description)) ||
            (sound.includes('0') && sound.includes(uniquePartSrcOfSounds.description));
        }

        private isSecondDescriptionSrc(sound:string){
            return sound.includes(uniquePartSrcOfSounds.secondDescription);
        }



        private isSkippable(messageQueue:string[]){
            const res = messageQueue.filter((sound) => {
                const isExellent =  sound.includes(uniquePartSrcOfSounds.exellent);
                const isSuccess= sound.includes(uniquePartSrcOfSounds.success);
                const isError =  sound.includes(uniquePartSrcOfSounds.error);
                const isNum = this.isNumSrc(sound);
                const isEnd = sound.includes(uniquePartSrcOfSounds.end_learning);
                return (
                    isExellent||
                    isSuccess ||
                    isError ||
                    isNum ||
                    isEnd
                );
            });
            return res;
        }

        private filterSuccessSounds(messageQueue:string[]){
            const res = messageQueue.filter((sound) => {
                const isExellent =  sound.includes(uniquePartSrcOfSounds.exellent);
                const isSuccess= sound.includes(uniquePartSrcOfSounds.success);
                const isError =  sound.includes(uniquePartSrcOfSounds.error);
                const isNum = this.isNumSrc(sound);

                const isDouble = sound.includes(uniquePartSrcOfSounds.doubleTouch);
                const isLong = sound.includes(uniquePartSrcOfSounds.longTouch);
                
                const isDescription = this.isDescriptionSrc(sound);

                const isEnd = sound.includes(uniquePartSrcOfSounds.end_learning);
                return (
                    isExellent||
                    isSuccess ||
                    isError ||
                    isNum ||
                    isDescription ||
                    isEnd ||

                    isDouble ||
                    isLong
                );
            });
            return res;
        }

        private getSuccessInQue(messageQueue:string[]) {
            // Фильтруем звуки, оставляя только нужные
            const filteredSounds = this.filterSuccessSounds(messageQueue);
            
            const numberDescriptionSounds = filteredSounds
                .filter((sound) => {
                    const isDescription = this.isDescriptionSrc(sound);
                    return isDescription;
                })
                .reduce((maxStr, currentStr) => {
                    const regex = /(\d+)(?=\s*v1)/;
                    const currentMatch = currentStr.match(regex);
                    const currentNumber = currentMatch ? parseInt(currentMatch[1], 10) : -Infinity;
            
                    const maxMatch = maxStr.match(regex);
                    const maxNumber = maxMatch ? parseInt(maxMatch[1], 10) : -Infinity;
            
                    return currentNumber > maxNumber ? currentStr : maxStr;
                }, "");
            let maxNumberDescriptionSound : string = "";
            //if (numberDescriptionSounds.length !== 1)
                maxNumberDescriptionSound = numberDescriptionSounds; // Берем звук с наибольшим числом
        
            // Проверяем наличие `Obuch_end.wav`
            const obuchEndSound = filteredSounds.find(sound => sound.includes(uniquePartSrcOfSounds.end_learning));
        
            // Собираем окончательный массив, оставляя `numberDescription` и `Obuch_end` файлы в конце
            const resultSounds = filteredSounds
                .filter((sound) =>{
                    const isDescription = this.isDescriptionSrc(sound);

                    return !isDescription&&
                    !sound.includes(uniquePartSrcOfSounds.end_learning)
                }
                );
        
            // Добавляем `numberDescription` файл и `Obuch_end.wav` в конец, если они есть
            if (maxNumberDescriptionSound && maxNumberDescriptionSound !== "") resultSounds.push(maxNumberDescriptionSound);
            if (obuchEndSound) resultSounds.push(obuchEndSound);
        
            return resultSounds;
        }
        

    public stopMessagesButNoSuccses(): void {
        //this.messageQueue.splice(0, this.messageQueue.length - 3);
        // Регулярное выражение для фильтрации
        //const allowedPattern = /^\/src\/assets\/sounds\/(Exellent\.wav|success\.mp3|[0-9]\.wav)$/;

        // Фильтруем массив
        const filteredSounds = this.getSuccessInQue(this.messageQueue)
        this.messageQueue = filteredSounds;
        /*this.sounds.forEach(sound => {
            console.log("stop ", sound);
            sound.stop();
        }); // Остановка всех звуков*/
        const filterSkippable = this.sounds2.filter(el => !el.skippable);
        this.sounds2.forEach(sound => {
            if (sound.skippable)
                sound.howl.stop()
        });
        this.sounds2 = filterSkippable;

        //this.sounds = []; // Очистка массива экземпляров
        this.isPlaying = false;
    }


    // Метод для заглушки всех сообщений
    public muteMessages(): void {
        //this.sounds.forEach(sound => sound.mute(true)); // Заглушить все сообщения
        this.sounds2.forEach(sound => sound.howl.mute(true)); // Заглушить все сообщения
    }

    // Метод для снятия заглушки
    public unmuteMessages(): void {
        //this.sounds.forEach(sound => sound.mute(false)); // Снять заглушку с всех сообщений
        this.sounds2.forEach(sound => sound.howl.mute(false));
    }

    /*private processQueue(): void {
        if (this.messageQueue.length > 0) {
            const nextMessage = this.messageQueue[0]; // Получаем следующее сообщение
            this.sayMessage(nextMessage); // Воспроизводим его
        }
    }*/

    //private lastMessageSrc: string | null = null; // Сохраняем предыдущий источник сообщения

    /*private processQueue(): void {
        if (this.messageQueue.length > 0) {
            const nextMessage = this.messageQueue[0]; // Получаем следующее сообщение

            // Проверяем, совпадает ли следующее сообщение с предыдущим
            if (this.lastMessageSrc === nextMessage) {
                console.log(`Сообщение "${nextMessage}" совпадает с предыдущим. Пропускаем.`);
                return; // Если совпадает, пропускаем воспроизведение
            }

            this.sayMessage(nextMessage); // Воспроизводим его
            this.lastMessageSrc = nextMessage; // Обновляем предыдущий источник
        }
    }*/

}

