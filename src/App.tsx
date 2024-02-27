import React, {useState} from 'react';
import './App.css';
import Items from "./Items";
import Item from "./Item";

//Adding categories
export const categories: string[] = ['food', 'pets', 'household', 'entertainment', 'kids']

function App() {

  const [items, setItems] = useState(() => [new Item('Pizza', 'food')]);
  const [toggleConfirmation, setToggleConfirmation] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState<Item>();
  const [toggleNewForm, switchToNewForm] = useState(false);

//Functions for removing items------------------------------------------------------
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
//---------------------------------------------------------------------------------

//This function switches from the main page to the page where you can add items to the list or vice versa
    function switchForms(){
        if (!toggleNewForm){
            switchToNewForm(true);
        }
        else{
            switchToNewForm(false);
        }
    }

//This switch case sets the category to filter to
  const handleCategories = (handle: string) => {
    switch (handle) {
      case 'food':
          setFilter('food')
        break;
        case 'pets':
            setFilter('pets')
            break;
        case 'household':
            setFilter('household')
            break;
        case 'entertainment':
            setFilter('entertainment')
            break;
        case 'kids':
            setFilter('kids')
            break;
        case 'all':
            setCategoryFilter(categories)
            break;
      default:
        break;
    }
  };

  //This part of the code adds the item and its corresponding category to the list
  const [name, setName] = useState('');
  const [category, setCategory] = useState('food');

      function addItems(){
          items.push(new Item(name, category));
          setName('')
          switchForms()
      }
//-------------------------------------------------------------------------------------

//This part of the code filters the items based on the selected category
    const [categoryFilter, setCategoryFilter] = useState(categories);
    const [search, searchFor] = useState('');

    function setFilter(category: string) {
        const filtered = categories.filter(it => it === category);
        setCategoryFilter(filtered);
    }
//-------------------------------------------------------------------------------------

  return (
//HTML page for adding items
      <>
      {toggleNewForm ? <div className="Form">
              <h1>Add a new Item</h1>
              <label>Item: <input type="text" name="item" id="name_id"
                                  value={name}
                                  onChange={event => setName(event.target.value)}>
              </input></label>
              <p></p>
              <label> Category: </label>
              <select id="categories_id"
                      defaultValue={category}
                      onChange={event => setCategory(event.target.value)}>
                  <option value="food">Food</option>
                  <option value="pets">Pets</option>
                  <option value="household">Household</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="kids">Kids</option>
              </select>
              <button onClick={addItems}>Add</button>
          </div>

          :
//HTML page for searching and listing items with their categories or deleting them
          <div className="App">
              <h1>Categories and their items</h1>
              <label>Keresés:
                <input type='text' id='search_id'
                       onChange={event => searchFor(event.target.value)}>
                </input>
              </label>
              <p></p>
              <button onClick={() => handleCategories('food')}>Food</button>
              <button onClick={() => handleCategories('pets')}>Pets</button>
              <button onClick={() => handleCategories('household')}>Household</button>
              <button onClick={() => handleCategories('entertainment')}>Entertainment</button>
              <button onClick={() => handleCategories('kids')}>Kids' Toys</button>
              <button onClick={() => handleCategories('all')}>All</button>
              <div>
                  {items.filter(item => item.name.startsWith(search))
                      .filter(item => categoryFilter.includes(item.category))
                      .map((item, i) => (<Items key={i} item={item} onRemove={() => handleRemove(item)}/>))}
                  {toggleConfirmation ? <p>Confirmation</p> : null}
                  {toggleConfirmation ? <button onClick={confirmDelete}>✓</button> : null}
                  {toggleConfirmation ? <button onClick={cancelDelete}>ⓧ</button> : null}
              </div>
              <br/>
              <button onClick={() => switchForms()}>Add a new Item</button>
          </div>}
      </>
  );
}

export default App;
