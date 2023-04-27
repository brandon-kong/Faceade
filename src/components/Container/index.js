import styles from '@/styles/components/Container/index.module.css'

export default Container = ({children}) => {
    return (
        <div className={"flex items-center rounded justify-center bg-inherit h-12 w-full " + styles['container']} >
            {children}
        </div>
    )
}