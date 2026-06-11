// =============================================================
//  AboutCard.jsx — "Kimim Ben?" kartı (v2: selamlama kartı)
// -------------------------------------------------------------
//  Görevi: Kendimi şablon bullet listesi yerine, insan gibi
//  konuşan kısa bir metinle tanıtmak. Kart, gridteki diğer
//  kartlardan bilinçli olarak farklı bir yapıdadır:
//  ikon kutulu başlık yok — büyük bir selamlama + düzyazı +
//  altta küçük "kimlik kartı" satırı.
// =============================================================

import { GraduationCap, MapPin, School } from 'lucide-react'

// Alt satırdaki kısa kimlik bilgileri (ikon + metin)
const kunye = [
  { icon: GraduationCap, metin: 'BAÜN Bilg. Müh. · 2. sınıf' },
  { icon: MapPin, metin: 'Karesi, Balıkesir' },
  { icon: School, metin: 'Sınav Koleji mezunu' },
]

function AboutCard() {
  return (
    <article className="card card--about card--intro">
      {/* Selamlama: kartın başlığı, ama başlık gibi durmayan sıcak bir açılış */}
      <h2 className="intro__selam">
        Merhaba, ben Ahmet<span className="intro__nokta">.</span>
      </h2>

      <p className="card__text">
        Bilgisayar mühendisliği öğrencisiyim (2024 girişli) ve kod yazmak benim
        için bir ders değil, bir merak işi — aklıma takılan fikri küçük bir
        projeye dönüştürmeden rahat edemiyorum. Yeni bir şey öğrenmek,
        denemek ve bozup yeniden yapmak günümün en sevdiğim kısmı.
      </p>

      {/* Künye satırı: en alta yaslanan, küçük ikonlu kimlik bilgileri */}
      <ul className="intro__kunye" aria-label="Kısa bilgiler">
        {kunye.map((bilgi) => {
          const Ikon = bilgi.icon
          return (
            <li key={bilgi.metin}>
              <Ikon size={14} aria-hidden="true" />
              {bilgi.metin}
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default AboutCard
