import logoImg from '../assets/logo.jpg';

export const Header = () => {
  return (
    <header id="main-header">
        <div id="title">
            <img src={logoImg} alt='restirant logo' />
            <h1>ReactFood</h1>
        </div>
        <nav>
            <button>Card (0)</button>
        </nav>
    </header>
  )
}
