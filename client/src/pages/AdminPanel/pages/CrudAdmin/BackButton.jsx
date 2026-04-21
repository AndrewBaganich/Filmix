import { useNavigate } from "react-router-dom";
import "./backButton.css"

export default function BackButton ({text}){
    const navigate = useNavigate()

    return(
        <button className="back-button" onClick={()=>navigate(-1)}> {text} </button>
    );
};