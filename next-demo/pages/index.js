import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import axios from 'axios'

// Router.onRouteChangeStart = url => {
//   console.log('App is changing to: ', url)
// }

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const res = await axios('https://wx.jiuhuar.com/mall/product?size=10&page=1')
    return { productList: res.data.data }
  }

  state = {
    pageName: 'Home'
  }

  handler = () => Router.push({
    pathname: '/contact',
    query: { name: 'Zeit' }
  })

  render() {
    return (
      <div>
        <Head>
          <title>酒花儿优品商城</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Head>
          <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
        </Head>
        <Link href="/contact"><a>Head to Contact</a></Link>
        <div onClick={this.handler}>{this.state.pageName}</div>
        <div>{JSON.stringify(this.props.productList)}</div>
      </div>
    )
  }
}