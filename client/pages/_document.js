import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  static getInitialProps (ctx) {
    const renderPage = ctx.renderPage
    const { html, head, errorHtml, chunks } = renderPage()

    return {
      html,
      head,
      errorHtml,
      chunks,

      customer: ctx.req ? JSON.stringify(ctx.req.customer) : null
    }
  }

	render () {
		return (
			<html>
        <Head>
          <title>my next</title>
          <link rel='stylesheet' href='./static/antd.min.css' />
          {
            this.props.customer ? <script dangerouslySetInnerHTML={{__html: `__CUSTOMER__=${this.props.customer}`}} /> : null
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
		)
	}
}