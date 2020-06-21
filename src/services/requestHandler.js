import STATUSES from './requestHandler.Statuses';

async function handleRequest(endPointGetter, ...param) {
  try {
    const { url, options } = endPointGetter(...param);
    const res = await fetch(url, options);
    const { status, statusText } = res;

    if (STATUSES.isSuccess(status) && status !== STATUSES.NO_CONTENT) {
      const data = await res.json();
      return { status, statusText, data };
    }

    return { status, statusText };
  } catch (e) {
    throw e.message;
  }
}

export default handleRequest;
