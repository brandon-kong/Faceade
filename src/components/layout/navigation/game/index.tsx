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
        <nav className={'w-full h-hud-inset'}>
            <div className={'bg-white rounded-r-lg shadow-md p-4 border-2 border-neutral-100'}>
                <TooltipProvider>

                
                    <ul className={'justify-around flex items-center'}>
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
                                    side={'bottom'}
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