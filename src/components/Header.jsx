import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';

export const Header = () => {
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt='restirant logo' />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <Button textOnly>Card (0)</Button>
        </nav>
    </header>
  )
}
