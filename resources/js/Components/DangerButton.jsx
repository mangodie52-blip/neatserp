export default function DangerButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

           className="hover:bg-red-600 text-black px-3 py-1 rounded"

        >
            {children}
        </button>

    );

}