// =============================================================
//  App.jsx — Uygulamanın ana bileşeni (kök / root component)
// -------------------------------------------------------------
//  Görevi: Sayfanın genel iskeletini kurmak ve kartların scroll'da
//  belirme (reveal) animasyonunu yönetmek.
//  - En üstte Header (profil + tema değiştirici)
//  - Ortada <main> içinde kartların yer aldığı 3 sütunlu BENTO GRID
//  - En altta Footer
//
//  BENTO GRID tiling (masaüstü, 3 sütun, boşluksuz):
//   [About(1) Focus(2)] [Music(1) Books(1) Battery(1)] [Projects(3)]
//   [Highlights(1) Tech(2)] [Backlog(1) GitHub(2)]
// =============================================================

import { useEffect, useRef } from 'react'
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
  // IntersectionObserver, bir öğe ekrana girdiğinde haber verir. Biz de o karta
  // 'is-visible' sınıfı ekleyip CSS geçişiyle yumuşakça belirmesini sağlıyoruz.
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const kartlar = grid.querySelectorAll('.card')

    const gozlemci = new IntersectionObserver(
      (girisler) => {
        girisler.forEach((giris) => {
          // Kart ekranda görünür hale geldiyse animasyonu tetikle
          if (giris.isIntersecting) {
            giris.target.classList.add('is-visible')
            // Bir kez göründükten sonra izlemeyi bırak (performans)
            gozlemci.unobserve(giris.target)
          }
        })
      },
      { threshold: 0.15 }, // kartın %15'i görününce tetiklensin
    )

    kartlar.forEach((kart) => gozlemci.observe(kart))

    // Temizleme: bileşen kaldırılınca gözlemciyi kapat
    return () => gozlemci.disconnect()
  }, [])

  return (
    <div className="page">
      <Header />

      <main className="cards-grid" ref={gridRef} aria-label="Şu an içeriği">
        <AboutCard />
        <FocusCard />
        <MusicCard />
        <BooksCard />
        <BatteryCard />
        <ProjectsCard />
        <HighlightsCard />
        <TechStackCard />
        <BacklogCard />
        <GitHubCard />
      </main>

      <Footer />
    </div>
  )
}

export default App
