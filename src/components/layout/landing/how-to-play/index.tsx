import { TypographyH1, TypographyH3, TypographyP } from "@/components/typography";

export default function HowToPlaySection()
{
    return (
        <section
        className={'w-full bg-transparent min-h-screen p-24 paper-torn drop-shadow-2xl'}
        >
            <TypographyH1 className={'text-center'}>How to play</TypographyH1>

            <div className={'grid grid-cols-3 gap-8 mt-12'}>
            </div>
        </section>
    )
}