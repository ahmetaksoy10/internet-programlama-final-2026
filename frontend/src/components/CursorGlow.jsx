// =============================================================
//  CursorGlow.jsx — Fareyi yumuşakça takip eden ışık hâlesi (iz efekti)
// -------------------------------------------------------------
//  Arka plan katmanına (z-index 0) sabit, yarı saydam bir radyal
//  gradyan koyar; fare hareket ettikçe lerp ile yumuşakça peşinden
//  gelir → "iz" hissi. Camsı kartların backdrop-filter'ı bu hâleyi
//  bulanıklaştırıp yakaladığı için cam yüzeyler ışığa tepki veriyormuş
//  gibi görünür.
//
//  KOLAY KALDIRMA: App.jsx'ten <CursorGlow /> satırını ve importunu
//  silmen yeterli — başka hiçbir yeri etkilemez.
//
//  Dokunmatik cihazlarda ve "hareketi azalt" tercihinde hiç çalışmaz.
// =============================================================

import { useEffect, useRef } from 'react'

function CursorGlow() {
  const ref = useRef(null)

  useEffect(() => {
    // Dokunmatik (fare yok) ya da hareket azaltma → efekti hiç kurma
    const dokunmatik = window.matchMedia('(hover: none)').matches
    const azalt = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (dokunmatik || azalt) return

    const el = ref.current
    if (!el) return

    // Hedef = farenin gerçek konumu; x/y = hâlenin gösterilen (gecikmeli) konumu
    let hedefX = window.innerWidth / 2
    let hedefY = window.innerHeight / 2
    let x = hedefX
    let y = hedefY
    let raf = 0
    let gorunur = false

    function hareket(e) {
      hedefX = e.clientX
      hedefY = e.clientY
      if (!gorunur) {
        gorunur = true
        el.style.opacity = '1'
      }
    }
    function gizle() {
      gorunur = false
      el.style.opacity = '0'
    }

    function dongu() {
      // Lerp (doğrusal interpolasyon): hedefe %14 yaklaş → yumuşak iz
      x += (hedefX - x) * 0.14
      y += (hedefY - y) * 0.14
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
      raf = requestAnimationFrame(dongu)
    }
    raf = requestAnimationFrame(dongu)

    window.addEventListener('mousemove', hareket)
    document.addEventListener('mouseleave', gizle)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', hareket)
      document.removeEventListener('mouseleave', gizle)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
