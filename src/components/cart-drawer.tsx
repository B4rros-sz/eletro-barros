"use client"

import React from "react"
import { X, Trash2, Plus, Minus, Send, ShoppingBag } from "lucide-react"
import { useCarrinho } from "@/lib/cart-context"
import Image from "next/image"

export default function CartDrawer() {
  const {
    carrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    carrinhoAberto,
    setCarrinhoAberto,
  } = useCarrinho()

  if (!carrinhoAberto) return null

  // Calculate total price
  const calculateTotal = () => {
    return carrinho.reduce((acc, item) => {
      const numericPrice = parseFloat(
        item.preco.replace("R$ ", "").replace(".", "").replace(",", ".")
      )
      return acc + numericPrice * item.quantidade
    }, 0)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  // Generate WhatsApp message and redirect link
  const handleSendWhatsApp = () => {
    const phone = "5511999999999" // WhatsApp da EletroBarros
    let message = "⚡ *Orçamento - EletroBarros* ⚡\n\nOlá! Gostaria de solicitar o orçamento dos seguintes materiais:\n\n"

    carrinho.forEach((item, index) => {
      message += `${index + 1}. *${item.nome}*\n`
      message += `   Qtd: ${item.quantidade}x | Valor Unid: ${item.preco}\n\n`
    })

    const total = calculateTotal()
    message += `*Valor Estimado Total:* ${formatCurrency(total)}\n\n`
    message += "Por favor, confirmem a disponibilidade dos itens e prazos de entrega. Obrigado!"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCarrinhoAberto(false)}
      ></div>

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md h-full bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-jeans-500" />
            <h2 className="text-xl font-bold uppercase tracking-wider">
              Lista de Orçamento
            </h2>
          </div>
          <button
            onClick={() => setCarrinhoAberto(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-lg border border-zinc-900 hover:bg-zinc-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {carrinho.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <div className="h-16 w-16 bg-zinc-900 text-zinc-600 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-300">Sua lista está vazia</p>
                <p className="text-sm text-zinc-500 mt-1 max-w-[250px]">
                  Navegue pelos produtos e adicione os itens para solicitar o orçamento.
                </p>
              </div>
            </div>
          ) : (
            carrinho.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 bg-zinc-900/50 border border-zinc-900 p-4 rounded-xl items-center"
              >
                <div className="relative h-16 w-16 bg-black rounded-lg overflow-hidden shrink-0 border border-zinc-800">
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-white truncate">
                    {item.nome}
                  </h3>
                  <p className="text-xs text-jeans-500 font-bold mt-1">
                    {item.preco}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                      className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                      className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removerDoCarrinho(item.id)}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {carrinho.length > 0 && (
          <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Subtotal Estimado:</span>
              <span className="text-lg font-black text-white">
                {formatCurrency(calculateTotal())}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={limparCarrinho}
                className="py-3 border border-zinc-800 hover:border-red-500/30 hover:bg-red-950/20 text-zinc-400 hover:text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
              >
                Limpar Tudo
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="py-3 bg-jeans-500 hover:bg-jeans-400 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
              >
                Orçar no WhatsApp
                <Send className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>
            
            <p className="text-[10px] text-zinc-500 text-center">
              *Os valores apresentados são estimativos. Sujeitos a alterações e disponibilidade de estoque.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
