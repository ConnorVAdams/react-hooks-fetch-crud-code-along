import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(data => setItems(data))
  }, [])

  function onCategoryChange(category) {
    setSelectedCategory(category);
  }

  const onAddItem = (itemData) => {
    const updatedItems = [...items, itemData]
    setItems(updatedItems)
  }

  const onAddToCart = (itemData) => {
    const updatedItems = items.map(item => {
      if (item.id === itemData.id) {
        return itemData
      } else {
        return item
      }
    })
    setItems(updatedItems)
  }

  const onRemoveFromList = (id) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={onAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onRemoveFromList={onRemoveFromList} onAddToCart={onAddToCart} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
