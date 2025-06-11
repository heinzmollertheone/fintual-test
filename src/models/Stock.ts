export class Stock {
  name: string;
  symbol: string;

  constructor({ name, symbol }: { name: string; symbol: string }) {
    this.name = name;
    this.symbol = symbol;
  }

  private currentPrice(lastAvailablePrice: number) {
    return lastAvailablePrice;
  }

  public currentValue(quantity: number, lastAvailablePrice: number): number {
    return quantity * lastAvailablePrice;
  }
}
