# Combobox Component

Un composant de sélection de type Combobox premium avec recherche intégrée, inspiré par un design moderne et minimaliste.

## Caractéristiques

- **Recherche en temps réel** : Filtrage dynamique des options au fur et à mesure de la saisie.
- **Support d'Objets** : Manipulation d'objets complexes (`{ id, title }`).
- **Animations Fluides** : Utilisation de Framer Motion pour les transitions du menu déroulant.
- **Bouton de Suppression** : Une petite croix pour réinitialiser la sélection.
- **Entièrement Réactif** : Adaptable à toutes les tailles d'écran.

## Utilisation

```tsx
import { Combobox } from './components/Combobox';

const options = [
  { id: 1, title: 'KPI 1' },
  { id: 2, title: 'KPI 2' },
  { id: 3, title: 'KPI 3' },
];

function MyComponent() {
  const [selected, setSelected] = useState(null);

  return (
    <Combobox 
      options={options} 
      placeholder="Sélectionnez un KPI..."
      onSelect={(option) => setSelected(option)}
    />
  );
}
```

## Propriétés (Props)

| Prop | Type | Par défaut | Description |
| :--- | :--- | :--- | :--- |
| `options` | `ComboboxOption[]` | `[]` | Liste d'objets avec au moins un `id` et un `title`. |
| `placeholder` | `string` | `"KPI Selection"`| Texte affiché par défaut. |
| `onSelect` | `(option: ComboboxOption \| null) => void` | `undefined` | Callback lors de la sélection. |
| `selected` | `ComboboxOption \| null` | `undefined` | Option sélectionnée (mode contrôlé). |
| `maxWidth` | `string` | `"max-w-md"` | Largeur maximale du combobox (classe Tailwind). |
| `className` | `string` | `""` | Classe CSS personnalisée pour le conteneur. |
