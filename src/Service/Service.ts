

//const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,AR&appid=9de600a5d1c16929f852e8a06c33e63a";
//const apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
//return this.http.get(`${this.uri}lat=${this.varLat}&lon=${this.varLong}&appid=204a3108bcfcf9c62f8b1342bb34ff39&units=metric`);
//https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key}

export async function fetchData(): Promise<any> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires,AR&appid=9de600a5d1c16929f852e8a06c33e63a`);
 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('response service', data)
      return data;

    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }