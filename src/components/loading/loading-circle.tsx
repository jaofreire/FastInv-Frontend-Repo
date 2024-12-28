function LoadingCircle() {
    return (
        <>
            <div className="flex relative max-w-screen w-24 h-24 ">
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
        </>
    )
}

export default LoadingCircle;