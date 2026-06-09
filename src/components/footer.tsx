export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-black border-t border-zinc-800 px-6 md:px-12 lg:px-36 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
                <div>
                    <h2 className="text-white font-semibold text-base">
                        EletroBarros
                    </h2>
                    <p className="mt-1 text-zinc-500">
                        Soluções elétricas com qualidade, confiança e segurança.
                    </p>
                </div>
                <div className="flex flex-col items-end text-right">
                    <p>
                        &copy; {currentYear} EletroBarros. Todos os direitos reservados.
                    </p>
                    <p className="text-zinc-500 mt-1">
                        Feito com energia ⚡ para você.
                    </p>
                </div>
            </div>
        </footer>
    );
}
