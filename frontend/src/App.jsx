// =============================================================
//  App.jsx — Uygulamanın ana bileşeni (kök / root component)
// -------------------------------------------------------------
//  Görevi: Sayfanın genel iskeletini kurmak.
//  - En üstte Header (profil + isim + bio + güncelleme tarihi)
//  - Ortada <main> içinde kartların yer aldığı BENTO GRID düzeni
//  - En altta Footer (linkler buraya taşındı)
//  İş mantığı bileşenlerin kendi içindedir; burası sadece düzeni (layout) kurar.
//
//  BENTO GRID NOTU: Masaüstünde 3 sütunlu ızgara. Kartların DOM sırası,
//  ızgarayı satır satır boşluksuz dolduracak şekilde tasarlandı.
// =============================================================

// Her kart kendi dosyasında modüler olarak tutulur (bakımı kolaylaştırır).
import Header from './components/Header.jsx'
import AboutCard from './components/AboutCard.jsx'
import FocusCard from './components/FocusCard.jsx'
import MusicCard from './components/MusicCard.jsx'
import BooksCard from './components/BooksCard.jsx'
import TrainingCard from './components/TrainingCard.jsx'
import ProjectsCard from './components/ProjectsCard.jsx'
import HighlightsCard from './components/HighlightsCard.jsx'
import TechStackCard from './components/TechStackCard.jsx'
import GitHubCard from './components/GitHubCard.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    // .page: tüm sayfayı saran sıcak arka planlı kapsayıcı
    <div className="page">
      {/* Sayfa başlığı bölümü (profil + tanıtım) */}
      <Header />

      {/* Ana içerik: Bento Grid (masaüstünde 3 sütun).
          Kart sırası, ızgarayı satır satır tam dolduracak biçimdedir:
          [About(1) Focus(2)] [Music(1) Books(1) Training(1)]
          [Projects(3)] [Highlights(1) TechStack(2)] [GitHub(3)] */}
      <main className="cards-grid" aria-label="Şu an içeriği">
        <AboutCard />
        <FocusCard />
        <MusicCard />
        <BooksCard />
        <TrainingCard />
        <ProjectsCard />
        <HighlightsCard />
        <TechStackCard />
        <GitHubCard />
      </main>

      {/* Sayfa altı bilgi alanı (GitHub / LinkedIn / E-posta linkleri) */}
      <Footer />
    </div>
  )
}

export default App
