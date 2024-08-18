export const Button = ({ children, onClick, className = "" }) => {
    return <button onClick={onClick} className={`${className} p-2 px-5 flex items-center gap-2 bg-sky-500 transition-all duration-300 hover:bg-sky-600 text-white font-bold justify-center rounded-md`}>
        {children}
    </button>
}