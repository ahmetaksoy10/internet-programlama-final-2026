// =============================================================
//  TrainingCard.jsx — "Antrenman Günlüğü" kartı
// -------------------------------------------------------------
//  Görevi: Koşu antrenmanlarımı ve ekipmanlarımı sportif/enerjik
//  bir tonda göstermek. 15 km hedefine ilerlemeyi görsel bir
//  ilerleme çubuğuyla (progress bar) anlatır.
// =============================================================

import { HeartPulse, Footprints, Shirt } from 'lucide-react'

// 15 km hedefine ulaşılan yüzde (görsel ilerleme çubuğu için).
// Sabit bir değer tutuyoruz; ilerleme çubuğunun genişliği buna göre ayarlanır.
const HEDEF_YUZDE = 60

function TrainingCard() {
  return (
    <article className="card card--training">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <HeartPulse size={20} />
        </span>
        <h2 className="card__title">Antrenman Günlüğü</h2>
      </div>

      <p className="card__text">
        <strong>15 km</strong> hedefine yönelik "yürü-koş" (interval)
        antrenmanları yapıyorum. Odağım uzun mesafe dayanıklılığımı adım adım
        artırmak.
      </p>

      {/* --- İlerleme çubuğu --- */}
      {/* role="progressbar" ve aria-* nitelikleri ekran okuyucular için anlam taşır. */}
      <div className="progress">
        <div className="progress__labels">
          <span>15 km hedefine doğru</span>
          <span className="progress__value">%{HEDEF_YUZDE}</span>
        </div>
        <div
          className="progress__track"
          role="progressbar"
          aria-valuenow={HEDEF_YUZDE}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="15 km hedefine ilerleme"
        >
          {/* Dolgu genişliği, inline style ile yüzdeye göre belirleniyor */}
          <div className="progress__fill" style={{ width: `${HEDEF_YUZDE}%` }} />
        </div>
      </div>

      {/* --- Ekipman listesi --- */}
      <ul className="gear-list">
        <li className="gear-item">
          <Shirt size={16} className="gear-item__icon" aria-hidden="true" />
          <span>
            <strong>Salomon Adv Skin 5</strong> koşu yeleği
          </span>
        </li>
        <li className="gear-item">
          <Footprints size={16} className="gear-item__icon" aria-hidden="true" />
          <span>
            <strong>Salomon Aero Glide 3</strong> koşu ayakkabısı
          </span>
        </li>
      </ul>
    </article>
  )
}

export default TrainingCard
