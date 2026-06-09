// =============================================================
//  AboutCard.jsx — "Kimim Ben?" kartı
// -------------------------------------------------------------
//  Görevi: Kendimi kısa, taranabilir (scannable) maddelerle tanıtmak.
//  Tek uzun paragraf yerine, her satırın başında küçük bir Lucide
//  ikonu olan madde listesi kullanılır.
// =============================================================

import { UserRound, GraduationCap, School, MapPin, Heart } from 'lucide-react'

// --- Tanıtım maddeleri ---
// Her madde: bir ikon ve bir metinden oluşur. Diziyi .map() ile listeliyoruz.
const maddeler = [
  { icon: GraduationCap, metin: 'BAÜN Bilgisayar Mühendisliği, 2. sınıf (2024 giriş)' },
  { icon: School, metin: 'Balıkesir Sınav Koleji mezunu' },
  { icon: MapPin, metin: 'Karesi, Balıkesir' },
  { icon: Heart, metin: 'Kod yazmayı, öğrenmeyi ve yeni şeyler denemeyi seviyorum' },
]

function AboutCard() {
  return (
    <article className="card card--about">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <UserRound size={20} />
        </span>
        <h2 className="card__title">Kimim Ben?</h2>
      </div>

      {/* İkonlu madde listesi */}
      <ul className="info-list">
        {maddeler.map((madde) => {
          // İlgili maddenin ikon bileşenini değişkene alıyoruz
          const Ikon = madde.icon
          return (
            <li key={madde.metin} className="info-item">
              <Ikon size={17} className="info-item__icon" aria-hidden="true" />
              <span>{madde.metin}</span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default AboutCard
