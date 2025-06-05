'use client';
import { House, ShoppingCart, User, Shirt, PanelsTopLeft, Settings, Phone, Percent } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-16 h-screen bg-gray-800 text-white transition-all duration-300">
      <div className="flex flex-col w-full p-4">
        <nav className="flex gap-8 flex-col mt-6">
          <Link href="/admin" className="flex items-center space-x-2 text-lg">
            <House />
          </Link>
          <Link href="/admin/orders" className="flex items-center space-x-2 text-lg">
            <ShoppingCart />
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-2 text-lg">
            <User />
          </Link>
          <Link href="/admin/products" className="flex items-center space-x-2 text-lg">
            <Shirt />
          </Link>
          <Link href={'/admin/website/carousel'} className="flex items-center space-x-2 text-lg">
            <PanelsTopLeft />
          </Link>
          <Link href={'/admin/callme'} className="flex items-center space-x-2 text-lg">
            <Phone />
          </Link>
          <Link href={'/admin/discounts'} className="flex items-center space-x-2 text-lg">
            <Percent />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
