import Head from 'next/head';
import { Container } from 'reactstrap';

export default function LogIn() {
  return (
    <div>
      <Head>
        <title>Log In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Log In Page</h1>
        <hr />
        <p>This is the log In page</p>
      </Container>
    </div>
  );
}
