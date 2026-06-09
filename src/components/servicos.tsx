"use client"

import React from "react"
import { Home, ShieldCheck, FileText, Factory } from "lucide-react"

interface Servico {
  id: number
  titulo: string
  desc: string
  icone: React.ReactNode
}

export default function Servicos() {
  const servicos: Servico[] = [
    {
      id: 1,
      titulo: "Instalação Residencial",
      desc: "Projetos completos de fiação, quadros de distribuição, iluminação e tomadas para sua casa com total segurança.",
      icone: <Home className="h-6 w-6 text-jeans-500" />,
    },
    {
      id: 2,
      titulo: "Manutenção Preventiva",
      desc: "Evite sobrecargas, curtos-circuitos e quedas repentinas de energia através de vistorias periódicas detalhadas.",
      icone: <ShieldCheck className="h-6 w-6 text-jeans-500" />,
    },
    {
      id: 3,
      titulo: "Laudos & Vistorias",
      desc: "Emissão de laudos de segurança (para bombeiros e prefeituras) e vistorias de conformidade com a norma NBR 5410.",
      icone: <FileText className="h-6 w-6 text-jeans-500" />,
    },
    {
      id: 4,
      titulo: "Serviços Industriais",
      desc: "Instalação e adequação de motores trifásicos, quadros de comando de alta potência e manutenção industrial complexa.",
      icone: <Factory className="h-6 w-6 text-jeans-500" />,
    },
  ]

  return (
    <section className="w-full py-8 flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
          Nossos <span className="text-jeans-500 italic">Serviços</span>
        </h2>
        <p className="text-zinc-500 text-sm mt-2 max-w-xl">
          Oferecemos suporte técnico especializado e credenciado para atender qualquer infraestrutura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-4">
        {servicos.map((servico) => (
          <div
            key={servico.id}
            className="group bg-zinc-950 border border-zinc-900 p-8 rounded-2xl flex flex-col items-start gap-4 hover:border-jeans-500/50 hover:shadow-[0_0_20px_rgba(75,101,132,0.03)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-jeans-500/5 rounded-full blur-2xl group-hover:bg-jeans-500/10 transition-colors duration-300"></div>

            {/* Icon Container */}
            <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-jeans-500/30 group-hover:bg-zinc-900/80 transition-all duration-300">
              {servico.icone}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-jeans-500 transition-colors duration-300">
                {servico.titulo}
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                {servico.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}