"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {useState} from "react";
import {useForm} from "@node_modules/react-hook-form";
import {Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import {createInstance} from "@actions/instance.action";
import { toast } from "sonner"
import {Loader2} from "@node_modules/lucide-react";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Instance name must be at least 2 characters.",
    }).max(30, {
        message: "Instance name must be at most 30 characters.",
    }),
    authType: z.enum(["none", "basic-auth", "jwt-auth", "key-auth"]),
    kongAdminUrl: z.string().url()
})

export function CreateInstanceButton() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create Instance</Button>
            <CreateInstanceDialog open={open} onClose={() => setOpen(false)} />
        </>

    )
}

export function CreateInstanceDialog({
                                      open,
                                      onClose,
                                  }: {
    open: boolean
    onClose: () => void
}) {
    const [loading, setLoading] = useState(false);
    const kongAuthTypes = [
        {
            label: "None",
            value: "none",
        },
        {
            label: "Basic Auth",
            value: "basic-auth",
        },
        {
            label: "JWT Auth",
            value: "jwt-auth",
        },
        {
            label: "Key Auth",
            value: "key-auth",
        },
    ]
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            authType: "none",
            name: "",
            kongAdminUrl: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        const payload = {...values, provider: 'kong'};
        try {
            setLoading(true);
            await createInstance(JSON.parse(JSON.stringify(payload)));
            toast.success("Instance connected", {
                description: `Connection to ${values.kongAdminUrl} successful`,
                position: 'top-right',
                dismissible: true,
                duration: 2000,

            })
        } catch (error) {
            toast.error("Error creating instance", {
                description: String(error),
                position: 'top-right',
                dismissible: true,
                duration: 2000,
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Connect to your instance</DialogTitle>
                    <DialogDescription>
                        Connect to your own gateway provider
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form id="create-instance-form"
                              onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Instance Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="authType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Authorization Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => field.onChange(value)} // Update the form state
                                                value={field.value} // Bind the value from the form state
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Auth Type</SelectLabel>
                                                        {kongAuthTypes.map((authType, index) => (
                                                            <SelectItem
                                                                key={`${index}`} value={authType.value}>{authType.label}</SelectItem>
                                                            ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="kongAdminUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kong Admin URL</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button disabled={loading} type="submit" form="create-instance-form">
                        {loading && <Loader2 className="animate-spin"/>}
                        Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
