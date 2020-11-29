import buildClient from '../api/build-client';

const landingPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Landing Page</h1>;
};

landingPage.getInitialProps = async (context) => {
    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default landingPage;
