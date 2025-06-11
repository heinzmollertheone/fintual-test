import { Portfolio } from "./models/Portfolio";
import { Stock } from "./models/Stock";

// Simular precios actuales
const CURRENT_PRICES = {
  AAPL: 150,
  NVDA: 900,
  IVV: 606,
  TSLA: 327,
};

const app = () => {
  // Crear acciones (stocks) para operar
  const appleStock = new Stock({ name: "Apple", symbol: "AAPL" });
  const nvidiaStock = new Stock({ name: "Nvidia", symbol: "NVDA" });
  const sp500Stocks = new Stock({ name: "ETF S&P 500", symbol: "IVV" });
  const teslaStocks = new Stock({ name: "Tesla", symbol: "TSLA" });

  // Definir asignación deseada (70% Apple, 30% Nvidia)
  const allocatedStocks = [
    { stock: appleStock, quantity: 0.5 },
    { stock: nvidiaStock, quantity: 0.3 },
    { stock: teslaStocks, quantity: 0.2 },
  ];

  // Crear portafolio. Se puede crear con y sin allocated stocks
  const portfolio = new Portfolio(allocatedStocks);

  // Comprar acciones iniciales
  portfolio.buyStock(appleStock, 5);
  portfolio.buyStock(nvidiaStock, 2);
  portfolio.buyStock(sp500Stocks, 8);

  console.log("\n🧾 Holdings actuales:");
  console.log(portfolio.holdings);

  // Ejecutar rebalanceo
  const actions = portfolio.rebalance(CURRENT_PRICES);

  console.log("\n🎯 Asignación objetivo:");
  console.log(portfolio.allocatedStocks);

  console.log("\n📊 Acciones sugeridas para rebalancear:");
  console.log(actions);
};

app();
