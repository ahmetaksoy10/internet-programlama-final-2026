// =============================================================
//  App.jsx — Uygulamanın ana bileşeni (kök / root component)
// -------------------------------------------------------------
//  Görevi: Sayfanın genel iskeletini kurmak ve kartların scroll'da
//  belirme (reveal) animasyonunu yönetmek.
//
//  BENTO GRID tiling (masaüstü, 3 sütun, boşluksuz):
//   [About(1) Focus(2)] [Music(3) — Apple Music embed]
//   [Books(1) Battery(1) Highlights(1)] [Projects(3)]
//   [Tech(2) Backlog(1)] [GitHub(3)]
// =============================================================

import { useEffect, useRef } from 'react'
import AuroraBackground from './components/AuroraBackground.jsx'
import FloatingParticles from './components/FloatingParticles.jsx'
import Header from './components/Header.jsx'
import AboutCard from './components/AboutCard.jsx'
import FocusCard from './components/FocusCard.jsx'
import MusicCard from './components/MusicCard.jsx'
import BooksCard from './components/BooksCard.jsx'
import BatteryCard from './components/BatteryCard.jsx'
import ProjectsCard from './components/ProjectsCard.jsx'
import HighlightsCard from './components/HighlightsCard.jsx'
import TechStackCard from './components/TechStackCard.jsx'
import BacklogCard from './components/BacklogCard.jsx'
import GitHubCard from './components/GitHubCard.jsx'
import Footer from './components/Footer.jsx'

function App() {
  // Grid'e referans: içindeki kartları IntersectionObserver ile izlemek için.
  const gridRef = useRef(null)

  // --- Scroll'da belirme (reveal) animasyonu ---
  // IntersectionObserver: kart ekrana girince 'is-visible' sınıfı eklenir,
  // CSS geçişiyle yumuşakça belirir.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const kartlar = grid.querySelectorAll('.card')

    const gozlemci = new IntersectionObserver(
      (girisler) => {
        // Bu turda ekrana giren kartları DOM sırasına göre topla.
        // Aynı anda görünenlere artan gecikme verince "stagger" (sırayla
        // belirme) efekti oluşur: ilk açılışta üst kartlar art arda akar.
        // Gecikme yalnızca o turdaki kartlara bindiği için aşağıdaki kartlar
        // scroll'da kendi küçük gruplarında belirir — sonsuz gecikme olmaz.
        const gorunenler = girisler
          .filter((g) => g.isIntersecting)
          .sort((a, b) =>
            a.target.compareDocumentPosition(b.target) &
            Node.DOCUMENT_POSITION_FOLLOWING
              ? -1
              : 1,
          )

        gorunenler.forEach((giris, i) => {
          const kart = giris.target
          kart.style.transitionDelay = `${i * 0.08}s` // her kart 80ms sonra
          kart.classList.add('is-visible')
          gozlemci.unobserve(kart) // bir kez göründü, takibi bırak
          // Belirme bittikten sonra gecikmeyi sıfırla ki hover anında tepki versin
          // (inline transition-delay tüm geçişleri etkiler, hover'ı yavaşlatmasın).
          setTimeout(() => {
            kart.style.transitionDelay = ''
          }, i * 80 + 700)
        })
      },
      { threshold: 0.15 },
    )
    kartlar.forEach((kart) => gozlemci.observe(kart))
    return () => gozlemci.disconnect()
  }, [])

  return (
    <>
      {/* Arka plan katmanları (içeriğin ardında, fixed, dekoratif) */}
      <AuroraBackground />
      <FloatingParticles />

      <div className="page">
        <Header />

        <main className="cards-grid" ref={gridRef} aria-label="Şu an içeriği">
          <AboutCard />
          <FocusCard />
          <MusicCard />
          <BooksCard />
          <BatteryCard />
          <HighlightsCard />
          <ProjectsCard />
          <TechStackCard />
          <BacklogCard />
          <GitHubCard />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
