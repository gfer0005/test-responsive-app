# AddReusableModal

Un modal de création d'objet haut de gamme, conçu pour capturer des entrées utilisateur de manière élégante et ergonomique.

## Fonctionnalités 🎨

- **Design Premium** : Arrière-plan flouté, ombres portées douces, et micro-animations via `framer-motion`.
- **Validation Intégrée** : Le champ "Nom" est requis par défaut.
- **Réinitialisation Automatique** : Le formulaire se vide automatiquement à chaque nouvelle ouverture.
- **UX Améliorée** : Le premier champ reçoit le focus automatiquement à l'ouverture du modal.

## Utilisation 🚀

### Exemple de base

```tsx
import { useState } from 'react';
import { AddReusableModal } from './components/AddReusableModal';

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (newData) => {
    console.log("Nouvel objet créé :", newData);
    // Logique d'envoi à votre API ici
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Ajouter un Item</button>

      <AddReusableModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
        title="Nouveau Dossier Projet"
      />
    </>
  );
}
```

## Props associées ⚙️

| Prop | Type | Description |
|---|---|---|
| `isOpen` | boolean | Contrôle la visibilité du modal. |
| `onClose` | function | Déclenché lors du clic sur Annuler, la croix, ESC ou le fond. |
| `onCreate` | function | **(Requis)** Reçoit l'objet contenant les champs saisis par l'utilisateur. |
| `title` | string | Titre affiché dans l'en-tête (Défaut: "Créer un nouvel élément"). |

## Style visuel 💅

Le modal utilise une palette de gris clairs (`#f2f2f2`) pour le fond et un accent `rouge (#b3004a)` pour les boutons d'action et les états de focus des inputs, assurant une cohérence parfaite avec le reste de votre application.
