import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {

	render () {
		return (
			<html>
        <Head>
          <title>my next</title>
          <link rel='stylesheet' href='./static/antd.min.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
		)
	}
}