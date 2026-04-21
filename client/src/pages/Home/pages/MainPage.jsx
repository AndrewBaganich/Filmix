
import Hero from "@/pages/Home/components/HeroBlock/Hero.jsx"
import Top10Row from "@/pages/Home/components/Top10Row/Top10Row.jsx";
import { DB_IMITATE, DB_SERIES_IMITATE} from "../../../../DB_IMITATE.js";
import GridFilms from "@/pages/Home/components/GridFilmsBlock/GridFilms.jsx";

const DB = DB_IMITATE.concat(DB_SERIES_IMITATE)

export default function Home(){
    return (
        <>
            <Hero />
            <Top10Row title="TOП 10 ФІЛЬМІВ" items={DB_IMITATE}/>
            <Top10Row title="TOП 10 СЕРІАЛІВ" items={DB_SERIES_IMITATE}/>
            <GridFilms title="Всі фільми та серіали" items={DB}/>
        </>
    )
}