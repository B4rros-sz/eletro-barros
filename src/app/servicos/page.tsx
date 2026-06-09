"use client"

import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Carrosel from "@/components/carrosel"
import Servicos from "@/components/servicos"

export default function PaginaServicos() {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Carousel representing work sites */}
        <Carrosel />

        {/* Services detail list */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-36 py-16">
          <Servicos />
        </div>
      </main>

      <Footer />
    </div>
  )
}