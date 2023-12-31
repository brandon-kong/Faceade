import { TypographyH2 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chat()
{
    return (
        <div
        className={'h-full bg-white shadow-md rounded-lg flex flex-col'}>
            <TypographyH2 className={'p-4 border-b border-neutral-200'}>
                Chat
            </TypographyH2>
            <div className={'flex flex-1'}>

            T</div>

            <div className={'flex p-2'}>
                <Input
                className={'bg-gray-100 rounded-l-lg rounded-r-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'}
                placeholder={'Type your answer here'}
                
                />  
                <Button
                className={'rounded-r-lg rounded-l-none'}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}