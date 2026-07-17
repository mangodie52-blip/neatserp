export default function PrimaryButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition"

        >
            {children}
        </button>

    );

}