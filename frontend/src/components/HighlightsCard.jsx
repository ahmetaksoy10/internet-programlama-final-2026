// =============================================================
//  HighlightsCard.jsx — "Yakın Zamanda" kartı (Roma seyahati)
// -------------------------------------------------------------
//  Görevi: Nisan'daki Roma seyahatini kısa bir metin + 4 karelik
//  fotoğraf kolajıyla göstermek. Kolajdaki herhangi bir kareye
//  tıklayınca tüm fotoğrafların gezilebildiği lightbox açılır
//  (kartta yer kaplamadan 9 fotoğrafın tamamına erişim).
// =============================================================

import { useState } from 'react'
import { Plane, MapPin, Images } from 'lucide-react'
import FotoGaleriModal from './FotoGaleriModal.jsx'

// Fotoğraflar Vite asset'i olarak import edilir (build'de hash'lenir,
// GitHub Pages base yolu otomatik eklenir).
import roma1 from '../assets/roma/roma1.jpg'
import roma2 from '../assets/roma/roma2.jpg'
import roma3 from '../assets/roma/roma3.jpg'
import roma4 from '../assets/roma/roma4.jpg'
import roma5 from '../assets/roma/roma5.jpg'
import roma6 from '../assets/roma/roma6.jpg'
import roma7 from '../assets/roma/roma7.jpg'
import roma8 from '../assets/roma/roma8.jpg'
import roma9 from '../assets/roma/roma9.jpg'

// --- Fotoğraf listesi ---
// alt metinleri hem erişilebilirlik hem lightbox alt yazısı olarak kullanılır.
const romaFotolar = [
  { src: roma1, alt: 'Kolezyum — yeşillikler arasından' },
  { src: roma2, alt: 'Kolezyum önünde' },
  { src: roma3, alt: 'Konstantin Takı' },
  { src: roma4, alt: 'Roma’nın arnavut kaldırımlı sokakları' },
  { src: roma5, alt: 'Piazza Venezia yakınındaki ikiz kubbeli kiliseler' },
  { src: roma6, alt: 'Tiber Nehri kıyısı' },
  { src: roma7, alt: 'Villa Borghese göleti' },
  { src: roma8, alt: 'Asklepios Tapınağı — Villa Borghese' },
  { src: roma9, alt: 'Vittoriano — Altare della Patria' },
]

// Kartta görünen kare sayısı (kalanı "+N" rozetiyle lightbox'a davet eder)
const KOLAJ_SAYISI = 4

function HighlightsCard() {
  // Lightbox'ta açık fotoğrafın indeksi (null → kapalı)
  const [seciliFoto, setSeciliFoto] = useState(null)
  const kalan = romaFotolar.length - KOLAJ_SAYISI

  return (
    <article className="card card--highlights">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <Plane className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Plane size={20} />
        </span>
        <h2 className="card__title">Yakın Zamanda</h2>
      </div>

      {/* Konum etiketi */}
      <div className="place-tag">
        <MapPin size={14} aria-hidden="true" />
        <span>Roma, İtalya</span>
      </div>

      <p className="card__text">
        Nisan ayında <strong>Roma</strong>'daydım. Kolezyum'dan Villa
        Borghese'ye, antik mimariyi, dar sokakların ritmini ve bambaşka bir
        yaşam tarzını yakından gözlemledim.
      </p>

      {/* Fotoğraf kolajı: ilk 4 kare; son karede "+N" rozeti.
          Her kare tıklanabilir → o fotoğraftan başlayan lightbox açılır. */}
      <div className="foto-grid">
        {romaFotolar.slice(0, KOLAJ_SAYISI).map((foto, i) => (
          <button
            key={foto.src}
            className="foto-grid__item"
            onClick={() => setSeciliFoto(i)}
            aria-label={`${foto.alt} — galeriyi aç`}
          >
            <img src={foto.src} alt={foto.alt} loading="lazy" />
            {/* Son karede kalan fotoğraf sayısı rozeti */}
            {i === KOLAJ_SAYISI - 1 && kalan > 0 && (
              <span className="foto-grid__more" aria-hidden="true">
                <Images size={15} />
                +{kalan}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox (portal ile body'ye çizilir) */}
      <FotoGaleriModal
        baslik="Roma, İtalya"
        fotolar={romaFotolar}
        acikIndex={seciliFoto}
        onClose={() => setSeciliFoto(null)}
      />
    </article>
  )
}

export default HighlightsCard
