# 🪟 Modal Component

Un composant modal réutilisable pour React avec animations fluides, fermeture par clic extérieur et design glassmorphism moderne.

---

## 📦 Dépendances

| Package          | Version  | Description                          |
| ---------------- | -------- | ------------------------------------ |
| `react`          | ^19.2.0  | Framework UI                         |
| `framer-motion`  | ^12.35.2 | Animations d'ouverture / fermeture   |
| `lucide-react`   | ^0.577.0 | Icônes (X, Download, RefreshCw)      |
| `tailwindcss`    | ^4.2.1   | Styling utilitaire                   |

---

## 🚀 Installation & Import

Le composant se situe dans `src/components/Modal/`. Il est exporté via un barrel file.

```tsx
import { Modal } from './components/Modal';
```

---

## 🎛️ Props

| Prop           | Type         | Défaut       | Description                                           |
| -------------- | ------------ | ------------ | ----------------------------------------------------- |
| `isOpen`       | `boolean`    | **requis**   | Contrôle l'affichage du modal                         |
| `onClose`      | `() => void` | **requis**   | Callback déclenché à la fermeture                     |
| `title`        | `string`     | `"Détails"`  | Titre affiché en haut à gauche                        |
| `children`     | `ReactNode`  | `undefined`  | Contenu libre à afficher dans le body du modal        |
| `showExport`   | `boolean`    | `true`       | Affiche le bouton **Export** dans le footer            |
| `showReload`   | `boolean`    | `true`       | Affiche le bouton **Reload** dans le footer            |
| `onExport`     | `() => void` | `undefined`  | Callback au clic sur **Export**                        |
| `onReload`     | `() => void` | `undefined`  | Callback au clic sur **Reload**                        |
| `className`    | `string`     | `""`         | Classes CSS supplémentaires pour le container du modal |

---

## 💡 Utilisation basique

```tsx
import { useState } from 'react';
import { Modal } from './components/Modal';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Ouvrir le Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onExport={() => console.log('Export')}
        onReload={() => console.log('Reload')}
      >
        <p>Contenu du modal ici...</p>
      </Modal>
    </>
  );
}
```

---

## 🎨 Utilisation avancée

### Titre personnalisé & masquer des boutons

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Paramètres"
  showExport={false}
  showReload={true}
  onReload={handleReload}
>
  <form>
    {/* Formulaire de paramètres */}
  </form>
</Modal>
```

### Avec une classe CSS personnalisée

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  className="max-w-2xl"
>
  <p>Modal plus étroit</p>
</Modal>
```

---

## ✨ Fonctionnalités

### 🎬 Animations (Framer Motion)

| Animation       | Détail                                                         |
| --------------- | -------------------------------------------------------------- |
| **Ouverture**   | Spring animation (`scale: 0.85 → 1`, `y: 40 → 0`, fade-in)   |
| **Fermeture**   | Spring ease-out (`scale → 0.9`, `y → 30`, fade-out)           |
| **Backdrop**    | Fade-in/out avec `bg-black/20` et `backdrop-blur-[2px]`        |
| **Bouton X**    | `whileTap: scale(0.9)` pour un feedback tactile                |
| **Boutons CTA** | `whileHover: scale(1.05)` + `whileTap: scale(0.95)`           |

### 🖱️ Fermeture par interactions

- **Clic extérieur** : un `mousedown` sur le backdrop ferme le modal  
- **Touche Escape** : un listener `keydown` sur `Escape` ferme le modal  
- **Bouton X** : le bouton circulaire en haut à droite ferme le modal  

### 📐 Responsive

| Breakpoint   | Comportement                                                  |
| ------------ | ------------------------------------------------------------- |
| **Mobile**   | Padding réduit (`p-4`), boutons compacts, contenu min-h 200px |
| **Tablette** | Padding intermédiaire (`p-6`)                                 |
| **Desktop**  | Padding large (`p-8`), contenu min-h 300px, largeur max 4xl   |

Le modal est limité à `max-h-[90vh]` avec un contenu scrollable pour les écrans petits.

### 🔒 Accessibilité

- Attribut `aria-label` sur le bouton de fermeture  
- IDs uniques sur les éléments interactifs (`modal-backdrop`, `modal-container`, `modal-close-btn`, `modal-export-btn`, `modal-reload-btn`)  
- Le scroll du `body` est désactivé quand le modal est ouvert  

---

## 🎨 Design Tokens

| Élément            | Couleur / Style                                           |
| ------------------ | --------------------------------------------------------- |
| **Background**     | `#e6e6e6` avec `border-white`, `backdrop-blur-xl`         |
| **Coins**          | `rounded-4xl` (container) / `rounded-2xl` (zone contenu) |
| **Bouton Close**   | `bg-[#b3004a]`, rond, `border-white`, `shadow-md`        |
| **Bouton Export**  | Outlined `border-[#b3004a]`, texte `#b3004a`              |
| **Bouton Reload**  | Filled `bg-[#b3004a]`, texte blanc, `border-white`       |
| **Backdrop**       | `bg-black/20`, `backdrop-blur-[2px]`                      |
| **Zone contenu**   | `bg-[#ddd9d9]`, `rounded-2xl`                             |

---

## 📁 Structure des fichiers

```
src/components/Modal/
├── Modal.tsx      # Composant principal
├── index.ts       # Barrel export
└── README.md      # Cette documentation
```

---

## 🧪 IDs pour les tests

Chaque élément interactif possède un ID unique permettant le ciblage dans les tests :

```
#modal-backdrop    → Overlay / backdrop cliquable
#modal-container   → Container principal du modal
#modal-close-btn   → Bouton de fermeture (X)
#modal-export-btn  → Bouton Export
#modal-reload-btn  → Bouton Reload
```
