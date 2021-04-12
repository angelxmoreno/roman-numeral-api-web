import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Roman Numeral Api</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main role="main">
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">Roman Numeral API</h1>
            <p>
              Welcome to RomanNumeralApi.com, an API service for converting
              numbers to and from Roman Numeral.
            </p>
            <p>
              <Link href="/">
                <a className="btn btn-primary btn-lg" role="button">
                  Learn more »
                </a>
              </Link>
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2>Free</h2>
              <p>The API service is free to use.{` `}</p>
              <p>
                <a className="btn btn-secondary" href="/" role="button">
                  View details »
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <h2>Direct Access</h2>
              <p>You do not need to register to try out the API service{` `}</p>
              <p>
                <a className="btn btn-secondary" href="/" role="button">
                  View details »
                </a>
              </p>
            </div>
            <div className="col-md-4">
              <h2>Open Source</h2>
              <p>
                All the code for the API Service is licensed with MIT and can be
                found in our GitHub repositories.
              </p>
              <p>
                <a className="btn btn-secondary" href="/" role="button">
                  View details »
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
