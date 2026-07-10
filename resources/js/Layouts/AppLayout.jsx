import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';

export default function AppLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

             <main className="px-6 pt-1 pb-6">
                    {children}
                </main>
            </div>
            
        </div>
    );
}