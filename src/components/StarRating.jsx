import { useState } from "react";

export default function StarRating({note, interactive = false, onRate}) {
    const [hovered, setHovered] = useState(0);
    const totalStars = 5;

    const handleClick = (value) => {
        if (interactive && onRate) onRate(value);
    };

    return (
        <div className={'star-rating ${interactive ? "star-rating--interactive" : ""}'}>
            {Array.from({length: totalStars}, (_,i) => {
                const value = i + 1;
                const filled = value <= (hovered || note);
                const half = !filled && value - 0.5 <= (hovered || note);
                return (
                    <span key={i} className={'star ${filled ? "star--filled" : half ? "star--half" : "star--empty"}'}
                    onMouseEnter={() => interactive && setHovered(value)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    onClick={() => handleClick(value)}>
                        {filled ? "★" : half ? "⯨" : "☆"}
                    </span>
                );
            })}
            <span className="star-value">{(hovered || note)?.toFixed(1)}</span>
        </div>
    );
}