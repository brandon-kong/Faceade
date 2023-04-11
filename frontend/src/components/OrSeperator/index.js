export default function OrSeperator () {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full h-1/2">
                <div className="w-full h-0.5 bg-primary-light"></div>
            </div>
            <div className="flex items-center justify-center w-1/4 max-w-xs">
                <p className="text-primary">or</p>
            </div>
            <div className="flex items-center justify-center w-full h-1/2">
                <div className="w-full h-0.5 bg-primary-light"></div>
            </div>
        </div>
    )
}