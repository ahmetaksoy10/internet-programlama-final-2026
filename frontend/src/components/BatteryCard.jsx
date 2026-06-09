// =============================================================
//  BatteryCard.jsx — "Enerji Seviyesi" kartı
// -------------------------------------------------------------
//  Görevi: Şu anki genel modumu/enerjimi telefon bataryası metaforuyla,
//  esprili ve kişisel bir şekilde göstermek. Sayfaya karakter katar.
//  Batarya CSS ile çizilir; dolu kısmın genişliği ve rengi yüzdeye göre değişir.
// =============================================================

import { Coffee } from 'lucide-react'

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
    <article className="card card--battery">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Coffee size={20} />
        </span>
        <h2 className="card__title">Enerji Seviyesi</h2>
      </div>

      {/* CSS ile çizilmiş batarya: çerçeve + içinde yüzdeye göre dolan kısım */}
      <div className="battery-container" role="img" aria-label={`Enerji %${energyLevel}`}>
        {/* Dolu kısmın genişliği ve rengi inline style ile yüzdeden geliyor */}
        <div
          className="battery-fill"
          style={{ width: `${energyLevel}%`, backgroundColor: renk }}
        />
      </div>

      {/* Büyük yüzde yazısı (renk de yüzdeye göre) */}
      <p className="battery-percent" style={{ color: renk }}>
        %{energyLevel}
      </p>

      {/* Esprili durum mesajı + kahve ikonu */}
      <p className="battery-status">
        <Coffee size={15} aria-hidden="true" />
        <span>{statusMessage}</span>
      </p>
    </article>
  )
}

export default BatteryCard
