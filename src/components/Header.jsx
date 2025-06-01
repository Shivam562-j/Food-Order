import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

export const Header = () => {

  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalCartItems, item) => {
    return totalCartItems + item.quantity;
  }, 0)

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt='restirant logo' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly>Card ({totalCartItems})</Button>
      </nav>
    </header>
  )
}
