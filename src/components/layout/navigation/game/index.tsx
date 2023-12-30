import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"

const items = [
    {
        name: 'Leave Game',
        href: '/',
        icon: '/icons/exit.svg',
    },
    {
        name: 'Privacy',
        href: '/privacy',
        icon: '/icons/players.svg',
    },
    {
        name: 'Leaderboard',
        href: '/terms',
        icon: '/icons/leaderboard.svg',
    },
    {
        name: 'Settings',
        href: '/terms',
        icon: '/icons/settings.svg',
    }
]
export default function GameHUD ()
{
    return (
        <nav className={'fixed w-fit z-50 p-hud-screen-spacing inset-x-0 transform top-1/2 -translate-y-1/2'}>
            <div className={'bg-white rounded-lg shadow-md p-4 border-2 border-neutral-100 w-fit'}>
                <TooltipProvider>

                
                    <ul className={'space-y-8 flex flex-col items-center'}>
                        {
                            items.map((item, index) => (
                                <li
                                key={index}
                                >
                                    <Tooltip
                                    
                                    >

                                    <TooltipTrigger asChild>
                                        <Link href={item.href}>
                                            <Image src={item.icon} width={45} height={45} alt={item.name} 
                                            className={'cursor-pointer select-none hover:scale-110 transform transition-all'}
                                            />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent
                                    side={'right'}
                                    sideOffset={10}
                                    >
                                        <p>
                                            { item.name }
                                        </p>
                                    </TooltipContent>
                                    </Tooltip>
                                </li>
                            ))
                        }
                    </ul>
                </TooltipProvider>
            </div>
        </nav>
    )
}