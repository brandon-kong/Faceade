import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <nav className={'fixed bottom-0 w-full z-50 p-hud-screen-spacing'}>
            <div className={'bg-white rounded-lg shadow-md py-2 px-4 border-2 border-neutral-100 w-fit'}>
                <ul className={'space-x-8 flex items-center'}>
                    <li>
                        <Link href={'/privacy'}>Privacy</Link>
                    </li>
                    <li>
                        <Link href={'/terms'}>Terms of Service</Link>
                    </li>

                    <li>
                        <Link href={'/credits'}>Credits</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
