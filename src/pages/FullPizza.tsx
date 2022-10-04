import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
   imageUrl:string;
   title:string;
   price: string;
  }>();

  React.useEffect(() => {
    async function FetchPizza() {
      try {
        const { data } = await axios.get('https://630a37483249910032829f92.mockapi.io/pizzadb/' + id)
        setPizza(data);
      } catch (error) {
        console.error(error);
        alert('sasdsasdasdasdasdasdasds')
      }
    }
    FetchPizza();

  }, [])

  if (!pizza) {
    return <h2>Загрузка</h2>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="Pizza" />
      <h1>{pizza.title}</h1>

      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza;