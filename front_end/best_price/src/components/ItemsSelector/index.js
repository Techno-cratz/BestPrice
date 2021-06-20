import React, {useState, useEffect} from 'react';
import './ItemsSelector.css'


const ItemsSelector = () => {
  const [listItms, setListItms] = useState([]);
  const [demoPara, setDemoPara] = useState('');

  const addItemToList = () => {
    let itemAdded = document.getElementById("ItemAddTextBox").value;

    setListItms(arr => [...arr, itemAdded])
  }

  const submitRequestToServer = async () => {
    // use the fetch POST API to send the json
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(listItms),
    }
    // const resp = await fetch('/api_getPrices', option)
    // const data = resp.json();
    // setDemoPara(data.superstore)
    // console.log(data)

    let superstore = await fetch('/api_getPrices', option)
    .then(response => response.json())
    .then(text => text["superstore"])
    let demoText = ''
    superstore.map(item => {
      demoText += item.item + ': ' + item.price + ', '
    })
    setDemoPara(demoText);
    // setDemoPara(superstore)
  }

  const demoListBuilder = () => {
    setListItms(["apple","brown rice","grapes","milk","carrots","chicken","ketchup"])
  }

  return (
    <>
      <div className="SelContainer">
        <div className="SelInputCont">
          <div className="SelInputAdd">
            <input type="text" className="SelInput" id="ItemAddTextBox" />
            <button className="SelAdd" onClick={addItemToList}>Add</button>
            <p>{demoPara}</p>
          </div>
          <br />
          <button onClick={submitRequestToServer}>Submit</button>
          <button onClick={demoListBuilder}>Sample List</button>
        </div>
        <div className="SelItmSelCont">
          <ul className="SelItmList">
            {listItms.map((item, key) => (
              <li key={key} className="SelItmListEl">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ItemsSelector;