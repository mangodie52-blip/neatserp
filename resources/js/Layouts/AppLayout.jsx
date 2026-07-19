import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import GudangNotificationListener from '@/Components/GudangNotificationListener';

export default function AppLayout({ children }) {

    return (

        <div className="flex h-screen bg-gray-100 overflow-hidden">

            {/* 🔔 listener global untuk user gudang */}
            <GudangNotificationListener />

            {/* Sidebar tetap */}
            <Sidebar />

            {/* Area kanan */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Navbar tetap */}
                <Navbar />

                {/* HANYA konten yang scroll */}
                <main className="flex-1 overflow-y-auto px-6 pt-1 pb-6">
                    {children}
                </main>

            </div>

        </div>
    );
}