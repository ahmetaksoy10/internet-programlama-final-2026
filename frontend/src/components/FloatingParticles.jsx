// =============================================================
//  FloatingParticles.jsx — Süzülen minik nokta bulutu
// -------------------------------------------------------------
//  Görevi: Aurora'nın üzerinde, içeriğin ardında çok silik,
//  yavaşça yukarı süzülen minik noktalar çizmek. Canvas +
//  requestAnimationFrame ile akıcı çalışır.
//
//  Tasarım kararı: "göz yormaması ve dikkati oraya çekmemesi"
//  isteği gereği parçacıklar çok küçük (≈1–2.4px) ve çok düşük
//  opaklıkta (0.05–0.17). Tema (açık/karanlık) değişince nokta
//  rengi otomatik uyum sağlar.
//
//  Erişilebilirlik: reduced-motion tercihinde hiç çizilmez.
// =============================================================

import { useEffect, useRef } from 'react'

function FloatingParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Hareketi azaltmayı tercih edenlere hiç parçacık gösterme.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let dpr = 1
    let parcaciklar = []
    let raf = 0

    // Aktif temaya göre nokta rengi (alfa ayrı veriliyor).
    // Açık tema → sıcak koyu gri; karanlık tema → yumuşak açık ton.
    function temaRengi() {
      const koyu = document.documentElement.getAttribute('data-theme') === 'dark'
      return koyu ? '210, 214, 240' : '124, 112, 96'
    }
    let rgb = temaRengi()

    // Tek bir parçacığın başlangıç değerleri.
    function yeniParcacik() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1.2, // yarıçap 1.2–3.2px
        hiz: Math.random() * 0.22 + 0.08, // yukarı süzülme hızı (yavaş)
        salinim: Math.random() * 0.5 + 0.15, // yatay salınım genliği
        faz: Math.random() * Math.PI * 2, // salınım başlangıç fazı
        alpha: Math.random() * 0.25 + 0.14, // 0.14–0.39 (fark edilir ama hafif)
      }
    }

    // Canvas'ı ekran boyutuna ve piksel yoğunluğuna göre ayarla,
    // parçacık sayısını ekran alanına göre belirle (üst sınırlı).
    function boyutlandir() {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const hedef = Math.min(70, Math.round((width * height) / 20000))
      parcaciklar = Array.from({ length: hedef }, yeniParcacik)
    }

    // Her karede parçacıkları güncelle ve yeniden çiz.
    function ciz() {
      ctx.clearRect(0, 0, width, height)
      // Noktalara yumuşak bir hâle (glow) → toz/ışık zerresi hissi
      ctx.shadowColor = `rgba(${rgb}, 0.5)`
      for (const p of parcaciklar) {
        p.y -= p.hiz
        p.faz += 0.01
        p.x += Math.sin(p.faz) * p.salinim * 0.3
        // Üstten çıkan parçacık alttan yeniden girer (sonsuz akış).
        if (p.y < -5) {
          p.y = height + 5
          p.x = Math.random() * width
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.shadowBlur = p.r * 2.5
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`
        ctx.fill()
      }
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(ciz)
    }

    boyutlandir()
    ciz()

    // Tema değişince (data-theme attribute) nokta rengini güncelle.
    const gozlemci = new MutationObserver(() => {
      rgb = temaRengi()
    })
    gozlemci.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    })

    window.addEventListener('resize', boyutlandir)

    // Temizlik: animasyonu durdur, dinleyicileri kaldır.
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', boyutlandir)
      gozlemci.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}

export default FloatingParticles
