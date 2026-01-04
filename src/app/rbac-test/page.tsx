import { getUserProfile } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { hasMinRole, ROLES } from "@/utils/roles";
import { CheckCircle2, XCircle } from "lucide-react";

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

    // Helper to render permission status
    const PermissionItem = ({ label, hasAccess }: { label: string; hasAccess: boolean }) => (
        <div className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100">
            <span className="text-sm text-gray-600">{label}</span>
            {hasAccess ? (
                <div className="flex items-center text-green-600 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> Sim
                </div>
            ) : (
                <div className="flex items-center text-red-400 text-sm">
                    <XCircle className="w-4 h-4 mr-1" /> Não
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
            <Card className="max-w-md w-full shadow-lg">
                <CardHeader>
                    <CardTitle>Teste de Permissões (RBAC)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* User Info Section */}
                    <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Usuário Atual</span>
                            <Badge variant={profile?.role === 'ADMIN' ? 'destructive' : 'default'} className="uppercase">
                                {profile?.role || 'Sem Role'}
                            </Badge>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{profile?.full_name || 'Sem Nome'}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <code className="block mt-2 text-[10px] text-gray-400 font-mono break-all">{user.id}</code>
                    </div>

                    {/* Permissions Check Section */}
                    <div className="bg-white border rounded-lg p-4">
                        <h3 className="text-sm font-semibold mb-3 text-gray-900">Níveis de Acesso</h3>

                        {profile ? (
                            <div className="flex flex-col">
                                <PermissionItem
                                    label="Acesso Básico (USER)"
                                    hasAccess={hasMinRole(profile.role, ROLES.USER)}
                                />
                                <PermissionItem
                                    label="Staff / Voluntário"
                                    hasAccess={hasMinRole(profile.role, ROLES.STAFF)}
                                />
                                <PermissionItem
                                    label="Coordenador (COORD)"
                                    hasAccess={hasMinRole(profile.role, ROLES.COORD)}
                                />
                                <PermissionItem
                                    label="Conselho / Diretoria"
                                    hasAccess={hasMinRole(profile.role, ROLES.CONCELHO)}
                                />
                                <PermissionItem
                                    label="Administrador Geral"
                                    hasAccess={hasMinRole(profile.role, ROLES.ADMIN)}
                                />
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-400 italic text-sm">
                                Perfil não carregado. Impossível verificar permissões.
                            </div>
                        )}
                    </div>

                    <div className="text-xs text-center text-gray-400">
                        Esta tela valida a função `hasMinRole()` e a leitura do banco.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
