# 📋 ReusableTable

Un composant de tableau React générique, typé TypeScript, avec **tri**, **pagination** et **colonnes personnalisables**. Prêt à copier-coller dans n'importe quel projet React + Tailwind CSS.

---

## 📁 Structure du dossier

```
ReusableTable/
├── Table.tsx          # Composant principal
├── mockData.ts        # Données de test (3 exemples)
├── TableExample.tsx   # Page de démonstration complète
├── index.ts           # Point d'entrée (barrel file)
└── README.md          # Cette documentation
```

---

## 🔧 Prérequis

| Dépendance      | Version minimale |
|-----------------|-----------------|
| React           | ≥ 18            |
| TypeScript      | ≥ 5             |
| Tailwind CSS    | ≥ 3             |
| lucide-react    | ≥ 0.300         |

Installer `lucide-react` si ce n'est pas déjà fait :

```bash
npm install lucide-react
```

---

## 🚀 Installation dans un nouveau projet

1. **Copie le dossier** `ReusableTable/` dans `src/components/` de ton projet.
2. **Importe** le composant depuis le barrel file :

```tsx
import { Table } from '../components/ReusableTable';
import type { Column } from '../components/ReusableTable';
```

> ✅ C'est tout ! Aucune configuration supplémentaire requise.

---

## 📖 Usage de base

```tsx
import { useState } from 'react';
import { Table } from '../components/ReusableTable';
import type { Column } from '../components/ReusableTable';

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob',   email: 'bob@example.com'   },
];

const columns: Column<User>[] = [
  { key: 'id',    title: '#',     sortable: true },
  { key: 'name',  title: 'Name',  sortable: true },
  { key: 'email', title: 'Email' },
];

export default function MyPage() {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Paginate your data (or fetch page from API)
  const pageData = users.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{ height: '500px' }}>
      <Table<User>
        data={pageData}
        columns={columns}
        totalItems={users.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}
```

---

## ⚙️ Props API

### `TableProps<T>`

| Prop           | Type                        | Défaut   | Description                                       |
|----------------|-----------------------------|----------|---------------------------------------------------|
| `data`         | `T[]`                       | —        | **Requis** – données de la page courante          |
| `columns`      | `Column<T>[]`               | —        | **Requis** – définition des colonnes              |
| `totalItems`   | `number`                    | —        | **Requis** – nombre total d'éléments              |
| `currentPage`  | `number`                    | —        | **Requis** – page actuelle (commence à 1)         |
| `onPageChange` | `(page: number) => void`    | —        | **Requis** – callback changement de page          |
| `itemsPerPage` | `number`                    | `10`     | Nombre d'éléments par page                        |
| `scrollable`   | `boolean`                   | `false`  | Active le scroll vertical dans le tableau         |
| `maxHeight`    | `string`                    | `'500px'`| Hauteur max si `scrollable` est activé            |

---

### `Column<T>`

| Propriété          | Type                          | Défaut | Description                              |
|--------------------|-------------------------------|--------|------------------------------------------|
| `key`              | `keyof T \| string`           | —      | **Requis** – clé de la donnée            |
| `title`            | `string`                      | —      | **Requis** – label de l'en-tête          |
| `sortable`         | `boolean`                     | `false`| Active le tri sur cette colonne          |
| `render`           | `(item: T) => React.ReactNode`| —      | Rendu personnalisé de la cellule         |
| `headerClassName`  | `string`                      | —      | Classes CSS additionnelles pour le `<th>`|
| `cellClassName`    | `string`                      | —      | Classes CSS additionnelles pour le `<td>`|

---

## 🎨 Exemples avancés

### Colonne avec badge coloré (statuts)

```tsx
{
  key: 'status',
  title: 'Statut',
  render: (item) => {
    const colors = {
      Active:   'bg-green-100 text-green-700',
      Inactive: 'bg-gray-100 text-gray-500',
      Pending:  'bg-yellow-100 text-yellow-700',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[item.status]}`}>
        {item.status}
      </span>
    );
  },
}
```

### Colonne avec mise en forme monétaire

```tsx
{
  key: 'price',
  title: 'Prix',
  sortable: true,
  render: (item) => `$${item.price.toFixed(2)}`,
}
```

### Colonne avec mise en évidence conditionnelle

```tsx
{
  key: 'stock',
  title: 'Stock',
  sortable: true,
  render: (item) => (
    <span className={item.stock < 30 ? 'text-red-500 font-medium' : ''}>
      {item.stock}
    </span>
  ),
}
```

### Tableau avec scroll vertical

```tsx
<Table<Product>
  data={pageData}
  columns={columns}
  totalItems={total}
  itemsPerPage={10}
  currentPage={page}
  onPageChange={setPage}
  scrollable          // ← active le scroll
  maxHeight="400px"   // ← hauteur max du corps du tableau
/>
```

---

## 🗃️ Utilisation avec API (pagination serveur)

Quand la pagination est gérée côté serveur, passe directement la page retournée par l'API :

```tsx
const [page, setPage] = useState(1);
const [data, setData] = useState([]);
const [total, setTotal] = useState(0);

useEffect(() => {
  fetch(`/api/users?page=${page}&limit=10`)
    .then(res => res.json())
    .then(({ items, total }) => {
      setData(items);
      setTotal(total);
    });
}, [page]);

return (
  <Table
    data={data}
    columns={columns}
    totalItems={total}
    itemsPerPage={10}
    currentPage={page}
    onPageChange={setPage}
  />
);
```

---

## 🧪 Mock data disponibles

Le fichier `mockData.ts` fournit 3 jeux de données prêts à l'emploi pour le développement :

```ts
import { mockUsers, mockProducts, mockOrders } from '../components/ReusableTable';
import type { User, Product, Order } from '../components/ReusableTable';
```

| Export          | Type       | Nb entrées | Description                |
|-----------------|------------|------------|----------------------------|
| `mockUsers`     | `User[]`   | 12         | Utilisateurs avec rôles    |
| `mockProducts`  | `Product[]`| 8          | Produits avec prix & stock |
| `mockOrders`    | `Order[]`  | 6          | Commandes avec statuts     |

---

## 🎯 Démo complète

Le fichier `TableExample.tsx` contient une page de démonstration avec les 3 exemples. Pour l'utiliser :

```tsx
// Dans App.tsx ou ton router
import TableExamples from './components/ReusableTable/TableExample';

function App() {
  return <TableExamples />;
}
```

---

## 📌 Notes importantes

- Le composant gère le **tri localement** sur les données de la page courante. Pour un tri côté serveur, passe les données déjà triées via `data`.
- La **pagination** calcule automatiquement le nombre de pages à partir de `totalItems` et `itemsPerPage`.
- Le composant requiert un **conteneur avec une hauteur définie** (`height` ou `h-[Xpx]`) pour s'afficher correctement.
- La couleur accent principale est `#e81e62` (rose/rouge). Pour changer la couleur, remplace toutes les occurrences de `#e81e62` dans `Table.tsx`.
