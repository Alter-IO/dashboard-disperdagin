import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { useResetPassword } from "../../usecase/useResetPassword";
import { IResetPassword } from "@/shared/models/user";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";

interface ResetPasswordForm {
    password?: string;
    length: number;
    options: {
        lowercase: boolean;
        uppercase: boolean;
        numbers: boolean;
        symbols: boolean;
    };
}

const resetPasswordSchema = z.object({
    length: z.coerce.number()
        .min(6, "Panjang minimal 6 karakter")
        .max(32, "Panjang maksimal 32 karakter"),
    password: z.string().optional(),
    options: z.object({
        lowercase: z.boolean(),
        uppercase: z.boolean(),
        numbers: z.boolean(),
        symbols: z.boolean(),
    }),
});

const generatePassword = (length: number, options: ResetPasswordForm["options"]): string => {
    const charSets = {
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+[]{}|;:,.<>?/",
    };

    let chars = "";
    if (options.lowercase) chars += charSets.lowercase;
    if (options.uppercase) chars += charSets.uppercase;
    if (options.numbers) chars += charSets.numbers;
    if (options.symbols) chars += charSets.symbols;

    if (!chars) throw new Error("Pilih setidaknya satu jenis karakter.");

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    return Array.from(array).map((num) => chars[num % chars.length]).join("");
};

interface IResetPasswordProps {
    id: string;
}

const ResetPasswordDialog: React.FC<IResetPasswordProps> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm<ResetPasswordForm>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            length: 8,
            options: {
                lowercase: true,
                uppercase: false,
                numbers: false,
                symbols: false,
            },
        },
    });

    const onGeneratePassword = (data: ResetPasswordForm) => {
        const newPassword = generatePassword(data.length, data.options);
        setValue("password", newPassword);
    };

    const { mutate: resetPassword, isPending } = useResetPassword(id, setOpen)

    const onSubmit = (data: ResetPasswordForm) => {
        const payload: IResetPassword = {
            new_password: data.password!
        }
        resetPassword(payload)
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" onClick={() => setOpen(true)}>Atur Ulang Kata Sandi</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-6 max-w-md">
                <AlertDialogTitle className="text-lg font-semibold">
                    Atur Ulang Kata Sandi
                </AlertDialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Label className="text-sm font-medium">Opsi Karakter</Label>
                        <div className="flex flex-col gap-2 mt-2">
                            {(["lowercase", "uppercase", "numbers", "symbols"] as const).map((key) => (
                                <label key={key} className="flex items-center gap-2 text-sm">
                                    <Controller
                                        name={`options.${key}`}
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked === true)}
                                            />
                                        )}
                                    />
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Label className="text-sm font-medium">Panjang Kata Sandi</Label>
                        <Input type="number" {...register("length", { valueAsNumber: true })} min={6} max={32} />
                        {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-medium">Kata Sandi</Label>
                        <div className="flex items-center gap-2">
                            <div className="relative w-full">
                                <Input
                                    {...register("password")}
                                    placeholder="Kata sandi yang dihasilkan"
                                    readOnly
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0 h-5 w-5"
                                    onClick={() => {
                                        const pwd = control._getWatch("password") ?? "";
                                        if (pwd) {
                                            navigator.clipboard.writeText(pwd);
                                            toast.success("Kata sandi disalin!");
                                        }
                                    }}
                                >
                                    <CopyIcon className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </div>

                            <Button
                                type="button"
                                onClick={handleSubmit(onGeneratePassword)}
                                variant="outline"
                            >
                                Kata Sandi Acak
                            </Button>
                        </div>
                    </div>
                    <AlertDialogFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Sedang Memperbarui' : 'Sunting'}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ResetPasswordDialog;