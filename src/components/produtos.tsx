"use client"

import Image from "next/image"
import { useCarrinho } from "@/lib/cart-context"
import { Check, ShoppingCart } from "lucide-react"
import React, { useState } from "react"
import produtosDataFromJson from "@/data/produtos.json"

interface Produto {
  id: number
  nome: string
  preco: string
  imagem: string
  categoria: string
  destaque: boolean
}

const produtosData = produtosDataFromJson as Produto[]

interface ProdutosProps {
  categoriaAtiva?: string
  limite?: number
  apenasDestaques?: boolean
}

export default function Produtos({ categoriaAtiva = "Todos", limite, apenasDestaques = false }: ProdutosProps) {
  const { adicionarAoCarrinho } = useCarrinho()
  const [itensAdicionados, setItensAdicionados] = useState<Record<number, boolean>>({})

  const lidarComAdicionarAoCarrinho = (produto: Produto) => {
    adicionarAoCarrinho({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
    })

    // Show temporary success feedback for this button
    setItensAdicionados((prev) => ({ ...prev, [produto.id]: true }))
    setTimeout(() => {
      setItensAdicionados((prev) => ({ ...prev, [produto.id]: false }))
    }, 2000)
  }

  // Filter products by category
  let produtosFiltrados = categoriaAtiva === "Todos"
    ? produtosData
    : produtosData.filter((p) => p.categoria.toLowerCase() === categoriaAtiva.toLowerCase())

  if (apenasDestaques) {
    produtosFiltrados = produtosFiltrados.filter(p => p.destaque)
  }

  // Slice if there's a limit (for home page)
  const produtosExibidos = limite ? produtosFiltrados.slice(0, limite) : produtosFiltrados

  return (
    <section className="w-full py-8 flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
          Materiais em <span className="text-jeans-500 italic">Destaque</span>
        </h2>
        <p className="text-zinc-500 text-sm mt-2 max-w-xl">
          Componentes homologados pelas normas de segurança elétrica vigentes.
        </p>
      </div>

      {produtosExibidos.length === 0 ? (
        <div className="py-12 text-zinc-500 text-center w-full">
          Nenhum produto encontrado nesta categoria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {produtosExibidos.map((produto) => (
            <div
              key={produto.id}
              className="group bg-zinc-950 border border-zinc-900 rounded-2xl p-5 flex flex-col gap-4 hover:border-jeans-500/50 hover:shadow-[0_0_20px_rgba(75,101,132,0.05)] transition-all duration-300 relative overflow-hidden"
            >
              {/* Categoria Badge */}
              <span className="absolute top-4 left-4 bg-zinc-900/90 text-jeans-500 border border-zinc-800 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                {produto.categoria}
              </span>

              {/* Product Image */}
              <div className="w-full h-56 relative bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-900 group-hover:border-zinc-800 transition-colors shrink-0">
                <Image
                  src={produto.imagem}
                  alt={produto.nome}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col gap-2 mt-2">
                <h3 className="text-base font-bold text-zinc-100 group-hover:text-jeans-500 transition-colors duration-300 line-clamp-2">
                  {produto.nome}
                </h3>
                <span className="text-xl font-black text-white mt-auto">
                  {produto.preco}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => lidarComAdicionarAoCarrinho(produto)}
                className={`w-full font-bold text-xs uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  itensAdicionados[produto.id]
                    ? "bg-green-600 text-white"
                    : "bg-white hover:bg-jeans-500 hover:text-white text-black hover:scale-[1.02]"
                }`}
              >
                {itensAdicionados[produto.id] ? (
                  <>
                    <Check className="h-4 w-4" />
                    Adicionado
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Adicionar à Lista
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}