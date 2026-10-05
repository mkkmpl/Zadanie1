import { useState } from 'react';
import "./App.css";

export default function App() {
  const [filmy, ustawFilmy] = useState([
    { id: 1, tytul: 'Interstellar', rok: 2014, gatunek: 'Sci-Fi', obejrzany: false, rating: 0 },
    { id: 2, tytul: 'Inception', rok: 2010, gatunek: 'Sci-Fi', obejrzany: false, rating: 0 },
    { id: 3, tytul: 'Shrek', rok: 2001, gatunek: 'Bajka', obejrzany: false, rating: 0 },
  ]);

  const [filtr, ustawFiltr] = useState('wszystkie');

  // Stany do obsługi formularza nowego filmu
  const [nowyTytul, ustawNowyTytul] = useState('');
  const [nowyRok, ustawNowyRok] = useState('');
  const [nowyGatunek, ustawNowyGatunek] = useState('');

  const przelaczObejrzany = (id: number) => {
    ustawFilmy(
      filmy.map((film) =>
        film.id === id ? { ...film, obejrzany: !film.obejrzany } : film
      )
    );
  };

  const liczbaObejrzanych = filmy.filter((film) => film.obejrzany).length;

  const zmienOcene = (id: number, nowaOcena: number) => {
    ustawFilmy(
      filmy.map((film) =>
        film.id === id ? { ...film, rating: nowaOcena } : film
      )
    );
  };

  
  const dodajFilm = (e: React.FormEvent) => {

    if (!nowyTytul.trim() || !nowyRok || !nowyGatunek.trim()) return;

    
    const nowyObiektFilmu = {
      id: Date.now(), 
      tytul: nowyTytul,
      rok: Number(nowyRok),
      gatunek: nowyGatunek,
      obejrzany: false,
      rating: 0,
    };

    ustawFilmy([...filmy, nowyObiektFilmu]);

    ustawNowyTytul('');
    ustawNowyRok('');
    ustawNowyGatunek('');
  };

  const przefiltrowaneFilmy = filmy.filter((film) => {
    if (filtr === 'obejrzane') return film.obejrzany;
    if (filtr === 'nieobejrzane') return !film.obejrzany;
    return true;
  });

  return (
    <div className="app-container">
      {/* Nagłówek strony */}
      <div className="header">
        <div>
          <h1 className="header-title">🎥 Moja Kolekcja Filmów</h1>
          <p className="header-subtitle">Zarządzaj swoją listą filmów do obejrzenia</p>
        </div>
        <div className="counter-box">
          <span className="counter-label">Postęp</span>
          <span className="counter-value">
            {liczbaObejrzanych} / {filmy.length} obejrzane
          </span>
        </div>
      </div>

      {/* FORMULARZ DO DODAWANIA FILMU */}
      <form onSubmit={dodajFilm} className="filter-container" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Tytuł filmu..." 
          value={nowyTytul} 
          onChange={(e) => ustawNowyTytul(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', flex: '1' }}
        />
        <input 
          type="number" 
          placeholder="Rok..." 
          value={nowyRok} 
          onChange={(e) => ustawNowyRok(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
        />
        <input 
          type="text" 
          placeholder="Gatunek..." 
          value={nowyGatunek} 
          onChange={(e) => ustawNowyGatunek(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '130px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          + Dodaj film
        </button>
      </form>

      {/* Przyciski filtrów */}
      <div className="filters-container">
        {['wszystkie', 'obejrzane', 'nieobejrzane'].map((typ) => (
          <button 
            key={typ}
            onClick={() => ustawFiltr(typ)}
            className={`filter-btn ${filtr === typ ? 'active' : 'inactive'}`}
          >
            {typ}
          </button>
        ))}
      </div>

      {/* Siatka z filmami */}
      <div className="movies-grid">
        {przefiltrowaneFilmy.map((film) => (
          <div key={film.id} className="movie-card">
            <div className={`movie-status-bar ${film.obejrzany ? 'watched' : 'unwatched'}`} />

            <div>
              <div className="movie-header">
                <h3 className="movie-title">{film.tytul}</h3>
                <span className={`movie-badge ${film.obejrzany ? 'watched' : 'unwatched'}`}>
                  {film.obejrzany ? 'Obejrzany' : 'Do obejrzenia'}
                </span>
              </div>

              <div className="movie-info">
                <span>📅 Rok: <strong>{film.rok}</strong></span>
                <span>🎬 Gatunek: <strong>{film.gatunek}</strong></span>
              </div>

              <div className="movie-rating-box">
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Ocena:</span>
                <strong style={{ color: '#f59e0b', fontSize: '1.1rem' }}>{film.rating} / 5 ⭐</strong>
              </div>
            </div>

            <div className="movie-actions">
              <button
                onClick={() => przelaczObejrzany(film.id)}
                className={`toggle-btn ${film.obejrzany ? 'watched' : 'unwatched'}`}
              >
                {film.obejrzany ? '✓ Oznacz jako nieobejrzany' : '+ Oznacz jako obejrzany'}
              </button>
              
              <div>
                <span className="rating-section-label">Oceń film:</span>
                <div className="rating-stars-container">
                  {[1, 2, 3, 4, 5].map((gwiazdka) => (
                    <button
                      key={gwiazdka}
                      onClick={() => zmienOcene(film.id, gwiazdka)}
                      className={`star-btn ${film.rating >= gwiazdka ? 'active' : 'inactive'}`}
                    >
                      {gwiazdka}★
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}