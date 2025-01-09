import {Separator} from "@components/ui/separator";


interface HeaderProps {
    title: string;
    description?: React.ReactNode;
}

export const PageHeader: React.FC<HeaderProps> = ({title, description }) => {

    return (
        <div className="w-full">
            <h1 className="text-2xl font-medium">{ title }</h1>
            { description && <p> {description} </p> }
            <Separator className="my-4"></Separator>
        </div>
    )
}
