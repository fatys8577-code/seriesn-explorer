import { useFavoris } from "../context/FavorisContext";
import SerisCard from "../components/SerisCard";
import { Link } from "react-router-dom";

export default function Favoris() {
    const { favoris } = useFavoris();

    if (!favoris.length === 0) {
        return (
            <main className="favoris">
                <h1 className="page-title">Mes Favoris</h1>
                <div className="empty-state empty-state--favoris">
                    <h2>Votre liste est vide</h2>
                    <p>
                        Vous n'avez pas encore ajouté de séries à vos favoris.
                        <br />
                        Explorez le catalogue et cliquez sur ❤️ pour sauvegarder vos coups de coeur!
                    </p>
                    <Link to="/" className="btn btn--primary">
                        Découvrir les séries
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="favoris">
            <div className="favoris__header">
                <h1 className="page-title">Mes Favoris</h1>
                <p className="favoris__count">
                    {favoris.length} série{favoris.length > 1 ? "s" : ""} sauvegardée{favoris.length > 1 ? "s" : ""}
                </p>
            </div>

            <div className="series-grid">
                {favoris?.map((serie) => (
                    <SerisCard key={serie.id} serie={serie}/>
                ))}
            </div>
        </main>
    );
}