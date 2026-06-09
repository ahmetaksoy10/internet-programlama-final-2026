// =============================================================
//  ImagePlaceholder.jsx — Yeniden kullanılabilir görsel tutucu (placeholder)
// -------------------------------------------------------------
//  Görevi: Gerçek bir fotoğraf/görsel eklenene kadar, o görselin
//  geleceği alanı şık bir şekilde temsil etmek (kırık <img> yerine
//  düzgün görünen, etiketli bir kutu).
//
//  KULLANIM / GÖRSEL EKLEME:
//  İleride gerçek görsel hazır olduğunda, bu bileşeni doğrudan bir
//  <img> ile değiştirebilir VEYA aşağıdaki TODO satırını takip edebilirsin.
//  Örnek:
//    <img src="/gorseller/travelguide.png" alt="TravelGuide ekranı"
//         className="img-ph__real" />
//
//  Props:
//   - icon  : Gösterilecek Lucide ikon bileşeni (örn: Camera, Image)
//   - label : Kutunun içinde görünen açıklama metni
//   - variant : Kutu en-boy oranı → "wide" (16:9), "cover" (dikey), "square"
// =============================================================

// Lucide'ın "Image" ikonunu, JS'in yerleşik Image nesnesiyle karışmaması için
// "ImageIcon" takma adıyla içe aktarıyoruz.
import { Image as ImageIcon } from 'lucide-react'

function ImagePlaceholder({ icon: Icon = ImageIcon, label = 'Görsel eklenecek', variant = 'wide' }) {
  return (
    // role="img" + aria-label: ekran okuyucular bunu bir görsel olarak algılar.
    <div className={`img-ph img-ph--${variant}`} role="img" aria-label={label}>
      {/* TODO: Gerçek görsel ile değiştir →
          <img src="/gorsel.jpg" alt="Açıklama" className="img-ph__real" /> */}
      <Icon className="img-ph__icon" size={26} aria-hidden="true" />
      <span className="img-ph__label">{label}</span>
    </div>
  )
}

export default ImagePlaceholder
