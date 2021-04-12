import Head from 'next/head';
import { Container } from 'reactstrap';

export default function Register() {
  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>Register Page</h1>
        <hr />
        <p>This is the register page</p>
      </Container>
    </div>
  );
}
