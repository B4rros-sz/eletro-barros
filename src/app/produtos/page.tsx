"use client"

import React, { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Produtos from "@/components/produtos"

export default function PaginaProdutos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos")
  const categorias = ["Todos", "Cabos", "Iluminação", "Ferramentas", "Segurança"]

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />
      
      {/* Category Header */}
      <div className="py-10 bg-zinc-950 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-36">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Catálogo de <span className="text-jeans-500 italic">Produtos</span>
          </h1>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categorias.map((cat) => {
              const isActive = categoriaAtiva === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer hover:scale-105 duration-200 ${
                    isActive
                      ? "bg-jeans-500 text-white border-jeans-500 shadow-[0_0_15px_rgba(75,101,132,0.25)]"
                      : "border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Catalog Area */}
      <main className="flex-1 max-w-7xl mx-auto px-6 md:px-12 lg:px-36 py-12 w-full">
        <Produtos categoriaAtiva={categoriaAtiva} />
      </main>

      <Footer />
    </div>
  )
}