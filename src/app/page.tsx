import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Seus componentes originais
import Header from "@/components/header";
import Footer from "@/components/footer";
import Carrosel from "@/components/carrosel";
import Produtos from "@/components/produtos";
import Servicos from "@/components/servicos";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col selection:bg-jeans-500 selection:text-white">
      <Header />

      <main>
        {/* Massive Typographic Hero - Baseado no modelo de "Força Absoluta" */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden px-4 md:px-8 lg:px-36 border-b border-gray-900">
          {/* Background decorativo (Substitua o src por uma imagem de elétrica se desejar) */}
          <div className="absolute inset-0 bg-[url('/banners/banner-eletrica.png')] bg-cover bg-center opacity-25 grayscale mix-blend-luminosity"></div>
          
          <div className="relative z-10 w-full">
            <div className="overflow-hidden">
              <h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-6">
                <span className="block text-white">Eletro</span>
                <span 
                  className="block text-transparent" 
                  style={{ WebkitTextStroke: '2px #4B6584', fontStyle: 'italic' }}
                >
                  Barros
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mt-12 gap-8">
              <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-xl border-l-4 border-jeans-500 pl-6">
                Soluções elétricas modernas com qualidade e segurança. 
                Sua infraestrutura em boas mãos.
              </p>
              
              <Link
                href="#servicos"
                className="group bg-jeans-500 hover:bg-jeans-400 text-white font-bold text-lg uppercase tracking-widest px-10 py-5 transition-all duration-300 flex items-center justify-center gap-4 w-full md:w-auto"
              >
                Nossos Serviços
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Seção de Conteúdo Original com Espaçamento Ajustado */}
        <div className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-36 py-20 gap-20">
          
          <div className="w-full">
            <Produtos apenasDestaques={true} />
            <div className="flex justify-center mt-8">
              <Link
                href="/produtos"
                className="px-8 py-3 border border-zinc-800 hover:border-jeans-500 hover:text-jeans-500 text-sm font-bold uppercase tracking-wider rounded-lg transition-all"
              >
                Ver Catálogo Completo
              </Link>
            </div>
          </div>

          {/* Banner Extra / Carrossel no estilo do modelo */}
          <section className="w-full py-6 border-t border-b border-zinc-900 bg-zinc-950/20">
             <Carrosel />
          </section>

          <div id="servicos" className="w-full">
            <Servicos />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}