import React from 'react'
import {useState, useEffect} from 'react';
import { Button } from './Button'
import './HS_list.css'
import Box from "./Box";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
function HS_list() {
  const [listItms, setListItms] = useState([]);
  const [demoPara, setDemoPara] = useState('');
  const [demoListImage, setDemoList] = useState('');
  const [resData, setResData] = useState('')
  const [loadFlag1, setLoadFlag1] = useState(false)

 const addItemToList = () => {
    let itemAdded = document.getElementById("fname").value;

    setListItms(arr => [...arr, itemAdded])
  }
  const submitRequestToServer = async () => {
    setLoadFlag1(true)
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

    let resJson = await fetch('/api_getPrices', option)
    .then(response => response.json())
    let resSuperstore = resJson["superstore"]
    let resSaveonfoods = resJson["saveonfoods"]
    let resVoila = resJson["voila"]
    let demoText = 'Superstore: '
    resSuperstore.map(item => {
      demoText += item.item + ': ' + item.price + ', '
    })
    demoText += "\nSaveonfoods: ";
    resSaveonfoods.map(item => {
      demoText += item.item + ': ' + item.price + ', '
    })
    demoText += "\nVoila: ";
    resVoila.map(item => {
      demoText += item.item + ': ' + item.price + ', '
    })
    setDemoPara(demoText);
    // setDemoPara(superstore)
    setLoadFlag1(false)
    setResData(resJson)
  }

  const demoListBuilder = () => {
    setListItms(["bread", "eggs", "chicken", "ketchup"])
  }

  const demoListImageBuilder = async () => {
    let imageData = document.getElementById('imageup').files[0]
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image: imageData}),
    }
    let resJson = await fetch('/api_getPrices', option)
    .then(response => response.json())


    let imList = resJson["items"]
    setDemoList(imList)
  }
  const featureBox1 = [
    "Best Price",
  ];
  const featureBox2 = [
    "_____",
  ];
  const featureBox3 = [
    "_____",
  ];

    return (
      <>
        <div className='hero-container-list'>
          <h1></h1>
          <div class ="Card" align = "center">
            <input className = "inline" type="text" id="fname" name="firstname" placeholder="Add your items here" />
            <button class="btn add-item" buttonStyle='btn--outline' buttonSize='btn--large' onClick={addItemToList}>Add Item</button>
            {/* <p>{demoPara}</p> */}
            <br />
            <div className="SelItmSelCont">
            <ul className="SelItmList">
              {listItms.map((item, key) => (
              <li key={key} className="SelItmListEl">{item}</li>
            ))}
            </ul>
            </div>
          </div> 
          <div className="hero-btns-list">
            <button className="btn" onClick={submitRequestToServer}>Submit</button>
            <button className="btn" onClick={demoListBuilder}>Demo</button>
          </div>
        </div>
        <div style={loadFlag1 == true ? 
        {width: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center', margin: 40, fontSize: '3rem'} 
        : {display: 'none'}}>
          {/* <div style={{margin: "auto", }}> */}
            <div className={useStyles.root}>
              <CircularProgress />
            </div>
            <p>Loading</p>
          {/* </div> */}
          
        </div>
        <div className="card-deck mb-3 text-center" style={resData == '' ? {display: 'none'} : {}}>
            <Box
              price={resData["superTotal"]}
              title="Superstore"
              feature={resData["superBest"] == 1? featureBox1: featureBox2}
              items={resData["superstore"]}
            />
            <Box
              feature={resData["saveBest"] == 1? featureBox1: featureBox2}
              price={resData["saveTotal"]}
              title="Save On Foods"
              items={resData["saveonfoods"]}
            />
            <Box
              feature={resData["voilaBest"] == 1? featureBox1: featureBox2}
              price={resData["voilaTotal"]}
              title="Safeway"
              items={resData["voila"]}
            />
          </div>
        </>
        
          
        );
       
    
}
export default HS_list
