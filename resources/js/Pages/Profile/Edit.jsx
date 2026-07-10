import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ user }) {

    const { data, setData, post, processing } = useForm({
        name: user.name,
        email: user.email,
        photo: null,
    });


    const submit = (e) => {
        e.preventDefault();

        post('/profile/update', {
            forceFormData: true
        });
    };


    return (
        <AppLayout>

            <div className="bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-5">
                    Profile User
                </h1>


                <form onSubmit={submit}>


                    <img
                        src={
                            user.photo
                            ? `/storage/${user.photo}`
                            : "/images/default-user.png"
                        }
                        className="w-24 h-24 rounded-full mb-4"
                    />


                    <input
                        type="file"
                        onChange={e =>
                            setData('photo', e.target.files[0])
                        }
                        className="mb-4"
                    />


                    <input
                        value={data.name}
                        onChange={e =>
                            setData('name', e.target.value)
                        }
                        className="border p-2 w-full mb-3 rounded"
                    />


                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Simpan
                    </button>


                </form>

            </div>

        </AppLayout>
    );
}