import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  selectCartItemById } from '../../redux/slices/cart/selectors';
import {TCartItem} from '../../redux/slices/cart/types'
import {addItem} from '../../redux/slices/cart/slice'
const pizzaTypes = ['тонкое', 'традиционное'];

type PizzaBlockProps = {
  id: string;
  title: string;
  sizes: number[];
  price: number;
  count: number;
  imageUrl: string;
  types: number[];
}

const Pizza_block: React.FC<PizzaBlockProps> = ( { id, imageUrl, title, sizes, price, types }) => {
  const countItem = useSelector(selectCartItemById(id))

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const addCount = countItem ? countItem.count : 0;

  const dispatch = useDispatch();

  const onAddClick = () => {
    const item: TCartItem = {
      id,
      title,
      price,
      imageUrl,
      size: sizes[activeSize],
      type: pizzaTypes[activeType],
      count: 0,
    }
    dispatch(addItem(item));

  }

  return (


    <div key={id} className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link  to={`/pizza/${id}`}>
          <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map(obj => (<li onClick={() => setActiveType(obj)} className={activeType === obj ? 'active' : ''} key={obj}>{pizzaTypes[obj]}</li>))}
          </ul>
          <ul>
            {
              sizes.map((obj, i) => (
                <li onClick={() => setActiveSize(i)} key={i} className={activeSize === i ? 'active' : ''}>{obj}</li>
              ))
            }

          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onAddClick} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"></path>
            </svg>
            <span>Добавить</span>
            {
              addCount > 0 && (<i>{addCount}</i>)
            }
          </button>
        </div>
      </div>
    </div>

  )

}

export default Pizza_block