// =============================================================
//  CountUp.jsx — Sayıyı 0'dan hedefe doğru artırarak gösteren bileşen
// -------------------------------------------------------------
//  Görevi: Bir sayının (örn. takipçi sayısı, batarya %'si) ekranda
//  canlı bir şekilde "sayarak" belirmesini sağlamak.
//  requestAnimationFrame ile akıcı (60fps) bir animasyon yapar.
//
//  Props:
//   - value    : Ulaşılacak hedef sayı
//   - duration : Animasyon süresi (ms), varsayılan 1000
// =============================================================

import { useState, useEffect, useRef } from 'react'

function CountUp({ value, duration = 1000, className }) {
  // Ekranda görünen anlık sayı
  const [goruntu, setGoruntu] = useState(0)
  // Animasyon karesinin kimliğini tutar (temizleme için)
  const rafRef = useRef(null)

  useEffect(() => {
    const hedef = Number(value) || 0

    // Kullanıcı "hareketi azalt" diyorsa animasyon yapmadan direkt hedefi göster
    const azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (azalt || hedef === 0) {
      setGoruntu(hedef)
      return
    }

    let baslangicZamani = null
    // Her animasyon karesinde çağrılır
    function adim(simdi) {
      if (baslangicZamani === null) baslangicZamani = simdi
      // İlerleme oranı 0 → 1
      const oran = Math.min((simdi - baslangicZamani) / duration, 1)
      // easeOutCubic: başta hızlı, sonda yavaşlayan yumuşak geçiş
      const yumusak = 1 - Math.pow(1 - oran, 3)
      setGoruntu(Math.round(hedef * yumusak))
      if (oran < 1) rafRef.current = requestAnimationFrame(adim)
    }
    rafRef.current = requestAnimationFrame(adim)

    // Temizleme: değer değişirse/bileşen kalkarsa devam eden kareyi iptal et
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, duration])

  return <span className={className}>{goruntu}</span>
}

export default CountUp
