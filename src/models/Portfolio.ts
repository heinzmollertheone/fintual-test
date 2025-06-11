import { Stock } from "./Stock";

export class Portfolio {
  holdings: Record<string, { stock: Stock; quantity: number }> = {};
  allocatedStocks: Record<string, number> = {};

  constructor(allocation?: { stock: Stock; quantity: number }[]) {
    if (!allocation) return;

    const initialAllocation: Record<string, number> = {};

    // Si los stocks se repiten en la estrategia, se suman sus cantidades y así además evitamos duplicados
    for (const { stock, quantity } of allocation) {
      const symbol = stock.symbol;
      initialAllocation[symbol] = (initialAllocation[symbol] || 0) + quantity;
    }

    this.allocatedStocks = initialAllocation;
  }

  // Para efectos prácticos, no hay lógica de precios ni de saldo disponible. Asumimos que se puede comprar
  public buyStock(stock: Stock, quantity: number) {
    const existingStock = this.holdings[stock.symbol];

    if (!existingStock) {
      this.holdings[stock.symbol] = { stock, quantity };
    } else {
      this.holdings[stock.symbol].quantity += quantity;
    }

    return this.holdings[stock.symbol];
  }

  public rebalance(prices: Record<string, number>) {
    const actions: {
      symbol: string;
      action: "buy" | "sell";
      quantity: number;
    }[] = [];

    // Paso 1: Calcular el valor total del portafolio
    let totalValue = 0;
    const allocatedSymbols = new Set(Object.keys(this.allocatedStocks));

    for (const symbol in this.holdings) {
      const { quantity } = this.holdings[symbol];
      const price = prices[symbol];

      // En caso de que el precio de un stock no venga
      if (prices[symbol] == null) {
        console.warn(`⚠️ No price for ${symbol}, skipping`);
        continue;
      }

      // En caso de que  tengamos un stock que no sea parte del objetivo
      if (!allocatedSymbols.has(symbol)) {
        actions.push({
          symbol,
          action: "sell",
          quantity: this.holdings[symbol].quantity,
        });
      }

      totalValue += quantity * price;
    }

    console.info(`💰 Total portfolio value: $${totalValue.toFixed(2)}`);

    // Paso 2: Comparar el valor actual vs el valor deseado
    for (const symbol in this.allocatedStocks) {
      const targetPercentage = this.allocatedStocks[symbol];
      const targetValue = totalValue * targetPercentage;

      const holding = this.holdings[symbol];
      const currentQuantity = holding?.quantity || 0;
      const currentValue = currentQuantity * prices[symbol];

      const diff = targetValue - currentValue;

      // Paso 3: Decidir si hay que comprar o vender
      if (Math.abs(diff) < 1e-2) continue; // Ignora diferencias insignificantes (Sugerido por chatGpt)

      const quantityToAdjust = diff / prices[symbol];
      actions.push({
        symbol,
        action: diff > 0 ? "buy" : "sell",
        quantity: Math.abs(quantityToAdjust),
      });
    }

    return actions;
  }
}
