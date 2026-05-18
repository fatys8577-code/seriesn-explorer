import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import seriesData from "../data/series.json";
import StarRating from "../components/StarRating";
import Loader from "../components/Loader";
import { useFavoris } from "../context/FavorisContext";

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userNote, setUserNote] = useState(null);
    const { estFavori, ajouterFavori, retirerFavori } = useFavoris();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const found = seriesData.find((s) => s.id ===parseInt(id));
            setSerie(found || null);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [id]);

    if (loading) return <Loader message="Chargement de la série."/>;

    if (!serie) {
        return (
            <div className="error-page">
                <span className="error-page__icon">📺</span>
                <h2>Série introuvable</h2>
                <p>La série <strong># {id}</strong>n'existe pas</p>
                <button className="btn btn--primary" onClick={() => navigate("/")}>
                    ← Retour à l'accueil
                </button>
            </div>
        );
    }
    
    const favori = estFavori(serie.id);

    return (
        <main className="detail">
            <button className="btn btn--back" onClick={() => navigate(-1)}>
                ← Retour
            </button>

            <div className="detail__hero">
                <div className="detail__image-wrapper">
                    <img src={serie.image} alt={serie.titre} className="detail__image" />
                    {serie.enCours && (
                        <span className="badge badge--encours badge--lg">En cours</span>
                    )}
                </div>

                <div className="detail__content">
                    <div className="detail__chaine-row">
                        <span className="detail__chainee">{serie.chaine}</span>
                        <span className="detail__annee">{serie.annee}</span>
                        <span className="detail__saisons">{serie.saisons} saison{serie.saisons > 1 ? "s" : ""}
                        </span>
                    </div>

                    <h1 className="detail__title">{serie.titre}</h1>

                    <div className="detail__rating">
                        <StarRating note={userNote || serie.note}
                        interactive={true} onRate={setUserNote} 
                        />
                        {userNote && (
                            <span className="detail__user-note">Votre note : {userNote}/5</span>
                        )}
                    </div>

                    <div className="detail__genres">
                        {serie.genre.map((g) => (
                            <span key={g} className="genre-tag genre-tag--lg">{g}</span>
                        ))}
                    </div>
                    <p className="detail__synopsis">{serie.synopsis}</p>
                    
                    <div className="detail__acteurs">
                        <h3 className="detail__section-title">Acteurs principaux</h3>
                        <div className="acteurs-list">
                            {serie.acteurs.map((a) => (
                                <span key={a} className="acteur-tag">{a}</span>
                            ))}
                        </div>
                    </div>

                    <button className={'btn ${favori ? "btn--danger" : "btn--primary"}'}
                    onClick={() => favori ? retirerFavori(serie.id) : ajouterFavori(serie.id)}
                    >
                        {favori ? "💔 Retirer des favoris" : "❤️ Ajouter des favoris"}
                    </button>
                </div>
            </div>
        </main>
    );
}