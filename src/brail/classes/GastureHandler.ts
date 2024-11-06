// GestureHandler.ts
export default class GestureHandler {
    public isGestureHandled: boolean = false;
    private onDoubleTap: () => void;
    private onLongPress: () => void;
    private doubleTapDelay: number;
    private longPressDelay: number;
    private lastTap: number | null = null;
    private longPressTimer: number | null = null;

    

    constructor(onDoubleTap?: () => void, onLongPress?: () => void, doubleTapDelay = 300, longPressDelay = 500) {
        if (onDoubleTap)
            this.onDoubleTap = onDoubleTap;
        else
            this.onDoubleTap = this.onDoubleTapDefault;

        if (onLongPress)
            this.onLongPress = onLongPress;
        else
            this.onLongPress = this.onLongPressDefault;


        this.doubleTapDelay = doubleTapDelay;
        this.longPressDelay = longPressDelay;
    }

    public setOnDoubleTap(onDoubleTap: () => void){
        this.onDoubleTap = onDoubleTap;
    }

    public setonLongPress(onLongPress: () => void){
        this.onLongPress = onLongPress;
    }


    public onDoubleTapDefault(){
        console.log("Double tap detected");
    }
    public onLongPressDefault(){
        console.log("Long press detected");
    }

    public handleTouchStart() {
        this.isGestureHandled = false;
        if (this.longPressTimer) clearTimeout(this.longPressTimer);

        this.longPressTimer = window.setTimeout(() => {
            this.onLongPress();
            this.isGestureHandled = true;
        }, this.longPressDelay);
    }

    public handleTouchEnd() {
        //this.isGestureHandled = false;
        if (this.longPressTimer) clearTimeout(this.longPressTimer);

        const now = Date.now();
        if (this.lastTap && now - this.lastTap < this.doubleTapDelay) {
            this.onDoubleTap();
            this.isGestureHandled = true;
            this.lastTap = null;
        } else {
            this.lastTap = now;
        }

        setTimeout(() => {
            this.isGestureHandled = false;
          }, 100); // 100 мс задержка для стабильного считывания
    }
}
