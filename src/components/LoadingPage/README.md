# 🚀 LoadingPage Component

Un composant d'écran de chargement **premium** et **full-screen**, conçu pour offrir une expérience utilisateur fluide et élégante dès le démarrage de votre application.

![Loading Page Preview](background.png)

## ✨ Caractéristiques

- 🛡️ **Plein écran (Fixed)** : Couvre l'intégralité de la fenêtre d'affichage (`z-[9999]`).
- 🖼️ **Arrière-plan Personnalisé** : Utilise une image de fond avec un overlay sombre et un flou gaussien (`backdrop-blur`) pour une lisibilité optimale.
- 💬 **Titre Dynamique** : Message personnalisable via la prop `title`.
- 🎭 **Animations Fluides** : Utilise **Framer Motion** pour des effets de texte et des points de chargement scintillants.
- 📱 **100% Responsive** : Typographie adaptative pour mobile, tablette et desktop.

## 📦 Installation

Assurez-vous d'avoir les dépendances nécessaires installées dans votre projet :

```bash
npm install framer-motion
# ou
yarn add framer-motion
```

## 🛠️ Utilisation

Importez simplement le composant depuis son répertoire et intégrez-le dans la logique de rendu de votre application.

### Exemple de base

```tsx
import React, { useState, useEffect } from 'react';
import { LoadingPage } from './components/LoadingPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement initial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingPage title="WPB Data Entry Tool" />;
  }

  return (
    <div className="app-content">
      <h1>Bienvenue dans l'application</h1>
      {/* Votre contenu ici */}
    </div>
  );
}

export default App;
```

## ⚙️ Propriétés (Props)

| Prop | Type | Par défaut | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Chargement..."` | Le texte principal affiché au centre de l'écran. |

## 📁 Structure du Dossier

- `LoadingPage.tsx` : Le code source du composant React.
- `index.ts` : Point d'entrée pour des imports simplifiés.
- `background.png` : L'image de fond utilisée par défaut.
- `README.md` : Documentation du composant.

## 🎨 Personnalisation du Style

Le composant utilise **Tailwind CSS**. Vous pouvez modifier les classes directement dans `LoadingPage.tsx` pour ajuster :
- L'intensité du flou (`backdrop-blur-[8px]`).
- L'opacité de l'overlay (`bg-black/30`).
- La taille et la couleur du texte.
