# Composant Menu Réutilisable (MyMenu)

Ceci est un composant de menu de style iOS hautement esthétique (basé sur [Bloom](https://github.com/joshpuckett/bloom)), conçu pour être générique et transportable : vous pouvez copier-coller intégralement le dossier `ReusableMenu` dans n'importe quel autre projet React.

## 📦 Dépendances requises
Avant de pouvoir l'utiliser dans un nouveau projet, vérifiez que vous avez bien installé ces deux librairies :
```bash
npm install framer-motion lucide-react
```

## 🛠 Utilisation
1. Copiez ce dossier complet (`ReusableMenu`) et placez-le dans vos composants (ex: `src/components/ReusableMenu`).
2. Importez le composant et passez-lui une liste simple de boutons. Le style s'appliquera automatiquement sans manipulation de CSS.

### Exemple de configuration basique :

```tsx
import { Layout } from './components/Layout';
import { MyMenu } from "./components/ReusableMenu-RED/MyMenu";
import { Pencil, Copy, Share2, Archive } from "lucide-react";

function App() {
  const menuOptions = [
    {
      label: "Edit",
      icon: <Pencil size={16} />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      label: "Copy",
      icon: <Copy size={16} />,
      onClick: () => console.log("Copy clicked"),
    },
    {
      label: "Share",
      icon: <Share2 size={16} />,
      onClick: () => console.log("Share clicked"),
    },
    {
      label: "Archive",
      icon: <Archive size={16} />,
      onClick: () => console.log("Archive clicked"),
    },
  ];
  return (

        <MyMenu items={menuOptions} direction="top" anchor="start" />
  );
}

export default App;

```

### ⚙️ Options du Composant

- **`items`** : (Obligatoire) Liste de vos choix de menus, sous forme d'objets ou vous pouvez définir le texte (`label`), une icône (`icon`), et une fonction associée (`onClick`).
- **`triggerIcon`** : Icône ou texte de déclenchement (par défaut les trois points horizontaux).
- **`menuWidth`** : Largeur du menu lorsqu'il s'ouvre. Modifiez ce chiffre en px (par défaut 160).
- **`direction`** : Dans quel sens s'ouvrira le menu ("top", "bottom", "left", "right").
- **`anchor`** : Alignement de l'ouverture par rapport au point d'ancrage principal ("start", "center", "end").
