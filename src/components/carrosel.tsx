"use client"

import Image from "next/image"
import React from "react"
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"

const carrosselImagens = [
  {
    src: "/banners/banner-eletrica.png",
    alt: "EletroBarros - Soluções em Engenharia Elétrica",
    titulo: "Engenharia Elétrica de Alta Performance",
    desc: "Instalações industriais, comerciais e residenciais com a máxima segurança.",
  },
  {
    src: "/produtos/fio.png",
    alt: "EletroBarros - Materiais de Qualidade",
    titulo: "Materiais Homologados e Seguros",
    desc: "Trabalhamos apenas com cabos e componentes de alto padrão e certificados.",
  },
  {
    src: "/banners/banner-eletrica.png",
    alt: "EletroBarros - Laudos e Vistorias",
    titulo: "Projetos, Laudos e Vistorias Técnicas",
    desc: "Regularização de instalações elétricas, vistorias do Corpo de Bombeiros e SPDA.",
  },
]

export default function Carrossel() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Use useMemo to avoid accessing ref.current during render, with window check
  const autoplay = React.useMemo(() => {
    if (typeof window === "undefined") return null
    return Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  }, [])

  if (!mounted) {
    // Placeholder estático idêntico para renderização do servidor (SSR)
    return (
      <section className="w-full flex justify-center bg-black py-4">
        <div className="w-full max-w-7xl px-4 md:px-8">
          <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              src={carrosselImagens[0].src}
              alt={carrosselImagens[0].alt}
              fill
              className="object-cover opacity-60 filter brightness-90 grayscale-[20%]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16 text-left z-10">
              <span className="text-jeans-500 uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                EletroBarros Soluções
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mb-3">
                {carrosselImagens[0].titulo}
              </h2>
              <p className="text-zinc-300 text-sm md:text-lg max-w-2xl font-light">
                {carrosselImagens[0].desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full flex justify-center bg-black py-4">
      <div className="w-full max-w-7xl px-4 md:px-8">
        <Carousel
          plugins={autoplay ? [autoplay] : []}
          className="w-full relative overflow-hidden rounded-2xl border border-zinc-800"
          onMouseEnter={() => autoplay?.stop()}
          onMouseLeave={() => autoplay?.play()}
        >
          <CarouselContent>
            {carrosselImagens.map((imagem, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[350px] md:h-[500px] overflow-hidden">
                  <Image
                    src={imagem.src}
                    alt={imagem.alt}
                    fill
                    className="object-cover opacity-60 filter brightness-90 grayscale-[20%]"
                    priority={index === 0}
                    quality={95}
                    sizes="100vw"
                  />
                  {/* Gradiente escuro para contraste dos textos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  {/* Text Overlay */}
                  <div className="absolute bottom-10 left-6 right-6 md:left-16 md:right-16 text-left z-10">
                    <span className="text-jeans-500 uppercase tracking-widest text-xs md:text-sm font-semibold mb-2 block">
                      EletroBarros Soluções
                    </span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight mb-3">
                      {imagem.titulo}
                    </h2>
                    <p className="text-zinc-300 text-sm md:text-lg max-w-2xl font-light">
                      {imagem.desc}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious
            className="absolute left-6 top-1/2 -translate-y-1/2
            bg-black/75 hover:bg-jeans-500 border-zinc-800 hover:border-jeans-500
            text-white hover:text-white hover:scale-105
            transition-all duration-300 z-20 flex h-12 w-12 items-center justify-center rounded-full"
          />
          <CarouselNext
            className="absolute right-6 top-1/2 -translate-y-1/2
            bg-black/75 hover:bg-jeans-500 border-zinc-800 hover:border-jeans-500
            text-white hover:text-white hover:scale-105
            transition-all duration-300 z-20 flex h-12 w-12 items-center justify-center rounded-full"
          />
        </Carousel>
      </div>
    </section>
  )
}
