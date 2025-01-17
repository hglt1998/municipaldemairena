"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bars3BottomLeftIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";

interface MenuItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const menuItems: MenuItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Municipal", href: "/municipal" },
  {
    label: "Servicios",
    href: "/servicios",
    subItems: [
      { label: "Gestión Tributaria", href: "/servicios/gestion-tributaria" },
      { label: "Recaudación", href: "/servicios/recaudacion" },
      { label: "Atención al Ciudadano", href: "/servicios/atencion-al-ciudadano" },
    ],
  },
  {
    label: "Sede Electrónica",
    href: "/sede-electronica",
    subItems: [
      { label: "Trámites", href: "/sede-electronica/tramites" },
      { label: "Solicitudes", href: "/sede-electronica/solicitudes" },
    ],
  },
  { label: "Contacto", href: "/contacto" },
];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  const setTheme = (theme: "light" | "dark" | "system") => {
    document.documentElement.classList.remove("light", "dark");
    if (theme !== "system") document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleExpandItem = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Mairena
        </Link>

        {/* Menú de navegación en escritorio */}
        <div className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link
                href={item.href}
                className="text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                {item.label}
              </Link>
              {item.subItems && (
                <div className="absolute top-full left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-0 transition duration-200">
                  <ul className="p-4 space-y-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botón para abrir el menú móvil */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none text-gray-800 dark:text-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3BottomLeftIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú de navegación en móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg p-4 space-y-4">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center">
                <Link
                  href={item.href}
                  className="text-gray-800 dark:text-gray-100 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.subItems && (
                  <button
                    onClick={() => toggleExpandItem(item.label)}
                    className="text-gray-500 dark:text-gray-400 focus:outline-none"
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 transition-transform ${
                        expandedItems[item.label] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>
              {item.subItems && expandedItems[item.label] && (
                <ul className="pl-4 mt-2 space-y-2">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        href={subItem.href}
                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          {/* Selector de modo en móvil */}
          <div className="flex items-center justify-around mt-4">
            <SunIcon
              className="h-6 w-6 cursor-pointer text-violet-800 dark:text-gray-400"
              onClick={() => setTheme("light")}
            />
            <MoonIcon
              className="h-6 w-6 cursor-pointer text-gray-500 dark:text-violet-400"
              onClick={() => setTheme("dark")}
            />
            <ComputerDesktopIcon
              className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"
              onClick={() => setTheme("system")}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
