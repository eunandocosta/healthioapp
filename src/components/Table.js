import React, { useEffect, useState } from "react"
import Card from "./Card";

const Table = (props) => {

  const [data, setData] = useState([])
  const [input, setInput] = useState("")

  const url_table = 'http://localhost:5000'

  useEffect(() => {
    fetch(url_table+'/alimentos')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
  }, [])

  const filteredData = data.filter(item =>
    item["Nome"].toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="container">
      <div className="container_limit">
        <div className="card_container">
          <input type="text" className="card_input" placeholder="Digite um alimento..." onChange={e=>setInput(e.target.value)}/>
          {filteredData.map(item => (
              <Card 
                key={item.id} 
                card_name={item["Nome"]}
                card_carbo={item["Carboidrato (g)"]}
                card_ptn={item["Proteína (g)"]}
                card_gordura={item["Lipídeos (g)"]}
              />
            ))}
        </div>
      </div>
    </div>
  )
};

export default Table;
