import axios from 'axios';
import { toast } from 'react-toastify';

let baseURL = 'http://localhost/foo/';
let origin = 'http://localhost/foo/';

if (process.env.NODE_ENV === 'production') {
  // baseURL = 'https://example.com/';
  // origin = 'https://example.com/';
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

const request = {
  origin,
  baseURL,
  axiosInstance,
  // throttling: 2000,

  get(url, params) {
    let resolveFn, rejectFn;
    
    const getRequestPromise = new Promise((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });

    axiosInstance.get(url, params)
      .then((response) => {
        if (this.throttling > 0) {
          setTimeout(() => {
            this.handleResponse(response);
            resolveFn(response);
          }, this.throttling);
        } else {
          this.handleResponse(response);
          resolveFn(response);
        }
      })
      .catch((err) => {
        if (this.throttling > 0) {
          setTimeout(() => {
            this.handleError(err);
            rejectFn(err);
          }, this.throttling);
        } else {
          this.handleError(err);
          rejectFn(err);
        }
      });

    return getRequestPromise;
  },

  post(url, params) {
    let resolveFn, rejectFn;
    
    const postRequestPromise = new Promise((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });

    axiosInstance.post(url, params)
      .then((response) => {
        if (this.throttling > 0) {
          setTimeout(() => {
            this.handleResponse(response);
            resolveFn(response);
          }, this.throttling);
        } else {
          this.handleResponse(response);
          resolveFn(response);
        }
      })
      .catch((err) => {
        if (this.throttling > 0) {
          setTimeout(() => {
            this.handleError(err);
            rejectFn(err);
          }, this.throttling);
        } else {
          this.handleError(err);
          rejectFn(err);
        }
      });

    return postRequestPromise;
  },

  handleResponse(response) {

  },

  handleError(error) {
    console.log(error)
    switch (error.code) {
      case 'ERR_NETWORK':
        toast(`Υπήρξε ένα πρόβλημα με την επικοινωνία του σέρβερ.`, {
          type: 'error',
        });
        break;
    }

    if (error.response && error.response.data.status === 'error') {
      switch (error.response.data.message) {
        case 'user not found':
          toast(`Υπάρχει κάποιο πρόβλημα με το λογαριασμό σας. Δοκιμάστε να κάνετε επανασύνδεση.`, {
            type: 'error',
          });
          break;
      }
    }

    // if (error.response && error.response.status === 401) {
    //   window.location.href = `${this.origin}login`;
    // }
  },
};

export default request;