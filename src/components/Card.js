import React from "react"

const Card = (props) => {
  return (
    <div className="card">
      <h3>{props.card_name}</h3>
      <div className="card_macros">
        <div className="macro">
            <h3>{props.card_carbo}</h3>
            <h3 className="macro_name">Carboidrato</h3>
        </div>
        <div className="macro">
            <h3>{props.card_ptn}</h3>
            <h3 className="macro_name">Proteína</h3>
        </div>
        <div className="macro">
            <h3>{props.card_gordura}</h3>
            <h3 className="macro_name">Gordura</h3>
        </div>
      </div>
    </div>
  )
};

export default Card;
