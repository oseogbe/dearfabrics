"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CustomTabsProps {
    tabsList: {
        value: string
        body: string
    }[]
    tabsContent: {
        value: string
        body: string
    }[]
}

const CustomTabs = ({
    tabsList,
    tabsContent
}: CustomTabsProps) => {
    return (
        <Tabs defaultValue={tabsList[0].value}>
            <TabsList
                className="bg-white"
            >
                {tabsList.map(({ value, body }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className="text-base xl:text-lg data-[state=active]:border-b-2 data-[state=active]:border-b-df-yellow rounded-none data-[state=active]:shadow-none"
                    >
                        {body}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabsContent.map(({ value, body }) => (
                <TabsContent key={value} value={value} className="w-full border-t mt-0 pt-6 text-sm xl:text-base">{body}</TabsContent>
            ))}
        </Tabs>
    )
}

export default CustomTabs