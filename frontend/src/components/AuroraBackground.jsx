// =============================================================
//  AuroraBackground.jsx — Arka plandaki yumuşak ışık lekeleri
// -------------------------------------------------------------
//  Görevi: Sayfanın en arkasında (fixed) yavaşça süzülen birkaç
//  soluk pastel "blob" göstermek. Renkler bilinçli olarak çok
//  düşük doygunlukta ve düşük opaklıkta seçildi → göze batmaz,
//  dikkati içerikten çalmaz, yalnızca hafif bir derinlik/canlılık
//  hissi verir. Saf CSS animasyonu (drift keyframe'leri) kullanır.
//
//  Erişilebilirlik: dekoratif olduğu için aria-hidden.
//  Hareket: reduced-motion tercihinde CSS animasyonları durur.
// =============================================================

function AuroraBackground() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="aurora__blob aurora__blob--1" />
      <span className="aurora__blob aurora__blob--2" />
      <span className="aurora__blob aurora__blob--3" />
    </div>
  )
}

export default AuroraBackground
