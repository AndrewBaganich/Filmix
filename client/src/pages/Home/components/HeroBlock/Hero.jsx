import "./hero.css"
import testCover from "@/assets/welcome-bg.jpg"


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img className="hero-img" src={testCover} alt="Hero background" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-trailer">
        <iframe 
          src="https://www.youtube.com/embed/Q5H7o13LRtU?autoplay=1&mute=1" 
          title="Trailer"
          allow=" autoplay; encrypted-media"
          allowFullScreen>
        </iframe>
      </div>

      <div className="hero-content">
        <div className="hero-tag">НОВИЙ ХІТ</div>
        <h1 className="hero-title">Темний ліс</h1>
        <p className="hero-desc">
          Містичний трилер про зникнення в горах - і правду, яку краще не знаходити.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary">▶ Дивитись</button>
        </div>
      </div>
    </section>
  )
}