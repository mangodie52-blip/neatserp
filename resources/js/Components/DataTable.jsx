export default function DataTable({ children }) {
    return (
        <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">

            <table className="w-full">

                {children}

            </table>

        </div>
    );
}