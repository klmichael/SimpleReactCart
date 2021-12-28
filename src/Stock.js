import React, {useState} from 'react';

//Thanks to https://www.javascripttutorial.net/javascript-fetch-api/ for reminding me how to set up the fetch portion of this function.
function Stock({items, setItems}) {
  const [warehouse, setWarehouse] = useState("http://localhost:1337/api/products");

  async function restock(url) {
    let shipment = await getShipment(url);
    console.log(shipment);
    let newItems = [...shipment.data].map(item => {
      return {proId: item.id, name: item.attributes.name, country: item.attributes.country, cost: item.attributes.cost, instock: item.attributes.instock, photo: item.attributes.photo}
    });
    let currentStock = [...items];
    let allStock = combineItems(currentStock, newItems);
    setItems(allStock);
  }

  async function getShipment(url) {
    try {
      let res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  function combineItems(oldItems, newItems) {
    let allItems = [...oldItems];
    let existingIds = oldItems.map(old => old.proId);
    for (let i = 0; i < newItems.length; i++) {
      const addStock = (element) => element === newItems[i].proId;
      let updateIndex = existingIds.findIndex(addStock);
      if (updateIndex > -1) {
        allItems[updateIndex].instock = parseInt(allItems[updateIndex].instock) + parseInt(newItems[i].instock);
      } else {
        allItems.push({ ...newItems[i] });
      }
    }
    return allItems;
  }

  return (
    <form onSubmit={(event) => {
      restock(warehouse);
      event.preventDefault();
    }}>
      <input
        type="text"
        value={warehouse}
        onChange={(event) => setWarehouse(event.target.value)}
      />
      <button type="submit">Order Stock</button>
    </form>
  );
}

export default Stock;