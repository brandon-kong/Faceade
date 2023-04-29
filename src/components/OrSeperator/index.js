export default function OrSeperator () {
    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex items-center justify-center w-full h-1/2">
                <div className="bg-gray-300 dark:bg-gray-700 w-full h-0.5"></div>
            </div>
            <div className="flex items-center justify-center w-1/4 max-w-xs">
                <p>or</p>
            </div>
            <div className="flex items-center justify-center w-full h-1/2">
                <div className="bg-gray-300 dark:bg-gray-700 w-full h-0.5"></div>
            </div>
        </div>
    )
}