# 🚫 NoAccessPage Component

Un composant d'écran d'interdiction **premium**, conçu pour informer les utilisateurs qu'ils n'ont pas les permissions nécessaires pour accéder à une ressource, tout en offrant une voie de recours élégante.

![No Access Preview](no-access-bg.png)

## ✨ Caractéristiques

- 🛡️ **Full-Screen Privacy** : Couvre tout l'écran avec un overlay sombre et un flou gaussien (`backdrop-blur`).
- 🖼️ **Design Premium** : Utilise l'image `no-access-bg.png` pour un rendu visuel impactant et professionnel.
- ✉️ **Bouton de Contact intégré** : Permet de rediriger l'utilisateur vers le support ou de déclencher une action personnalisée.
- 🎭 **Animations d'entrée** : Texte et bouton animés avec **Framer Motion**.
- 📱 **Totalement Responsive** : S'adapte parfaitement aux mobiles et tablettes.

## 🛠️ Utilisation

### Importation

```tsx
import { NoAccessPage } from './components/NoAccessPage';
```

### Exemple d'implémentation

```tsx
if (!userHasPermission) {
  return (
    <NoAccessPage 
      title="Accès Restreint" 
      description="Votre profil n'a pas encoré été autorisé à accéder à cette section. Veuillez contacter l'équipe IT."
      onContactClick={() => {
        // Logique personnalisée ou redirection
        window.location.href = 'mailto:support@company.com';
      }}
    />
  );
}
```

## ⚙️ Propriétés (Props)

| Prop | Type | Par défaut | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Accès Refusé"` | Titre principal affiché en haut. |
| `description` | `string` | `"Vous n'avez pas les permissions..."` | Texte explicatif détaillé. |
| `contactEmail` | `string` | `"admin@example.com"` | Adresse mail utilisée si `onContactClick` n'est pas défini. |
| `onContactClick` | `() => void` | `undefined` | Callback déclenché au clic sur le bouton de contact. |

## 📁 Structure du Dossier

- `NoAccessPage.tsx` : Composant principal.
- `index.ts` : Point d'entrée.
- `no-access-bg.png` : Image d'arrière-plan.
- `README.md` : Documentation.
