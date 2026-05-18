export default function FilterBar({genres, chaines, selectedChaine, onGenreChange, onChaineChange}) {
    return (
        <div className="filter-bar">
            <div className="filter-group">
                <label className="filter-label">Genre</label>
                <div className="filter-buttons">
                    <button className={'filter-btn ${selectedGenre === "" ? "filter-btn--active" : ""}'}
                    onClick={() => onGenreChange("")}>
                        Tous
                    </button>
                    {genres.map((g) => (
                        <button key={g} className={'filter-btn ${selectedGenre === g ? "filter-btn--active" : ""}'}
                        onClick={() => onGenreChange(g)}>
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <label className="filter-label">Chaine</label>
                <select className="filter-select" value={selectedChaine} 
                onChange={(e) => onChaineChange(e.target.value)}>
                    <option value="">Toutes les chaînes</option>
                    {chaines.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}