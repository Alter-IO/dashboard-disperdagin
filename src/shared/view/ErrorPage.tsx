import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useNavigate, useRouteError } from "react-router";

type RouteError = {
    status?: number;
    statusText?: string;
    message?: string;
};

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                        <AlertCircle className="h-12 w-12 text-destructive" />
                        <h1 className="text-2xl font-bold">Oops! Terjadi Kesalahan.</h1>
                        <p className="text-muted-foreground">
                            {error?.statusText || error?.message || "Terjadi kesalahan yang tidak terduga."}
                        </p>
                        <Button onClick={() => navigate("/")} className="mt-4">
                            Kembali ke Beranda
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
