import React from "react";

function Item({ item, handleUpdatedItems, handleDeletedItems }) {
  function handleAddToCart(){
    fetch(`http://localhost:3000/items/${item.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
  .then(resp=>resp.json())
  .then(updatedItem=>handleUpdatedItems(updatedItem))
  }

  fetch(`http://localhost:3000/items/${item.id}`,{
    method:"DELETE",
  })
  .then(resp=>resp.json())
  .then(deletedItem=>handleDeletedItems(deletedItem))

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove">Delete</button>
    </li>
  );
}

export default Item;
