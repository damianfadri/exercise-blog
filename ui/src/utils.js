const utils = {
  isNullOrWhiteSpace: (str) => {
    return !str || str.match(/^\s*$/) !== null;
  },

  enumerate: (n) => {
    let r = Array.from({length: n}, (_, i) => i + 1);
    return r;
  },

  getQuerystring: (params) => {
    return Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
  },

  getQueryParams: (querystring) => {
    const pairs = querystring.split('&');

    const result = {};
    pairs.forEach((pair) => {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return result;
  },
};

export default utils;