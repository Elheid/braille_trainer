/*
import { Howl } from 'howler';
export class SayCustomMessages {
    private messageQueue: string[] = [];
    private isPlaying: boolean = false;
    private currentHowl: Howl | null = null;

    private sounds: Howl[] = [];

    constructor(){
        console.log("Создан SayCustomMessages")
    }

    public getIsPlaing() : boolean{
        return this.isPlaying;
    }
    public sayMessage(messageSrc: string): void {
        this.messageQueue.push(messageSrc);
        console.log("after add")
        console.log(this.messageQueue);
        if (!this.isPlaying) {
            this.playNextMessage();
        }
    }

    private playNextMessage(): void {
        if (this.messageQueue.length === 0) {
            this.isPlaying = false;
            return;
        }

        this.isPlaying = true;
        const messageSrc = this.messageQueue.shift() as string;

        this.currentHowl = new Howl({
            src: [messageSrc],
            onend: () => {
                this.playNextMessage();
            },
            onstop: () => {
                this.isPlaying = false;
            }
        });

        this.currentHowl.play();
    }

    public stopMessages(): void {
        console.log("before clean")
        console.log(this.messageQueue);

        this.messageQueue = [];
        if (this.currentHowl) {
            this.currentHowl.stop();
        }
        this.isPlaying = false;
    }
}*/

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



    public sayMessage(messageSrc: string, callBack?: () => void): void {
        this.messageQueue.push(messageSrc); // Добавьте сообщение в очередь


        console.log("after add")
        console.log(this.messageQueue);
        if (callBack) {
            //callBack();
            this.stopMessagesButNoSuccses();
        }
        if (!this.isPlaying) {
            this.playNextMessage();
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


        if (this.lastMessageSrc === messageSrc) {
            console.log(`Сообщение "${messageSrc}" совпадает с предыдущим. Пропускаем.`);
            return; // Если совпадает, пропускаем воспроизведение
        }

        //this.sayMessage(messageSrc); // Воспроизводим его
        this.lastMessageSrc = messageSrc; // Обновляем предыдущий источник
        //this.sounds.push(this.customMessage); // Сохраняем экземпляр Howl

        const isSkippable = this.isSkippable([messageSrc]).length > 0 ? false : true;
        this.sounds2.push({howl:this.customMessage, skippable:isSkippable });
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

        private isNumSrc(sound:string){
            return (sound.includes('number_') && !sound.includes('v1'))
        }

        private isDescriptionSrc(sound:string){
            return (sound.includes('1') && sound.includes('v1')) ||
            (sound.includes('2') && sound.includes('v1')) ||
            (sound.includes('3') && sound.includes('v1')) ||
            (sound.includes('4') && sound.includes('v1')) ||
            (sound.includes('5') && sound.includes('v1')) ||
            (sound.includes('6') && sound.includes('v1')) ||
            (sound.includes('7') && sound.includes('v1')) ||
            (sound.includes('8') && sound.includes('v1')) ||
            (sound.includes('9') && sound.includes('v1')) ||
            (sound.includes('0') && sound.includes('v1'));
        }


        private isSkippable(messageQueue:string[]){
            const res = messageQueue.filter((sound) => {
                const isExellent =  sound.includes('Exellent');
                const isSuccess= sound.includes('/success');
                const isError =  sound.includes('error');
                const isNum = this.isNumSrc(sound);
                const isEnd = sound.includes('Obuch_end');
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
                const isExellent =  sound.includes('Exellent');
                const isSuccess= sound.includes('/success');
                const isError =  sound.includes('error');
                const isNum = this.isNumSrc(sound);

                const isDescription = this.isDescriptionSrc(sound);

                const isEnd = sound.includes('Obuch_end');
                return (
                    isExellent||
                    isSuccess ||
                    isError ||
                    isNum ||
                    isDescription ||
                    isEnd
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
                })///\/public\/sounds\/numberDescription\/[0-9]+v1\.wav$/.test(sound))
                .sort((a, b) => {
                    const matchA = a.match(/\/assets\/(\d+)v1/);
                    const numberA = matchA ? Number(matchA[1]) : -1;

                    const matchB = b.match(/\/assets\/(\d+)v1/);
                    const numberB = matchB ? Number(matchB[1]) : -1;

                    //const numberA = parseInt(a.match(/\/([0-9]+)v1\.wav$/)?.[1] || "0", 10);
                    //const numberB = parseInt(b.match(/\/([0-9]+)v1\.wav$/)?.[1] || "0", 10);
                    return numberB - numberA; 
                });
        
            const maxNumberDescriptionSound = numberDescriptionSounds[0]; // Берем звук с наибольшим числом
        
            // Проверяем наличие `Obuch_end.wav`
            const obuchEndSound = filteredSounds.find(sound => sound.includes('Obuch_end'));
        
            // Собираем окончательный массив, оставляя `numberDescription` и `Obuch_end` файлы в конце
            const resultSounds = filteredSounds
                .filter((sound) =>{
                    const isDescription = this.isDescriptionSrc(sound);

                    return !isDescription&&
                    !sound.includes('Obuch_end')
                }
                );
        
            // Добавляем `numberDescription` файл и `Obuch_end.wav` в конец, если они есть
            if (maxNumberDescriptionSound) resultSounds.push(maxNumberDescriptionSound);
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

    private lastMessageSrc: string | null = null; // Сохраняем предыдущий источник сообщения

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

