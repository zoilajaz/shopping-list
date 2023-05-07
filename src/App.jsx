import { useState } from "react"
import ListItem from "./components/ListItem";
import NewListItemButton from "./components/NewListItemButton";
import Swal from 'sweetalert2'
import ClearListButtom from "./components/ClearListButtom";
import {v4 as uuidv4} from 'uuid'

function App() {
  const [listItems, setListItems] = useState(
    JSON.parse (localStorage.getItem("listItems")) || []

  );

  const handleNewListItemButton = async () => {
    const {value} = await Swal.fire({
      title: "New Item Information",
      html: `<input type='text' 
            id='name' name='name' 
            class='swal2-input' 
            placeholder='Item' 
            />
            <input type='number' 
            id='quantity' 
            name='quantity' 
            class='swal2-input' 
            placeholder='Qty'
            />
            <input type='text' 
            id='unit' name='unit' 
            class='swal2-input' 
            placeholder='unit'
            />`,
      confirmButtonText: "Add item",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      cancelButtonText: "Dismiss",
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const quantity = Swal.getPopup().querySelector('#quantity').value;
        const unit = Swal.getPopup().querySelector('#unit').value;
        if (!name || !quantity || !unit) {
          Swal.showValidationMessage('Please enter an item full information');
        }
        return {name, quantity, unit};
      },
    })
    if(!value.name || !value.quantity || !value.unit) return

    const newList = [
      ...listItems,
      {id: uuidv4(),...value, checked: false}
    ]

   localStorage.setItem("listItems", JSON.stringify(newList));
   setListItems(newList);

  }
  const handleCheckboxChanhe = (e) => {
    const newList = listItems.map(item => {
      if (item.id === e.target.name) {
        item.checked = !item.checked;
      }
      return item;

    })

    localStorage.setItem("listItems", JSON.stringify(newList));
    setListItems(newList);
  }

  return (
    <div className="container text-center">
    <div className="row">
      <div className="col-2"></div>
      <div className="col">
        <h1>Shopping List</h1>
        <br />
      </div>
      <div className="col-2 text-end">
        <ClearListButtom setListItems={setListItems}/>
        <NewListItemButton handleNewListItemButton={handleNewListItemButton}/>
      </div>
    </div>
    <hr />
    {
      listItems.length === 0 && (
      <h3>
        Empty list...
      </h3>
      )
    }
    {
      listItems.map((ListItems) => (
        <ListItem 
        key={listItems.id}
          item={ListItems}
          listItems={listItems}
          setListItems={setListItems}
          handleCheckboxChanhe={handleCheckboxChanhe}
        />
      ))
    }
    <hr />
    <div className="row">
{
  listItems.length >= 5 && (
    <div className="col text-end">
        <ClearListButtom setListItems={setListItems}/>
        <NewListItemButton handleNewListItemButton={handleNewListItemButton}/>
      </div>
  )
}

      
    </div>
  </div>
  )
}

export default App