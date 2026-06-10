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
import travio5 from '../assets/projects/travio5.png'
import travio6 from '../assets/projects/travio6.png'
import travio7 from '../assets/projects/travio7.png'
import subgrave1 from '../assets/projects/subgrave1.png'
import subgrave2 from '../assets/projects/subgrave2.png'
import subgrave3 from '../assets/projects/subgrave3.png'
import subgrave4 from '../assets/projects/subgrave4.png'
import travelguide1 from '../assets/projects/travelguide1.png'
import travelguide2 from '../assets/projects/travelguide2.png'
import travelguide3 from '../assets/projects/travelguide3.png'
import travelguide4 from '../assets/projects/travelguide4.png'
import travelguide5 from '../assets/projects/travelguide5.png'
import travelguide6 from '../assets/projects/travelguide6.png'
import travelguide7 from '../assets/projects/travelguide7.png'
import travelguide8 from '../assets/projects/travelguide8.png'

// --- Proje verileri ---
// gorseller: modalda gösterilecek ekran görüntüleri (boş dizi → placeholder)
// durum    : modalda gösterilen durum rozeti
const projeler = [
  {
    ad: 'TravelGuide',
    icon: Map,
    durum: 'Tamamlandı',
    aciklama:
      "Türkiye'nin 81 ilini interaktif şehir kartları, kişisel seyahat planlayıcısı ve 19 rozetlik başarım sistemiyle keşfettiren, oyunlaştırılmış masaüstü gezi rehberi uygulaması.",
    detayliAciklama:
      "Python ve PyQt5 ile geliştirilen masaüstü uygulaması, Türkiye'nin 81 ilini emoji, bölge, tarihçe, gezilecek yerler ve yöresel mutfak bilgileriyle detaylı bir veritabanında sunuyor. Kullanıcılar her şehri 'Gittim', 'Gitmek İstiyorum' ve 'Favori' olarak işaretleyip 5 yıldız puanlama, kişisel not ve valiz hazırlık listesi oluşturabiliyor. 19 rozetlik başarım sistemi, haftalık seri (streak), 6 seviyeli ilerleme ve keşif puanıyla bir oyunlaştırma katmanı kuruluyor; PDF gezi karnesi, favori dışa aktarma ve anlık açık/koyu tema da destekleniyor. Tüm veriler SQLite ile cihazda saklanıyor (sıfır backend, çevrimdışı çalışır) ve 94 Lucide SVG ikon runtime'da retina netliğinde boyanıyor. Katmanlı modüler mimari (main / ui_components / database / styles / icons) sayesinde UI katmanı hiç doğrudan SQL yazmıyor.",
    teknolojiler: ['Python', 'PyQt5', 'SQLite', 'QSS'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [
      { src: travelguide1, alt: 'Giriş ekranı' },
      { src: travelguide2, alt: 'Kayıt — Aramıza Katıl' },
      { src: travelguide3, alt: 'Ana ekran — keşif paneli, arama ve öne çıkan şehirler' },
      { src: travelguide4, alt: 'Listelerim — keşfedilen şehirler ve yıldız puanları' },
      { src: travelguide5, alt: 'Şehir planlayıcı — durum, yıldız puanı ve kişisel not' },
      { src: travelguide6, alt: 'Şehir rehberi — tarihçe, özellikler ve gezilecek yerler' },
      { src: travelguide7, alt: 'Ayarlar — hesap, görünüm ve veri yönetimi' },
      { src: travelguide8, alt: 'Rozetlerim — 19 başarım, seviye ve keşif puanı' },
    ],
  },
  {
    ad: 'Travio',
    icon: Plane,
    durum: 'Geliştiriliyor',
    aciklama:
      'Uçak, otobüs ve otel aramayı tek platformda birleştiren, Google Gemini AI ile kişiye özel gün-gün tatil planı üreten iOS seyahat uygulaması.',
    detayliAciklama:
      'SwiftUI ve feature-based MVVM + Repository Pattern ile geliştirilen Travio; Duffel API üzerinden gerçek uçuş/otel rezervasyonu, Google Gemini ile doğal dilden gün-gün rota planı üretimi ve Iyzico 3D Secure kart ödemesini uçtan uca tek akışta birleştiriyor. Travio Mind asistanı destinasyon, bütçe, ilgi alanı ve tempoya göre ulaşım–konaklama–aktivite–bütçe dökümlü bir plan oluşturup doğal dil komutlarıyla yeniden düzenliyor. Firebase Authentication (e-posta + Google), RevenueCat ile Travio Plus aboneliği (7 gün deneme, Gemini Pro yönlendirme) ve MapKit otel haritası gibi özellikler içeriyor. Tüm hassas anahtarlar (Gemini, Duffel, Iyzico) iOS bundle\'a hiç girmeden Firebase Functions backend\'inde tutuluyor; kullanıcı başı rate limiting, PCI-uyumlu ödeme ve jailbreak-proof Plus doğrulamasıyla güvenlik katmanlı kurgulanıyor.',
    teknolojiler: ['SwiftUI', 'Firebase Functions', 'Gemini AI', 'Duffel API', 'Iyzico', 'RevenueCat'],
    repoLink: 'https://github.com/ahmetaksoy10',
    gorseller: [
      { src: travio1, alt: 'Açılış ekranı — Travio logosu' },
      { src: travio2, alt: 'Giriş — e-posta, Apple ve Google ile oturum açma' },
      { src: travio3, alt: 'Hesap oluşturma — kayıt formu' },
      { src: travio4, alt: 'Keşfet — kategoriler, AI rota asistanı ve trend rotalar' },
      { src: travio5, alt: 'Arama — uçak ve otobüs sefer arama formu' },
      { src: travio6, alt: 'Planlarım — onaylı uçuş ve otobüs rezervasyonları' },
      { src: travio7, alt: 'Profil — Travio Plus ve seyahat istatistikleri' },
    ],
  },
  {
    ad: 'Subgrave',
    icon: Leaf,
    durum: 'Geliştiriliyor',
    aciklama:
      'Dijital abonelikleri "yaşayan" ve "ölen" olarak takip eden, iptal edilenleri mezar taşlarında sergileyen ve harcamaları analiz eden, benzersiz anlatımlı iOS abonelik mezarlığı uygulaması.',
    detayliAciklama:
      'SwiftUI ve MVVM + Repository Pattern ile geliştirilen Subgrave, abonelik takibini "Abonelik Mezarlığı" metaforuyla yeniden kurguluyor. 4 sekme: Dashboard (4 metrik kartı, 12 aylık harcama grafiği, yaklaşan yenilemeler), Yaşayanlar (aktif abonelikler — arama, filtreleme, 5 sıralama), Mezarlık (iptal edilenler custom TombstoneShape mezar taşlarında, epitaf ve veda notuyla) ve İstatistik (Spotify Wrapped tarzı yıllık rapor, Swift Charts donut grafiği). 30+ gün kullanılmayan abonelikler otomatik "hayalet" olarak işaretleniyor; yenilemeden 3 gün önce yerel bildirim gönderiliyor ve AppIntents ile "uygulama açıldığında kullanıldı işaretle" Siri otomasyonu kurulabiliyor. iOS 17 Observation framework (@Observable), SwiftData kalıcılığı ve Protocol-Oriented DI ile sıfır backend, tamamen çevrimdışı çalışan modern bir mimari benimsiyor.',
    teknolojiler: ['SwiftUI', 'SwiftData', 'Swift Charts', 'AppIntents', 'MVVM'],
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
      {/* Ghost ikon: kartın filigran kimliği (CSS .card__ghost) */}
      <Code2 className="card__ghost" strokeWidth={1.5} aria-hidden="true" />
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
