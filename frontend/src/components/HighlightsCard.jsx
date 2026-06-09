// =============================================================
//  HighlightsCard.jsx — "Yakın Zamanda" kartı
// -------------------------------------------------------------
//  Görevi: Son dönemdeki öne çıkan kişisel deneyimleri (seyahat)
//  keşif temalı bir tonda göstermek.
//
//  GÖRSEL NOTU: Aşağıdaki kareler şimdilik placeholder'dır.
//  İleride Roma seyahatinden gerçek fotoğraflar buraya gelecek.
// =============================================================

import { Plane, MapPin, Camera } from 'lucide-react'

function HighlightsCard() {
  return (
    <article className="card card--highlights">
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
        Nisan ayında <strong>Roma</strong> seyahati gerçekleştirdim. Antik
        mimariyi, dar sokakların ritmini ve bambaşka bir yaşam tarzını yakından
        gözlemledim.
      </p>

      {/* Fotoğraflar henüz eklenmedi; yer tutucu kutular yerine sade bir not.
          TODO: Roma seyahatinden gerçek fotoğraflar eklenecek. */}
      <div className="photos-soon">
        <Camera size={16} aria-hidden="true" />
        <span>Roma'dan fotoğraflar yakında</span>
      </div>
    </article>
  )
}

export default HighlightsCard
