import { useState } from 'react';
import './index.css';

interface ItemProps {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export default function App() {
  const [items, setItems] = useState<ItemProps[]>([]);

  function handleAddItem(item: ItemProps) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleRemoveItem(id: number) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id: number) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItem }: { onAddItem: (item: ItemProps) => void }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description) return;
    const newItem: ItemProps = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    onAddItem(newItem);

    setDescription('');
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
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
function PackingList({
  items,
  onRemoveItem,
  onToggleItem,
}: {
  items: ItemProps[];
  onRemoveItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  const [sortBy, setSortBy] = useState('input');

  return (
    <div className="list">
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              onRemoveItem={onRemoveItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      ) : (
        <p>Nothing on your packing list yet🧘🏾</p>
      )}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button>Clear List</button>
      </div>
    </div>
  );
}

function Item({
  item,
  onRemoveItem,
  onToggleItem,
}: {
  item: ItemProps;
  onRemoveItem: (id: number) => void;
  onToggleItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }: { items: ItemProps[] }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numberOfItems = items.length;
  const numOfPackedItems = items.filter((item) => item.packed).length;

  const percentagePacked =
    Math.round((numOfPackedItems / numberOfItems) * 100) || 0;
  return (
    <footer className="stats">
      <em>
        {percentagePacked === 100
          ? "You've got everything! Ready to go ✈️"
          : `🧳 You have ${numberOfItems} items on your list, and you've already
        packed ${numOfPackedItems} (${percentagePacked}%)`}
      </em>
    </footer>
  );
}
