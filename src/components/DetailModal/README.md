# DetailModal

Un modal au design premium basé sur `Modal.tsx`, conçu pour afficher des informations textuelles d'un objet fetché, avec une fonctionnalité intégrée de transition vers un mode édition ("Edit Mode").

## Fonctionnalités 🚀

- **Design Premium** : Arrière-plan flou (backdrop-blur), animations fluides avec `framer-motion` et palette aux teintes blanches/grises avec accent rouge (`#b3004a`).
- **Mode Édition (Toggle)** : Affiche une icône crayon (`Pencil`) en haut à droite. Au clic, tous les champs basculent d'un état désactivé (transparents et intégrés au fond) vers un état de saisie activé (avec bordures et fonds blancs).
- **Validation** : L'icône se transforme en coche de validation (`Check`). En cliquant dessus, vous enregistrez les changements et repassez en mode lecture.

## Utilisation 📝

### Exemple de base
```tsx
import { useState } from 'react';
import { DetailModal } from './components/DetailModal';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Ouvrir le Modal de Détails</button>
      
      <DetailModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        onSave={(updatedData) => {
          console.log('Données mises à jour : ', updatedData);
        }}
        title="Détails du KPI 2026"
        initialData={{
          name: "Data Entry - 2026",
          description: "Données globales sur les marchés pour 2026.",
          status: "Validation requise",
          owner: "Admin"
        }}
      />
    </>
  );
}
```

### Exemple avec une Table (Sélection par ID)
Si vous souhaitez ouvrir le modal lors d'un clic sur une ligne de votre table :

```tsx
import { useState, useEffect } from 'react';
import { Table } from './components/Table';
import { DetailModal } from './components/DetailModal';

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  
  // Fonction pour simuler le fetch des détails complets via l'ID
  const handleRowClick = (item: any) => {
    // Ici vous pourriez faire : fetch(`/api/details/${item.id}`).then(...)
    setSelectedItem(item);
  };

  return (
    <>
      <Table 
        data={myData} 
        columns={myColumns}
        // Exemple : on ajoute un bouton "View" dans les colonnes qui appelle handleRowClick
      />

      <DetailModal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)}
        title={`Détails de ${selectedItem?.name || 'l\'élément'}`}
        initialData={selectedItem}
        onSave={(data) => {
          // Update API logic here
          console.log("Saving item", selectedItem.id, data);
        }}
      />
    </>
  );
}
```

## Props associées ⚙️

| Prop | Type | Description |
|---|---|---|
| `isOpen` | boolean | Gère l'affichage du modal. |
| `onClose` | function | Fonction déclenchée à la fermeture via la croix, la touche ESC ou le backdrop. |
| `onSave` | function | (Optionnel) Fonction déclenchée lors de la confirmation d'une session d'édition. Renvoie un objet de données. |
| `title` | string | (Optionnel) Titre affiché dans l'en-tête. |
| `initialData` | any | (Optionnel) Données initiales pour pré-remplir le formulaire d'édition. |
| `className` | string | (Optionnel) Classes supplémentaires pour le conteneur du modal. |
