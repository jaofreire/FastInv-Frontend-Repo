import { Table, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import SideBar from '@/components/Global/sidebar';

function MainPage() {
    return (
        <>
            <div className=" h-screen w-screen bg-gray-100">
                <SideBar />
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