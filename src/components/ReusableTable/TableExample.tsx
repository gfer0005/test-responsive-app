import { useState } from 'react';
import { Table } from './Table';
import type { Column } from './Table';
import { mockUsers, mockProducts, mockOrders } from './mockData';
import type { User, Product, Order } from './mockData';

const ITEMS_PER_PAGE = 5;

// ─────────────────────────────────────────────────────────────────────────────
// Example 1 – Users table
// ─────────────────────────────────────────────────────────────────────────────
function UsersTableExample() {
  const [page, setPage] = useState(1);

  const pageData = mockUsers.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns: Column<User>[] = [
    { key: 'id',        title: '#',         sortable: true },
    { key: 'name',      title: 'Name',      sortable: true },
    { key: 'email',     title: 'Email' },
    { key: 'role',      title: 'Role',      sortable: true },
    {
      key: 'status',
      title: 'Status',
      render: (user) => {
        const colors: Record<string, string> = {
          Active:   'bg-green-100 text-green-700',
          Inactive: 'bg-gray-100 text-gray-500',
          Pending:  'bg-yellow-100 text-yellow-700',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[user.status]}`}>
            {user.status}
          </span>
        );
      },
    },
    { key: 'createdAt', title: 'Created At', sortable: true },
  ];

  return (
    <div className="h-[420px]">
      <Table<User>
        data={pageData}
        columns={columns}
        totalItems={mockUsers.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 2 – Products table (scrollable)
// ─────────────────────────────────────────────────────────────────────────────
function ProductsTableExample() {
  const [page, setPage] = useState(1);

  const pageData = mockProducts.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns: Column<Product>[] = [
    { key: 'sku',      title: 'SKU' },
    { key: 'name',     title: 'Product',  sortable: true },
    { key: 'category', title: 'Category', sortable: true },
    {
      key: 'price',
      title: 'Price',
      sortable: true,
      render: (p) => `$${p.price.toFixed(2)}`,
    },
    {
      key: 'stock',
      title: 'Stock',
      sortable: true,
      render: (p) => (
        <span className={p.stock < 30 ? 'text-red-500 font-medium' : 'text-slate-700'}>
          {p.stock}
        </span>
      ),
    },
  ];

  return (
    <div className="h-[420px]">
      <Table<Product>
        data={pageData}
        columns={columns}
        totalItems={mockProducts.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
        scrollable
        maxHeight="320px"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Example 3 – Orders table with render custom badge
// ─────────────────────────────────────────────────────────────────────────────
function OrdersTableExample() {
  const [page, setPage] = useState(1);

  const pageData = mockOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns: Column<Order>[] = [
    { key: 'orderId',  title: 'Order ID' },
    { key: 'customer', title: 'Customer', sortable: true },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      render: (o) => <span className="font-semibold">${o.amount.toFixed(2)}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (o) => {
        const map: Record<string, string> = {
          Delivered:  'bg-green-100 text-green-700',
          Shipped:    'bg-blue-100 text-blue-700',
          Processing: 'bg-yellow-100 text-yellow-700',
          Cancelled:  'bg-red-100 text-red-600',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${map[o.status]}`}>
            {o.status}
          </span>
        );
      },
    },
    { key: 'date', title: 'Date', sortable: true },
  ];

  return (
    <div className="h-[420px]">
      <Table<Order>
        data={pageData}
        columns={columns}
        totalItems={mockOrders.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main demo page – combine all examples
// ─────────────────────────────────────────────────────────────────────────────
export default function TableExamples() {
  return (
    <div className="min-h-screen bg-slate-100 p-10 flex flex-col gap-12">
      <h1 className="text-3xl font-bold text-slate-800">Table Component – Examples</h1>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Example 1 – Users</h2>
        <UsersTableExample />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Example 2 – Products (scrollable)</h2>
        <ProductsTableExample />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Example 3 – Orders</h2>
        <OrdersTableExample />
      </section>
    </div>
  );
}
