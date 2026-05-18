export default function SearchBar({value, onChange}) {
    return (
        <div className="search-bar">
            <span className="search-bar__icon">🔍</span>
            <input 
            type="text" className="search-bar__input"
            placeholder="Rechercher une série..." value={value}
            onChange={(e) => onChange(e.target.value)} 
            />
            {value && (
                <button className="search-bar&__clear" onClick={() => onChange("")}>
                    X
                </button>
            )}
        </div>
    );
}