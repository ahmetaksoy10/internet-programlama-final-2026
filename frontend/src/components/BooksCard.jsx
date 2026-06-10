// =============================================================
//  BooksCard.jsx — "Şu An Okuyorum" (Books) kartı
// -------------------------------------------------------------
//  Görevi: Şu anda okuduğum kitabı; kapak (placeholder), ad, yazar
//  ve okuma ilerlemesi (progress bar) ile göstermek. Statik veridir.
// =============================================================

import { BookOpen, Book } from 'lucide-react'
// İlerleme yüzdesini 0'dan hedefe sayarak gösteren bileşen
import CountUp from './CountUp.jsx'

// Okuma ilerlemesi yüzdesi (ilerleme çubuğunun genişliği için).
const OKUMA_YUZDE = 40

function BooksCard() {
  return (
    <article className="card card--books">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <BookOpen className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <BookOpen size={20} />
        </span>
        <h2 className="card__title">Şu An Okuyorum</h2>
      </div>

      <div className="book-row">
        {/* Kitap kapağı placeholder'ı.
            TODO: Gerçek kapak görseli → <img src="/kitap.jpg" alt="Kitap kapağı" /> */}
        <div className="book-cover" aria-hidden="true">
          <Book size={28} />
        </div>

        <div className="book-info">
          {/* TODO: Kitap adı ve yazarı güncellenecek */}
          <p className="book-info__title">Kitap Adı Buraya</p>
          <p className="book-info__author">Yazar Adı</p>

          {/* Okuma ilerleme çubuğu */}
          <div className="progress">
            <div className="progress__labels">
              <span>Okuyorum</span>
              <span className="progress__value">%<CountUp value={OKUMA_YUZDE} /></span>
            </div>
            <div
              className="progress__track"
              role="progressbar"
              aria-valuenow={OKUMA_YUZDE}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Okuma ilerlemesi"
            >
              {/* Dolgu genişliği yüzdeye göre inline ayarlanır */}
              <div className="progress__fill" style={{ width: `${OKUMA_YUZDE}%` }} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BooksCard
