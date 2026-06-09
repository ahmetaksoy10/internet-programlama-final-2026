// =============================================================
//  ProjectsCard.jsx — "Üzerinde Çalıştığım Projeler" kartı
// -------------------------------------------------------------
//  Görevi: Aktif projelerimi; görsel önizleme (placeholder),
//  kısa açıklama ve teknoloji etiketleriyle listelemek.
//  Her proje kutusu TIKLANABİLİR — tıklanınca detay modalı açılır.
//
//  GÖRSEL NOTU: Her projenin yanındaki kutu şimdilik bir placeholder'dır.
//  İleride projenin gerçek ekran görüntüsü (örn. giriş sayfası) buraya gelecek.
// =============================================================

import { useState } from 'react'
import { Code2, Map, Smartphone, Cpu, ArrowRight } from 'lucide-react'
import ImagePlaceholder from './ImagePlaceholder.jsx'
import ProjectModal from './ProjectModal.jsx'

// --- Proje verileri ---
// "aciklama": kartta görünen kısa metin.
// "detayliAciklama": modalda görünen uzun metin.
// "repoLink": GitHub repo bağlantısı (şimdilik placeholder).
const projeler = [
  {
    ad: 'TravelGuide',
    icon: Map,
    aciklama:
      "Türkiye'deki turistik yerleri keşfetmeyi sağlayan bir masaüstü gezi rehberi uygulaması.",
    detayliAciklama:
      "Python, PyQt5 ve SQLite kullanarak geliştirdiğim masaüstü uygulama. Kullanıcılar Türkiye'deki şehirleri ve turistik yerleri arayabilir, favorilerine ekleyebilir ve gezi planı oluşturabilir. Veritabanı tasarımı, CRUD işlemleri ve kullanıcı arayüzü geliştirme konularında deneyim kazandım.",
    teknolojiler: ['Python', 'PyQt5', 'SQLite'],
    repoLink: 'https://github.com/ahmetaksoy10',
  },
  {
    ad: 'iOS Mobil Projeler',
    icon: Smartphone,
    aciklama:
      'SwiftUI ve MVVM mimarisiyle, temiz kod prensiplerine odaklanarak iOS ekosisteminde deneyim kazanıyorum.',
    detayliAciklama:
      "SwiftUI framework'ü ve MVVM (Model-View-ViewModel) mimarisi kullanarak iOS uygulamaları geliştiriyorum. Clean Code prensiplerine uygun, test edilebilir ve sürdürülebilir kod yazmaya odaklanıyorum. Xcode ortamında çalışıyor, Apple'ın Human Interface Guidelines'ını takip ediyorum.",
    teknolojiler: ['Swift', 'SwiftUI', 'MVVM'],
    repoLink: 'https://github.com/ahmetaksoy10',
  },
  {
    ad: 'Sayısal Tasarım Lab',
    icon: Cpu,
    aciklama:
      'Tinkercad üzerinde 74xx serisi entegrelerle dijital devre tasarımı ve simülasyonları.',
    detayliAciklama:
      'Üniversite laboratuvar dersi kapsamında Tinkercad platformunda dijital devre simülasyonları yapıyorum. 74xx serisi entegre devreleri (AND, OR, NOT, MUX, Decoder vb.) kullanarak kombinasyonel ve ardışıl devre tasarımları gerçekleştiriyorum.',
    teknolojiler: ['Tinkercad', '74xx', 'Devre'],
    repoLink: 'https://github.com/ahmetaksoy10',
  },
]

function ProjectsCard() {
  // --- State: hangi projenin modalı açık? ---
  // null = hiçbir modal açık değil. Bir proje objesi atanınca o projenin modalı açılır.
  const [seciliProje, setSeciliProje] = useState(null)

  return (
    <article className="card card--projects">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Code2 size={20} />
        </span>
        <h2 className="card__title">Üzerinde Çalıştığım Projeler</h2>
      </div>

      {/* Proje listesi: diziyi .map() ile dönüyoruz */}
      <ul className="project-list">
        {projeler.map((proje) => {
          const ProjeIkonu = proje.icon
          return (
            <li key={proje.ad}>
              {/* Tüm kutu bir <button> — tıklanınca ilgili projeyi state'e yazıp modalı açar.
                  Buton kullanmak klavye erişilebilirliğini (Enter/Space) ücretsiz sağlar. */}
              <button
                className="project-item"
                onClick={() => setSeciliProje(proje)}
                aria-label={`${proje.ad} detaylarını aç`}
              >
                {/* Proje görseli (placeholder) — ileride gerçek ekran görüntüsü gelecek */}
                <ImagePlaceholder
                  icon={ProjeIkonu}
                  label={`${proje.ad} görseli`}
                  variant="wide"
                />

                <div className="project-item__body">
                  <div className="project-item__head">
                    <ProjeIkonu size={18} className="project-item__icon" aria-hidden="true" />
                    <h3 className="project-item__name">{proje.ad}</h3>
                  </div>
                  <p className="project-item__desc">{proje.aciklama}</p>

                  {/* Teknoloji etiketleri */}
                  <div className="tag-row">
                    {proje.teknolojiler.map((tek) => (
                      <span key={tek} className="tag">
                        {tek}
                      </span>
                    ))}
                  </div>

                  {/* Tıklanabilir olduğunu belli eden ipucu metni */}
                  <span className="project-item__cta">
                    Detaylar için tıkla
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Proje detay modalı. seciliProje null ise ProjectModal kendini çizmez. */}
      <ProjectModal proje={seciliProje} onClose={() => setSeciliProje(null)} />
    </article>
  )
}

export default ProjectsCard
