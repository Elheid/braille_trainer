export class BrailleCell {
  private placeCounter: number;
  public code: number;

  constructor(...lines: number[]) {
    this.placeCounter = 1;
    this.code = 0;

    for (const line of lines) {
      this.addLine(line);
    }
  }

  public addLine(line: number): void {
    this.code += this.placeCounter * line;
    this.placeCounter *= 10;
  }
}
