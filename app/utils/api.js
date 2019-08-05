// export const baseUrl = 'http://localhost:8080/';
export const baseUrl = 'http://ec2-18-234-243-47.compute-1.amazonaws.com:8080/';

export const getData = (url) => {
      return  fetch(url)
        .then(response => {
        	console.log(response)
        	return response.json()
        })
};


