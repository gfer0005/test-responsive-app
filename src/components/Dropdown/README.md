# Dropdown Component

Un composant de liste déroulante élégant, fluide et réactif, conçu pour permettre la sélection d'une option parmi une liste (par exemple, les mois de l'année). Il partage le même style visuel premium que le composant `Combobox`, utilisant Tailwind CSS pour le style et Framer Motion pour les animations.

## Fonctionnalités

- ✨ **Design Premium** : Style arrondi moderne avec des bordures et des interactions fluides.
- 🎨 **Animations** : Transitions d'ouverture/fermeture et de sélection propulsées par Framer Motion.
- 🔗 **Contrôlé ou Non-Contrôlé** : Peut être utilisé avec son état interne ou contrôlé via vos propres états React.
- ❌ **Effaçable** : Permet de désélectionner facilement l'option choisie.
- 📱 **Responsive** : S'adapte parfaitement à la largeur définie (par défaut `max-w-md`).

## Installation

Le composant nécessite les dépendances suivantes, qui devraient déjà être présentes dans votre projet :
- `react`
- `framer-motion`
- `lucide-react` (pour les icônes)
- `tailwindcss` (pour les styles)

## Utilisation

Voici un exemple simple pour la sélection des mois de l'année :

```tsx
import React, { useState } from 'react';
import { Dropdown, DropdownOption } from './components/Dropdown';

const months: DropdownOption[] = [
  { id: 1, label: 'Janvier' },
  { id: 2, label: 'Février' },
  { id: 3, label: 'Mars' },
  { id: 4, label: 'Avril' },
  { id: 5, label: 'Mai' },
  { id: 6, label: 'Juin' },
  { id: 7, label: 'Juillet' },
  { id: 8, label: 'Août' },
  { id: 9, label: 'Septembre' },
  { id: 10, label: 'Octobre' },
  { id: 11, label: 'Novembre' },
  { id: 12, label: 'Décembre' },
];

export default function App() {
  const [selectedMonth, setSelectedMonth] = useState<DropdownOption | null>(null);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Sélectionnez un mois :</h2>
      <Dropdown 
        options={months}
        placeholder="Choisissez un mois..."
        selected={selectedMonth}
        onSelect={(option) => setSelectedMonth(option)}
      />
      
      {selectedMonth && (
        <p className="mt-4 text-gray-600">
          Mois sélectionné : <span className="font-semibold text-[#e81e62]">{selectedMonth.label}</span>
        </p>
      )}
    </div>
  );
}
```

## Props

| Prop | Type | Par défaut | Description |
| :--- | :--- | :--- | :--- |
| `options` | `DropdownOption[]` | `[]` | **Requis**. La liste des options disponibles. |
| `placeholder` | `string` | `"Sélectionner..."` | Texte affiché lorsqu'aucune option n'est sélectionnée. |
| `onSelect` | `(option: DropdownOption \| null) => void` | `undefined` | Callback appelé lorsqu'une option est choisie ou effacée. |
| `selected` | `DropdownOption \| null` | `undefined` | L'option actuellement sélectionnée. |
| `maxWidth` | `string` | `"max-w-md"` | La classe max-width du conteneur (ex: `max-w-lg`, `full`). |
| `className`| `string` | `""` | Classes CSS additionnelles pour le conteneur parent. |
| `clearable`| `boolean` | `true` | Définit si un bouton permet d'effacer la sélection actuelle. |
