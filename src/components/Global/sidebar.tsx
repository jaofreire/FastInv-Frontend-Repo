import { BellRing, Home, List, LogOut, MessageSquare, Table } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

function SideBar() {
    return (
        <>
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
                <div className="flex h-16 items-center border-b px-6">
                    <Link className="w-full flex items-center justify-center gap-2 font-semibold" to={'/main-page'}>
                        <span className="text-3xl text-black font-platypi">Fast<span className="text-orange-500">Inv</span></span>
                    </Link>
                </div>
                <nav className="space-y-1 p-4">
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                        to={'/main-page'}>
                        <Home className="h-4 w-4" />
                        Principal
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                        to={'/my-tables'}>
                        <Table className="h-4 w-4" />
                        Suas tabelas
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                        to={'/movement-history'}>
                        <List className="h-4 w-4" />
                        Movimentações
                    </Link>
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                        to={'/main-page'}>
                        <MessageSquare className="h-4 w-4" />
                        Portal de chamados
                    </Link>
                </nav>
                <div className="absolute bottom-4 left-0 w-full px-4">
                    <Link
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                        to={'/main-page'}>
                        <BellRing className="h-4 w-4" />
                        Relate um problema
                    </Link>
                    <Button className="mt-4 w-full" variant="outline">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair da conta
                    </Button>
                </div>
            </aside>
        </>
    )

}

export default SideBar;