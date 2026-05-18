import { useState,useMemo } from "react";
import seriesData from "../data/series.json";
import SerieCard from "../components/SerisCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

const PAGE_SIZE = 8;

export default function Accueil() {
    const [recherche, setRecherche] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedChaine, setSelectedChaine] = useState("");
    const [page, setPage] = useState(1);

    const genres = useMemo(() => {
        const all = seriesData.flatMap((s) => s.genre);
        return [...new Set(all)].sort();
    }, []);

    const chaines = useMemo(() => {
        return [...new Set(seriesData.map((s) => s.chaine))].sort();
        }, []);

    const seriesFiltrees = useMemo(() => {
        return seriesData.filter((s) => {
            const matchRecherche = s.titre .toLowerCase() .includes(recherche.toLowerCase());
            const matchGenre = selectedGenre === "" || s.genre.includes(selectedGenre);
            const matchChaine = selectedChaine === "" || s.chaine === selectedChaine;
            return matchRecherche && matchGenre && matchChaine;
        });
    }, [recherche, selectedGenre, selectedChaine]);

    const seriesPage = seriesFiltrees.slice(0, page * PAGE_SIZE);
    const hasMore = page * PAGE_SIZE < seriesFiltrees.length;

    return (
        <main className="accueil">
            <div className="hero">
                <h1 className="hero__title">
                    Découvrez les <span className="hero__accueil">meilleures séries</span>
                    <br />sénégalaises
                </h1>
                <p className="hero__subtile">
                    {seriesData.length} séries à explorer
                </p>
            </div>

            <div className="accueil__controls">
               <SearchBar value={recherche} onChange={(val) => {setRecherche(val); setPage(1);}} />
                <FilterBar genres={genres} chaines={chaines} selectedGenre={selectedGenre}
                selectedChaine={selectedChaine} onGenreChange={(val) => {setSelectedChaine(val); setPage(1);}}
                onChaineChange={(val) => {setSelectedChaine(val); setPage(1);}}
                />
            </div>

            <div className="resultats-count">
                <span>
                    {seriesFiltrees.length} série{seriesFiltrees.length > 1 ? "s" : ""} trouvée{seriesFiltrees.length > 1 ? "s" : ""}
                </span>
                {(recherche || selectedGenre || selectedChaine) && (
                    <button className="reset-btn" onClick={() => {
                        setRecherche(""); setSelectedGenre(""); setSelectedChaine(""); setPage(1);
                    }}>
                        R&initialiser les filtres
                    </button>
                )}
            </div>

            {seriesFiltrees.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-state__icon">🎭</span>
                    <p>Aucune série ne correspond à votre recherche.</p>
                </div>
            ) : (
                <>
                    <div className="series-grid">
                        {seriesPage.map((serie) => (
                            <SerieCard key={serie.id} serie = {serie} />
                        ))}
                    </div>
                    {hasMore && (
                        <div className="voir-plus">
                            <button className="voir-plus-btn" onClick={() => setPage((p) => p + 1)}>
                                Voir plus
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
}