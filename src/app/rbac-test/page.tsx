import { getUserProfile } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function RBACTestPage() {
    const data = await getUserProfile();

    if (!data) {
        return (
            <div className="p-8 text-center text-red-600">
                Usuário não autenticado.
            </div>
        );
    }

    const { user, profile } = data;

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>Teste de Permissões (RBAC)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">ID do Usuário</p>
                        <code className="bg-gray-100 p-1 rounded text-xs">{user.id}</code>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                    </div>
                    <div className="pt-4 border-t">
                        <p className="text-sm text-gray-500 mb-2">Perfil (Banco de Dados)</p>
                        {profile ? (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span>Role:</span>
                                    <Badge variant={profile.role === 'ADMIN' ? 'destructive' : 'default'}>
                                        {profile.role}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-500">Nome:</span> {profile.full_name || '-'}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-yellow-50 p-3 rounded text-yellow-800 text-sm">
                                ⚠️ Perfil não encontrado na tabela `public.profiles`.
                                <br />
                                Isso pode acontecer se o usuário foi criado antes da Trigger existir.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
