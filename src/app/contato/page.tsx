"use client"

import React, { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react"

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" })
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; message?: string }>({ type: "idle" })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!form.nome.trim() || !form.email.trim() || !form.mensagem.trim()) {
      setStatus({ type: "error", message: "Por favor, preencha todos os campos obrigatórios." })
      return
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setStatus({ type: "error", message: "Formato de e-mail inválido." })
      return
    }

    setStatus({ type: "loading" })

    // Simulate API Submission
    setTimeout(() => {
      setStatus({ type: "success" })
      setForm({ nome: "", email: "", mensagem: "" })
    }, 1500)
  }

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-36 grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col justify-center">
          <span className="text-jeans-500 uppercase tracking-widest text-xs font-semibold mb-3 block">
            Suporte e Contato
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Fale com a <span className="text-jeans-500 italic">Gente</span>
          </h1>
          <p className="text-zinc-400 mb-8 text-lg leading-relaxed">
            Precisa de um orçamento detalhado para sua obra ou de um serviço emergencial? Preencha o formulário ou fale conosco diretamente pelos nossos canais oficiais de atendimento.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-jeans-500" />
              </div>
              <div>
                <p className="font-bold text-white">Nosso Endereço</p>
                <p className="text-sm text-zinc-400 mt-1">Rua da Elétrica, 123 - Centro, São Paulo - SP</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-jeans-500" />
              </div>
              <div>
                <p className="font-bold text-white">Canais de Telefone e WhatsApp</p>
                <p className="text-sm text-zinc-400 mt-1">(11) 99999-9999 (WhatsApp) / (11) 3333-3333</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-jeans-500" />
              </div>
              <div>
                <p className="font-bold text-white">E-mail para Orçamentos e Projetos</p>
                <p className="text-sm text-zinc-400 mt-1">contato@eletrobarros.com.br</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-jeans-500" />
              </div>
              <div>
                <p className="font-bold text-white">Horário de Funcionamento</p>
                <p className="text-sm text-zinc-400 mt-1">Segunda a Sexta: 08:00 às 18:00 | Sábado: 08:00 às 12:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="flex items-center justify-center">
          {status.type === "success" ? (
            <div className="w-full bg-zinc-950 border border-green-500/30 p-10 rounded-2xl flex flex-col items-center text-center gap-4 animate-in zoom-in-95 duration-300">
              <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white">Mensagem Enviada!</h3>
                <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                  Obrigado pelo contato! Nossa equipe técnica já recebeu suas informações e responderá em até 2 horas.
                </p>
              </div>
              <button
                onClick={() => setStatus({ type: "idle" })}
                className="mt-4 px-6 py-3 border border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900 text-sm font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Enviar nova mensagem
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full bg-zinc-950 border border-zinc-900 p-8 md:p-10 rounded-2xl flex flex-col gap-5 relative overflow-hidden"
            >
              <h2 className="text-xl font-bold uppercase tracking-wide text-white border-b border-zinc-900 pb-4">
                Envie uma Mensagem
              </h2>

              {status.type === "error" && (
                <div className="flex items-center gap-3 bg-red-950/20 border border-red-500/30 p-4 rounded-xl text-red-400 text-sm animate-in fade-in duration-200">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{status.message}</span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="nome" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Nome Completo
                </label>
                <input
                  id="nome"
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleInputChange}
                  placeholder="Seu Nome"
                  disabled={status.type === "loading"}
                  className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-jeans-500 outline-none text-zinc-100 placeholder-zinc-600 transition-colors focus:bg-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Endereço de E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="exemplo@eletro.com"
                  disabled={status.type === "loading"}
                  className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-jeans-500 outline-none text-zinc-100 placeholder-zinc-600 transition-colors focus:bg-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="mensagem" className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Mensagem ou Solicitação
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={form.mensagem}
                  onChange={handleInputChange}
                  placeholder="Descreva o serviço elétrico ou material que você precisa..."
                  rows={4}
                  disabled={status.type === "loading"}
                  className="w-full p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:border-jeans-500 outline-none text-zinc-100 placeholder-zinc-600 transition-colors focus:bg-zinc-900 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status.type === "loading"}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all duration-300 ${
                  status.type === "loading"
                    ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    : "bg-jeans-500 hover:bg-jeans-400 text-white hover:scale-[1.02] cursor-pointer"
                }`}
              >
                {status.type === "loading" ? (
                  "Enviando..."
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="h-4 w-4 fill-current" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}