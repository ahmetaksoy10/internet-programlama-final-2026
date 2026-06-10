// =============================================================
//  BooksCard.jsx — "Şu An Okuyorum" (Books) kartı
// -------------------------------------------------------------
//  Görevi: Şu anda okuduğum kitabı; gerçek kapak görseli, ad, yazar,
//  tür etiketleri, kısa tanıtım ve okuma ilerlemesi ile göstermek.
// =============================================================

import { BookOpen, Tv } from 'lucide-react'
// İlerleme yüzdesini 0'dan hedefe sayarak gösteren bileşen
import CountUp from './CountUp.jsx'
// Kitap kapağı — Vite asset importu (build'de hash'lenir)
import siloKapak from '../assets/silo-kapak.jpg'

// --- Kitap verisi ---
// Kitap bitince/değişince yalnızca bu nesneyi ve yüzdeyi güncelle.
const KITAP = {
  ad: 'Silo',
  seri: 'Wool Serisi · 1. Kitap',
  yazar: 'Hugh Howey',
  turler: ['Bilim Kurgu', 'Distopya', 'Postapokaliptik'],
  ozet:
    'Dışarısı zehirli, gökyüzü yalnızca dev ekranlardan izlenebilen bir dünyada insanlığın son kalıntısı, yüzlerce kat derinliğindeki bir yeraltı silosunda yaşıyor. Dışarı çıkmak ölüm; dışarıyı merak etmekse silodaki en büyük yasak.',
  notlar:
    'Howey’nin önce internette bölüm bölüm yayımlayıp fenomene dönüştürdüğü seri — kapalı bir toplumun kurallarını sorgulamanın bedelini, mühendis Juliette’in gözünden anlatıyor.',
  uyarlama: 'Apple TV+’taki "Silo" dizisinin kaynak kitabı',
}

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
        {/* Gerçek kitap kapağı */}
        <div className="book-cover">
          <img
            src={siloKapak}
            alt={`${KITAP.ad} kitabının kapağı`}
            className="book-cover__img"
            width="76"
            height="112"
            loading="lazy"
          />
        </div>

        <div className="book-info">
          <p className="book-info__title">{KITAP.ad}</p>
          <p className="book-info__series">{KITAP.seri}</p>
          <p className="book-info__author">{KITAP.yazar}</p>

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

      {/* Tür etiketleri (projelerdeki .tag ailesiyle aynı görsel dil) */}
      <div className="tag-row book-tags">
        {KITAP.turler.map((tur) => (
          <span key={tur} className="tag">
            {tur}
          </span>
        ))}
      </div>

      {/* Merak uyandıran özet + serinin kısa hikâyesi */}
      <p className="book-blurb">{KITAP.ozet}</p>
      <p className="book-blurb">{KITAP.notlar}</p>

      {/* Dizi uyarlaması notu: küçük, ayrışan bir dipnot satırı */}
      <p className="book-adaptation">
        <Tv size={14} aria-hidden="true" />
        <span>{KITAP.uyarlama}</span>
      </p>
    </article>
  )
}

export default BooksCard
