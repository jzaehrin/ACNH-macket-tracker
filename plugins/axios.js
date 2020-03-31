import https from 'https';
export default function ({ $axios, redirect }) {
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

  /*$axios.onRequest(config => {
    console.log('axios request : '+config.url);
    console.log(config)
  });*/
  /*$axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400)
      redirect('/400');
  })
   */
}
