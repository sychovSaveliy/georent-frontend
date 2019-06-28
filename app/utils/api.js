export const baseUrl = 'http://ec2-54-173-110-187.compute-1.amazonaws.com:8080/lot/';

export const getData = (url, target) => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
            this.setState({
              [target]: data
            });
        });
};


