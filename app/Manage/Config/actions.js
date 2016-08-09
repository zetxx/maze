export const updateConfig = (params) => {
  return {type: 'UPDATE_SITE_CONFIG', httpRequest: {
    method: 'POST',
    url: '/api/config',
    json: true,
    body: params
  }}
}

export const fetchSiteConfig = () => ({type: 'FETCH_SITE_CONFIG', httpRequest: {
  method: 'GET',
  url: '/api/config',
  json: true
}})
