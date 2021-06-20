import React, {useState} from "react";
import './HS_list.css'

const Box = (props) => {
  const [listExpand, setListExpand] = useState([false ,'Expand'])

  const { title, btnClass, btnTitle, price, feature, items } = props;

  const toggle_list = () => {
    if (listExpand[0] == false) {
      setListExpand([true, "Collapse"]);
    } else {
      setListExpand([false, "Expand"]);
    }

  }
  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">
        <h4 className="my-0 font-weight-normal">{title}</h4>
      </div>
      <div className="card-body">
        <h1 className="card-title pricing-card-title">
          ${typeof price === 'undefined' ? price : price.toFixed(2)} <small className="text-muted"></small>
        </h1>
        <ul className="list-unstyled mt-3 mb-4" >
          {feature &&
            feature.map((data, index) => {
              return <li className="feature-style" key={index} style={{fontSize: '1.7rem'}}>{data}</li>;
            })}
        </ul>
        <button type="button" style={{padding: 0, margin: 5, border: 'none', backgroundColor: 'white'}} onClick={toggle_list}>{listExpand[1]}</button>
        {
          listExpand[0] == true && 
          <ul className="SelItmList">
            {items.map((item, key) => (
              <li key={key} className="SelItmListEl">{'' + item["item"] + ' : ' + item['price'].toFixed(2)}</li>
            ))}
          </ul>
          
        }
        {/* <button type="button" className={`btn btn-lg btn-block ${btnClass}`}>
          {btnTitle}
        </button> */}
      </div>
    </div>
  );
};

export default Box;
