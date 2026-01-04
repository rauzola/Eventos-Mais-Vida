import { signup } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Heart, Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";

export default async function SignupPage(props: {
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
                <p className="text-gray-600">
                    Crie sua conta e participe dos eventos.
                </p>
            </div>

            <Card className="w-full max-w-[450px] shadow-lg border-none">
                <CardHeader className="space-y-1 text-center pb-2">
                    <CardTitle className="text-2xl font-bold text-gray-900">Cadastro</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {searchParams?.error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                            {searchParams.error}
                        </div>
                    )}
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="seu@email.com"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Crie uma senha segura"
                                    required
                                    minLength={6}
                                    className="pl-10 pr-10 h-11"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                >
                                    <EyeOff className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <Button
                            formAction={signup}
                            className="w-full h-11 bg-blue-600 font-semibold hover:bg-blue-700 text-lg shadow-blue-200 shadow-lg"
                        >
                            Criar Conta
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 text-center text-sm text-gray-600 pt-0 pb-8">
                    <p>
                        Já tem uma conta?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
                        >
                            Faça login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
