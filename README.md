# fintual-test

Esta pequeña app simula la creación y gestión de un portafolio de inversión, considerando acciones que ya tengo y un objetivo de distribución en porcentaje (%).

---

## 🧠 Flujo general

1. **Creación de acciones disponibles (AAPL, NVDA, IVV)**  
   Esto simula registrar las acciones en el sistema para que puedan ser operadas (comprar, vender, consultar info, etc.).

2. **Definición del objetivo del portafolio**  
   Se establece qué porcentaje del valor total debería estar asignado a cada acción.

3. **Creación del portafolio y compra de acciones**  
   Se inicializa el portafolio con el objetivo definido, y luego se simula la compra de acciones disponibles (como lo haría un usuario real).

4. **Rebalanceo del portafolio**  
   Se compara lo que tienes actualmente con tu objetivo, usando precios actuales (simulados como si vinieran desde una API).  
   El sistema propone qué deberías comprar o vender para alcanzar la distribución ideal.

5. **Resultado**  
   En consola verás una propuesta clara de acciones a comprar o vender para alcanzar el balance deseado.

---

## 🧮 La lógica de negocios detrás del rebalanceo

Rebalancear un portafolio significa ajustar lo que tengo hoy para que coincida con el objetivo que definí (porcentaje por acción).  
A continuación, el proceso explicado paso a paso en términos simples:

1. **Calcular el valor total del portafolio**  
   Se multiplica la cantidad de cada acción por su precio actual, y se suman todos los valores.  
   Ejemplo:

   - 5 acciones de AAPL a $100 = $500
   - 2 acciones de NVDA a $200 = $400
   - Total = $900

2. **Calcular el valor ideal para cada acción**  
   Se aplica el porcentaje objetivo sobre el total del portafolio.  
   Ejemplo:

   - Si la meta es 70% AAPL y 30% NVDA → debería tener:
     - AAPL: 70% de $900 = $630
     - NVDA: 30% de $900 = $270

3. **Comparar lo que tengo con lo que debería tener**

   - Si hoy tengo $500 en AAPL pero debería tener $630 → necesito **comprar $130** de AAPL.
   - Si hoy tengo $400 en NVDA pero debería tener $270 → necesito **vender $130** de NVDA.

4. **Convertir esos valores a cantidades de acciones**

   - Se divide el monto a comprar o vender por el precio actual de la acción.

5. **Resultado**  
   El sistema genera una propuesta de compra/venta para dejar el portafolio alineado con la estrategia.

## ⚙️ Instalación y ejecución

```bash
# 1. Clona el repositorio
git clone git@github.com:heinzmollertheone/fintual-test.git
cd fintual-test

# 2. Instala dependencias
npm install

# 3. Ejecuta el script principal (usando ts-node)
npx ts-node index.ts
```
