import "./footer.css"
import logo2 from "@/assets/logo2.png"

export default function Footer (){
    return(
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img className="footer-logo" src={logo2} alt="" />
          </div>

          <nav className="footer-nav">
            <a href="#">Про сервіс</a>
            <a href="#">Умови користування</a>
            <a href="#">Конфіденційність</a>
            <a href="#">Контакти</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Filmix</span>
          <span>Streaming platform</span>
        </div>
      </div>
    </footer>
    )
}