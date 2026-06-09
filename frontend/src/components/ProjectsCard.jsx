// =============================================================
//  ProjectsCard.jsx — "Üzerinde Çalıştığım Projeler" kartı
// -------------------------------------------------------------
//  Görevi: Aktif projelerimi; gerçek ekran görüntüsü önizleme,
//  kısa açıklama ve teknoloji etiketleriyle listelemek.
//  Her proje kutusu TIKLANABİLİR — tıklanınca detay modalı açılır.
// =============================================================

import { useState } from 'react'
import { Code2, Map, Plane, Leaf, Cpu, ArrowRight, Images } from 'lucide-react'
import ProjectModal from './ProjectModal.jsx'

// Proje görselleri Vite modülü olarak import edildi.
// Böylece build sırasında hash'lenir ve GitHub Pages base path otomatik eklenir.
import travio1 from '../assets/projects/travio1.png'
import travio2 from '../assets/projects/travio2.png'
import travio3 from '../assets/projects/travio3.png'
import travio4 from '../assets/projects/travio4.png'
import subgrave1 from '../assets/projects/subgrave1.png'
import subgrave2 from '../assets/projects/subgrave2.png'
import subgrave3 from '../assets/projects/subgrave3.png'
import subgrave4 from '../assets/projects/subgrave4.png'

// --- Proje verileri ---
// gorseller: modalda gösterilecek ekran görüntüleri (boş dizi → placeholder)
// durum    : modalda gösterilen durum rozeti
const projeler = [
  {
    ad: 'TravelGuide',
    icon: Map,
    durum: 'Tamamlandı',
    aciklama:
      "Türkiye'deki turistik yerleri keşfetmeyi sağlayan bir masaüstü gezi rehberi uygulaması.",
    detayliAciklama:
      "Python, PyQt5 ve SQLite kullanarak geliştirdiğim masaüstü uygulama. Kullanıcılar Türkiye'deki şehirleri ve turistik yerleri arayabilir, favorilerine ekleyebilir ve gezi planı oluşturabilir. Veritabanı tasarımı, CRUD işlemleri ve kullanıcı arayüzü geliştirme konularında deneyim kazandım.",
    teknolojiler: ['Python', 'PyQt5', 'SQLite'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [],
  },
  {
    ad: 'Travio',
    icon: Plane,
    durum: 'Geliştiriliyor',
    aciklama:
      'Uçak ve otobüs bileti karşılaştırma, otel rezervasyonu ve yapay zeka destekli rota planlamasını tek çatı altında toplayan iOS seyahat süper uygulaması.',
    detayliAciklama:
      'SwiftUI ve MVVM + Coordinator mimarisiyle geliştirilen Travio, Duffel API üzerinden gerçek uçak/otel rezervasyonu, Travio Mind adlı AI asistanıyla (Google Gemini API) doğal dilde tatil planı oluşturma, Iyzico 3D Secure ödeme, Firebase Authentication (e-posta, Apple, Google) ve RevenueCat ile premium abonelik (Travio Plus) özelliklerini sunuyor. Tüm API anahtarları Firebase Functions backend\'inde tutularak güvenlik sağlanıyor. Repository Pattern sayesinde API sağlayıcıları tek dosya değişimiyle değiştirilebiliyor.',
    teknolojiler: ['SwiftUI', 'Firebase', 'Gemini AI', 'Duffel API', 'Iyzico'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [
      { src: travio1, alt: 'Ana Sayfa — trend rotalar ve AI rota arama' },
      { src: travio2, alt: 'Planlarım — onaylı biletler ve yaklaşan seyahatler' },
      { src: travio3, alt: 'Arama — uçak / otobüs filtresi ve tarih seçimi' },
      { src: travio4, alt: 'Profil — Travio Plus aboneliği ve seyahat karnem' },
    ],
  },
  {
    ad: 'Subgrave',
    icon: Leaf,
    durum: 'Geliştiriliyor',
    aciklama:
      'Dijital aboneliklerini takip eden, iptal edilenleri "mezarlığa gömen" ve harcamaları analiz eden iOS abonelik mezarlığı uygulaması.',
    detayliAciklama:
      'SwiftUI ve MVVM mimarisiyle geliştirilen Subgrave, "Abonelik Mezarlığı" konseptiyle benzersiz bir deneyim sunuyor. 4 ana sekme: Dashboard (metrik kartları, yıllık harcama grafiği), Yaşayanlar (aktif abonelik listesi, arama/filtreleme), Mezarlık (iptal edilen aboneliklerin mezar taşları) ve İstatistik (harcama analizleri). 30+ gün kullanılmayan abonelikler otomatik "hayalet" olarak işaretlenir. İptal edilen abonelikler neden + veda notuyla gömülür, isteğe bağlı olarak "diriltilir". Yenilemeden 3 gün önce yerel bildirim gönderilir. Siri Shortcuts ile kullanım takibi otomasyonu desteklenir. Krem/fildişi arka plan, lavanta aksan renkleri ve mezar taşı custom shape\'leri ile sıcak bahçe teması uygulanmıştır.',
    teknolojiler: ['SwiftUI', 'MVVM', 'SwiftData', 'Siri Shortcuts'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [
      { src: subgrave1, alt: 'Dashboard — metrik kartları ve yıllık harcama grafiği' },
      { src: subgrave2, alt: 'Yaşayanlar — aktif abonelikler ve hayalet tespiti' },
      { src: subgrave3, alt: 'Mezarlık — gömülen aboneliklerin mezar taşları' },
      { src: subgrave4, alt: 'İstatistik — toplam harcama analizi ve rapor' },
    ],
  },
  {
    ad: 'Sayısal Tasarım Lab',
    icon: Cpu,
    durum: 'Devam Ediyor',
    aciklama:
      'Tinkercad üzerinde 74xx serisi entegrelerle dijital devre tasarımı ve simülasyonları.',
    detayliAciklama:
      'Üniversite laboratuvar dersi kapsamında Tinkercad platformunda dijital devre simülasyonları yapıyorum. 74xx serisi entegre devreleri (AND, OR, NOT, MUX, Decoder vb.) kullanarak kombinasyonel ve ardışıl devre tasarımları gerçekleştiriyorum.',
    teknolojiler: ['Tinkercad', '74xx', 'Devre'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [],
  },
]

function ProjectsCard() {
  const [seciliProje, setSeciliProje] = useState(null)

  return (
    <article className="card card--projects">
      <div className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Code2 size={20} />
        </span>
        <h2 className="card__title">Üzerinde Çalıştığım Projeler</h2>
      </div>

      <ul className="project-list">
        {projeler.map((proje) => {
          const ProjeIkonu = proje.icon
          return (
            <li key={proje.ad}>
              <button
                className="project-item"
                onClick={() => setSeciliProje(proje)}
                aria-label={`${proje.ad} detaylarını aç`}
              >
                {/* Kart sade tutuldu: görseller karttan kaldırıldı, modal galerisinde gösteriliyor.
                    Böylece 4 proje kartı da tek tip ve düzenli görünüyor. */}
                <div className="project-item__body">
                  <div className="project-item__head">
                    <ProjeIkonu size={18} className="project-item__icon" aria-hidden="true" />
                    <h3 className="project-item__name">{proje.ad}</h3>
                  </div>
                  <p className="project-item__desc">{proje.aciklama}</p>

                  <div className="tag-row">
                    {proje.teknolojiler.map((tek) => (
                      <span key={tek} className="tag">
                        {tek}
                      </span>
                    ))}
                  </div>

                  {/* Alt satır: solda görsel sayısı ipucu (varsa), sağda CTA */}
                  <div className="project-item__footer">
                    {proje.gorseller.length > 0 && (
                      <span className="project-item__shots">
                        <Images size={13} aria-hidden="true" />
                        {proje.gorseller.length} görsel
                      </span>
                    )}
                    <span className="project-item__cta">
                      Detaylar için tıkla
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      <ProjectModal proje={seciliProje} onClose={() => setSeciliProje(null)} />
    </article>
  )
}

export default ProjectsCard
