import { BellRing, Home, List, LogOut, MessageSquare, Table, Users} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom';

function MainPage() {
    return (
        <>
            <div className=" h-screen w-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
                    <div className="flex h-16 items-center border-b px-6">
                        <Link className="w-full flex items-center justify-center gap-2 font-semibold" to={'/main-page'}>
                            <span className="text-3xl text-black font-platypi">Fast<span className="text-orange-500">Inv</span></span>
                        </Link>
                    </div>
                    <nav className="space-y-1 p-4">
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            to={'/main-page'}                       >
                            <Home className="h-4 w-4" />
                            Principal
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            to={'/main-page'}                       >
                            <Table className="h-4 w-4" />
                            Suas tabelas
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            to={'/main-page'}                        >
                            <List className="h-4 w-4" />
                            Movimentações
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            to={'/main-page'}                        >
                            <MessageSquare className="h-4 w-4" />
                            Portal de chamados
                        </Link>
                    </nav>
                    <div className="absolute bottom-4 left-0 w-full px-4">
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900"
                            to={'/main-page'}                        >
                            <BellRing className="h-4 w-4" />
                            Relate um problema
                        </Link>
                        <Button className="mt-4 w-full" variant="outline">
                            <LogOut className="mr-2 h-4 w-4" />
                            Sair da conta
                        </Button>
                    </div>
                </aside>
                {/* Main content */}
                <main className="pl-64">
                    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-purple-100" />
                            <div>
                                <div className="text-sm text-gray-500">LVA TRANSPORTE</div>
                                <div className="font-medium">Bem-Vindo, João</div>
                            </div>
                        </div>
                    </header>
                    <div className="p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <Table className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Tabelas:</div>
                                        <div className="text-2xl font-bold">10</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <Users className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Funcionários:</div>
                                        <div className="text-2xl font-bold">30</div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center gap-4 p-6">
                                    <Table className="h-8 w-8 text-orange-500" />
                                    <div>
                                        <div className="text-sm font-medium">Ultima tabela modificada:</div>
                                        <div className="font-medium">Inventário notebooks</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="mt-6">
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-lg font-medium">Últimos movimentos</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>João alterou a tabela Invententário notebooks</div>
                                        <div className="text-sm text-gray-500">12/12/2024 08:20</div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>Geaze alterou a tabela Invententário notebooks</div>
                                        <div className="text-sm text-gray-500">12/12/2024 08:20</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default MainPage;