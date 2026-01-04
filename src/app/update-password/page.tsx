import { updatePassword } from "./actions";
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
import { Heart, Lock, Eye, EyeOff } from "lucide-react";

export default async function UpdatePasswordPage(props: {
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
                        Nova Senha
                    </CardTitle>
                    <CardDescription>
                        Crie uma nova senha segura para sua conta
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
                            <Label htmlFor="password">Nova Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Nova senha"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirme a nova senha"
                                    required
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <Button
                            formAction={updatePassword}
                            className="w-full h-11 bg-blue-600 font-semibold hover:bg-blue-700 text-lg shadow-blue-200 shadow-lg"
                        >
                            Atualizar Senha
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
