function Item({ item, onAddToCart, onRemoveFromList }) {

  const handleAddToCart = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      })
    })
    .then(resp => resp.json())
    .then(itemData => onAddToCart(itemData))
  }

  const handleRemoveFromList = () => {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: 'DELETE',
    })
    .then(resp => resp.json())
    .then(() => onRemoveFromList(item.id))
    .then(() => console.log('Deleted!'))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCart} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleRemoveFromList} className="remove">Delete</button>
    </li>
  );
}

export default Item;
