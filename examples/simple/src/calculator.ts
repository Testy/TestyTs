export class Calculator {
  public sum(...components: number[]): number {
    return components.reduce((prev, curr) => prev + curr);
  }
}
