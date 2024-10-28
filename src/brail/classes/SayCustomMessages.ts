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

export class SayCustomMessages {
    private customMessage: Howl | null = null;
    private messageQueue: string[] = [];
    private isPlaying: boolean = false;
    private sounds: Howl[] = []; // Массив для хранения экземпляров Howl




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
        this.sounds.push(this.customMessage); // Сохраняем экземпляр Howl
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
        this.sounds.forEach(sound => sound.stop()); // Остановка всех звуков
        this.sounds = []; // Очистка массива экземпляров
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

        private getSuccessInQue() {
            // Фильтруем звуки, оставляя только нужные
            const filteredSounds = this.messageQueue.filter((sound) => {
                return (
                    sound === '/src/assets/sounds/Exellent.wav' ||
                    sound === '/src/assets/sounds/success.mp3' ||
                    /\/src\/assets\/sounds\/numbers\/[0-9]\.wav$/.test(sound) ||
                    /\/src\/assets\/sounds\/numberDescription\/[0-9]+v1\.wav$/.test(sound) ||
                    sound === '/src/assets/sounds/Obuch_end.wav'
                );
            });
        
            // Обрабатываем звуки `numberDescription`, чтобы оставить только один с наибольшим числом перед `v1`
            const numberDescriptionSounds = filteredSounds
                .filter((sound) => /\/src\/assets\/sounds\/numberDescription\/[0-9]+v1\.wav$/.test(sound))
                .sort((a, b) => {
                    const numberA = parseInt(a.match(/\/([0-9]+)v1\.wav$/)?.[1] || "0", 10);
                    const numberB = parseInt(b.match(/\/([0-9]+)v1\.wav$/)?.[1] || "0", 10);
                    return numberB - numberA; // Сортируем по убыванию чисел
                });
        
            const maxNumberDescriptionSound = numberDescriptionSounds[0]; // Берем звук с наибольшим числом
        
            // Проверяем наличие `Obuch_end.wav`
            const obuchEndSound = filteredSounds.find(sound => sound === '/src/assets/sounds/Obuch_end.wav');
        
            // Собираем окончательный массив, оставляя `numberDescription` и `Obuch_end` файлы в конце
            const resultSounds = filteredSounds
                .filter((sound) =>
                    !/\/src\/assets\/sounds\/numberDescription\/[0-9]+v1\.wav$/.test(sound) &&
                    sound !== '/src/assets/sounds/Obuch_end.wav'
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
        const filteredSounds = this.getSuccessInQue()
        this.messageQueue = filteredSounds;
        this.sounds.forEach(sound => sound.stop()); // Остановка всех звуков
        this.sounds = []; // Очистка массива экземпляров
        this.isPlaying = false;
    }


    // Метод для заглушки всех сообщений
    public muteMessages(): void {
        this.sounds.forEach(sound => sound.mute(true)); // Заглушить все сообщения
    }

    // Метод для снятия заглушки
    public unmuteMessages(): void {
        this.sounds.forEach(sound => sound.mute(false)); // Снять заглушку с всех сообщений
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

