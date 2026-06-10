// =============================================================
//  TechStackCard.jsx — "Araç Kutum" (Tech Stack) kartı
// -------------------------------------------------------------
//  Görevi: Kullandığım teknolojileri kategorilere ayırarak
//  küçük "chip" (rozet) kutuları halinde göstermek.
//  Veri statiktir (API yok); kategoriler bir dizide tutulur.
// =============================================================

import { Wrench } from 'lucide-react'

// --- Teknoloji verileri ---
// Her kategori bir başlık ve o kategoriye ait teknolojiler dizisinden oluşur.
// Yeni bir teknoloji eklemek için ilgili diziye bir metin eklemek yeterli.
const kategoriler = [
  {
    baslik: 'Diller',
    ogeler: ['Python', 'JavaScript', 'Swift', 'SQL', 'C'],
  },
  {
    baslik: 'Framework & Kütüphaneler',
    ogeler: ['React', 'FastAPI', 'SwiftUI', 'PyQt5'],
  },
  {
    baslik: 'Araçlar & Platformlar',
    ogeler: ['Git & GitHub', 'VS Code', 'Xcode', 'Tinkercad', 'SQLite', 'Figma'],
  },
]

function TechStackCard() {
  return (
    <article className="card card--tech">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <Wrench className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Wrench size={20} />
        </span>
        <h2 className="card__title">Araç Kutum</h2>
      </div>

      {/* Kategorileri .map() ile dönüyoruz; her kategori için bir başlık ve
          altında chip'lerin bulunduğu bir grup üretiyoruz. */}
      <div className="tech-groups">
        {kategoriler.map((kategori) => (
          <div key={kategori.baslik} className="tech-group">
            {/* Küçük, gri kategori başlığı */}
            <h3 className="tech-group__title">{kategori.baslik}</h3>

            {/* Chip'ler — esnek (flex-wrap) bir satırda sıralanır */}
            <div className="chip-row">
              {kategori.ogeler.map((oge) => (
                <span key={oge} className="chip">
                  {oge}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default TechStackCard
