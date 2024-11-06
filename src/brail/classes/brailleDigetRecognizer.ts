import { BrailleCell } from './brailleCell';
/*
enum LineType {
  Undefined = -1,
  Point = 0,
  VerticalLine = 1,
  HorizontalLine = 2,
  LeftDiagonal = 4,
  RightDiagonal = 6,
}

const codeTable: Record<number, number> = {
  [new BrailleCell(LineType.Point).code]: 1,
  [new BrailleCell(LineType.VerticalLine).code]: 2,
  [new BrailleCell(LineType.HorizontalLine).code]: 3,
  [new BrailleCell(LineType.RightDiagonal).code]: 5,
  [new BrailleCell(LineType.LeftDiagonal).code]: 9,
  [new BrailleCell(LineType.VerticalLine, LineType.HorizontalLine).code]: 6,
  [new BrailleCell(LineType.VerticalLine, LineType.RightDiagonal).code]: 8,
  [new BrailleCell(LineType.LeftDiagonal, LineType.HorizontalLine).code]: 0,
  [new BrailleCell(LineType.HorizontalLine, LineType.RightDiagonal).code]: 4,
};

interface Point {
  x: number;
  y: number;
}

export class BrailleDigitRecognizer {
  private lastTap: number | null = null;
  private doubleTapDelay: number = 300;
  private longPressTimer: number | null = null;
  private longPressDelay: number = 500;
  public isGestureHandled: boolean = false;

  private onDoubleTap: () => void;
  private onLongPress: () => void;
  

  constructor(onDoubleTap?: () => void, onLongPress?: () => void,) {
    if (onDoubleTap)
        this.onDoubleTap = ()=>{
        this.isGestureHandled = true;
        onDoubleTap();
      };
    else
        this.onDoubleTap = this.onDoubleTapDefault;

    if (onLongPress)
      this.onLongPress = ()=>{
        this.isGestureHandled = true;
        onLongPress();
      };
    else
      this.onLongPress = this.onLongPressDefault;
  }



  // Метод для обработки двойного тапа
  private onDoubleTapDefault() {
    console.log('Double tap detected');
  }

  // Метод для обработки удержания
  private onLongPressDefault() {
    console.log('Long press detected');
  }

  // Метод для начала жеста (когда начинается касание)
  public handleTouchStart() {
    this.isGestureHandled = false;
    if (this.longPressTimer) clearTimeout(this.longPressTimer);

    this.longPressTimer = window.setTimeout(() => {
      this.isGestureHandled = true;
      this.onLongPress();
    }, this.longPressDelay);
  }

  // Метод для завершения жеста (когда заканчивается касание)
  public handleTouchEnd() {
    this.isGestureHandled = false;
    if (this.longPressTimer) clearTimeout(this.longPressTimer);

    const now = Date.now();
    if (this.lastTap && now - this.lastTap < this.doubleTapDelay) {
      this.onDoubleTap();
      this.isGestureHandled = true;
      this.lastTap = null;
    } else {
      this.lastTap = now;
    }
  }

  // Метод для распознавания цифры
  recognizeDigit(points: Point[]): number | undefined {
    if (this.isGestureHandled) {
      // Если жест уже обработан, прекращаем выполнение
      return;
    }

    if (points.length === 1) {
      return 1;
    }
    if (points.length === 4) {
      return 7;
    }

    points.sort((a, b) => this.comparator(a, b));

    const cell = new BrailleCell();
    for (let i = 1; i < points.length; i++) {
      const line = this.identifyLineType(points[0], points[i]);
      cell.addLine(line);
    }
    if (this.isGestureHandled){
      return undefined;
    }
    return codeTable[cell.code];
  }

  private identifyLineType(point1: Point, point2: Point): LineType {
    const angle = this.calculateAngle(point1, point2);
    switch (true) {
      case this.isVertical(angle):
        return LineType.VerticalLine;
      case this.isRightDiagonal(angle):
        return LineType.RightDiagonal;
      case this.isLeftDiagonal(angle):
        return LineType.LeftDiagonal;
      case this.isHorizontal(angle):
        return LineType.HorizontalLine;
      default:
        return LineType.Undefined;
    }
  }

  private calculateAngle(point1: Point, point2: Point): number {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
  }

  private isVertical(angle: number): boolean {
    return Math.abs(angle) >= 70 && Math.abs(angle) <= 110;
  }

  private isHorizontal(angle: number): boolean {
    return (
      (Math.abs(angle) >= 0 && Math.abs(angle) <= 20) ||
      (Math.abs(angle) >= 160 && Math.abs(angle) <= 180)
    );
  }

  private isRightDiagonal(angle: number): boolean {
    return angle > 20 && angle < 70;
  }

  private isLeftDiagonal(angle: number): boolean {
    return angle > -70 && angle < -20;
  }

  private comparator(point1: Point, point2: Point): number {
    const angle = this.calculateAngle(point1, point2);
    return angle < 110 && angle > -70 ? -1 : 1;
  }
}
*/

enum LineType {
  Undefined = -1,
  Point = 0,
  VerticalLine = 1,
  HorizontalLine = 2,
  LeftDiagonal = 4,
  RightDiagonal = 6,
}

const codeTable: Record<number, number> = {
  [new BrailleCell(LineType.Point).code]: 1,
  [new BrailleCell(LineType.VerticalLine).code]: 2,
  [new BrailleCell(LineType.HorizontalLine).code]: 3,
  [new BrailleCell(LineType.RightDiagonal).code]: 5,
  [new BrailleCell(LineType.LeftDiagonal).code]: 9,
  [new BrailleCell(LineType.VerticalLine, LineType.HorizontalLine).code]: 6,
  [new BrailleCell(LineType.VerticalLine, LineType.RightDiagonal).code]: 8,
  [new BrailleCell(LineType.LeftDiagonal, LineType.HorizontalLine).code]: 0,
  [new BrailleCell(LineType.HorizontalLine, LineType.RightDiagonal).code]: 4,
};

interface Point {
  x: number;
  y: number;
}

export class BrailleDigitRecognizer {
  recognizeDigit(points: Point[]): number | undefined {
    if (points.length === 1) {
      return 1;
    }
    if (points.length === 4) {
      return 7;
    }

    points.sort((a, b) => this.comparator(a, b));

    const cell = new BrailleCell();
    for (let i = 1; i < points.length; i++) {
      const line = this.identifyLineType(points[0], points[i]);
      cell.addLine(line);
    }

    return codeTable[cell.code];
  }

  private identifyLineType(point1: Point, point2: Point): LineType {
    const angle = this.calculateAngle(point1, point2);
    switch (true) {
      case this.isVertical(angle):
        return LineType.VerticalLine;
      case this.isRightDiagonal(angle):
        return LineType.RightDiagonal;
      case this.isLeftDiagonal(angle):
        return LineType.LeftDiagonal;
      case this.isHorizontal(angle):
        return LineType.HorizontalLine;
      default:
        return LineType.Undefined;
    }
  }

  private calculateAngle(point1: Point, point2: Point): number {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * (180 / Math.PI);
  }

  private isVertical(angle: number): boolean {
    return Math.abs(angle) >= 70 && Math.abs(angle) <= 110;
  }

  private isHorizontal(angle: number): boolean {
    return (
      (Math.abs(angle) >= 0 && Math.abs(angle) <= 20) ||
      (Math.abs(angle) >= 160 && Math.abs(angle) <= 180)
    );
  }

  private isRightDiagonal(angle: number): boolean {
    return angle > 20 && angle < 70;
  }

  private isLeftDiagonal(angle: number): boolean {
    return angle > -70 && angle < -20;
  }

  private comparator(point1: Point, point2: Point): number {
    const angle = this.calculateAngle(point1, point2);
    return angle < 110 && angle > -70 ? -1 : 1;
  }
}
