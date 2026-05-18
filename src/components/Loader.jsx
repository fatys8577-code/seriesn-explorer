export default function Loader({message = "Chargement..."}) {
    return (
        <div className="loader">
            <div className="loader__spinner">
                <div className="loader__ring"></div>
                <div className="loader__ring loader__ring--delay"></div>
            </div>
            <p className="loader__text">{message}</p>
        </div>
    );
}