// =============================================================
//  LanguageDonut.jsx — GitHub repolarının dil dağılımı (SVG donut)
// -------------------------------------------------------------
//  Props:
//   - diller : [{ ad, renk, oran (0-1), yuzde }]  (oran toplamı ≈ 1)
//
//  Saf SVG ile çizilir — hiçbir grafik kütüphanesi kullanılmaz.
//  Donut, üst üste binmeyen yaylardan oluşur: her dilim için
//  stroke-dasharray (yay uzunluğu) ve stroke-dashoffset (başlangıç
//  konumu) hesaplanır. Çember -90° döndürülerek tepeden başlatılır.
// =============================================================

const BOYUT = 110 // SVG kenar uzunluğu (px)
const KALINLIK = 16 // halka kalınlığı (px)

function LanguageDonut({ diller }) {
  if (!diller || diller.length === 0) return null

  const r = (BOYUT - KALINLIK) / 2 // halka yarıçapı
  const cevre = 2 * Math.PI * r // tam çember uzunluğu
  let baslangic = 0 // o ana kadar dolan yay uzunluğu (offset için)

  return (
    <div className="gh-langs">
      {/* ── Donut grafiği ── */}
      <svg
        className="gh-donut"
        width={BOYUT}
        height={BOYUT}
        viewBox={`0 0 ${BOYUT} ${BOYUT}`}
        role="img"
        aria-label="Programlama dili dağılımı"
      >
        {/* Zemin halkası (boşlukları kapatan soluk daire) */}
        <circle
          cx={BOYUT / 2}
          cy={BOYUT / 2}
          r={r}
          fill="none"
          stroke="var(--card-border)"
          strokeWidth={KALINLIK}
        />
        {/* Dilimler: tepeden (-90°) başlasın diye grubu döndürüyoruz */}
        <g transform={`rotate(-90 ${BOYUT / 2} ${BOYUT / 2})`}>
          {diller.map((d) => {
            const yay = d.oran * cevre // bu dilimin yay uzunluğu
            const dilim = (
              <circle
                key={d.ad}
                cx={BOYUT / 2}
                cy={BOYUT / 2}
                r={r}
                fill="none"
                stroke={d.renk}
                strokeWidth={KALINLIK}
                strokeDasharray={`${yay} ${cevre - yay}`}
                strokeDashoffset={-baslangic}
                strokeLinecap="butt"
              />
            )
            baslangic += yay
            return dilim
          })}
        </g>
      </svg>

      {/* ── Açıklama (legend): renk + dil + yüzde ── */}
      <ul className="gh-lang-legend">
        {diller.map((d) => (
          <li key={d.ad} className="gh-lang-item">
            <span
              className="gh-lang-dot"
              style={{ background: d.renk }}
              aria-hidden="true"
            />
            <span className="gh-lang-ad">{d.ad}</span>
            <span className="gh-lang-yuzde">%{d.yuzde}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LanguageDonut
