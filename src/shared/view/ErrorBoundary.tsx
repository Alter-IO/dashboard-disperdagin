import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
interface ErrorBoundaryProps {
    errorMsg: string;
    refetch: () => void;
}

export const ErrorBoundary = ({ errorMsg, refetch }: ErrorBoundaryProps) => {
    return (
        <div className="h-4/6 flex items-center justify-center bg-background">
            <Card className="p-6 text-center shadow-lg">
                <CardContent className="flex flex-col gap-4 items-center">
                    <h2 className="text-2xl font-bold">Terjadi kesalahan!</h2>
                    <p className="text-muted-foreground">{errorMsg || "Terjadi kesalahan yang tidak terduga."}</p>
                    <Button onClick={() => refetch()}>Coba Lagi</Button>
                </CardContent>
            </Card>
        </div>
    )
}
