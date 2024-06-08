function AuthLayout({ children }) {
    return (
        <div className="max-w-full  dark:bg-gray-900 dark:text-white duration-200 max-h-full">
            <div>{children}</div>
        </div>
    );
}

export default AuthLayout;