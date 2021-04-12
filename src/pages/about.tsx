import Head from 'next/head';
import { Container } from 'reactstrap';

export default function About() {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>About Page</h1>
        <hr />
        <p>This is the about page</p>
      </Container>
    </div>
  );
}
