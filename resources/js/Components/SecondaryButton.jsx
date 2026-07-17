export default function SecondaryButton({
    children,
    ...props
}) {

    return (

        <button

            {...props}

               className="hover:bg-yellow-600 text-black px-3 py-1 rounded"
                                
        >
            {children}
        </button>

    );

}

