// =============================================================
//  BatteryCard.jsx — "Enerji Seviyesi" kartı
// -------------------------------------------------------------
//  Görevi: Şu anki genel modumu/enerjimi telefon bataryası metaforuyla,
//  esprili ve kişisel bir şekilde göstermek. Sayfaya karakter katar.
//  Batarya CSS ile çizilir; dolu kısmın genişliği ve rengi yüzdeye göre değişir.
// =============================================================

import { Coffee } from 'lucide-react'
// Yüzdeyi 0'dan hedefe sayarak gösteren bileşen
import CountUp from './CountUp.jsx'

// --- Enerji verileri ---
// İleride güncellemek için sadece bu iki değeri değiştirmek yeterli.
const energyLevel = 75
const statusMessage = 'Finaller yaklaşıyor ama kahve desteğiyle sistem ayakta'

// Yüzdeye göre batarya rengini döndüren yardımcı fonksiyon.
// %70+ yeşil, %40-69 turuncu, altı kırmızı.
function bataryaRengi(yuzde) {
  if (yuzde >= 70) return '#00b894' // yeşil
  if (yuzde >= 40) return '#fdcb6e' // turuncu
  return '#e17055' // kırmızı
}

function BatteryCard() {
  // O anki yüzdeye karşılık gelen rengi hesaplıyoruz
  const renk = bataryaRengi(energyLevel)

  return (
    // .card--stat: ikon kutulu başlık şablonunu kırar — sayı önde,
    // başlık küçük bir etiket olarak üstte durur (stat-first yapı).
    <article className="card card--battery card--stat">
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <Coffee className="card__ghost" strokeWidth={1.5} aria-hidden="true" />

      {/* Başlık: görsel olarak küçük etiket, semantik olarak yine h2 */}
      <h2 className="stat-label">Enerji Seviyesi</h2>

      {/* Kahraman satır: dev yüzde + yanında CSS ile çizilmiş batarya */}
      <div className="stat-hero">
        <p className="battery-percent" style={{ color: renk }}>
          %<CountUp value={energyLevel} />
        </p>
        <div className="battery-container" role="img" aria-label={`Enerji %${energyLevel}`}>
          {/* Dolu kısmın genişliği ve rengi inline style ile yüzdeden geliyor */}
          <div
            className="battery-fill"
            style={{ width: `${energyLevel}%`, backgroundColor: renk }}
          />
        </div>
      </div>

      {/* Esprili durum mesajı + kahve ikonu */}
      <p className="battery-status">
        <Coffee size={15} aria-hidden="true" />
        <span>{statusMessage}</span>
      </p>
    </article>
  )
}

export default BatteryCard
