// ─── Mock data for the Table component ───────────────────────────────────────

// ── Example 1: Users ─────────────────────────────────────────────────────────
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
}

export const mockUsers: User[] = [
  { id: 1,  name: 'Alice Martin',    email: 'alice@example.com',   role: 'Admin',   status: 'Active',   createdAt: '2024-01-15' },
  { id: 2,  name: 'Bob Dupont',      email: 'bob@example.com',     role: 'Editor',  status: 'Active',   createdAt: '2024-02-03' },
  { id: 3,  name: 'Clara Nguyen',    email: 'clara@example.com',   role: 'Viewer',  status: 'Inactive', createdAt: '2024-02-18' },
  { id: 4,  name: 'David Chen',      email: 'david@example.com',   role: 'Editor',  status: 'Active',   createdAt: '2024-03-05' },
  { id: 5,  name: 'Eva Leroy',       email: 'eva@example.com',     role: 'Viewer',  status: 'Pending',  createdAt: '2024-03-22' },
  { id: 6,  name: 'François Petit',  email: 'francois@example.com',role: 'Admin',   status: 'Active',   createdAt: '2024-04-11' },
  { id: 7,  name: 'Grace Kim',       email: 'grace@example.com',   role: 'Editor',  status: 'Active',   createdAt: '2024-04-30' },
  { id: 8,  name: 'Hugo Bernard',    email: 'hugo@example.com',    role: 'Viewer',  status: 'Inactive', createdAt: '2024-05-14' },
  { id: 9,  name: 'Isabelle Roy',    email: 'isa@example.com',     role: 'Editor',  status: 'Active',   createdAt: '2024-06-01' },
  { id: 10, name: 'Jules Moreau',    email: 'jules@example.com',   role: 'Viewer',  status: 'Pending',  createdAt: '2024-06-20' },
  { id: 11, name: 'Karen Blanc',     email: 'karen@example.com',   role: 'Admin',   status: 'Active',   createdAt: '2024-07-08' },
  { id: 12, name: 'Luc Simon',       email: 'luc@example.com',     role: 'Editor',  status: 'Active',   createdAt: '2024-07-25' },
];

// ── Example 2: Products ───────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
}

export const mockProducts: Product[] = [
  { id: 1,  name: 'Wireless Headphones', category: 'Electronics', price: 89.99,  stock: 142, sku: 'ELEC-001' },
  { id: 2,  name: 'Mechanical Keyboard', category: 'Electronics', price: 129.00, stock: 54,  sku: 'ELEC-002' },
  { id: 3,  name: 'Ergonomic Chair',     category: 'Furniture',   price: 349.99, stock: 23,  sku: 'FURN-001' },
  { id: 4,  name: 'Standing Desk',       category: 'Furniture',   price: 499.00, stock: 10,  sku: 'FURN-002' },
  { id: 5,  name: 'USB-C Hub',           category: 'Electronics', price: 45.50,  stock: 300, sku: 'ELEC-003' },
  { id: 6,  name: 'Monitor 27"',         category: 'Electronics', price: 399.00, stock: 67,  sku: 'ELEC-004' },
  { id: 7,  name: 'Notebook Set',        category: 'Stationery',  price: 12.99,  stock: 500, sku: 'STAT-001' },
  { id: 8,  name: 'Lamp LED',            category: 'Furniture',   price: 59.99,  stock: 88,  sku: 'FURN-003' },
];

// ── Example 3: Orders ─────────────────────────────────────────────────────────
export interface Order {
  orderId: string;
  customer: string;
  amount: number;
  status: 'Shipped' | 'Processing' | 'Delivered' | 'Cancelled';
  date: string;
}

export const mockOrders: Order[] = [
  { orderId: '#ORD-1001', customer: 'Alice Martin',   amount: 219.98, status: 'Delivered',  date: '2024-07-01' },
  { orderId: '#ORD-1002', customer: 'Bob Dupont',     amount: 89.99,  status: 'Shipped',    date: '2024-07-03' },
  { orderId: '#ORD-1003', customer: 'Clara Nguyen',   amount: 499.00, status: 'Processing', date: '2024-07-05' },
  { orderId: '#ORD-1004', customer: 'David Chen',     amount: 45.50,  status: 'Delivered',  date: '2024-07-06' },
  { orderId: '#ORD-1005', customer: 'Eva Leroy',      amount: 129.00, status: 'Cancelled',  date: '2024-07-08' },
  { orderId: '#ORD-1006', customer: 'François Petit', amount: 349.99, status: 'Shipped',    date: '2024-07-09' },
];
