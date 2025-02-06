const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-xl text-gray-700">Loading...</span>
      </div>
    )
  }
  
  export default LoadingSpinner
  
  