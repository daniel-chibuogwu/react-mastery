import { useState } from 'react';
import './index.css';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Ball', quantity: 12, packed: false },
  { id: 4, description: 'Charger', quantity: 12, packed: true },
];

interface ItemProps {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  //   const [items, setItems] = useState<ItemProps[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description) return;
    const newItem: ItemProps = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    console.log(newItem);

    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        id=""
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="text"
        id="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }: { item: ItemProps }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>
        🧳 You have X items on your list, and you've already packed Y (X%)
      </em>
    </footer>
  );
}
