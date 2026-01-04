import { completeProfile } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heart, Lock, User } from "lucide-react";

export default async function CompleteProfilePage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParams = await props.searchParams;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#EBF2FF] px-4 py-8">
            <div className="mb-8 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-2xl font-bold text-blue-600">
                    <Heart className="h-8 w-8 fill-blue-600" />
                    <span>Projeto Mais Vida</span>
                </div>
            </div>

            <Card className="w-full max-w-[450px] shadow-lg border-none">
                <CardHeader className="space-y-1 text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                        Concluir Cadastro
                    </CardTitle>
                    <CardDescription>
                        Defina seus dados e uma senha para acessar o sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {searchParams?.error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
                            {searchParams.error}
                        </div>
                    )}
                    <form className="space-y-6">

                        <div className="space-y-2">
                            <Label htmlFor="fullName">Nome Completo</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    placeholder="Seu nome"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Criar Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Sua senha"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Repita a senha"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <Button
                            formAction={completeProfile}
                            className="w-full h-11 bg-blue-600 font-semibold hover:bg-blue-700 text-lg shadow-blue-200 shadow-lg"
                        >
                            Salvar e Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
