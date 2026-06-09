"use client"

import Link from "next/link"
import React from "react"
import { Zap, ShoppingCart, Menu, X } from "lucide-react"
import { useCarrinho } from "@/lib/cart-context"
import CartDrawer from "@/components/cart-drawer"

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { quantidadeCarrinho, setCarrinhoAberto, carrinhoAberto } = useCarrinho()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/produtos", label: "Produtos" },
    { href: "/servicos", label: "Serviços" },
    { href: "/contato", label: "Contato" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 md:px-12 lg:px-36 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-jeans-500 text-white group-hover:scale-105 transition-transform duration-300">
          <Zap className="h-5 w-5 fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase text-white group-hover:text-jeans-500 transition-colors duration-300">
            Eletro<span className="text-jeans-500 italic">Barros</span>
          </h1>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-zinc-400 hover:text-jeans-500 transition-colors duration-300 uppercase tracking-wider"
          >
            {link.label}
          </Link>
        ))}
        
        {/* Cart Trigger */}
        <button
          onClick={() => setCarrinhoAberto(!carrinhoAberto)}
          className="relative text-zinc-400 hover:text-jeans-500 transition-colors p-2"
          aria-label="Ver Orçamento"
        >
          <ShoppingCart className="h-6 w-6" />
          {quantidadeCarrinho > 0 && (
            <span className="absolute -top-1 -right-1 bg-jeans-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-bounce">
              {quantidadeCarrinho}
            </span>
          )}
        </button>

        <button
          onClick={() => setCarrinhoAberto(true)}
          className="bg-jeans-500 hover:bg-jeans-400 text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded transition-all duration-300 hover:scale-105"
        >
          Ver Lista
        </button>
      </nav>

      {/* Right-side Mobile Controls */}
      <div className="flex items-center gap-4 md:hidden">
        {/* Mobile Cart Trigger */}
        <button
          onClick={() => setCarrinhoAberto(!carrinhoAberto)}
          className="relative text-zinc-400 hover:text-jeans-500 transition-colors p-2"
          aria-label="Ver Orçamento"
        >
          <ShoppingCart className="h-6 w-6" />
          {quantidadeCarrinho > 0 && (
            <span className="absolute -top-1 -right-1 bg-jeans-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center">
              {quantidadeCarrinho}
            </span>
          )}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none p-2 rounded-lg border border-zinc-800 hover:bg-zinc-900 transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-black/95 border-b border-zinc-900 flex flex-col p-6 space-y-4 md:hidden animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              onClick={() => setIsOpen(false)}
              href={link.href}
              className="text-lg font-bold text-zinc-300 hover:text-jeans-500 transition-colors py-2 uppercase tracking-wide border-b border-zinc-900/50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            onClick={() => setIsOpen(false)}
            href="/contato"
            className="w-full bg-jeans-500 hover:bg-jeans-400 text-white font-bold text-center py-4 rounded uppercase tracking-wider transition-all"
          >
            Solicitar Orçamento
          </Link>
        </div>
      )}
      <CartDrawer />
    </header>
  )
}