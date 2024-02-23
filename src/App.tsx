import React, {useState} from 'react';
import './App.css';
import Items from "./Items";
import Item from "./Item";

function App() {

  const [items, setItems] = useState(() => [new Item('Boltba menni'), new Item('Kutyát etetni')]);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<Item>();

  function handleRemove(item: Item) {
    setToggleConfirmation(true);
    setSelectedItemToDelete(item);
  }

  function confirmDelete(){
    const item = selectedItemToDelete;
    const updatedItems = items.filter(it => it !== item);
    setItems(updatedItems);
    setToggleConfirmation(false);
  }

  function cancelDelete(){
    setToggleConfirmation(false);
  }

  const handleCategories = (handle: string) => {
    switch (handle) {
      case 'food':
          setItems()
        break;
        case 'pets':
            break;
        case 'household':
            break;
        case 'entertainment':
            break;
        case 'kids':
            break;
      default:
        break;
    }
  };


  return (
      <div className="App">
        <h1>Categories and their items</h1>
        <button onClick={() => handleCategories('food')}>Food</button>
        <button onClick={() => handleCategories('pets')}>Pets</button>
        <button onClick={() => handleCategories('household')}>Household</button>
        <button onClick={() => handleCategories('entertainment')}>Entertainment</button>
        <button onClick={() => handleCategories('kids')}>Kids' Toys</button>
        {items.map((item, i) => (<Items key={i} item={item} onRemove={() => handleRemove(item)}/>))}
        {toggleConfirmation ? <p>Confirmation</p> : null}
        {toggleConfirmation ? <button onClick={confirmDelete}>✓</button> : null}
        {toggleConfirmation ? <button onClick={cancelDelete}>ⓧ</button> : null}
      </div>
  );
}

export default App;
