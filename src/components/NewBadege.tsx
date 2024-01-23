import { Badge } from "flowbite-react";
import { PropsWithChildren } from "react";

export default function NewBadge({ children }: PropsWithChildren) {
    return (
        <span className="flex items-center gap-2">
            {children}
            <Badge color="cyan" className="h-4 px-1.5">
                New
            </Badge>
        </span>
    );
}
