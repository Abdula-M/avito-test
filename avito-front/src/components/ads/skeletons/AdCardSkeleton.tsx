import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"

export const AdCardSkeleton = () => {
    return (
        <div className="ad-item">
            <Item
                variant="outline"
                className="cursor-default"
            >
                <ItemMedia className="w-32 h-32 flex-shrink-0">
                    <Skeleton className="w-full h-full rounded" />
                </ItemMedia>
                <ItemContent className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <ItemTitle>
                            <Skeleton className="h-6 w-3/4" />
                        </ItemTitle>
                        <div className="flex gap-2 flex-shrink-0">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <Skeleton className="h-8 w-32" />
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </ItemContent>
                <ItemActions>
                    <Skeleton className="h-9 w-20" />
                </ItemActions>
            </Item>
        </div>
    )
}
