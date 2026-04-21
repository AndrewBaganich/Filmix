import "./top10Row.css"

export default function top10Row({title, items =[]}){
    return(
        <section className="top10">

            <h2 className="top10-title">{title}</h2>

            <div className="top10-track">
                {items.slice(0,10).map((element, index)=> (

                    <div className="top10-card" key={element.id}>
                        <span className="top10-number">{index + 1}</span>
                        <img className="top10-poster" src={element.posterUrl} alt={element.name}/>
                        <div className="top10-title-films">{element.name}</div>
                        <div className="top10-year-films">{element.year}</div>
                    </div>

                ))}
            </div>

        </section>
    )
}