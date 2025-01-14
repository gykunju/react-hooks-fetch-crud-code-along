import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/items")
    .then(resp=>resp.json())
    .then(data=>setItems(data))
    // .catch(error=>("Error:" ,error))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem) {
    setItems([...items, newItem])
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = items.map(item=>{
      if(item.id === updatedItem.id){
      return updatedItem
      }else{
        return item
      }
    })
    setItems(updatedItems)
  }

  function handleDeletedItems(deletedItem){
    const remaining = items.filter(item=>item.id !== deletedItem.id)
    setItems(remaining)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleUpdatedItem={handleUpdatedItem} handleDeletedItems={handleDeletedItems}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
