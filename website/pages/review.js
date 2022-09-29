import { withPageAuthRequired } from '@auth0/nextjs-auth0'

export default function Review({user}) {
    return (
        <>
            <h1>Review page</h1>
        </>
    )
}

export const getServerSideProps = withPageAuthRequired()