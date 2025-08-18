import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { GetCommodity } from "@/shared/repositories/commodity";
import { useParams, useNavigate } from "react-router";
import { LoadingSpinner } from "@/shared/view/LoadingSpinner";
import { ErrorBoundary } from "@/shared/view/ErrorBoundary";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { FormatIDR } from "@/shared/usecases/formatter";
import { Button } from "@/components/ui/button";

export const CommodityDetailContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        data: commodity,
        isPending,
        isError,
        error,
        refetch, } = useQuery({
            queryKey: [`commodity-${id}`],
            queryFn: () => GetCommodity(id!),
        });

    if (isPending) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <ErrorBoundary errorMsg={error?.message} refetch={refetch} />;
    }

    return (
        <Card className="m-4">
            <CardHeader>
                <CardTitle>Detail Kommodity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-y-4 gap-x-4 grid-cols-[150px_1fr] items-center max-w-3xl">
                    <Label>Tipe Komoditas</Label>
                    <Input value={commodity.data.commodity_type_name || '-'} readOnly />

                    <Label>Nama</Label>
                    <Input value={commodity.data.name || '-'} readOnly />

                    <Label>Harga</Label>
                    <div className="flex gap-2">
                        <Input value={FormatIDR(commodity.data.price) || '-'} readOnly />
                        <Input value={commodity.data.unit || '-'} readOnly className="w-[100px]" />
                    </div>

                    <Label>Deskripsi</Label>
                    <Input value={commodity.data.description || '-'} readOnly />

                    <Label>Tanggal Publikasi</Label>
                    <Input value={format(commodity.data.publish_date, "dd-MM-yyyy") || '-'} readOnly />
                </div>
                
                <div className="flex justify-end mt-4">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate('/photo')}
                    >
                        Kembali
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}