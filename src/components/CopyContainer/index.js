import Container from "@/components/Container";

export default function CopyContainer({ children, text }) {
    function copyText() {
        navigator.clipboard.writeText(text);
    }
    return (
        <Container>
        <button onClick={copyText} className="w-full h-full">
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h2>{text}</h2>
            </div>
        </button>
        
        </Container>
    );
}