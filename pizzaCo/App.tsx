import { pizzaData } from './data';
import type { PizzaType } from './types';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;
  const numPizzas = pizzas.length;
  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 && (
        <>
          <p>
            Authentic Italian cuisine. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Minus sint corporis beatae laborum? Vero numquam
            vitae
          </p>

          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza key={pizza.name} pizzaObj={pizza} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}

function Pizza({ pizzaObj }: { pizzaObj: PizzaType }) {
  return (
    <li className={`pizza${pizzaObj.soldOut ? ' sold-out' : ''}`}>
      <img src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? 'SOLD OUT' : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openingHour = 9;
  const closingHour = 18;
  const isOpen = hour >= openingHour && hour <= closingHour;

  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closingHour} />
      ) : (
        <p>
          We're happy to welcome you. We open between {openingHour}:00 and{' '}
          {closingHour}:00
        </p>
      )}
    </footer>
  );
}

function Order({ closeHour }: { closeHour: number }) {
  return (
    <div className="order">
      <p>We're are open until {closeHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

export default App;
