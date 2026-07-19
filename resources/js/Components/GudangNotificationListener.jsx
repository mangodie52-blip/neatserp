import { useEffect, useRef } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function GudangNotificationListener() {

    const { auth, activities = [] } = usePage().props;
    const lastActivityId = useRef(null);

    // hanya user gudang
    if (auth.user.role !== 'Gudang') {
        return null;
    }

    // polling tiap 5 detik
    useEffect(() => {

        const interval = setInterval(() => {

            router.reload({
                only: ['activities'],
                preserveState: true,
                preserveScroll: true,
            });

        }, 5000);

        return () => clearInterval(interval);

    }, []);

    // cek activity baru
    useEffect(() => {

        if (!activities || activities.length === 0) return;

        const newest = activities[0];

        // pertama buka → jangan bunyi
        if (lastActivityId.current === null) {
            lastActivityId.current = newest.id;
            return;
        }

        // ada activity baru
        if (newest.id !== lastActivityId.current) {

            // hanya Material Request baru
            if (
                newest.module === 'Material Request' &&
                newest.action === 'CREATE'
            ) {

                const audio = new Audio('/sounds/notify.mp3');
                audio.volume = 0.7;

                audio.play().catch((e) => {
                    console.log('Audio blocked:', e);
                });

                console.log('🔔 MR baru masuk ke Gudang');
            }

            lastActivityId.current = newest.id;
        }

    }, [activities]);

    return null;
}