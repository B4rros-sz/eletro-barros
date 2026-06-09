"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface ItemCarrinho {
  id: number
  nome: string
  preco: string
  imagem: string
  quantidade: number
}

interface TipoContextoCarrinho {
  carrinho: ItemCarrinho[]
  adicionarAoCarrinho: (item: Omit<ItemCarrinho, "quantidade">) => void
  removerDoCarrinho: (id: number) => void
  atualizarQuantidade: (id: number, quantidade: number) => void
  limparCarrinho: () => void
  carrinhoAberto: boolean
  setCarrinhoAberto: (aberto: boolean) => void
  quantidadeCarrinho: number
}

const ContextoCarrinho = createContext<TipoContextoCarrinho | undefined>(undefined)

export function ProvedorCarrinho({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([])
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("eletrobarros_cart")
    if (carrinhoSalvo) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarrinho(JSON.parse(carrinhoSalvo))
      } catch (e) {
        console.error("Falha ao carregar o carrinho do localStorage", e)
      }
    }
  }, [])

  // Save cart to localStorage and update count when cart changes
  useEffect(() => {
    localStorage.setItem("eletrobarros_cart", JSON.stringify(carrinho))
    const total = carrinho.reduce((acc, item) => acc + item.quantidade, 0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuantidadeCarrinho(total)
  }, [carrinho])

  const adicionarAoCarrinho = (novoItem: Omit<ItemCarrinho, "quantidade">) => {
    setCarrinho((carrinhoAnterior) => {
      const itemExistente = carrinhoAnterior.find((item) => item.id === novoItem.id)
      if (itemExistente) {
        return carrinhoAnterior.map((item) =>
          item.id === novoItem.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      }
      return [...carrinhoAnterior, { ...novoItem, quantidade: 1 }]
    })
    setCarrinhoAberto(true) // Open the side drawer automatically when adding
  }

  const removerDoCarrinho = (id: number) => {
    setCarrinho((carrinhoAnterior) => carrinhoAnterior.filter((item) => item.id !== id))
  }

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id)
      return
    }
    setCarrinho((carrinhoAnterior) =>
      carrinhoAnterior.map((item) =>
        item.id === id ? { ...item, quantidade: quantidade } : item
      )
    )
  }

  const limparCarrinho = () => {
    setCarrinho([])
  }

  return (
    <ContextoCarrinho.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        carrinhoAberto,
        setCarrinhoAberto,
        quantidadeCarrinho,
      }}
    >
      {children}
    </ContextoCarrinho.Provider>
  )
}

export function useCarrinho() {
  const contexto = useContext(ContextoCarrinho)
  if (contexto === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um ProvedorCarrinho")
  }
  return contexto
}
